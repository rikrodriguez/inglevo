import Link from "next/link";
import { ArrowRight, BadgeCheck, BriefcaseBusiness, ShieldCheck } from "lucide-react";

import {
  CandidateDashboardMockup,
  EmployerDashboardMockup,
  RolePathCardsMockup,
} from "@/components/landing/product-mockups";
import { PublicFooter } from "@/components/shared/public-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { Button } from "@/components/ui/button";

const outcomes = [
  ["For talent", "Get better jobs", "Improve English, build proof and apply with stronger signals.", "/talent"],
  ["For employers", "Reduce hiring waste", "Filter LATAM candidates by communication, setup and role signals.", "/employers"],
  ["For teams", "Hire with more context", "Use verified candidate profiles before interviews start.", "/employers"],
] as const;

export default function SolutionsPage() {
  return (
    <>
      <SiteHeader />
      <main className="landing-canvas px-4 py-20 sm:px-6">
        <section className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="section-kicker">Solutions</p>
            <h1 className="brand-headline click-gradient-text mt-4 text-6xl sm:text-7xl lg:text-[5.8rem]">
              One platform for stronger remote hiring.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-neutral-600">
              Talent gets prepared and verified. Employers get clearer signals
              before spending time in interviews.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="click-gradient-button h-12 rounded-full px-7">
                <Link href="/signup">
                  Start free
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full bg-white px-7">
                <Link href="/employers">For employers</Link>
              </Button>
            </div>
          </div>
          <CandidateDashboardMockup />
        </section>

        <section className="mx-auto mt-24 max-w-7xl">
          <div className="grid gap-5 md:grid-cols-3">
            {outcomes.map(([kicker, title, copy, href], index) => {
              const Icon = [BadgeCheck, ShieldCheck, BriefcaseBusiness][index];
              return (
                <Link key={title} href={href} className="landing-card group">
                  <div className="click-icon-tile">
                    <Icon className="size-5" />
                  </div>
                  <p className="section-kicker mt-8">{kicker}</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em]">{title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
                  <p className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
                    Explore <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mx-auto mt-24 grid max-w-7xl gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="section-kicker">Role paths</p>
            <h2 className="brand-section-title mt-4 text-6xl sm:text-7xl">
              Start with Customer Support. Expand by role.
            </h2>
          </div>
          <RolePathCardsMockup />
        </section>

        <section className="mx-auto mt-24 grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="section-kicker">Employer solution</p>
            <h2 className="brand-section-title mt-4 text-6xl sm:text-7xl">
              Fewer cold resumes. Better context.
            </h2>
          </div>
          <EmployerDashboardMockup />
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
