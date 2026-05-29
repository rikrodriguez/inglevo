import Link from "next/link";
import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  CheckCircle2,
  Globe2,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScoreRing } from "@/components/shared/score-ring";

const metrics = [
  ["Interview Performance", 84],
  ["Async Writing", 79],
  ["Tool Simulations", 76],
  ["Role English", 88],
] as const;

export function LandingHero() {
  return (
    <section className="apple-hero relative overflow-hidden px-4 pb-20 pt-14 sm:px-6 lg:pb-28 lg:pt-20">
      <div className="pointer-events-none absolute inset-x-0 top-24 mx-auto h-56 max-w-5xl rounded-full bg-[radial-gradient(circle,rgba(18,168,107,0.18),transparent_62%)] blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="motion-rise">
          <div className="brand-chip mb-7">
            <Globe2 className="size-4 text-[var(--click-purple)]" />
            Built for LATAM talent who want US remote jobs
          </div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-neutral-400">
            For LATAM talent who want better remote opportunities paid in USD
          </p>
          <h1 className="brand-headline click-gradient-text max-w-3xl text-6xl sm:text-7xl lg:text-[6rem]">
            Get qualified for better US remote jobs.
          </h1>
          <p className="mt-6 max-w-2xl text-2xl font-semibold tracking-[-0.035em] text-black sm:text-3xl">
            Improve your English for your role, get verified, and compete for
            stronger USD remote opportunities.
          </p>
          <p className="mt-7 max-w-2xl text-xl leading-8 text-neutral-600">
            Show English for the role, tool familiarity, remote setup and
            professional signals before you apply.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="brand-button click-gradient-button h-12 rounded-full px-7">
              <Link href="/signup">
                Start free
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-full border-black/10 bg-white/80 px-7 backdrop-blur hover:bg-white">
              <Link href="/employers">For Employers</Link>
            </Button>
          </div>
          <p className="mt-5 text-sm font-medium text-neutral-500">
            English for your role · Certification · Career tools · Stronger hiring signals
          </p>
          <div className="mt-9 grid max-w-xl grid-cols-3 gap-3">
            {[
              ["82", "Job English"],
              ["7", "Role matches"],
              ["5", "Hiring signals"],
            ].map(([value, label]) => (
              <div key={label} className="metric-pill">
                <p className="mono-stat text-2xl font-semibold">{value}</p>
                <p className="mt-1 text-xs font-medium text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-mockup motion-rise mockup-float">
          <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="passport-shell">
              <div className="passport-inner min-h-full">
                <div className="hero-mockup-top">
                  <div>
                    <p className="section-kicker">Inglevo Verified Candidate</p>
                    <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">
                      Customer Service English
                    </h2>
                  </div>
                  <div className="certificate-seal size-14">
                    <Award className="size-7" />
                  </div>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-[auto_1fr] lg:items-center">
                  <ScoreRing score={82} label="Overall" size="lg" />
                  <div className="grid gap-3">
                    <PassportRow label="Role Path" value="Customer Service" />
                    <PassportRow label="Tools" value="Zendesk · Slack · Zoom" />
                    <PassportRow label="Remote Setup" value="Passed" positive />
                    <PassportRow label="Hiring Signal" value="Verified" positive />
                  </div>
                </div>

                <div className="mt-7 rounded-3xl border border-[#d0f5e3] bg-[#d0f5e3] p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-black">
                    <BriefcaseBusiness className="size-4" />
                    Certificate path
                  </div>
                  <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-black">
                    English verified + tools verified + setup verified
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-black/5 bg-white p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="section-kicker">Tool-based simulation</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                    Hiring signal for US remote roles
                  </h3>
                </div>
                <Sparkles className="size-6 text-black" />
              </div>
              <div className="mt-6 grid gap-3">
                {metrics.map(([label, value], index) => (
                  <div key={label} className="motion-stamp rounded-2xl border border-border bg-[#ffffff] p-4" style={{ animationDelay: `${index * 80}ms` }}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-muted-foreground">{label}</p>
                      <p className="mono-stat font-semibold">{value}</p>
                    </div>
                    <div className="soft-progress mt-3">
                      <div className="soft-progress-fill" style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
                <div className="click-feature-card rounded-2xl p-5 text-white">
                  <p className="text-sm text-white/60">Recommended next step</p>
                  <p className="mt-2 text-xl font-semibold tracking-[-0.03em]">
                    Apply to customer support roles with stronger proof.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PassportRow({
  label,
  value,
  positive = false,
}: {
  label: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-white px-4 py-3">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex items-center gap-2">
        {positive ? <CheckCircle2 className="size-4 text-black" /> : null}
        <p className="text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}
