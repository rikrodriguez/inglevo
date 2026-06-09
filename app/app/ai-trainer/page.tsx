import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  FileText,
  MessageSquareText,
  Mic,
  Sparkles,
  Target,
} from "lucide-react";

import {
  aiTutorModules,
  weeklyTrainingPath,
  type TutorModule,
  type TutorModuleId,
  type TutorModuleStatus,
  type TutorRecommendedAction,
  type TutorProgressSummary,
} from "@/data/ai-tutor-modules";
import {
  getPracticeSessions,
  getReadinessAssessments,
  getRemoteJobAssets,
  getViewer,
  getWritingAssessments,
} from "@/lib/data";
import { Button } from "@/components/ui/button";
import type { PracticeSession, RemoteJobAsset, WritingAssessment } from "@/types";

type RecentActivity = {
  id: string;
  type: "Interview" | "Async Writing";
  title: string;
  score: number | null;
  createdAt: string;
  href: string;
};

const moduleIcons = {
  interview_english: MessageSquareText,
  async_writing: FileText,
  speaking_confidence: Mic,
  meeting_simulations: BriefcaseBusiness,
} satisfies Record<TutorModuleId, typeof MessageSquareText>;

function average(values: Array<number | null | undefined>) {
  const valid = values.filter((value): value is number => typeof value === "number");

  if (!valid.length) {
    return null;
  }

  return Math.round(valid.reduce((sum, value) => sum + value, 0) / valid.length);
}

function hasVoiceFeedback(session: PracticeSession) {
  const feedback = session.feedback_json;

  return (
    feedback &&
    typeof feedback === "object" &&
    "voiceFeedback" in feedback &&
    Boolean(feedback.voiceFeedback)
  );
}

function isMeetingSimulation(session: PracticeSession) {
  const text = `${session.scenario} ${session.question}`.toLowerCase();

  return [
    "standup",
    "blocker",
    "client",
    "support",
    "escalation",
    "salary",
    "meeting",
  ].some((term) => text.includes(term));
}

function getProgressSummary({
  sessions,
  writingAssessments,
}: {
  sessions: PracticeSession[];
  writingAssessments: WritingAssessment[];
}): TutorProgressSummary {
  const voiceSessions = sessions.filter(hasVoiceFeedback);
  const meetingSessions = sessions.filter(isMeetingSimulation);
  return {
    interviewEnglish: average(sessions.map((session) => session.overall_score)),
    asyncWriting: average(writingAssessments.map((assessment) => assessment.overall_score)),
    speakingConfidence: average(voiceSessions.map((session) => session.overall_score)),
    meetingSimulations: average(meetingSessions.map((session) => session.overall_score)),
    savedAssets: null,
  };
}

function statusFromScore(score: number | null, evidenceCount: number): TutorModuleStatus {
  if (!evidenceCount || score === null) {
    return "not_started";
  }

  if (score >= 82) {
    return "strong";
  }

  if (score >= 70) {
    return "improving";
  }

  return "in_progress";
}

function getStatusCopy(status: TutorModuleStatus) {
  const labels = {
    not_started: "Not started",
    in_progress: "In progress",
    improving: "Improving",
    strong: "Strong",
  } satisfies Record<TutorModuleStatus, string>;

  return labels[status];
}

function getStatusClass(status: TutorModuleStatus) {
  if (status === "strong") {
    return "badge-ready";
  }

  if (status === "improving" || status === "in_progress") {
    return "badge-progress";
  }

  return "badge-pending";
}

function getModuleStatus(
  module: TutorModule,
  progress: TutorProgressSummary,
  sessions: PracticeSession[],
  writingAssessments: WritingAssessment[]
) {
  if (module.id === "interview_english") {
    return statusFromScore(progress.interviewEnglish, sessions.length);
  }

  if (module.id === "async_writing") {
    return statusFromScore(progress.asyncWriting, writingAssessments.length);
  }

  if (module.id === "speaking_confidence") {
    const voiceCount = sessions.filter(hasVoiceFeedback).length;
    return statusFromScore(progress.speakingConfidence, voiceCount);
  }

  const simulationCount = sessions.filter(isMeetingSimulation).length;
  return statusFromScore(progress.meetingSimulations, simulationCount);
}

