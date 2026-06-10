import Link from "next/link";
import { ArrowRight, Check, Search } from "lucide-react";

import { Button } from "@/components/ui/button";

const filters = ["English 80+", "Setup verified", "Role match", "EST overlap"] as const;

const candidates = [
  ["Ana Torres", "Customer Support", "84/100"],
  ["Mateo Ruiz", "Project Manager", "81/100"],
  ["Camila Vega", "Sales Rep", "78/100"],
] as const;

function CandidateAvatar({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      aria-label={`${name} candidate avatar`}
      className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-[linear-gradient(135deg,#7459f6,#5fb7f7_52%,#de61bf)] text-sm font-black text-white shadow-sm ring-2 ring-white"
      role="img"
    >
      {initials || "IN"}
      <span className="absolute inset-0 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06),inset_0_-8px_18px_rgba(0,0,0,0.08)]" />
    </span>
  );
}

export function VerifiedCandidatePipelineSection() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 rounded-[2rem] border border-black/5 bg-white p-7 shadow-[0_24px_90px_rgba(30,27,75,0.07)] sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
              For companies
            </p>
            <h2 className="mt-6 max-w-xl text-4xl font-semibold leading-[0.98] tracking-[-0.065em] sm:text-6xl">
              Need verified LATAM candidates?
            </h2>
            <div className="mt-8 grid gap-4">
              {[
                "pre-checked English",
                "remote setup signals",
                "role tools verification",
                "public verification profiles",
                "less wasted interviews",
                "better filtering",
              ].map((item) => (
                <div key={item} className="flex items-center gap-4 text-lg font-semibold">
                  <Check className="size-5" />
                  {item}
                </div>
              ))}
            </div>
            <Button
              asChild
              className="mt-9 h-12 rounded-full bg-[linear-gradient(135deg,#6f45dd,#5fb7f7,#d95dbc)] px-7 text-white"
            >
              <Link href="/employers">
                More Info
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="rounded-[2rem] bg-[linear-gradient(135deg,#f6f2ff,#ffffff)] p-3 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)] sm:p-6">
            <div className="rounded-[1.7rem] bg-white p-4 shadow-[0_22px_70px_rgba(30,27,75,0.08)] sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    Employer Dashboard
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">
                    Verified candidate pipeline
                  </h3>
                </div>
                <Search className="hidden size-10 sm:block" />
              </div>
              <div className="mt-8 grid gap-5 lg:grid-cols-[230px_1fr]">
                <div className="rounded-3xl bg-[#f8f8f7] p-5">
                  <p className="font-semibold">Filters</p>
                  <div className="mt-5 grid gap-3">
                    {filters.map((filter) => (
                      <span
                        key={filter}
                        className="rounded-full bg-white px-4 py-3 text-sm font-semibold"
                      >
                        {filter}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4">
                  {candidates.map(([name, role, score]) => (
                    <div
                      key={name}
                      className="flex items-center gap-3 rounded-3xl border border-black/10 bg-white p-4 sm:gap-4 sm:p-5"
                    >
                      <CandidateAvatar name={name} />
                      <div className="flex-1">
                        <p className="text-base font-semibold tracking-[-0.04em] sm:text-xl">
                          {name}
                        </p>
                        <p className="text-sm text-neutral-500">{role} · LATAM</p>
                      </div>
                      <span className="rounded-full bg-[#d0f5e3] px-3 py-2 text-xs font-semibold sm:px-4 sm:text-sm">
                        {score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
