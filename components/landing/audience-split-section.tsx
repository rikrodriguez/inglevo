import Link from "next/link";
import { ArrowRight, BadgeCheck, BriefcaseBusiness } from "lucide-react";

import { Button } from "@/components/ui/button";

export function AudienceSplitSection() {
  return (
    <section className="px-4 py-10 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-2">
        <article className="landing-card bg-white">
          <div className="click-icon-tile size-12">
            <BadgeCheck className="size-6" />
          </div>
          <p className="section-kicker mt-8">For talent</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em]">
            Get verified and apply stronger.
          </h2>
          <p className="mt-4 text-lg leading-8 text-neutral-600">
            Improve your role English, prove your setup, build your CV and show
            US companies a more trusted candidate profile.
          </p>
          <Button asChild className="click-gradient-button mt-7 rounded-full">
            <Link href="/talent">
              See talent path
              <ArrowRight />
            </Link>
          </Button>
        </article>

        <article className="click-feature-card landing-card border-white/25">
          <div className="grid size-12 place-items-center rounded-2xl bg-white">
            <BriefcaseBusiness className="size-6" />
          </div>
          <p className="section-kicker mt-8 text-white/65">For companies</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em]">
            Hire pre-checked LATAM candidates.
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/75">
            Filter for communication, remote setup, professionalism and role
            signals before spending time in interviews.
          </p>
          <Button asChild variant="outline" className="mt-7 rounded-full border-white/25 bg-white/15 text-white hover:bg-white/20">
            <Link href="/employers">
              See employer access
              <ArrowRight />
            </Link>
          </Button>
        </article>
      </div>
    </section>
  );
}
