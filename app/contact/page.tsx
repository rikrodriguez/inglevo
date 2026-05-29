import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingNav } from "@/components/landing/landing-nav";

export default function ContactPage() {
  return (
    <>
      <LandingNav />
      <main className="landing-canvas px-4 py-24 sm:px-6">
        <section className="mx-auto max-w-4xl">
          <p className="section-kicker">Contact</p>
          <h1 className="brand-section-title mt-4 text-6xl sm:text-7xl">
            Talk to Inglevo.
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-8 text-neutral-600">
            For beta access, partnerships, employer pilots or product questions,
            contact the Inglevo team.
          </p>
          <div className="mt-10 rounded-[2rem] border border-black/5 bg-white p-8 shadow-[0_24px_90px_rgba(7,9,12,0.08)]">
            <p className="text-sm font-semibold text-muted-foreground">Email</p>
            <p className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
              hello@inglevo.com
            </p>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Replace this with your real support or founder email before launch.
            </p>
          </div>
        </section>
      </main>
      <LandingFooter />
    </>
  );
}