function getRecommendedAction({
  sessions,
  writingAssessments,
  assets,
  progress,
}: {
  sessions: PracticeSession[];
  writingAssessments: WritingAssessment[];
  assets: RemoteJobAsset[];
  progress: TutorProgressSummary;
}): TutorRecommendedAction {
  const bestSession = [...sessions].sort(
    (a, b) => (b.overall_score ?? 0) - (a.overall_score ?? 0)
  )[0];
  const hasAnswerAsset = assets.some((asset) => asset.type === "interview_answer");
  const latestSession = sessions[0];

  if (!sessions.length) {
    return {
      title: 'Practice "Tell me about yourself"',
      reason:
        "Start building your verification profile with one role-specific interview answer.",
      ctaLabel: "Start first practice",
      href: "/app/interview",
      moduleId: "interview_english",
    };
  }

  if ((latestSession.overall_score ?? 0) < 75) {
    return {
      title: `Practice "${latestSession.scenario}" again`,
      reason:
        "Practice again to increase your score and create a stronger answer for verification.",
      ctaLabel: "Practice again",
      href: "/app/interview",
      moduleId: "interview_english",
    };
  }

  if (!writingAssessments.length) {
    return {
      title: "Complete Async Writing: blocker update",
      reason:
        "Remote teams judge reliability through written updates, not only interviews.",
      ctaLabel: "Improve async writing",
      href: "/app/improve/async-writing",
      moduleId: "async_writing",
    };
  }

  if (progress.speakingConfidence === null) {
    return {
      title: "Try Speaking Confidence: spoken self-introduction",
      reason:
        "Use voice practice to improve delivery, pace, filler words and spoken structure.",
      ctaLabel: "Practice speaking",
      href: "/app/interview?mode=speak",
      moduleId: "speaking_confidence",
    };
  }

  if (bestSession?.improved_answer && !hasAnswerAsset) {
    return {
      title: "Save your best answer to job assets",
      reason:
        "Turn better answers into job assets you can reuse for interviews and applications.",
      ctaLabel: "Open answer bank",
      href: "/app/remote-jobs",
      moduleId: "assets",
    };
  }

  return {
    title: "Run a Meeting Simulation",
    reason:
      "Practice a remote-work situation so your profile shows more than interview answers.",
    ctaLabel: "Start simulation",
    href: "/app/interview?mode=speak&simulation=meeting",
    moduleId: "meeting_simulations",
  };
}

function getRecentActivities(
  sessions: PracticeSession[],
  writingAssessments: WritingAssessment[]
): RecentActivity[] {
  const practiceItems = sessions.slice(0, 5).map((session) => ({
    id: `practice-${session.id}`,
    type: "Interview" as const,
    title: session.scenario,
    score: session.overall_score,
    createdAt: session.created_at,
    href: "/app/interview",
  }));
  const writingItems = writingAssessments.slice(0, 5).map((assessment) => ({
    id: `writing-${assessment.id}`,
    type: "Async Writing" as const,
    title: assessment.assessment_type.replaceAll("_", " "),
    score: assessment.overall_score,
    createdAt: assessment.created_at,
    href: "/app/improve/async-writing",
  }));

  return [...practiceItems, ...writingItems]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
  }).format(new Date(date));
}

function scoreWidth(score: number | null) {
  return `${Math.max(8, score ?? 0)}%`;
}

type SnapshotItem = {
  label: string;
  score: number | null;
  value?: string;
  detail: string;
};

