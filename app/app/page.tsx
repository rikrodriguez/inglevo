import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  CircleAlert,
  ClipboardList,
  Compass,
  FileText,
  History,
  Target,
} from "lucide-react";

import { MetricCard } from "@/components/shared/metric-card";
import { ScoreRing } from "@/components/shared/score-ring";
import { Button } from "@/components/ui/button";
import { getCertificateEligibility } from "@/lib/certificate";
import {
  getPracticeSessions,
  getReadinessAssessments,
  getRemoteJobAssets,
  getSetupCheck,
  getViewer,
  getWritingAssessments,
} from "@/lib/data";
import {
  calculateAreaScores,
  calculateReadinessScore,
  getReadinessStatus,
  getRecommendedNextStep,
} from "@/lib/readiness";

const quickLinks = [
  { label: "English Trainer", href: "/app/ai-trainer", icon: BookOpen },
  { label: "Certification", href: "/app/certificate", icon: Award },
  { label: "Resume Builder", href: "/app/resume", icon: FileText },
  { label: "Job CRM", href: "/app/job-crm", icon: ClipboardList },
  { label: "Opportunities", href: "/app/opportunities", icon: Compass },
  { label: "History", href: "/app/history", icon: History },
];

const pathHref = {
  "Improve English": "/app/ai-trainer",
  "Remote Jobs": "/app/job-crm",
  "My Readiness": "/app/readiness",
} as const;

function getReadinessGap(score: number | null) {
  if (score === null) {
    return "Complete your first assessment to measure the gap.";
  }

  if (score >= 75) {
    return "You are in Remote Ready range. Keep building assets and consistency.";
  }

  const gap = 75 - score;
  const steps = Math.max(1, Math.ceil(gap / 8));

  return `You are about ${steps} focused ${steps === 1 ? "step" : "steps"} away from Remote Ready.`;
}

function getNextBestAction({
  areaScores,
  sessionsCount,
  assetsCount,
  writingCount,
  setupDone,
}: {
  areaScores: ReturnType<typeof calculateAreaScores>;
  sessionsCount: number;
  assetsCount: number;
  writingCount: number;
  setupDone: boolean;
}) {
  const area = [...areaScores]
    .filter((item) => item.score !== null)
    .sort((a, b) => (a.score ?? 0) - (b.score ?? 0))[0];

  if (!sessionsCount) {
    return {
      label: "Record or write your self-introduction.",
      why:
        "Inglevo needs a first interview practice to measure your English Communication and Interview Readiness.",
      href: "/app/interview",
      cta: "Start interview practice",
    };
  }

  if (!setupDone) {
    return {
      label: "Complete your remote setup check.",
      why:
        "Companies care about communication and reliability. Setup Readiness is still untested.",
      href: "/app/readiness",
      cta: "Complete setup check",
    };
  }

  if (!writingCount) {
    return {
      label: "Complete one Async Writing assessment.",
      why:
        "Remote work is heavy on Slack, updates and follow-ups. Your writing readiness is still untested.",
      href: "/app/improve/async-writing",
      cta: "Assess async writing",
    };
  }

  if (!assetsCount) {
    return {
      label: "Generate your first job application asset.",
      why:
        "You are practicing, but you still need materials you can actually use to apply.",
      href: "/app/remote-jobs",
      cta: "Create job asset",
    };
  }

  if (area && (area.score ?? 0) < 75) {
    return {
      label: area.recommendation,
      why: `${area.name} is your current lowest readiness area at ${area.score}/100.`,
      href:
        area.id === "asyncWriting"
          ? "/app/improve/async-writing"
          : area.id === "remoteJobAssets"
            ? "/app/remote-jobs"
            : "/app/interview",
      cta: "Improve this area",
    };
  }

  return {
    label: "Prepare your next recruiter or salary asset.",
    why:
      "Your core readiness signals are improving. Now turn that progress into application materials.",
    href: "/app/remote-jobs",
    cta: "Prepare applications",
  };
}

