import { Check, X } from "lucide-react";

const rows = [
  ["Goal", "General English", "English for the job"],
  ["Context", "Academic or generic situations", "Remote job workflows and role scenarios"],
  ["Tools", "No tool scenarios", "Slack, Zoom, Figma, GitHub, CRMs and support tools"],
  ["Speaking", "Generic speaking prompts", "Interview and role-specific conversation practice"],
  ["Writing", "General writing exercises", "Async updates, follow-ups and task communication"],
  ["Assets", "No application materials", "Recruiter messages, answer bank and salary scripts"],
  ["Validation", "Course progress or streak", "Certificate by role and job English score"],
  ["Signal", "I studied English", "I can work in English for this role"],
] as const;

export function ComparisonSection() {
  return (
    <section className="bg-[#dfdbd6] px-4 py-28 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="section-kicker">The difference</p>
          <h2 className="brand-section-title mt-4 text-6xl sm:text-7xl">
            Traditional English tests are general. Inglevo is role-specific.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-neutral-600">
            The goal is not another certificate that says you completed lessons.
            The goal is a stronger signal that your English works at work.
          </p>
        </div>
        <div className="mt-12 overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-[0_24px_90px_rgba(7,9,12,0.08)]">
          <div className="grid grid-cols-[0.85fr_1fr_1fr] border-b border-black/5 bg-[#ffffff] p-4 text-sm font-semibold text-muted-foreground max-md:hidden">
            <div>Category</div>
            <div>Other English apps</div>
            <div>Inglevo</div>
          </div>
          <div className="divide-y divide-black/5">
            {rows.map(([category, other, inglevo]) => (
              <ComparisonRow
                key={category}
                category={category}
                other={other}
                inglevo={inglevo}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonRow({
  category,
  other,
  inglevo,
}: {
  category: string;
  other: string;
  inglevo: string;
}) {
  return (
    <div className="grid gap-3 p-4 md:grid-cols-[0.85fr_1fr_1fr] md:items-center md:p-5">
      <div className="text-sm font-semibold text-[var(--brand-black)]">
        {category}
      </div>
      <div className="flex items-start gap-3 rounded-2xl bg-[#dfdbd6] p-4 text-sm text-muted-foreground md:bg-transparent md:p-0">
        <X className="mt-0.5 size-4 shrink-0 text-black" />
        <span>{other}</span>
      </div>
      <div className="flex items-start gap-3 rounded-2xl bg-[#d0f5e3] p-4 text-sm font-medium text-black md:bg-transparent md:p-0">
        <Check className="mt-0.5 size-4 shrink-0 text-black" />
        <span>{inglevo}</span>
      </div>
    </div>
  );
}
