import { CalendarDays, MessagesSquare, UsersRound } from "lucide-react";

const calls = [
  "English for Designers",
  "English for Customer Support",
  "English for SDRs",
  "English for PMs",
  "Mock Interview Fridays",
  "Salary Growth Q&A",
  "US Hiring Trends",
] as const;

export default function CommunityPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-6">
      <section className="hero-panel">
        <p className="section-kicker">Community</p>
        <h1 className="page-title mt-2">Join the free career growth community</h1>
        <p className="page-copy mt-3">
          Learn with other LATAM professionals preparing for remote work, better
          English and higher-value US opportunities.
        </p>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="ink-panel">
          <UsersRound className="size-9 text-[#d0f5e3]" />
          <h2 className="mt-8 text-4xl font-semibold tracking-[-0.05em] text-white">
            Free Skool Community included
          </h2>
          <p className="mt-4 text-sm leading-6 text-white/70">
            Community access is designed to support consistency, accountability
            and career momentum while you build verified job English.
          </p>
        </div>
        <div className="premium-card p-6">
          <div className="flex items-center gap-3">
            <CalendarDays className="size-5" />
            <h2 className="text-2xl font-semibold">Weekly live calls</h2>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {calls.map((call) => (
              <div key={call} className="flex items-center gap-3 rounded-2xl border border-border bg-white p-4 text-sm font-medium">
                <MessagesSquare className="size-4" />
                {call}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
