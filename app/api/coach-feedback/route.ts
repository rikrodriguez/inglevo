import { NextResponse, type NextRequest } from "next/server";

import { generateCoachFeedback } from "@/lib/openai";
import { requireApiUser } from "@/lib/api-auth";
import { getSessionOwnerId } from "@/lib/data";
import { trackProductEvent } from "@/lib/product-events";
import { checkRateLimit } from "@/lib/rate-limit";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { checkInterviewPracticeQuota } from "@/lib/usage-limits";
import { coachFeedbackSchema } from "@/lib/validations";
import type { CoachFeedback } from "@/types";

function average(values: number[]) {
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function getVoiceFeedback(
  transcript: string,
  durationSeconds: number
): NonNullable<CoachFeedback["voiceFeedback"]> {
  const words = transcript
    .toLowerCase()
    .replace(/[^\w\s']/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const wordCount = words.length;
  const speakingSpeedWpm = Math.round((wordCount / durationSeconds) * 60);
  const fillerPatterns = ["um", "uh", "like", "basically", "actually", "so", "you know"];
  const fillerWords = words.filter((word, index) => {
    const twoWord = `${word} ${words[index + 1] ?? ""}`.trim();
    return fillerPatterns.includes(word) || fillerPatterns.includes(twoWord);
  });
  const repetitions = words
    .filter((word, index) => index > 0 && word === words[index - 1])
    .filter((word, index, items) => items.indexOf(word) === index);
  const confidenceMarkers = words
    .filter((word) => ["maybe", "just", "kind", "probably", "sorry"].includes(word))
    .filter((word, index, items) => items.indexOf(word) === index);
  const hasStructureMarkers = [
    "first",
    "second",
    "because",
    "for instance",
    "result",
    "impact",
    "currently",
    "today",
  ].some((marker) => transcript.toLowerCase().includes(marker));

  return {
    durationSeconds,
    wordCount,
    speakingSpeedWpm,
    fillerWords: fillerWords.slice(0, 8),
    fillerWordCount: fillerWords.length,
    estimatedPauses:
      speakingSpeedWpm < 85
        ? "Likely too many or too long pauses."
        : speakingSpeedWpm > 175
          ? "Likely rushed, with not enough breathing room."
          : "Pacing looks within a healthy range.",
    answerLength:
      durationSeconds < 25
        ? "Too short for a strong interview answer."
        : durationSeconds > 120
          ? "Too long; aim for a tighter 45-90 second answer."
          : "Good interview answer length.",
    confidenceMarkers,
    repetitions,
    spokenStructure: hasStructureMarkers
      ? "The answer shows some spoken structure."
      : "Structure is not very explicit. Add a simple opening, evidence and result.",
    transcriptQuality:
      wordCount < 8
        ? "Transcript is too short to evaluate reliably."
        : "Transcript is usable for feedback.",
    summary:
      `You spoke for ${durationSeconds}s at about ${speakingSpeedWpm} WPM with ${fillerWords.length} filler marker${fillerWords.length === 1 ? "" : "s"}.`,
  };
}

export async function POST(request: NextRequest) {
  try {
    const { user, response: authResponse } = await requireApiUser();
    if (authResponse) {
      return authResponse;
    }

    const rateLimitResponse = checkRateLimit({
      request,
      userId: user?.id,
      route: "coach-feedback",
      limit: 20,
      windowMs: 10 * 60 * 1000,
    });
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const quotaResponse = await checkInterviewPracticeQuota(user?.id);
    if (quotaResponse) {
      return quotaResponse;
    }

    const body = await request.json().catch(() => null);
    const parsed = coachFeedbackSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid coach feedback input.",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { feedback: baseFeedback, source } = await generateCoachFeedback(parsed.data);
    const feedback: CoachFeedback = parsed.data.voiceMetrics
      ? {
          ...baseFeedback,
          voiceFeedback: getVoiceFeedback(
            parsed.data.userAnswer,
            Math.round(parsed.data.voiceMetrics.durationSeconds)
          ),
        }
      : baseFeedback;
    const supabase = await createSupabaseServerClient().catch(() => null);
    let saved = false;
    let saveError: string | null = null;

    if (supabase && user) {
      const { count: previousPracticeCount } = await supabase
        .from("practice_sessions")
        .select("id", { count: "exact", head: true })
        .eq("user_id", getSessionOwnerId(user.id));
      const { error } = await supabase.from("practice_sessions").insert({
        user_id: getSessionOwnerId(user.id),
        scenario: parsed.data.scenario,
        question: parsed.data.question,
        user_answer: parsed.data.userAnswer,
        improved_answer: feedback.improvedAnswer,
        overall_score: feedback.overallScore,
        clarity: feedback.clarity,
        grammar: feedback.grammar,
        professional_tone: feedback.professionalTone,
        structure: feedback.structure,
        opportunity_readiness: feedback.opportunityReadiness,
        feedback_json: feedback,
      });

      saved = !error;
      saveError = error?.message ?? null;

      if (saved) {
        await trackProductEvent({
          eventName: "practice_saved",
          userId: user.id,
          email: user.email,
          name:
            typeof user.user_metadata?.full_name === "string"
              ? user.user_metadata.full_name
              : null,
          metadata: {
            scenario: parsed.data.scenario,
            score: feedback.overallScore,
            improvedAnswer: feedback.improvedAnswer,
            source,
            isFirstPractice: (previousPracticeCount ?? 0) === 0,
          },
        });
      }

      await supabase
        .from("readiness_assessments")
        .insert({
          user_id: getSessionOwnerId(user.id),
          assessment_type: "interview_practice",
          score: feedback.overallScore,
          area_scores: {
            englishCommunication: average([
              feedback.clarity,
              feedback.grammar,
              feedback.structure,
            ]),
            speakingConfidence: average([
              feedback.clarity,
              feedback.professionalTone,
              feedback.structure,
            ]),
            interviewReadiness: average([
              feedback.overallScore,
              feedback.opportunityReadiness,
              feedback.structure,
              feedback.professionalTone,
            ]),
            professionalConfidence: average([
              feedback.professionalTone,
              feedback.opportunityReadiness,
              feedback.overallScore,
            ]),
          },
          feedback_json: feedback,
          status: error ? "partial" : "completed",
        });
    }

    return NextResponse.json({
      ...feedback,
      source,
      saved,
      saveError,
      message: saved
        ? "Practice saved."
        : "Feedback generated. Connect Supabase and sign in to save history.",
    });
  } catch {
    return NextResponse.json(
      {
        error: "Coach feedback failed safely. Please try again.",
      },
      { status: 500 }
    );
  }
}
