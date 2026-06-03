import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { LandingNav } from "@/components/landing/landing-nav";
import { PublicFooter } from "@/components/shared/public-footer";
import { Button } from "@/components/ui/button";

const sections = [
  ["Interview English", "Structure your answers with context, evidence and impact."],
  ["Async Writing", "Write updates that show clarity, ownership and next steps."],
  ["Remote Setup", "Prepare the basic tools companies expect from remote workers."],
  ["Application Assets", "Build messages, answer banks and salary scripts you can reuse."],
];

export default function RemoteEnglishGuidePage() {
  return (
    <>
      <LandingNav />
      <main className="landing-canvas px-4 py-24 sm:px-6">
        <section className="mx-auto max-w-5xl text-center">
          <p className="section-kicker">Remote English Guide</p>
          <h1 className="brand-section-title mt-4 text-6xl sm:text-7xl">
            From “I know English” to “I can work remotely in English.”
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-xl leading-8 text-neutral-600">
            Remote English is not just vocabulary. It is how you interview,
            write updates, ask questions, explain blockers and prove reliability.
          </p>
          <Button asChild className="brand-button mt-9 rounded-full bg-[var(--brand-black)] hover:bg-black">
            <Link href="/signup">
              Start your role path
              <ArrowRight />
            </Link>
          </Button>
        </section>
        <section className="mx-auto mt-16 grid max-w-6xl gap-4 md:grid-cols-2">
          {sections.map(([title, copy]) => (
            <article key={title} className="landing-card">
              <h2 className="text-3xl font-semibold tracking-[-0.045em]">{title}</h2>
              <p className="mt-4 text-neutral-600">{copy}</p>
            </article>
          ))}
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