export default async function DashboardPage() {
  const [
    { profile },
    sessions,
    setupCheck,
    writingAssessments,
    remoteJobAssets,
    readinessAssessments,
  ] = await Promise.all([
    getViewer(),
    getPracticeSessions(),
    getSetupCheck(),
    getWritingAssessments(),
    getRemoteJobAssets(),
    getReadinessAssessments(),
  ]);

  const average =
    sessions.length > 0
      ? Math.round(
          sessions.reduce((sum, session) => sum + (session.overall_score ?? 0), 0) /
            sessions.length
        )
      : 0;

  const areaScores = calculateAreaScores(
    sessions,
    setupCheck,
    writingAssessments,
    remoteJobAssets,
    readinessAssessments
  );
  const readiness = calculateReadinessScore(areaScores);
  const readinessStatus = getReadinessStatus(readiness);
  const nextStep = getRecommendedNextStep(areaScores, sessions.length);
  const onboardingPath = profile.recommended_path;
  const primaryPathHref = onboardingPath ? pathHref[onboardingPath] : "/app/improve";
  const nextBestAction = getNextBestAction({
    areaScores,
    sessionsCount: sessions.length,
    assetsCount: remoteJobAssets.length,
    writingCount: writingAssessments.length,
    setupDone: Boolean(setupCheck),
  });
  const readinessGap = getReadinessGap(readiness);
  const areasWithScores = areaScores.filter((area) => area.score !== null);
  const latestAssets = remoteJobAssets.slice(0, 4);
  const latestPractices = sessions.slice(0, 4);
  const certificate = getCertificateEligibility({
    profile,
    sessions,
    writingAssessments,
    setupCheck,
  });

  return (
    <div className="mx-auto grid max-w-6xl gap-6">
      <section className="hero-panel">
        <p className="section-kicker">
          Your Job English Path
        </p>
        <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="page-title">
              Welcome, {profile.full_name ?? "professional"}.
            </h1>
            <p className="page-copy mt-3">
              Your path combines role English, tool simulations, remote setup,
              certificate progress and applications for USD remote jobs.
            </p>
          </div>
          <Button asChild>
            <Link href={primaryPathHref}>
              {onboardingPath ? `Continue: ${onboardingPath}` : "Continue English Trainer"}
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/app/job-crm">Manage Job CRM</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            label: "English Trainer",
            copy: "Train role English, interviews, speaking and async writing.",
            href: "/app/ai-trainer",
            icon: BookOpen,
          },
          {
            label: "My Certificate",
            copy: "Track English, tools, setup and professionalism signals.",
            href: "/app/certificate",
            icon: Award,
          },
          {
            label: "Resume Builder",
            copy: "Build CV bullets, LinkedIn copy and application assets.",
            href: "/app/resume",
            icon: FileText,
          },
          {
            label: "Job CRM",
            copy: "Manage saved roles, follow-ups, interviews and salary notes.",
            href: "/app/job-crm",
            icon: ClipboardList,
          },
          {
            label: "Remote Opportunities",
            copy: "Find roles aligned with your English, tools and certificate path.",
            href: "/app/opportunities",
            icon: Compass,
          },
          {
            label: "Career Library",
            copy: "Use templates, scripts, guides and job search tools.",
            href: "/app/library",
            icon: BriefcaseBusiness,
          },
        ].map((item) => (
          <Link key={item.href} href={item.href} className="premium-card p-5 transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#d0f5e3] text-black">
                <item.icon className="size-5" />
              </div>
              <ArrowRight className="size-4 text-muted-foreground" />
            </div>
            <h2 className="mt-4 font-semibold">{item.label}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.copy}</p>
          </Link>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_340px]">
        <div className="ink-panel">
          <div className="flex items-center gap-2 text-sm font-medium text-background/70">
            <Target className="size-4" />
            Next best step
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            {nextBestAction.label}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-background/70">
            Why: {nextBestAction.why}
          </p>
          <Button asChild variant="secondary" className="mt-5">
            <Link href={nextBestAction.href}>
              {nextBestAction.cta}
              <ArrowRight />
            </Link>
          </Button>
        </div>

        <div className="premium-panel">
          <div className="flex items-center gap-5">
            <ScoreRing score={readiness} label="Score" size="sm" />
            <div>
              <p className="section-kicker">Remote Readiness</p>
              <p className="mt-2 font-semibold">{readinessStatus.label}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {readinessGap}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard label="Main goal" value={profile.main_goal ?? "Remote work"} />
        <MetricCard label="English level" value={profile.english_level ?? "B1"} />
        <MetricCard
          label="Recommended path"
          value={onboardingPath ?? "Improve English"}
          detail={profile.applying_remote_jobs ?? "Based on onboarding"}
        />
        <MetricCard
          label="Remote Readiness"
          value={readiness === null ? "Pending" : `${readiness}/100`}
          detail={readinessStatus.label}
        />
        <MetricCard label="Practices completed" value={sessions.length} />
      </section>

      <section className="premium-panel">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-4">
            <div className="certificate-seal size-14 shrink-0">
              <Award className="size-6" />
            </div>
            <div>
              <p className="section-kicker">Certificate progress</p>
              <h2 className="mt-1 text-2xl font-semibold">
                {certificate.unlocked
                  ? "Certificate unlocked"
                  : "Build toward Remote Work Ready"}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {Math.min(sessions.length, 3)}/3 practices completed · Current
                score: {certificate.averageScore ?? "Pending"} ·{" "}
                {certificate.unlocked ? "Unlocked" : "Locked"}
              </p>
            </div>
          </div>
          <Button asChild variant={certificate.unlocked ? "default" : "outline"}>
            <Link href="/app/certificate">
              View certificate progress
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>

      <section className="premium-panel">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">
              Progress by area
            </p>
            <h2 className="mt-1 text-xl font-semibold">What is moving you toward Remote Ready</h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/app/readiness">View full readiness</Link>
          </Button>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {areaScores.map((area) => (
            <div key={area.id} className="rounded-xl border border-border/80 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{area.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{area.confidence.replace("_", " ")}</p>
                </div>
                <span className="rounded-full bg-muted px-3 py-1 text-sm">
                  {area.score === null ? "Pending" : `${area.score}/100`}
                </span>
              </div>
              <div className="soft-progress mt-3">
                <div
                  className="soft-progress-fill"
                  style={{ width: `${area.score ?? 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        {!areasWithScores.length ? (
          <p className="mt-4 text-sm text-muted-foreground">
            Complete your first interview practice to start filling this control center.
          </p>
        ) : null}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="premium-panel">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">Latest practices</h2>
            <span className="text-sm text-muted-foreground">
              Average score: {average || "N/A"}
            </span>
          </div>
          <div className="mt-5 grid gap-3">
            <div className="rounded-xl border border-border bg-muted/40 p-4">
              <p className="text-sm font-medium text-muted-foreground">
                Recommended next step
              </p>
              <p className="mt-1 font-semibold">{nextStep.label}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {nextStep.description}
              </p>
              <Button asChild variant="outline" className="mt-4">
                <Link href={nextStep.href}>Continue</Link>
              </Button>
            </div>
            {latestPractices.length ? (
              latestPractices.map((session) => (
                <div
                  key={session.id}
                  className="rounded-xl border border-border bg-muted/40 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium">{session.scenario}</p>
                    <span className="text-sm text-muted-foreground">
                      {session.overall_score ?? "-"} / 100
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {session.user_answer}
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-border p-6 text-muted-foreground">
                <p className="font-medium text-foreground">
                  Your first recommended practice
                </p>
                <p className="mt-2">
                  Practice “Tell me about yourself”. It is the foundation answer
                  for remote interviews and helps you explain your experience
                  with more structure.
                </p>
                <Button asChild className="mt-4">
                  <Link href="/app/interview">Start practice</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="premium-panel">
          <div className="flex items-center gap-2">
            <FileText className="size-5" />
            <h2 className="text-xl font-semibold">Latest assets</h2>
          </div>
          {latestAssets.length ? (
            <div className="mt-5 grid gap-3">
              {latestAssets.map((asset) => (
                <article key={asset.id} className="rounded-xl border border-border p-4">
                  <p className="font-medium">{asset.title}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                    {asset.type.replaceAll("_", " ")}
                  </p>
                  <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
                    {asset.content}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-xl border border-dashed border-border p-5 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">No job assets yet</p>
              <p className="mt-2">
                Generate a recruiter message, LinkedIn headline or salary script
                so practice becomes application material.
              </p>
              <Button asChild className="mt-4">
                <Link href="/app/remote-jobs">Create asset</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="premium-card p-5">
          <CheckCircle2 className="size-5 text-black" />
          <h2 className="mt-3 font-semibold">Strongest signal</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {areaScores
              .filter((area) => area.score !== null)
              .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))[0]?.name ??
              "Complete an assessment to reveal this."}
          </p>
        </div>
        <div className="premium-card p-5">
          <CircleAlert className="size-5 text-black" />
          <h2 className="mt-3 font-semibold">Needs attention</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {areaScores
              .filter((area) => area.score !== null)
              .sort((a, b) => (a.score ?? 0) - (b.score ?? 0))[0]?.name ??
              "No weak area yet."}
          </p>
        </div>
        <div className="premium-card p-5">
          <h2 className="font-semibold">Quick access</h2>
          <div className="mt-4 grid gap-2">
            {quickLinks.slice(0, 3).map((item) => (
              <Button key={item.href} asChild variant="outline" className="justify-start">
                <Link href={item.href}>
                  <item.icon />
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
