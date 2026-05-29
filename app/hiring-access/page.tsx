import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Check, Filter, ShieldCheck, UsersRound } from "lucide-react";

import { PublicFooter } from "@/components/shared/public-footer";
import { PublicNav } from "@/components/shared/public-nav";
import { Button } from "@/components/ui/button";

const accessModels = [
  ["Pilot access", "Start with one role and review a focused verified shortlist."],
  ["Recurring hiring", "Create a repeatable lane for remote LATAM roles."],
  ["Placement support", "Use verified profiles to reduce manual screening friction."],
  ["Custom workflow", "Shape access around hiring volume, roles and team process."],
] as const;

export default function HiringAccessPage() {
  return (
    <>
      <PublicNav />
      <main className="overflow-hidden bg-white text-black">
        <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="brand-chip mb-6">Hiring Access</div>
            <h1 className="text-6xl font-extrabold leading-[0.95] tracking-[-0.045em] sm:text-7xl lg:text-[5.4rem]">
              Custom access for teams hiring LATAM talent.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-neutral-600">
              Inglevo helps teams review candidates with clearer signals around
              English, setup, tools and professionalism before the first interview.
            </p>
            <Button asChild className="click-gradient-button mt-8 h-12 rounded-full px-7">
              <Link href="/book-a-call">
                Book a hiring call
                <ArrowRight />
              </Link>
            </Button>
          </div>

          <div className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-[0_24px_90px_rgba(7,9,12,0.1)]">
            <p className="section-kicker">Access dashboard</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-[-0.045em]">Verified candidate filters</h2>
            <div className="mt-8 grid gap-3">
              {["English 80+", "Setup verified", "Customer Support", "EST overlap", "Zendesk"].map((filter) => (
                <div key={filter} className="flex items-center gap-3 rounded-2xl bg-[#f8f8f7] p-4 font-bold">
                  <Filter className="size-4 text-[#6f45dd]" />
                  {filter}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-4">
            {accessModels.map(([title, copy]) => (
              <article key={title} className="landing-card">
                <BriefcaseBusiness className="size-5" />
                <h2 className="mt-7 text-2xl font-extrabold tracking-[-0.04em]">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#f4f2ef] px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-3">
            {[
              [ShieldCheck, "Less uncertainty", "Review proof before interviews, not only claims."],
              [UsersRound, "Better shortlists", "Prioritize candidates with stronger role signals."],
              [Check, "Human decisions remain", "Verification supports screening. Your team still hires."],
            ].map(([Icon, title, copy]) => (
              <article key={title as string} className="rounded-[2rem] bg-white p-8 shadow-sm">
                <Icon className="size-6 text-[#6f45dd]" />
                <h2 className="mt-8 text-3xl font-extrabold tracking-[-0.045em]">{title as string}</h2>
                <p className="mt-4 leading-7 text-neutral-600">{copy as string}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
