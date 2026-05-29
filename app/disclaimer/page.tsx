import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingNav } from "@/components/landing/landing-nav";

export default function DisclaimerPage() {
  return (
    <>
      <LandingNav />
      <main className="landing-canvas px-4 py-24 sm:px-6">
        <section className="mx-auto max-w-4xl">
          <p className="section-kicker">Legal</p>
          <h1 className="brand-section-title mt-4 text-6xl sm:text-7xl">
            Disclaimer
          </h1>
          <div className="mt-10 rounded-[2rem] border border-black/5 bg-white p-8 text-xl leading-9 text-neutral-700 shadow-[0_24px_90px_rgba(7,9,12,0.08)]">
            Inglevo helps users practice professional English and role-specific
            remote job communication. It does not guarantee employment, income,
            interviews, job placement, sponsorship, visas or immigration outcomes.
          </div>
        </section>
      </main>
      <LandingFooter />
    </>
  );
}