export default async function AiTrainerPage() {
  const [{ profile }, sessions, writingAssessments, assets, readinessAssessments] =
    await Promise.all([
      getViewer(),
      getPracticeSessions(),
      getWritingAssessments(),
      getRemoteJobAssets(),
      getReadinessAssessments(),
    ]);
  const progress = getProgressSummary({ sessions, writingAssessments });
  const recommendedAction = getRecommendedAction({
    sessions,
    writingAssessments,
    assets,
    progress,
  });
  const recentActivities = getRecentActivities(sessions, writingAssessments);
  const answerAssets = assets.filter((asset) => asset.type === "interview_answer").slice(0, 3);
  const hasAnyEvidence =
    sessions.length > 0 ||
    writingAssessments.length > 0 ||
    assets.length > 0 ||
    readinessAssessments.length > 0;
  const meetingEvidenceCount = sessions.filter(isMeetingSimulation).length;
  const snapshotItems: SnapshotItem[] = [
    {
      label: "Interview English",
      score: progress.interviewEnglish,
      detail: sessions.length
        ? `${sessions.length} saved ${sessions.length === 1 ? "practice" : "practices"}`
        : "No practice yet",
    },
    {
      label: "Async Writing",
      score: progress.asyncWriting,
      detail: writingAssessments.length
        ? `${writingAssessments.length} saved ${writingAssessments.length === 1 ? "assessment" : "assessments"}`
        : "No writing signal yet",
    },
    {
      label: "Speaking Confidence",
      score: progress.speakingConfidence,
      detail: sessions.some(hasVoiceFeedback)
        ? "Voice transcript and feedback saved"
        : "Use voice mode to start",
    },
    {
      label: "Meeting Simulations",
      score: progress.meetingSimulations,
      detail: meetingEvidenceCount
        ? `${meetingEvidenceCount} saved ${meetingEvidenceCount === 1 ? "simulation" : "simulations"}`
        : "No simulation evidence yet",
    },
    {
      label: "Saved Assets",
      score: progress.savedAssets,
      value: `${answerAssets.length}`,
      detail: answerAssets.length
        ? `${answerAssets.length} reusable ${answerAssets.length === 1 ? "answer" : "answers"}`
        : "No answer asset yet",
    },
  ];

  return (
    <div className="mx-auto grid max-w-7xl gap-6">
      <section className="hero-panel overflow-hidden">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <p className="section-kicker">AI Trainer</p>
            <h1 className="page-title mt-2">
              Build your verification profile with role-specific English.
            </h1>
            <p className="page-copy mt-3">
              Train interviews, spoken answers, async updates and remote-work
              conversations for the roles you want. This is practice that
              becomes proof.
            </p>
          </div>
          <div className="rounded-2xl border border-black/10 bg-black p-5 text-white shadow-[0_24px_80px_rgba(7,9,12,0.18)]">
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Sparkles className="size-4 text-[#d0f5e3]" />
              Recommended Next Session
            </div>
            <h2 className="mt-3 text-2xl font-semibold">{recommendedAction.title}</h2>
            <p className="mt-2 text-sm leading-6 text-white/70">
              {recommendedAction.reason}
            </p>
            <Button asChild className="mt-5 w-full justify-between bg-white text-black hover:bg-white/90">
              <Link href={recommendedAction.href}>
                {recommendedAction.ctaLabel}
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {!hasAnyEvidence ? (
        <section className="premium-panel border-dashed bg-white/80">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="section-kicker">Verification progress</p>
              <h2 className="mt-2 text-2xl font-semibold">
                Complete your first practice to start building your verification profile.
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Your trainer will connect practice, feedback, repeat attempts
                and saved job assets once you complete the first session.
              </p>
            </div>
            <Button asChild>
              <Link href="/app/interview">
                Start practice
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </section>
      ) : null}

      <section className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="premium-panel">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="section-kicker">Tutor Score Snapshot</p>
              <h2 className="mt-2 text-2xl font-semibold">
                Training signals for {profile.role ?? "your target role"}
              </h2>
            </div>
            <span className="badge-ready">Verification training</span>
          </div>
          <div className="mt-6 grid gap-4">
            {snapshotItems.map((item) => (
              <div key={item.label} className="rounded-xl border border-border bg-muted/30 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                  <span className="font-mono text-lg font-semibold">
                    {item.value ?? (item.score === null ? "--" : item.score)}
                  </span>
                </div>
                {item.value ? (
                  <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    Count, not a readiness score
                  </p>
                ) : (
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                    <div
                      className="h-full rounded-full bg-black transition-all"
                      style={{ width: scoreWidth(item.score) }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="premium-panel">
          <div className="flex items-center gap-2">
            <CalendarDays className="size-5" />
            <h2 className="text-2xl font-semibold">Weekly Training Path</h2>
          </div>
          <div className="mt-5 grid gap-3">
            {weeklyTrainingPath.map((item, index) => (
              <Link
                key={item.day}
                href={item.href}
                className="group grid grid-cols-[52px_1fr] gap-3 rounded-xl border border-border bg-white p-3 transition hover:-translate-y-0.5 hover:shadow-sm"
              >
                <div className="grid size-11 place-items-center rounded-xl bg-[#d0f5e3] text-sm font-semibold">
                  {index + 1}
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    {item.day}
                  </p>
                  <p className="font-semibold group-hover:underline">{item.title}</p>
                  <p className="mt-1 text-sm leading-5 text-muted-foreground">
                    {item.action}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {aiTutorModules.map((module) => {
          const Icon = moduleIcons[module.id];
          const status = getModuleStatus(
            module,
            progress,
            sessions,
            writingAssessments
          );

          return (
            <article key={module.id} className="premium-card flex flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="grid size-11 place-items-center rounded-xl bg-[#d0f5e3]">
                  <Icon className="size-5" />
                </div>
                <span className={getStatusClass(status)}>{getStatusCopy(status)}</span>
              </div>
              <h2 className="mt-5 text-xl font-semibold">{module.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {module.description}
              </p>
              <div className="mt-4 rounded-xl border border-border bg-muted/30 p-3">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Goal
                </p>
                <p className="mt-1 text-sm">{module.goal}</p>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium">Improves</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {module.whatItImproves.slice(0, 4).map((item) => (
                    <span key={item} className="rounded-full bg-muted px-3 py-1 text-xs">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {module.verificationImpact}
              </p>
              <Button asChild variant="outline" className="mt-auto w-full justify-between">
                <Link href={module.targetRoute}>
                  {module.ctaLabel}
                  <ArrowRight />
                </Link>
              </Button>
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
        <div className="premium-panel">
          <div className="flex items-center gap-2">
            <BarChart3 className="size-5" />
            <h2 className="text-2xl font-semibold">Recent Practice History</h2>
          </div>
          <div className="mt-5 grid gap-3">
            {recentActivities.length ? (
              recentActivities.map((activity) => (
                <Link
                  key={activity.id}
                  href={activity.href}
                  className="flex flex-col gap-3 rounded-xl border border-border bg-white p-4 transition hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="badge-pending">{activity.type}</span>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(activity.createdAt)}
                      </span>
                    </div>
                    <p className="mt-2 font-semibold capitalize">{activity.title}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-lg font-semibold">
                      {activity.score ?? "--"}/100
                    </span>
                    <ArrowRight className="size-4 text-muted-foreground" />
                  </div>
                </Link>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">
                Practice, get feedback and repeat. Your training history will
                appear here as evidence for your verification profile.
              </div>
            )}
          </div>
        </div>

        <div className="premium-panel">
          <div className="flex items-center gap-2">
            <Target className="size-5" />
            <h2 className="text-2xl font-semibold">Best Answer Bank Preview</h2>
          </div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Save your strongest answer so it can support applications and your
            Inglevo Verification Profile.
          </p>
          <div className="mt-5 grid gap-3">
            {answerAssets.length ? (
              answerAssets.map((asset) => (
                <article key={asset.id} className="rounded-xl border border-border bg-muted/30 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{asset.title}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        Saved answer asset
                      </p>
                    </div>
                    <CheckCircle2 className="size-5 text-black" />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {asset.content.length > 170
                      ? `${asset.content.slice(0, 170)}...`
                      : asset.content}
                  </p>
                </article>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-border bg-white p-5 text-sm leading-6 text-muted-foreground">
                Your strongest answers will appear here once you save them.
              </div>
            )}
          </div>
          <Button asChild className="mt-5 w-full justify-between">
            <Link href="/app/remote-jobs">
              Save your strongest answer
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
