"use client";

import { ArrowRight, Check, Clock, DollarSign, TrendingUp } from "lucide-react";
import { useState } from "react";

type CalculatorMode = "talent" | "employer";

const talentMetrics = [
  {
    label: "Certification investment",
    value: "$245",
    detail: "one-time path",
  },
  {
    label: "Possible US remote salary",
    value: "$50,000+/yr",
    detail: "premium role potential",
  },
  {
    label: "Potential monthly upside",
    value: "$800+",
    detail: "vs many local roles",
  },
] as const;

const employerMetrics = [
  {
    label: "Screening time saved",
    value: "15-30 hrs",
    detail: "per role, before interviews",
  },
  {
    label: "Better shortlists",
    value: "3-5x",
    detail: "more focused candidate review",
  },
  {
    label: "Hiring waste reduced",
    value: "$1k+",
    detail: "by avoiding weak interviews",
  },
] as const;

export function InvestmentCalculator() {
  const [mode, setMode] = useState<CalculatorMode>("talent");
  const isTalent = mode === "talent";
  const metrics = isTalent ? talentMetrics : employerMetrics;

  return (
    <section className="bg-[#f4f2ef] px-4 pb-20 sm:px-6">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-black/5 bg-white p-6 shadow-[0_24px_90px_rgba(30,27,75,0.07)] sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Opportunity calculator
            </p>
            <h2 className="mt-5 text-4xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-5xl">
              See why verification can be a high-leverage move.
            </h2>
            <p className="mt-5 text-lg leading-8 text-neutral-600">
              These are illustrative examples, not guarantees. The point is
              simple: stronger signals can make both candidates and hiring
              teams move with more confidence.
            </p>

            <div className="mt-7 flex w-fit rounded-full border border-black/10 bg-[#f8f8f7] p-1 shadow-sm">
              {(["talent", "employer"] as CalculatorMode[]).map((key) => {
                const active = mode === key;

                return (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setMode(key)}
                    className={`rounded-full px-5 py-2 text-sm font-semibold capitalize transition ${
                      active
                        ? "bg-[linear-gradient(135deg,#6f45dd,#5fb7f7,#e65dbb)] text-white shadow-sm"
                        : "text-neutral-600 hover:text-black"
                    }`}
                  >
                    {key}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-[1.7rem] bg-[#f8f8f7] p-4">
            <div
              key={mode}
              className="rounded-[1.4rem] border border-black/10 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    {isTalent ? "For talent" : "For employers"}
                  </p>
                  <h3 className="mt-2 text-3xl font-semibold tracking-[-0.055em]">
                    {isTalent
                      ? "$245 vs stronger USD opportunities"
                      : "Fewer interviews, stronger candidate signals"}
                  </h3>
                </div>
                <span className="grid size-12 place-items-center rounded-full bg-[#d0f5e3] text-emerald-700">
                  {isTalent ? <DollarSign className="size-5" /> : <Clock className="size-5" />}
                </span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-3xl border border-black/5 bg-[#fbfbfa] p-4"
                  >
                    <p className="text-sm font-medium text-neutral-500">
                      {metric.label}
                    </p>
                    <p className="mt-3 text-3xl font-semibold tracking-[-0.06em]">
                      {metric.value}
                    </p>
                    <p className="mt-2 text-xs font-medium text-neutral-500">
                      {metric.detail}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-3xl bg-[linear-gradient(135deg,#7459f6,#5fb7f7_48%,#de61bf)] p-5 text-white">
                <div className="flex items-start gap-3">
                  <TrendingUp className="mt-1 size-5 shrink-0" />
                  <div>
                    <p className="text-xl font-semibold tracking-[-0.04em]">
                      {isTalent
                        ? "Invest $245 to compete for remote roles that can reach USD $50,000+ per year in stronger US opportunities."
                        : "If verification removes even five weak interviews, your team can recover hours of founder, recruiter and manager time."}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-white/75">
                      {isTalent
                        ? "No salary is guaranteed. Inglevo helps you build a more credible profile for higher-value remote opportunities."
                        : "Employer access is custom. Inglevo is designed to reduce screening friction before the first interview."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {(isTalent
                  ? ["Build a verified profile", "Use it in CV, LinkedIn and applications"]
                  : ["Pre-check English, setup and role signals", "Spend interviews on better-fit candidates"]
                ).map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm font-semibold">
                    <Check className="size-4 text-emerald-600" />
                    {item}
                  </div>
                ))}
              </div>

              <a
                href={isTalent ? "/signup" : "/employers"}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:bg-black/90"
              >
                {isTalent ? "Start verification" : "Talk to hiring team"}
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
