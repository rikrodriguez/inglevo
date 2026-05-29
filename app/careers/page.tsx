import Link from "next/link";
import { Globe2, HeartHandshake, Sparkles, UsersRound } from "lucide-react";

import { PublicFooter } from "@/components/shared/public-footer";
import { PublicNav } from "@/components/shared/public-nav";
import { Button } from "@/components/ui/button";

export default function CareersPage() {
  return (
    <>
      <PublicNav />
      <main className="overflow-hidden bg-white text-black">
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="max-w-4xl">
            <div className="brand-chip mb-6">Careers</div>
            <h1 className="text-6xl font-extrabold leading-[0.95] tracking-[-0.045em] sm:text-7xl lg:text-[5.4rem]">
              Help build the trust signal for LATAM remote hiring.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-neutral-600">
              Inglevo is building a platform that helps LATAM talent improve,
              verify and compete for stronger remote opportunities.
            </p>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
            {[
              [Globe2, "Global opportunity", "Build for LATAM talent and US remote hiring teams."],
              [UsersRound, "Candidate-first", "Respect the people investing in their career mobility."],
              [HeartHandshake, "Trust over hype", "No guarantees. Clearer signals, better preparation and honest positioning."],
            ].map(([Icon, title, copy]) => (
              <article key={title as string} className="landing-card">
                <Icon className="size-5" />
                <h2 className="mt-7 text-2xl font-extrabold tracking-[-0.04em]">{title as string}</h2>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{copy as string}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6">
          <div className="click-feature-card mx-auto max-w-6xl rounded-[2.4rem] p-8 text-white sm:p-12">
            <p className="section-kicker text-white/70">Open roles</p>
            <h2 className="mt-4 text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl">
              We are not hiring publicly yet.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
              If you want to collaborate on content, partnerships, hiring access
              or LATAM community growth, reach out.
            </p>
            <Button asChild variant="secondary" className="mt-8 rounded-full px-7">
              <Link href="/contact">
                Contact us
                <Sparkles />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
