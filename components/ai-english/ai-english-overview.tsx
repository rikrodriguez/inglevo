"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, FileText, History, Sparkles, Target } from "lucide-react";

import { AIEnglishSubnav } from "@/components/ai-english/ai-english-subnav";
import { TodayMissionCard } from "@/components/ai-english/today-mission-card";
import { EmptyState } from "@/components/shared/empty-state";
import { LoadingState } from "@/components/shared/loading-state";
import { Button } from "@/components/ui/button";
import { getRoleById, getTodayMission } from "@/lib/ai-english/role-library";
import { createLocalAIEnglishStorage } from "@/lib/ai-english/storage";
import type {
  AnswerBankItem,
  EnglishTrainingProfile,
  PracticeSession,
} from "@/lib/ai-english/types";

const readinessAreas = [
  "Interview English",
  "Async Writing",
  "Role Communication",
  "Grammar Control",
  "Professional Tone",
  "Saved English Assets",
];

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
  }).format(new Date(date));
}

function average(values: number[]) {
  if (!values.length) {
    return null;
  }

  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function getReadinessStatus({
  area,
  sessions,
  answers,
}: {
  area: string;
  sessions: PracticeSession[];
  answers: AnswerBankItem[];
}) {
  const attempts = sessions.flatMap((session) => session.attempts);
  const grammar = average(
    attempts.map((attempt) => attempt.rubric_scores.grammar_control)
  );
  const tone = average(
    attempts.map((attempt) => attempt.rubric_scores.professional_tone)
  );

  if (area === "Interview English") {
    if (!sessions.length) return "Not started";
    return (average(attempts.map((attempt) => attempt.overall_score)) ?? 0) >= 75
      ? "Evidence added"
      : "Practicing";
  }

  if (area === "Async Writing") {
    return "Coming later";
  }

  if (area === "Role Communication") {
    return sessions.length >= 2 ? "Evidence added" : sessions.length ? "Practicing" : "Not started";
  }

  if (area === "Grammar Control") {
    if (grammar === null) return "Not started";
    return grammar >= 75 ? "Evidence added" : "Practicing";
  }

  if (area === "Professional Tone") {
    if (tone === null) return "Not started";
    return tone >= 75 ? "Evidence added" : "Practicing";
  }

  if (!answers.length) return "Not started";
  return answers.length >= 3 ? "Ready" : "Evidence added";
}

function getStatusClass(status: string) {
  if (status === "Ready" || status === "Evidence added") {
    return "badge-ready";
  }

  if (status === "Practicing") {
    return "badge-progress";
  }

  return "badge-pending";
}

export function AIEnglishOverview({ userId }: { userId: string }) {
  const [profile, setProfile] = useState<EnglishTrainingProfile | null>(null);
  const [sessions, setSessions] = useState<PracticeSession[]>([]);
  const [answers, setAnswers] = useState<AnswerBankItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const storage = createLocalAIEnglishStorage();

    async function load() {
      const [savedProfile, savedSessions, savedAnswers] = await Promise.all([
        storage.getTrainingProfile(userId),
        storage.getPracticeSessions(userId),
        storage.getAnswerBankItems(userId),
      ]);

      if (!active) return;

      setProfile(savedProfile);
      setSessions(savedSessions);
      setAnswers(savedAnswers);
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
  const recentAttempts = sessions
    .flatMap((session) =>
      session.attempts.map((attempt) => ({
        ...attempt,
        sessionTitle: session.title,
        roleId: session.role_id,
      }))
    )
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 3);

  if (loading) {
    return <LoadingState label="Loading AI English..." />;
  }

  if (!profile || !role || !mission) {
    return (
      <div className="mx-auto grid max-w-6xl gap-6">
        <AIEnglishSubnav />
        <section className="hero-panel">
          <div className="grid gap-6 lg:grid-cols-[1fr_300px] lg:items-end">
            <div>
              <p className="section-kicker">AI English Trainer</p>
              <h1 className="page-title mt-2">Choose your target role to start.</h1>
              <p className="page-copy mt-3">
                No setup yet. Pick one remote role and Inglevo will generate your
                first role-specific English mission.
              </p>
            </div>
            <Button asChild>
              <Link href="/app/ai-trainer/setup">
                Choose your target role
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </section>
        <EmptyState
          title="Choose your target role to start your English readiness path."
          description="Your first mission will adapt to Virtual Assistant, Customer Support or Marketing Assistant practice."
        />
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-6">
      <AIEnglishSubnav />
      <section className="hero-panel">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker">Practice that becomes proof.</p>
            <h1 className="page-title mt-2">Your English Readiness Path</h1>
            <p className="page-copy mt-3">
              Train role-specific English for remote work, improve your answers,
              and build job-ready English assets.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/app/ai-trainer/setup">Change role</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <TodayMissionCard mission={mission} />
        <aside className="premium-panel h-fit">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4" />
            <p className="section-kicker">Training Profile</p>
          </div>
          <h2 className="mt-2 text-2xl font-semibold">Training for: {role.title}</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Today’s mission is tuned to this role and goal.
          </p>
          <div className="mt-5 grid gap-3 text-sm">
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <p className="text-muted-foreground">Current level</p>
              <p className="mt-1 font-semibold">{profile.english_level}</p>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <p className="text-muted-foreground">Main goal</p>
              <p className="mt-1 font-semibold">{profile.main_goal}</p>
            </div>
          </div>
        </aside>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="premium-panel">
          <div className="flex items-center gap-2">
            <Target className="size-5" />
            <h2 className="text-2xl font-semibold">English Readiness signals</h2>
          </div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            These update from your practice attempts and saved English assets.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {readinessAreas.map((area) => {
              const status = getReadinessStatus({ area, sessions, answers });

              return (
                <div key={area} className="rounded-xl border border-border bg-white p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-medium">{area}</p>
                    <span className={getStatusClass(status)}>{status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="premium-panel">
          <div className="flex items-center gap-2">
            <History className="size-5" />
            <h2 className="text-2xl font-semibold">Recent Practice History</h2>
          </div>
          <div className="mt-5 grid gap-3">
            {recentAttempts.length ? (
              recentAttempts.map((attempt) => (
                <article key={attempt.id} className="rounded-xl border border-border bg-muted/30 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{attempt.sessionTitle}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {formatDate(attempt.created_at)}
                      </p>
                    </div>
                    <span className="font-mono text-lg font-semibold">
                      {attempt.overall_score}/100
                    </span>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-border p-5 text-sm leading-6 text-muted-foreground">
                Complete your first practice to start building your English readiness.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="premium-panel">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="size-5" />
              <h2 className="text-2xl font-semibold">Job-ready English assets</h2>
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Save your strongest answers so you can reuse them in interviews,
              LinkedIn, CVs and applications.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/app/ai-trainer/answer-bank">
              Open Answer Bank
              <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {answers.slice(0, 3).length ? (
            answers.slice(0, 3).map((item) => (
              <article key={item.id} className="rounded-xl border border-border bg-muted/30 p-4">
                <p className="font-semibold">{item.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.score_band} · {item.score}/100
                </p>
                <p className="mt-3 line-clamp-4 text-sm leading-6 text-muted-foreground">
                  {item.improved_answer}
                </p>
              </article>
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-border p-5 text-sm leading-6 text-muted-foreground md:col-span-3">
              Save your strongest answers so you can reuse them in interviews,
              LinkedIn, CVs and applications.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
