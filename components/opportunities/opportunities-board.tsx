"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bookmark, ExternalLink, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { RemoteOpportunity, SavedOpportunity } from "@/types";

type FitState = {
  label: "Ready to apply" | "Almost ready" | "Improve readiness first";
  tone: string;
  detail: string;
};

function getFitState(
  score: number | null,
  requiredReadinessScore: number
): FitState {
  if (score === null) {
    return {
      label: "Improve readiness first",
      tone: "bg-slate-100 text-slate-700",
      detail: "Complete your first practice to unlock opportunity matching.",
    };
  }

  if (score >= requiredReadinessScore) {
    return {
      label: "Ready to apply",
      tone: "border border-[#d0f5e3] bg-[#d0f5e3] text-black",
      detail: "Your current readiness meets this opportunity threshold.",
    };
  }

  if (score >= requiredReadinessScore - 10) {
    return {
      label: "Almost ready",
      tone: "border border-[#dfdbd6] bg-[#dfdbd6] text-black",
      detail: "You are close. Prepare your application and repeat one practice.",
    };
  }

  return {
    label: "Improve readiness first",
    tone: "border border-[#dfdbd6] bg-[#dfdbd6] text-black",
    detail: "Build readiness before applying to this type of role.",
  };
}

function unique(values: string[]) {
  return ["All", ...Array.from(new Set(values))];
}

