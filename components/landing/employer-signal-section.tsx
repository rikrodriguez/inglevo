import { ShieldCheck } from "lucide-react";

const verified = [
  "Role-specific English",
  "Remote communication",
  "Tool-based task simulations",
  "Async Writing",
  "Interview performance",
  "Certificate by role",
];

export function EmployerSignalSection() {
  return (
    <section id="employers" className="px-4 py-24 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="section-kicker">For employers</p>
          <h2 className="brand-section-title mt-4 text-6xl sm:text-7xl">
            Hire verified LATAM talent for remote jobs.
          </h2>
          <p className="mt-7 max-w-xl text-xl leading-8 text-neutral-600">
            English verified, tools verified and setup verified. A candidate
            saying “advanced English” does not tell you if they can handle a
            sales objection, explain a bug, calm an angry customer, present a
            design or manage a deadline in English. Inglevo does.
          </p>
          <p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground">
            Inglevo helps companies evaluate whether LATAM candidates can
            communicate in English for the actual role they are being hired to
            perform.
          </p>
          <button className="mt-8 rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-muted-foreground">
            Employer pilots by request
          </button>
        </div>
        <div className="mockup-screen min-h-[420px]">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="section-kicker">Candidate role report</p>
            <div className="mt-6 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-3xl font-semibold">Ana Torres</h3>
                <p className="mt-1 text-muted-foreground">
                  Verified: Customer Service English
                </p>
              </div>
              <span className="badge-ready">Role-ready</span>
            </div>
            <div className="mt-8 rounded-3xl bg-[#dfdbd6] p-5">
              <p className="text-sm text-muted-foreground">Role English Score</p>
              <p className="mono-stat mt-2 text-5xl font-semibold">84/100</p>
            </div>
            <div className="mt-6 grid gap-3">
              {verified.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-border p-4">
                  <ShieldCheck className="size-5 text-black" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
