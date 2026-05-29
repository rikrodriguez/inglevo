"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const comparisons = {
  talent: {
    label: "LATAM Talent",
    title: "The old way vs the new way for LATAM talent.",
    old: [
      "Apply with a generic CV",
      "Claim “advanced English”",
      "No setup proof",
      "No tool familiarity signal",
      "No active verification profile",
    ],
    new: [
      "Apply with a verified profile",
      "Show English for your role",
      "Show remote setup checked",
      "Show role tools checked",
      "Use an active public verification link",
    ],
  },
  employer: {
    label: "Employer",
    title: "The old way vs the new way for employers.",
    old: [
      "Review hundreds of cold resumes",
      "Guess communication quality",
      "Discover setup issues late",
      "Waste interviews on weak fit",
      "Filter by claims instead of signals",
    ],
    new: [
      "Filter pre-checked candidates",
      "See role English signals earlier",
      "Review setup and tool signals",
      "Spend calls on stronger candidates",
      "Use verified profiles for context",
    ],
  },
} as const;

type Audience = keyof typeof comparisons;

export function OldNewComparison() {
  const [audience, setAudience] = useState<Audience>("talent");
  const active = comparisons[audience];

  return (
    <div className="mt-12 rounded-[2.6rem] border border-black/5 bg-white p-5 shadow-[0_24px_90px_rgba(7,9,12,0.07)] sm:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="section-kicker">Old way / New way</p>
          <h3 className="mt-3 max-w-2xl text-4xl font-semibold tracking-[-0.05em]">
            {active.title}
          </h3>
        </div>
        <div className="flex rounded-full border border-border bg-[#f8f8f7] p-1">
          {(Object.keys(comparisons) as Audience[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setAudience(key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                audience === key ? "click-gradient-button text-white" : "text-muted-foreground hover:text-black"
              }`}
            >
              {comparisons[key].label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <ComparisonColumn title="The old way" items={active.old} />
        <ComparisonColumn title="The new way" items={active.new} featured />
      </div>
    </div>
  );
}

function ComparisonColumn({
  title,
  items,
  featured = false,
}: {
  title: string;
  items: readonly string[];
  featured?: boolean;
}) {
  return (
    <div className={`rounded-[2rem] border p-5 ${featured ? "click-feature-card border-white/25" : "border-border bg-[#f8f8f7]"}`}>
      <p className={`text-sm font-semibold uppercase tracking-[0.14em] ${featured ? "text-white/70" : "text-muted-foreground"}`}>
        {title}
      </p>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div key={item} className={`flex items-center gap-3 rounded-2xl p-4 text-sm font-semibold ${featured ? "bg-white/15 text-white" : "bg-white text-black"}`}>
            <CheckCircle2 className="size-4" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
