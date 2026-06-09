"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, LoaderCircle, RotateCcw, Save, Send } from "lucide-react";

import { AIEnglishSubnav } from "@/components/ai-english/ai-english-subnav";
import { FeedbackPanel } from "@/components/ai-english/feedback-panel";
import { EmptyState } from "@/components/shared/empty-state";
import { LoadingState } from "@/components/shared/loading-state";
import { Button } from "@/components/ui/button";
import { getRoleById, getTodayMission } from "@/lib/ai-english/role-library";
import {
  type PracticeEvaluation,
  getScoreDelta,
} from "@/lib/ai-english/scoring";
import { practiceEvaluationSchema } from "@/lib/ai-english/schemas";
import {
  createLocalAIEnglishStorage,
  type AIEnglishStorage,
} from "@/lib/ai-english/storage";
import type {
  EnglishTrainingProfile,
  PracticeAttempt,
  PracticeSession as StoredPracticeSession,
} from "@/lib/ai-english/types";

type ScoreDelta = {
  previousScore: number;
  newScore: number;
  delta: number;
};

const minimumAnswerLength = 20;
const maximumAnswerLength = 2400;

export function PracticeSession({ userId }: { userId: string }) {
  const storageRef = useRef<AIEnglishStorage | null>(null);
  const [profile, setProfile] = useState<EnglishTrainingProfile | null>(null);
  const [currentSession, setCurrentSession] =
    useState<StoredPracticeSession | null>(null);
  const [attempts, setAttempts] = useState<PracticeAttempt[]>([]);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<PracticeEvaluation | null>(null);
  const [guidance, setGuidance] = useState<PracticeEvaluation | null>(null);
  const [scoreDelta, setScoreDelta] = useState<ScoreDelta | null>(null);
  const [loading, setLoading] = useState(true);
  const [evaluating, setEvaluating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const nextStorage = createLocalAIEnglishStorage();
    storageRef.current = nextStorage;

    async function load() {
      const savedProfile = await nextStorage.getTrainingProfile(userId);
      const savedSessions = await nextStorage.getPracticeSessions(userId);

      if (!active) return;

      setProfile(savedProfile);

      if (savedProfile) {
        const mission = getTodayMission({
          targetRole: savedProfile.target_role,
          mainGoal: savedProfile.main_goal,
        });
        const existingSession =
          savedSessions.find((session) => session.scenario_id === mission.id) ??
          null;
        setCurrentSession(existingSession);
        setAttempts(existingSession?.attempts ?? []);
      }

      setLoading(false);
    }

    void load();

    return () => {
      active = false;
    };
  }, [userId]);

  const role = profile ? getRoleById(profile.target_role) : null;
  const mission = useMemo(
    () =>
      profile
        ? getTodayMission({
            targetRole: profile.target_role,
            mainGoal: profile.main_goal,
          })
        : null,
    [profile]
  );
  const canSubmit =
    answer.trim().length >= minimumAnswerLength &&
    answer.trim().length <= maximumAnswerLength &&
    !evaluating;
  const latestAttempt = attempts.at(-1) ?? null;

  async function ensureSession(nextStorage: AIEnglishStorage) {
    if (currentSession || !profile || !mission) {
      return currentSession;
    }

    const session = await nextStorage.createPracticeSession(userId, {
      role_id: profile.target_role,
      scenario_id: mission.id,
      scenario_type: mission.scenario_type,
      title: mission.title,
      context: mission.context,
      question: mission.question,
      what_this_measures: mission.what_this_measures,
    });

    setCurrentSession(session);
    return session;
  }

  async function evaluateAnswer() {
    const storage = storageRef.current;

    if (!storage || !profile || !role || !mission) {
      return;
    }

    const answerText = answer.trim();

    if (answerText.length < minimumAnswerLength) {
      setError("Write a slightly more complete answer before submitting.");
      return;
    }

    if (answerText.length > maximumAnswerLength) {
      setError("Your answer is too long for this practice. Please make it shorter.");
      return;
    }

    setEvaluating(true);
    setError(null);
    setSaved(false);

    try {
      const session = await ensureSession(storage);

      if (!session) {
        setError("Choose your target role before practicing.");
        return;
      }

      const response = await fetch("/api/ai/practice/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roleId: profile.target_role,
          scenarioId: mission.id,
          scenarioType: mission.scenario_type,
          question: mission.question,
          answerText,
          englishLevel: profile.english_level,
          mainGoal: profile.main_goal,
        }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setError("We could not evaluate your answer right now. Please try again.");
        return;
      }

      const evaluation = practiceEvaluationSchema.parse(data);
      const nextDelta = getScoreDelta(attempts, evaluation.overall_score);
      await storage.addPracticeAttempt(userId, session.id, {
        answer_text: answerText,
        evaluation,
      });
      await storage.incrementUsage(userId, "text_practice");
      const refreshedSessions = await storage.getPracticeSessions(userId);
      const refreshedSession =
        refreshedSessions.find((item) => item.id === session.id) ?? session;

      setCurrentSession(refreshedSession);
      setAttempts(refreshedSession.attempts);
      setResult(evaluation);
      setGuidance(null);
      setScoreDelta(nextDelta);
      setAnswer(answerText);
    } catch {
      setError("We could not evaluate your answer right now. Please try again.");
    } finally {
      setEvaluating(false);
    }
  }

  function retry() {
    if (!result) {
      return;
    }

    setGuidance(result);
    setResult(null);
    setScoreDelta(null);
    setSaved(false);
    setAnswer("");
    setError(null);
  }

  async function saveToAnswerBank() {
    const storage = storageRef.current;

    if (!storage || !profile || !mission || !result || !latestAttempt) {
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await storage.saveAnswerBankItem(userId, {
        role_id: profile.target_role,
        asset_type: "Interview Answer",
        title: mission.title,
        original_answer: latestAttempt.answer_text,
        improved_answer: result.improved_answer,
        score: result.overall_score,
        score_band: result.score_band,
        tags: mission.tags,
        source_session_id: latestAttempt.session_id,
        source_attempt_id: latestAttempt.id,
      });
      await storage.incrementUsage(userId, "saved_answer");
      setSaved(true);
    } catch {
      setError("We could not save this answer right now. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <LoadingState label="Loading practice session..." />;
  }

  if (!profile || !role || !mission) {
    return (
      <div className="mx-auto grid max-w-5xl gap-6">
        <AIEnglishSubnav />
        <EmptyState
          title="Choose your target role to start your English readiness path."
          description="Your practice mission will adapt to your role and goal."
        />
        <div>
          <Button asChild>
            <Link href="/app/ai-trainer/setup">
              Choose role
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-6">
      <AIEnglishSubnav />

      <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="ink-panel p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-full bg-[#d0f5e3] px-3 py-1 text-xs font-semibold text-black">
              Text Practice Session
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
              {role.title}
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {mission.title}
          </h1>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/8 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
              Scenario
            </p>
            <p className="mt-2 text-sm leading-6 text-white/80">{mission.context}</p>
          </div>
          <div className="mt-4 rounded-2xl border border-[#d0f5e3]/40 bg-[#d0f5e3] p-5 text-black">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/55">
              Question
            </p>
            <p className="mt-2 text-xl font-semibold leading-8">
              {mission.question}
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {mission.what_this_measures.map((item) => (
              <span
                key={item}
                className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <aside className="premium-panel h-fit">
          <p className="section-kicker">Practice status</p>
          <h2 className="mt-2 text-2xl font-semibold">
            {attempts.length ? `${attempts.length} attempt${attempts.length === 1 ? "" : "s"}` : "First attempt"}
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Recommended answer length: 80–180 words. Keep the facts true to
            your real experience.
          </p>
          {latestAttempt ? (
            <div className="mt-4 rounded-xl border border-border bg-muted/30 p-4">
              <p className="text-sm text-muted-foreground">Latest score</p>
              <p className="mt-1 font-mono text-2xl font-semibold">
                {latestAttempt.overall_score}/100
              </p>
            </div>
          ) : null}
        </aside>
      </section>

      <section className="premium-panel">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Your answer</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Write your answer in English. Try to be clear, specific and professional.
            </p>
          </div>
          <span className="text-sm text-muted-foreground">
            {answer.trim().length}/{maximumAnswerLength}
          </span>
        </div>

        {guidance ? (
          <div className="mt-5 rounded-2xl border border-[#dfdbd6] bg-[#dfdbd6]/60 p-4 text-sm leading-6">
            <p className="font-semibold">Previous feedback guidance</p>
            <p className="mt-2 text-muted-foreground">{guidance.next_step}</p>
          </div>
        ) : null}

        <textarea
          value={answer}
          onChange={(event) => {
            setAnswer(event.target.value.slice(0, maximumAnswerLength));
            setError(null);
          }}
          placeholder="Write your answer in English. Try to be clear, specific and professional."
          disabled={evaluating}
          className="mt-5 min-h-56 w-full resize-y rounded-2xl border border-border bg-white p-4 text-base leading-7 outline-none transition placeholder:text-muted-foreground/75 focus:border-foreground disabled:cursor-wait disabled:bg-muted/40"
        />

        {error ? <p className="mt-3 text-sm font-medium text-black">{error}</p> : null}
        {evaluating ? (
          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-[#d0f5e3] bg-[#d0f5e3]/45 p-4 text-sm">
            <LoaderCircle className="size-4 animate-spin" />
            <div>
              <p className="font-semibold">Evaluating your answer...</p>
              <p className="mt-1 text-muted-foreground">
                Checking clarity, structure, professional tone and role relevance.
              </p>
            </div>
          </div>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-3">
          <Button
            type="button"
            onClick={evaluateAnswer}
            disabled={!canSubmit}
            className="h-11 w-full sm:w-auto"
          >
            {evaluating ? "Evaluating your answer..." : "Submit answer"}
            {evaluating ? <LoaderCircle className="animate-spin" /> : <Send />}
          </Button>
        </div>
      </section>

      {result ? (
        <>
          <FeedbackPanel evaluation={result} scoreDelta={scoreDelta} />
          <section className="premium-panel">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Keep improving this answer</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Retry the same question or save this stronger version as a
                  job-ready English asset.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button
                  type="button"
                  onClick={saveToAnswerBank}
                  disabled={saving || saved}
                  className="h-11 justify-between sm:min-w-56"
                >
                  {saving ? "Saving..." : saved ? "Saved to Answer Bank" : "Save to Answer Bank"}
                  <Save />
                </Button>
                <Button type="button" variant="outline" onClick={retry} className="h-11 justify-between">
                  Try again and improve your score
                  <RotateCcw />
                </Button>
              </div>
            </div>
            {saved ? (
              <p className="mt-4 text-sm text-muted-foreground">
                Saved. You can view it in your Answer Bank.
              </p>
            ) : null}
          </section>
        </>
      ) : null}
    </div>
  );
}
