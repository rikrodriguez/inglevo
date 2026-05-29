import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";

import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="px-4 py-28 sm:px-6">
      <div className="click-feature-card mx-auto grid max-w-7xl overflow-hidden rounded-[2.8rem] p-8 text-white sm:p-14 lg:grid-cols-[1fr_340px] lg:items-center">
        <div>
          <p className="section-kicker text-white/50">Global remote careers</p>
          <h2 className="brand-section-title mt-4 max-w-4xl text-6xl text-white sm:text-7xl">
            Build the English signal global hiring needs.
          </h2>
          <p className="mt-7 max-w-2xl text-xl leading-8 text-white/70">
            LATAM talent needs access. Global hiring needs trust. Inglevo is
            designed to connect both with role-specific English verification.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="secondary" className="h-12 rounded-full px-7">
              <Link href="/signup">
                Start your role path
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-full border-white/20 bg-white/10 px-7 text-white hover:bg-white/15">
              <Link href="#employers">For employers</Link>
            </Button>
          </div>
        </div>
        <div className="mt-10 rounded-3xl border border-white/15 bg-white/[0.08] p-6 backdrop-blur lg:mt-0">
          <div className="certificate-seal size-16">
            <Award className="size-8" />
          </div>
          <p className="mt-8 text-sm text-white/55">Hiring signal preview</p>
          <p className="mono-stat mt-2 text-4xl font-semibold">82/100</p>
          <p className="mt-2 text-white/70">Inglevo Verified Candidate</p>
        </div>
      </div>
    </section>
  );
}
