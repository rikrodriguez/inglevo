import Link from "next/link";
import { ArrowRight, CheckCircle2, CircleAlert, TrendingUp } from "lucide-react";

import { SetupCheck } from "@/components/readiness/setup-check";
import { AnalyticsEvent } from "@/components/shared/analytics-event";
import { MetricCard } from "@/components/shared/metric-card";
import { Button } from "@/components/ui/button";
import {
  getPracticeSessions,
  getReadinessAssessments,
  getRemoteJobAssets,
  getSetupCheck,
  getWritingAssessments,
} from "@/lib/data";
import { buildReadinessSummary } from "@/lib/readiness";

function confidenceLabel(confidence: "real" | "partial" | "not_assessed") {
  const labels = {
    real: "Real data",
    partial: "Partial estimate",
    not_assessed: "Not assessed",
  };

  return labels[confidence];
}

export default async function ReadinessPage() {
  const [
    sessions,
    setupCheck,
    writingAssessments,
    remoteJobAssets,
    readinessAssessments,
  ] = await Promise.all([
    getPracticeSessions(),
    getSetupCheck(),
    getWritingAssessments(),
    getRemoteJobAssets(),
    getReadinessAssessments(),
  ]);
  const summary = buildReadinessSummary(
    sessions,
    setupCheck,
    writingAssessments,
    remoteJobAssets,
    readinessAssessments
  );
  const scoreValue =
    summary.overallScore === null ? "Pending" : `${summary.overallScore}/100`;

  return (
    <div className="mx-auto grid max-w-6xl gap-6">
      <AnalyticsEvent
        event="readiness_viewed"
        properties={{
          overall_score: summary.overallScore,
          saved_practices: sessions.length,
          setup_completed: Boolean(setupCheck),
          writing_assessments: writingAssessments.length,
          job_assets: remoteJobAssets.length,
        }}
      />
      <section className="hero-panel">
        <p className="section-kicker">My Readiness</p>
        <div className="mt-2 grid gap-4 lg:grid-cols-[1fr_320px] lg:items-end">
          <div>
            <h1 className="page-title">
              My Remote Work Readiness
            </h1>
            <p className="page-copy mt-3">
              Track how ready you are to communicate, apply and work remotely in
              English. This score uses your saved practice data, not a generic quiz.
            </p>
          </div>
          <MetricCard
            label="Remote Readiness Score"
            value={scoreValue}
            detail={
              sessions.length === 0
                ? "Complete your first interview practice to start."
                : summary.status.label
            }
          />
        </div>
        <div className="mt-5 rounded-xl border border-dashed border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          Formula: English Communication 20%, Speaking Confidence 15%,
          Interview Readiness 25%, Async Writing 10%, Remote Job Assets 10%,
          Setup Readiness 5%, Professional Confidence 15%. {summary.dataNote}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <MetricCard
          label="Saved practices"
          value={sessions.length}
          detail="Only your own Supabase sessions are used."
        />
        <MetricCard
          label="Readiness level"
          value={summary.status.label}
          detail={summary.status.level}
        />
        <MetricCard
          label="Recent trend"
          value={summary.trend.value === null ? "Pending" : summary.trend.label}
          detail="Compares latest 3 practices with the previous 3."
        />
      </section>

      <section className="ink-panel">
        <p className="text-sm font-medium text-background/70">Recommended next step</p>
        <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">
              {summary.recommendedNextStep.label}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-background/70">
              {summary.recommendedNextStep.description}
            </p>
          </div>
          <Button asChild variant="secondary">
            <Link href={summary.recommendedNextStep.href}>
              Continue
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>

      <section className="premium-panel">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Employer angle
            </p>
            <h2 className="mt-1 text-2xl font-semibold">
              Candidate Readiness Report
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Preview how your readiness could be summarized for recruiters:
              spoken English, async writing, interview readiness, setup readiness
              and reliability signals.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link href="/app/readiness/report">View private report</Link>
            </Button>
            <Button asChild>
              <Link href="/app/certificate">Check certificate eligibility</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/app/opportunities">
                See opportunities that match your readiness
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="premium-panel">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-5 text-black" />
            <h2 className="text-xl font-semibold">Strong</h2>
          </div>
          {summary.strongAreas.length ? (
            <div className="mt-4 grid gap-3">
              {summary.strongAreas.map((area) => (
                <div key={area.id} className="rounded-xl border border-border/80 bg-white p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium">{area.name}</p>
                    <span className="rounded-full bg-[#d0f5e3] px-3 py-1 text-sm text-black">
                      {area.score}/100
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{area.evidence}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              Complete more practice sessions to identify strong areas.
            </p>
          )}
        </div>

        <div className="premium-panel">
          <div className="flex items-center gap-2">
            <CircleAlert className="size-5 text-black" />
            <h2 className="text-xl font-semibold">Needs work</h2>
          </div>
          {summary.needsWorkAreas.length ? (
            <div className="mt-4 grid gap-3">
              {summary.needsWorkAreas.map((area) => (
                <div key={area.id} className="rounded-xl border border-border/80 bg-white p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium">{area.name}</p>
                    <span className="rounded-full bg-[#dfdbd6] px-3 py-1 text-sm text-black">
                      {area.score}/100
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {area.recommendation}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              No weak areas detected yet. Keep practicing to make the score more reliable.
            </p>
          )}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {summary.areas.map((area) => (
          <article
            key={area.id}
            className="premium-card p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">{area.name}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {area.description}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-muted px-3 py-1 text-sm">
                {area.score === null ? "Not assessed yet" : `${area.score}/100`}
              </span>
            </div>
            <div className="mt-4 rounded-xl border border-border bg-muted/40 p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {confidenceLabel(area.confidence)}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{area.evidence}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="premium-panel">
        <div className="flex items-center gap-2">
          <TrendingUp className="size-5 text-black" />
          <h2 className="text-xl font-semibold">Progress history</h2>
        </div>
        {summary.history.length ? (
          <div className="mt-5 grid gap-3">
            {summary.history.map((item, index) => (
              <div key={`${item.label}-${item.scenario}-${index}`}>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="truncate text-muted-foreground">
                    {item.label} · {item.scenario}
                  </span>
                  <span className="font-medium">{item.score}/100</span>
                </div>
                <div className="soft-progress mt-2">
                  <div
                    className="soft-progress-fill"
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">
            Your progress chart will appear after your first saved practice.
          </p>
        )}
      </section>

      <section className="premium-panel">
        <h2 className="text-xl font-semibold">Readiness assessments</h2>
        {summary.assessmentHistory.length ? (
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {summary.assessmentHistory.map((item, index) => (
              <article
                key={`${item.type}-${item.label}-${index}`}
                className="rounded-xl border border-border p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium capitalize">
                      {item.type.replaceAll("_", " ")}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.label} · {item.status}
                    </p>
                  </div>
                  <span className="rounded-full bg-muted px-3 py-1 text-sm">
                    {item.score}/100
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">
            Complete interview, async writing or setup checks to create separate
            readiness assessment records.
          </p>
        )}
      </section>

      <SetupCheck initialCheck={setupCheck} />
    </div>
  );
}
