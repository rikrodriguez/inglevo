import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingNav } from "@/components/landing/landing-nav";

export default function AboutPage() {
  return (
    <>
      <LandingNav />
      <main className="landing-canvas px-4 py-24 sm:px-6">
        <section className="mx-auto max-w-5xl text-center">
          <p className="section-kicker">Company</p>
          <h1 className="brand-section-title mt-4 text-6xl sm:text-7xl">
            Inglevo exists to turn LATAM English into global opportunity.
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-xl leading-8 text-neutral-600">
            We are building a role-specific English verification platform for
            LATAM talent: improve communication, practice job workflows, build
            application assets and prove English for better remote opportunities.
          </p>
        </section>

        <section className="mx-auto mt-16 grid max-w-6xl gap-4 md:grid-cols-3">
          {[
            ["Improve", "Train the English your role actually requires."],
            ["Prove", "Build role-ready signals beyond generic certificates."],
            ["Apply", "Turn practice into job assets and opportunity prep."],
          ].map(([title, copy]) => (
            <article key={title} className="landing-card min-h-[220px]">
              <h2 className="text-4xl font-semibold tracking-[-0.05em]">{title}</h2>
              <p className="mt-5 text-neutral-600">{copy}</p>
            </article>
          ))}
        </section>
      </main>
      <LandingFooter />
    </>
  );
}
