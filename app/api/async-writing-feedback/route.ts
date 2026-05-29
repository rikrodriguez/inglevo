import { NextResponse, type NextRequest } from "next/server";

import { requireApiUser } from "@/lib/api-auth";
import { getSessionOwnerId } from "@/lib/data";
import { generateAsyncWritingFeedback } from "@/lib/openai";
import { checkRateLimit } from "@/lib/rate-limit";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { asyncWritingAssessmentSchema } from "@/lib/validations";

function average(values: number[]) {
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
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
      route: "async-writing-feedback",
      limit: 15,
      windowMs: 10 * 60 * 1000,
    });
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const body = await request.json().catch(() => null);
    const parsed = asyncWritingAssessmentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid async writing input.",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { feedback, source } = await generateAsyncWritingFeedback(parsed.data);
    const supabase = await createSupabaseServerClient().catch(() => null);
    let saved = false;
    let saveError: string | null = null;

    if (supabase && user) {
      const { error } = await supabase.from("writing_assessments").insert({
        user_id: getSessionOwnerId(user.id),
        assessment_type: parsed.data.assessmentType,
        prompt: parsed.data.prompt,
        user_message: parsed.data.userMessage,
        improved_message: feedback.improvedMessage,
        overall_score: feedback.overallScore,
        clarity: feedback.clarity,
        tone: feedback.tone,
        concision: feedback.concision,
        ownership: feedback.ownership,
        actionability: feedback.actionability,
        feedback_json: feedback,
      });

      saved = !error;
      saveError = error?.message ?? null;

      await supabase
        .from("readiness_assessments")
        .insert({
          user_id: getSessionOwnerId(user.id),
          assessment_type: "async_writing",
          score: feedback.overallScore,
          area_scores: {
            asyncWriting: average([
              feedback.clarity,
              feedback.tone,
              feedback.concision,
              feedback.ownership,
              feedback.actionability,
            ]),
            professionalConfidence: average([
              feedback.tone,
              feedback.ownership,
              feedback.actionability,
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
        ? "Async writing assessment saved."
        : "Feedback generated. Apply migration 003_writing_assessments.sql to save writing assessments.",
    });
  } catch {
    return NextResponse.json(
      {
        error: "Async writing feedback failed safely. Please try again.",
      },
      { status: 500 }
    );
  }
}