export function OpportunitiesBoard({
  opportunities,
  savedOpportunities,
  readinessScore,
  certificateUnlocked,
  userId,
}: {
  opportunities: RemoteOpportunity[];
  savedOpportunities: SavedOpportunity[];
  readinessScore: number | null;
  certificateUnlocked: boolean;
  userId: string | null;
}) {
  const [roleCategory, setRoleCategory] = useState("All");
  const [englishLevel, setEnglishLevel] = useState("All");
  const [salaryRange, setSalaryRange] = useState("All");
  const [readinessRequired, setReadinessRequired] = useState("All");
  const [jobType, setJobType] = useState("All");
  const [selectedOpportunity, setSelectedOpportunity] =
    useState<RemoteOpportunity | null>(null);
  const [savedIds, setSavedIds] = useState(
    () => new Set(savedOpportunities.map((item) => item.opportunity_id))
  );
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      opportunities.filter((opportunity) => {
        const readinessBucket =
          opportunity.requiredReadinessScore >= 80
            ? "80+"
            : opportunity.requiredReadinessScore >= 75
              ? "75+"
              : "Under 75";

        return (
          (roleCategory === "All" || opportunity.roleCategory === roleCategory) &&
          (englishLevel === "All" ||
            opportunity.requiredEnglishLevel === englishLevel) &&
          (salaryRange === "All" || opportunity.salaryRange === salaryRange) &&
          (readinessRequired === "All" || readinessBucket === readinessRequired) &&
          (jobType === "All" || opportunity.type === jobType)
        );
      }),
    [englishLevel, jobType, opportunities, readinessRequired, roleCategory, salaryRange]
  );

  async function toggleSave(opportunityId: string) {
    const nextSavedIds = new Set(savedIds);
    const isSaved = nextSavedIds.has(opportunityId);

    if (isSaved) {
      nextSavedIds.delete(opportunityId);
    } else {
      nextSavedIds.add(opportunityId);
    }

    setSavedIds(nextSavedIds);
    setSaveMessage(null);

    if (!userId) {
      setSaveMessage("Saved locally for this browser session.");
      return;
    }

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setSaveMessage("Connect Supabase to save opportunities.");
      return;
    }

    const { error } = isSaved
      ? await supabase
          .from("saved_opportunities")
          .delete()
          .eq("user_id", userId)
          .eq("opportunity_id", opportunityId)
      : await supabase.from("saved_opportunities").insert({
          user_id: userId,
          opportunity_id: opportunityId,
          status: "saved",
        });

    if (error) {
      setSavedIds(savedIds);
      setSaveMessage(
        "Could not save yet. Apply migration 010_saved_opportunities.sql in Supabase."
      );
      return;
    }

    setSaveMessage(isSaved ? "Opportunity removed." : "Opportunity saved.");
  }

  return (
    <div className="grid gap-6">
      <section className="premium-panel">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-5 text-muted-foreground" />
          <h2 className="text-xl font-semibold">Filters</h2>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-5">
          <FilterSelect
            label="Role category"
            value={roleCategory}
            onChange={setRoleCategory}
            options={unique(opportunities.map((item) => item.roleCategory))}
          />
          <FilterSelect
            label="English level"
            value={englishLevel}
            onChange={setEnglishLevel}
            options={unique(opportunities.map((item) => item.requiredEnglishLevel))}
          />
          <FilterSelect
            label="Salary range"
            value={salaryRange}
            onChange={setSalaryRange}
            options={unique(opportunities.map((item) => item.salaryRange))}
          />
          <FilterSelect
            label="Readiness required"
            value={readinessRequired}
            onChange={setReadinessRequired}
            options={["All", "Under 75", "75+", "80+"]}
          />
          <FilterSelect
            label="Job type"
            value={jobType}
            onChange={setJobType}
            options={unique(opportunities.map((item) => item.type))}
          />
        </div>
        {saveMessage ? (
          <p className="mt-4 text-sm text-muted-foreground">{saveMessage}</p>
        ) : null}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-4">
          {filtered.map((opportunity) => {
            const fit = getFitState(
              readinessScore,
              opportunity.requiredReadinessScore
            );
            const isSaved = savedIds.has(opportunity.id);

            return (
              <article key={opportunity.id} className="premium-card motion-rise p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${fit.tone}`}>
                        {fit.label}
                      </span>
                      <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                        {opportunity.sourceLabel}
                      </span>
                    </div>
                    <h2 className="mt-3 text-xl font-semibold">
                      {opportunity.title}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {opportunity.company} · {opportunity.location} ·{" "}
                      {opportunity.type}
                    </p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="mono-stat text-lg font-semibold">
                      {opportunity.salaryRange}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      English {opportunity.requiredEnglishLevel} · Readiness{" "}
                      {opportunity.requiredReadinessScore}+
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {opportunity.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {opportunity.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-white px-3 py-1 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="mt-4 rounded-xl border border-border bg-muted/40 p-3 text-sm text-muted-foreground">
                  {fit.detail}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Button
                    type="button"
                    onClick={() => setSelectedOpportunity(opportunity)}
                  >
                    Prepare application
                    <ArrowRight />
                  </Button>
                  <Button
                    type="button"
                    variant={isSaved ? "default" : "outline"}
                    onClick={() => void toggleSave(opportunity.id)}
                  >
                    <Bookmark />
                    {isSaved ? "Saved" : "Save opportunity"}
                  </Button>
                  <Button asChild variant="outline">
                    <a
                      href={opportunity.externalUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View source
                      <ExternalLink />
                    </a>
                  </Button>
                </div>
              </article>
            );
          })}
        </div>

        <ApplicationPrepKit
          opportunity={selectedOpportunity ?? filtered[0] ?? opportunities[0]}
          readinessScore={readinessScore}
          certificateUnlocked={certificateUnlocked}
        />
      </section>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-xl border border-border bg-white px-3 text-sm outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function ApplicationPrepKit({
  opportunity,
  readinessScore,
  certificateUnlocked,
}: {
  opportunity: RemoteOpportunity;
  readinessScore: number | null;
  certificateUnlocked: boolean;
}) {
  const fit = getFitState(readinessScore, opportunity.requiredReadinessScore);

  return (
    <aside className="premium-panel h-fit lg:sticky lg:top-24">
        <p className="section-kicker">Application Prep Kit</p>
      <h2 className="mt-2 text-2xl font-semibold">{opportunity.title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Use Inglevo to prepare before applying. This is not an automatic
        application.
      </p>

      <div className="mt-5 rounded-xl border border-[#dfdbd6] bg-[#dfdbd6] p-4">
        <p className="text-sm font-medium">Suggested recruiter message</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Hi [Name], I saw the {opportunity.title} role and wanted to reach out.
          I have experience related to {opportunity.skills.slice(0, 2).join(" and ")}
          , and I am preparing to communicate clearly with remote teams in
          English. I would be happy to share more context about my fit.
        </p>
      </div>

      <div className="mt-4 rounded-xl border border-border bg-white p-4">
        <p className="text-sm font-medium">Interview questions to practice</p>
        <ul className="mt-2 grid gap-2 text-sm text-muted-foreground">
          <li>Tell me about yourself.</li>
          <li>Why are you a good fit for this remote role?</li>
          <li>How do you communicate blockers in a remote team?</li>
        </ul>
      </div>

      <div className="mt-4 rounded-xl border border-border bg-white p-4">
        <p className="text-sm font-medium">Recommended Inglevo practice</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {fit.label === "Ready to apply"
            ? "Prepare recruiter message and salary script before applying."
            : "Repeat Interview English and complete Async Writing before applying."}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button asChild size="sm">
            <Link href="/app/interview">Practice interview</Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link href="/app/remote-jobs">Build asset</Link>
          </Button>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-[#d0f5e3] bg-[#d0f5e3] p-4 text-sm text-black">
        <p className="font-medium">Certificate suggestion</p>
        <p className="mt-2">
          {certificateUnlocked
            ? "Your private certificate is unlocked. Keep it ready for future shareable reports."
            : "Unlock your Inglevo Certificate before sharing readiness with recruiters."}
        </p>
      </div>
    </aside>
  );
}
