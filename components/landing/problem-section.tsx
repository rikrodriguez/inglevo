const problems = [
  "Can a support agent calm an angry customer in English?",
  "Can a developer explain a blocker in standup?",
  "Can a PM manage deadlines across time zones?",
  "Can an SDR handle objections and update a CRM?",
  "Can a designer present work in Figma and defend decisions?",
  "Can a VA coordinate tasks across Slack, Calendar and GHL?",
];

export function ProblemSection() {
  return (
    <section className="click-feature-card px-4 py-28 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="section-kicker text-white/45">The real gap</p>
            <h2 className="brand-section-title mt-4 text-6xl text-white sm:text-7xl">
              “Advanced English” is not the same as job-ready English.
            </h2>
          </div>
          <p className="max-w-2xl text-xl leading-8 text-white/60">
            Remote hiring is not only about grammar. It is about whether someone
            can do the actual work, with the actual tools, in English.
          </p>
        </div>
        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {problems.map((problem, index) => (
            <div
              key={problem}
              className="motion-rise rounded-3xl border border-white/10 bg-white/[0.06] p-6 text-xl font-semibold tracking-tight text-white shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-white/[0.09]"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              {problem}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
