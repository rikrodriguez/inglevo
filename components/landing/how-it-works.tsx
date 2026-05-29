const steps = [
  ["Train", "Improve English for your target role."],
  ["Verify", "Prove your tools, remote setup and professional habits."],
  ["Build CV", "Turn practice into career assets and a stronger profile."],
  ["Apply", "Use your certificate and CRM to target better opportunities."],
] as const;

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-black/5 bg-white p-8 shadow-[0_24px_90px_rgba(7,9,12,0.08)] sm:p-12">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker">How Inglevo helps you get hired</p>
            <h2 className="mt-4 text-5xl font-semibold tracking-[-0.045em] text-balance">
              Train → Verify → Build CV → Apply
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-muted-foreground">
            A simple path from job-specific English practice to stronger
            signals for US remote opportunities.
          </p>
        </div>
        <div className="mt-12 grid gap-3 md:grid-cols-4">
          {steps.map(([title, copy], index) => (
            <div key={title} className="rounded-3xl border border-border bg-[#ffffff] p-6">
              <p className="mono-stat text-sm text-muted-foreground">0{index + 1}</p>
              <h3 className="mt-8 text-3xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
