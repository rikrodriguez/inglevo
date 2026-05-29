"use client";

import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";

const comparisons = {
  talent: {
    label: "LATAM Talent",
    title: "The old way vs the new way for LATAM talent.",
    oldTitle: "Traditional applicant",
    newTitle: "Inglevo Verified talent",
    oldWay: [
      "Apply with a generic CV",
      "Claim “advanced English”",
      "No setup proof",
      "No tool familiarity signal",
      "No active verification profile",
    ],
    newWay: [
      "Apply with a verified profile",
      "Show English for your role",
      "Show remote setup checked",
      "Show role tools checked",
      "Use an active public verification link",
    ],
  },
  employer: {
    label: "Employer",
    title: "The old way vs the new way for hiring LATAM talent.",
    oldTitle: "Traditional hiring",
    newTitle: "Inglevo verified hiring",
    oldWay: [
      "Review generic resumes",
      "Trust self-reported English levels",
      "Discover setup issues late",
      "Spend interviews checking basics",
      "No verified role signals before the call",
    ],
    newWay: [
      "Filter candidates with verified profiles",
      "See role English signals before interviews",
      "Check remote setup upfront",
      "Review role tools familiarity",
      "Interview fewer, stronger candidates",
    ],
  },
} as const;

type Audience = keyof typeof comparisons;

export function OldNewWayToggle() {
  const [audience, setAudience] = useState<Audience>("talent");
  const active = comparisons[audience];

  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-black/5 bg-white p-7 shadow-[0_24px_90px_rgba(30,27,75,0.065)] sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Old way / New way
            </p>
            <h2 className="mt-5 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.065em] sm:text-6xl">
              {active.title}
            </h2>
          </div>
          <div className="flex w-fit rounded-full border border-black/10 bg-[#f8f8f7] p-1 shadow-sm">
            {(Object.keys(comparisons) as Audience[]).map((key) => {
              const isActive = audience === key;

              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setAudience(key)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-[linear-gradient(135deg,#6f45dd,#5fb7f7,#e65dbb)] text-white shadow-sm"
                      : "text-neutral-600 hover:text-black"
                  }`}
                >
                  {comparisons[key].label}
                </button>
              );
            })}
          </div>
        </div>

        <div key={audience} className="mt-10 overflow-hidden rounded-[1.7rem] border border-black/10 bg-[#f8f8f7]">
          <div className="grid border-b border-black/10 bg-white text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500 lg:grid-cols-[1fr_80px_1fr]">
            <div className="px-5 py-4">{active.oldTitle}</div>
            <div className="hidden px-5 py-4 text-center lg:block">vs</div>
            <div className="px-5 py-4">{active.newTitle}</div>
          </div>
          <div className="grid gap-px bg-black/10">
            {active.oldWay.map((oldItem, index) => (
              <ComparisonRow
                key={oldItem}
                oldItem={oldItem}
                newItem={active.newWay[index]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonRow({ oldItem, newItem }: { oldItem: string; newItem: string }) {
  return (
    <div className="grid gap-px bg-black/10 lg:grid-cols-[1fr_80px_1fr]">
      <div className="flex items-center gap-4 bg-white px-5 py-5 text-sm font-semibold text-neutral-700">
        <span className="grid size-7 shrink-0 place-items-center rounded-full border border-black/10 bg-[#f8f8f7]">
          <Check className="size-4 text-neutral-500" />
        </span>
        {oldItem}
      </div>
      <div className="hidden place-items-center bg-white lg:grid">
        <span className="grid size-9 place-items-center rounded-full bg-[#f4f2ef] text-neutral-500">
          <ArrowRight className="size-4" />
        </span>
      </div>
      <div className="flex items-center gap-4 bg-[linear-gradient(135deg,#7b5ff4,#5fb7f7_48%,#d95dbc)] px-5 py-5 text-sm font-semibold text-white">
        <span className="grid size-7 shrink-0 place-items-center rounded-full border border-white/20 bg-white/20">
          <Check className="size-4" />
        </span>
        {newItem}
      </div>
    </div>
  );
}
