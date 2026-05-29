import { CalendarClock, CircleDollarSign, ClipboardList } from "lucide-react";

const stages = [
  "Saved",
  "Preparing",
  "Applied",
  "Viewed",
  "Screening",
  "Interview 1",
  "Interview 2",
  "Final Round",
  "Offer",
  "Negotiation",
  "Accepted",
  "Rejected",
] as const;

export default function JobCrmPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-6">
      <section className="hero-panel">
        <p className="section-kicker">Job CRM</p>
        <h1 className="page-title mt-2">Manage your job search like a top performer</h1>
        <p className="page-copy mt-3">
          Track remote opportunities, follow-ups, notes, salary ranges and
          interview stages in one application pipeline.
        </p>
      </section>

      <section className="premium-card p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="section-kicker">Pipeline preview</p>
            <h2 className="mt-2 text-2xl font-semibold">US remote applications</h2>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="badge-ready"><CalendarClock className="size-4" /> Follow-ups</span>
            <span className="badge-progress"><CircleDollarSign className="size-4" /> Salary tracking</span>
          </div>
        </div>
        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage, index) => (
            <div key={stage} className="rounded-2xl border border-border bg-white p-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{stage}</p>
                <ClipboardList className="size-4 text-muted-foreground" />
              </div>
              <p className="mt-5 mono-stat text-2xl font-semibold">{index < 4 ? index + 1 : 0}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
