import Link from "next/link";
import { ArrowRight, CalendarDays, Check, MessageSquareText, UsersRound } from "lucide-react";

import { PublicFooter } from "@/components/shared/public-footer";
import { PublicNav } from "@/components/shared/public-nav";
import { Button } from "@/components/ui/button";

export default function BookACallPage() {
  return (
    <>
      <PublicNav />
      <main className="overflow-hidden bg-white text-black">
        <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="brand-chip mb-6">Book a Call</div>
            <h1 className="text-6xl font-extrabold leading-[0.95] tracking-[-0.045em] sm:text-7xl lg:text-[5.4rem]">
              Talk with Inglevo about hiring LATAM talent.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-neutral-600">
              Use this call to discuss roles, candidate verification, hiring volume
              and whether Inglevo access fits your team.
            </p>
            <Button asChild className="click-gradient-button mt-8 h-12 rounded-full px-7">
              <Link href="/contact">
                Contact Inglevo
                <ArrowRight />
              </Link>
            </Button>
          </div>

          <div className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-[0_24px_90px_rgba(7,9,12,0.1)]">
            <div className="flex items-center gap-3">
              <CalendarDays className="size-6 text-[#6f45dd]" />
              <p className="section-kicker">Hiring discovery call</p>
            </div>
            <h2 className="mt-5 text-4xl font-extrabold tracking-[-0.045em]">What we cover</h2>
            <div className="mt-7 grid gap-3">
              {[
                "Roles you are hiring for",
                "English and tool signals that matter",
                "Candidate volume and timeline",
                "Best access model for your team",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-[#f8f8f7] p-4 text-sm font-bold">
                  <Check className="size-4 text-[#6f45dd]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
            {[
              [UsersRound, "For hiring teams", "Best for founders, operators, recruiters and agencies hiring LATAM talent."],
              [MessageSquareText, "No public pricing pressure", "Employer access is scoped based on role needs and hiring volume."],
              [CalendarDays, "Clear next step", "After the call, you know if Inglevo can support your hiring lane."],
            ].map(([Icon, title, copy]) => (
              <article key={title as string} className="landing-card">
                <Icon className="size-5" />
                <h2 className="mt-7 text-2xl font-extrabold tracking-[-0.04em]">{title as string}</h2>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{copy as string}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
