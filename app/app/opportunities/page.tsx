import { Award, BriefcaseBusiness, Target } from "lucide-react";

import { OpportunitiesBoard } from "@/components/opportunities/opportunities-board";
import { MetricCard } from "@/components/shared/metric-card";
import { remoteOpportunities } from "@/data/opportunities";
import { getCertificateEligibility } from "@/lib/certificate";
import {
  getPracticeSessions,
  getSavedOpportunities,
  getSetupCheck,
  getViewer,
  getWritingAssessments,
} from "@/lib/data";

function getRecommendedAction(score: number | null, certificateUnlocked: boolean) {
  if (score === null) {
    return "Complete your first practice to unlock opportunity matching.";
  }

  if (score < 70) {
    return "Improve Interview English and Async Writing before applying.";
  }

  if (score < 75) {
    return "You are close. Prepare one recruiter message and repeat an interview practice.";
  }

  if (!certificateUnlocked) {
    return "You are in range. Complete certificate requirements before sharing readiness.";
  }

  return "Prepare targeted application assets for roles marked Ready to apply.";
}

export default async function OpportunitiesPage() {
  const [{ user, profile }, sessions, writingAssessments, setupCheck, saved] =
    await Promise.all([
      getViewer(),
      getPracticeSessions(),
      getWritingAssessments(),
      getSetupCheck(),
      getSavedOpportunities(),
    ]);
  const certificate = getCertificateEligibility({
    profile,
    sessions,
    writingAssessments,
    setupCheck,
  });
  const readinessScore = certificate.averageScore;
  const readyCount =
    readinessScore === null
      ? 0
      : remoteOpportunities.filter(
          (opportunity) => readinessScore >= opportunity.requiredReadinessScore
        ).length;

  return (
    <div className="mx-auto grid max-w-6xl gap-6">
      <section className="hero-panel">
        <p className="section-kicker">Remote Opportunities</p>
        <div className="mt-2 grid gap-4 lg:grid-cols-[1fr_340px] lg:items-end">
          <div>
            <h1 className="page-title">Remote Opportunities</h1>
            <p className="page-copy mt-3">
              Find remote opportunities aligned with your English, profile,
              tools and role-specific communication skills.
            </p>
          </div>
          <div className="passport-panel rounded-2xl p-5">
            <p className="text-sm font-medium text-muted-foreground">
              Each opportunity can show the English, tools and communication
              skills expected for the role.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <MetricCard
          label="Current readiness"
          value={readinessScore === null ? "Pending" : `${readinessScore}/100`}
          detail={
            readinessScore === null
              ? "Complete your first practice to unlock opportunity matching."
              : `${readyCount} opportunities currently match your readiness.`
          }
        />
        <MetricCard
          label="Certificate status"
          value={certificate.unlocked ? "Unlocked" : "Locked"}
          detail={certificate.unlocked ? "Private certificate ready" : "Reach 3 practices and 75+"}
        />
        <MetricCard
          label="Saved opportunities"
          value={saved.length}
          detail="Stored privately for your account."
        />
      </section>

      <section className="ink-panel">
        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-background/70">
              <Target className="size-4" />
              Recommended next action
            </div>
            <h2 className="mt-2 text-2xl font-semibold">
              {getRecommendedAction(readinessScore, certificate.unlocked)}
            </h2>
          </div>
          <div className="flex gap-2 text-sm text-background/70">
            <BriefcaseBusiness className="size-5" />
            <span>{remoteOpportunities.length} curated examples</span>
            <Award className="size-5" />
          </div>
        </div>
      </section>

      <OpportunitiesBoard
        opportunities={remoteOpportunities}
        savedOpportunities={saved}
        readinessScore={readinessScore}
        certificateUnlocked={certificate.unlocked}
        userId={user?.id ?? null}
      />

      <p className="rounded-2xl border border-border bg-white p-4 text-sm leading-6 text-muted-foreground">
        Inglevo does not guarantee employment, interviews, income, visas,
        sponsorship, or job placement. Opportunities may come from third-party
        sources and should be verified before applying.
      </p>
    </div>
  );
}
