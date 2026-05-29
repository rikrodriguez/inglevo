import { BadgeCheck, Building2, Globe2, GraduationCap, UsersRound } from "lucide-react";
import type { ReactNode } from "react";

const companyProblems = [
  "Who actually speaks work-level English?",
  "Who can communicate professionally?",
  "Who can perform in remote environments?",
  "Who understands modern tools and workflows?",
  "Who is interview-ready?",
] as const;

const talentProblems = [
  "They know some English but fail interviews.",
  "They lack role-specific communication.",
  "They apply blindly without proof.",
  "No trusted signal proves they are job-ready.",
  "They lose access to higher-paying global jobs.",
] as const;

const trends = [
  ["Global remote hiring", "Companies hire internationally more than ever.", Globe2],
  ["LATAM talent supply", "Strong timezone alignment and attractive cost structure.", UsersRound],
  ["Trust signals matter", "Clear communication, tool familiarity and reliability now matter earlier in hiring.", BadgeCheck],
] as const;

export function TrustLayerSection() {
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="landing-card">
            <p className="section-kicker">The problem</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
              Hiring LATAM remote talent is inefficient.
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <ProblemList
                title="Companies struggle to know"
                icon={<Building2 className="size-5" />}
                items={companyProblems}
              />
              <ProblemList
                title="LATAM professionals struggle because"
                icon={<GraduationCap className="size-5" />}
                items={talentProblems}
              />
            </div>
          </div>

          <div className="ink-panel">
            <p className="section-kicker text-white/50">Why now</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white">
              The world needs a trust layer for cross-border hiring.
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {trends.map(([title, copy, Icon]) => (
                <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.07] p-5">
                  <Icon className="size-7 text-[#d0f5e3]" />
                  <h3 className="mt-6 font-semibold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/65">{copy}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-3xl bg-[#d0f5e3] p-5 text-black">
              <p className="font-semibold">
                Inglevo connects both sides: talent that can prove role English,
                and companies that need better hiring signals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemList({
  title,
  icon,
  items,
}: {
  title: string;
  icon: ReactNode;
  items: readonly string[];
}) {
  return (
    <div className="rounded-3xl border border-black/5 bg-[#dfdbd6]/45 p-5">
      <div className="flex items-center gap-2 text-sm font-semibold">
        {icon}
        {title}
      </div>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div key={item} className="rounded-2xl bg-white px-4 py-3 text-sm text-neutral-700">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
