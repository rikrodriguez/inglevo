export function DifferentiatorSection() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="section-kicker">Differentiator</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            It is not just learning English. It is improving English with a goal.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Inglevo helps you apply, communicate and work remotely for better
            opportunities: from interviews to messages, follow-ups and readiness
            signals. It does not replace your experience; it makes it clearer,
            more professional and easier to prove in English.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="premium-card p-5">
            <h3 className="font-semibold">Traditional English apps</h3>
            <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
              <li>generic lessons</li>
              <li>grammar exercises</li>
              <li>travel vocabulary</li>
              <li>no work readiness</li>
              <li>no remote communication validation</li>
              <li>no application assets</li>
            </ul>
          </div>
          <div className="ink-panel p-5">
            <h3 className="font-semibold">Inglevo</h3>
            <ul className="mt-4 grid gap-2 text-sm text-background/75">
              <li>professional English</li>
              <li>remote interview practice</li>
              <li>async writing</li>
              <li>spoken confidence</li>
              <li>setup readiness</li>
              <li>readiness score</li>
              <li>remote job application assets</li>
              <li>job-ready communication</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
