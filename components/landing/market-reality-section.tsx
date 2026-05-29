import { BadgeCheck, BriefcaseBusiness, MessageSquareText } from "lucide-react";

const signals = [
  ["Clear communication", "English that works in interviews, meetings and async updates."],
  ["Modern work habits", "Comfort with remote workflows, tools and follow-through."],
  ["Verified profile", "A stronger signal than simply saying “advanced English”."],
] as const;

export function MarketRealitySection() {
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-[2.4rem] border border-black/5 bg-white p-8 shadow-[0_24px_90px_rgba(7,9,12,0.08)] sm:p-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="section-kicker">Market reality</p>
          <h2 className="brand-section-title mt-4 text-6xl sm:text-7xl">
            The hiring market changed.
          </h2>
          <p className="mt-6 max-w-xl text-xl leading-8 text-neutral-600">
            AI made teams faster and leaner. Companies still need humans who
            communicate clearly, learn quickly, use tools well and work remotely
            with less friction.
          </p>
          <p className="mt-4 max-w-xl text-lg leading-8 text-neutral-600">
            That means candidates need more than basic English. They need trust
            signals. Inglevo helps you build them.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {signals.map(([title, copy], index) => {
            const Icon = [MessageSquareText, BriefcaseBusiness, BadgeCheck][index];
            return (
              <article key={title} className="rounded-3xl border border-border bg-[#f8f8f7] p-5">
                <div className="grid size-11 place-items-center rounded-2xl bg-[#d0f5e3]">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.04em]">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {copy}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
