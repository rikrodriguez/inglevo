import { BadgeCheck, BriefcaseBusiness, Sparkles } from "lucide-react";

const claims = [
  ["For candidates", "Improve role English, build trust signals and become better positioned for USD remote opportunities.", Sparkles],
  ["For companies", "Filter for lower-cost, higher-confidence LATAM talent before wasting interviews.", BadgeCheck],
  ["For the market", "Connect talent access with hiring trust through certificates, tools and job-specific scenarios.", BriefcaseBusiness],
] as const;

export function BigClaimSection() {
  return (
    <section id="solutions" className="px-4 py-28 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-5xl">
          <p className="section-kicker">The solution</p>
          <h2 className="brand-section-title mt-4 text-6xl sm:text-7xl lg:text-[5.25rem]">
            A career upgrade platform for global remote work.
          </h2>
          <p className="mt-7 max-w-2xl text-xl leading-8 text-neutral-600">
            Workers buy better income, confidence and positioning. Companies
            buy better filtering, less wasted time and stronger hiring signals.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {claims.map(([title, copy, Icon]) => (
            <article key={title} className="landing-card min-h-[260px]">
              <div className="grid size-11 place-items-center rounded-2xl bg-[#d0f5e3]">
                <Icon className="size-5 text-black" />
              </div>
              <h3 className="mt-14 text-4xl font-semibold tracking-[-0.045em]">{title}</h3>
              <p className="mt-3 text-muted-foreground">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
