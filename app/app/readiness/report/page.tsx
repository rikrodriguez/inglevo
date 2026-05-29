import Link from "next/link";
import { BadgeCheck, Lock, ShieldCheck } from "lucide-react";

import { MetricCard } from "@/components/shared/metric-card";
import { Button } from "@/components/ui/button";
import {
  getPracticeSessions,
  getReadinessAssessments,
  getRemoteJobAssets,
  getSetupCheck,
  getViewer,
  getWritingAssessments,
} from "@/lib/data";
import { buildReadinessSummary, type ReadinessAreaScore } from "@/lib/readiness";

function findArea(areas: ReadinessAreaScore[], id: ReadinessAreaScore["id"]) {
  return areas.find((area) => area.id === id);
}

function average(values: Array<number | null | undefined>) {
  const valid = values.filter((value): value is number => typeof value === "number");

  if (!valid.length) {
    return null;
  }

  return Math.round(valid.reduce((sum, value) => sum + value, 0) / valid.length);
}

function scoreText(score: number | null | undefined) {
  return typeof score === "number" ? `${score}/100` : "Pending";
}

export default async function CandidateReadinessReportPage() {
  const [
    viewer,
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
  const summary = buildReadinessSummary(
    sessions,
    setupCheck,
    writingAssessments,
    remoteJobAssets,
    readinessAssessments
  );
  const spokenEnglish = findArea(summary.areas, "speakingConfidence");
  const asyncWriting = findArea(summary.areas, "asyncWriting");
  const interviewReadiness = findArea(summary.areas, "interviewReadiness");
  const setupReadiness = findArea(summary.areas, "setupReadiness");
  const reliability = average([
    findArea(summary.areas, "professionalConfidence")?.score,
    setupReadiness?.score,
    remoteJobAssets.length ? Math.min(60 + remoteJobAssets.length * 8, 100) : null,
  ]);
  const badgeEligible =
    typeof summary.overallScore === "number" && summary.overallScore >= 75;
  const reportRows = [
    {
      label: "Spoken English",
      score: spokenEnglish?.score ?? null,
      evidence: spokenEnglish?.evidence ?? "No spoken practice yet.",
    },
    {
      label: "Async Writing",
      score: asyncWriting?.score ?? null,
      evidence: asyncWriting?.evidence ?? "No async writing assessment yet.",
    },
    {
      label: "Interview Readiness",
      score: interviewReadiness?.score ?? null,
      evidence: interviewReadiness?.evidence ?? "No interview practice yet.",
    },
    {
      label: "Setup Readiness",
      score: setupReadiness?.score ?? null,
      evidence: setupReadiness?.evidence ?? "No setup check yet.",
    },
    {
      label: "Reliability",
      score: reliability,
      evidence:
        reliability === null
          ? "Needs setup, practice and job asset data."
          : "Estimated from professional confidence, setup readiness and saved job assets.",
    },
  ];

  return (
    <div className="mx-auto grid max-w-6xl gap-6">
      <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Candidate Readiness Report
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              {viewer.profile.full_name ?? viewer.profile.email}
            </h1>
            <p className="mt-2 max-w-3xl text-muted-foreground">
              Private report preview for remote English readiness. Public sharing
              is disabled until the candidate explicitly chooses to share it.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-muted/40 p-4">
            <div className="flex items-center gap-2">
              {badgeEligible ? (
                <BadgeCheck className="size-5 text-black" />
              ) : (
                <Lock className="size-5 text-muted-foreground" />
              )}
              <p className="font-semibold">
                {badgeEligible ? "Inglevo Remote Ready" : "Badge pending"}
              </p>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {badgeEligible
                ? "Candidate has reached the current readiness threshold."
                : "Reach 75/100 to unlock the badge preview."}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <MetricCard
          label="Remote Readiness Score"
          value={scoreText(summary.overallScore)}
          detail={summary.status.label}
        />
        <MetricCard
          label="Practices"
          value={sessions.length}
          detail="Saved interview practices"
        />
        <MetricCard
          label="Job assets"
          value={remoteJobAssets.length}
          detail="Saved application materials"
        />
      </section>

      <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Report by area</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {reportRows.map((row) => (
            <article key={row.label} className="rounded-2xl border border-border p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold">{row.label}</h3>
                <span className="rounded-full bg-muted px-3 py-1 text-sm">
                  {scoreText(row.score)}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {row.evidence}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-foreground p-6 text-background shadow-sm">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-5" />
          <h2 className="text-xl font-semibold">Employer sharing status</h2>
        </div>
        <p className="mt-3 max-w-3xl text-sm text-background/70">
          This report is currently private. A public shareable profile and employer
          verification workflow should be added later with explicit candidate
          consent, privacy controls and share expiration.
        </p>
        <Button asChild variant="secondary" className="mt-5">
          <Link href="/app/readiness">Back to My Readiness</Link>
        </Button>
      </section>
    </div>
  );
}
