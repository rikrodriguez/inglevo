import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  Filter,
  Globe2,
  Search,
  Sparkles,
  Wrench,
} from "lucide-react";

import { remoteOpportunities } from "@/data/opportunities";
import { PublicFooter } from "@/components/shared/public-footer";
import { PublicNav } from "@/components/shared/public-nav";
import { Button } from "@/components/ui/button";

const featuredJobs = remoteOpportunities.slice(0, 6);

const marketplaceSignals = [
  "Required English level",
  "Role tools expected",
  "Verification match score",
  "Salary range visibility",
  "Application prep checklist",
  "Verified profile CTA",
] as const;

function JobMarketplaceMockup() {
  return (
    <div className="rounded-[2rem] border border-black/5 bg-white p-4 shadow-[0_24px_90px_rgba(7,9,12,0.1)] sm:p-6">
      <div className="flex flex-col gap-4 border-b border-black/5 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="section-kicker">Marketplace preview</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.045em]">
            Verified job matches
          </h2>
        </div>
        <div className="flex gap-2">
          <span className="rounded-full bg-[#d0f5e3] px-3 py-2 text-xs font-black text-emerald-900">
            92% top match
          </span>
          <span className="rounded-full bg-black px-3 py-2 text-xs font-black text-white">
            Verified profile
          </span>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.66fr_1.34fr]">
        <div className="rounded-[1.4rem] bg-[#f8f8f7] p-4">
          <div className="flex items-center gap-2">
            <Filter className="size-4" />
            <p className="font-extrabold">Filters</p>
          </div>
          <div className="mt-4 grid gap-2">
            {["Customer Support", "B2 English", "USD salary", "Setup verified", "US timezone"].map((filter) => (
              <span key={filter} className="rounded-full bg-white px-4 py-3 text-sm font-bold">
                {filter}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-3">
          {featuredJobs.slice(0, 3).map((job, index) => {
            const match = index === 0 ? "92%" : index === 1 ? "88%" : "84%";

            return (
              <article key={job.id} className="rounded-[1.35rem] border border-black/5 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xl font-extrabold tracking-[-0.04em]">{job.title}</p>
                    <p className="mt-1 text-sm font-semibold text-neutral-500">
                      {job.company} · {job.location}
                    </p>
                    <p className="mt-2 text-sm font-extrabold">{job.salaryRange}</p>
                  </div>
                  <span className="w-fit rounded-full bg-[#d0f5e3] px-3 py-2 text-sm font-black text-emerald-900">
                    {match} match
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-full bg-[#f3efff] px-3 py-1.5 text-xs font-black text-[#6f45dd]">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ApplicationPrepMockup() {
  return (
    <div className="rounded-[2rem] border border-black/5 bg-white p-5 shadow-[0_22px_80px_rgba(30,27,75,0.06)]">
      <p className="section-kicker">Application prep kit</p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.045em]">
        Prepare before you apply.
      </h2>
      <div className="mt-6 grid gap-3">
        {[
          ["Attach verified profile", "inglevo.com/ricardorodriguez"],
          ["Practice interview question", "Tell me about a customer conflict"],
          ["Use recruiter message", "Short intro + verified profile link"],
          ["Check role tools", "Zendesk · Slack · Intercom"],
        ].map(([title, copy]) => (
          <div key={title} className="flex gap-3 rounded-2xl bg-[#f8f8f7] p-4">
            <div className="grid size-9 shrink-0 place-items-center rounded-full bg-white">
              <Check className="size-4 text-[#6f45dd]" />
            </div>
            <div>
              <p className="font-extrabold">{title}</p>
              <p className="mt-1 text-sm text-neutral-500">{copy}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-[1.5rem] bg-[linear-gradient(135deg,#7459f6,#5fb7f7_52%,#de61bf)] p-5 text-white">
        <p className="text-sm font-semibold text-white/70">Marketplace logic</p>
        <p className="mt-2 text-2xl font-extrabold tracking-[-0.045em]">
          Apply stronger, not blindly.
        </p>
      </div>
    </div>
  );
}

export default function JobMarketplacePage() {
  return (
    <>
      <PublicNav />
      <main className="overflow-hidden bg-white text-black">
        <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="brand-chip mb-6">Job Marketplace</div>
            <h1 className="max-w-4xl text-6xl font-extrabold leading-[0.95] tracking-[-0.045em] sm:text-7xl lg:text-[5.4rem]">
              Apply to US remote jobs with your verified profile.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-neutral-600 sm:text-2xl sm:leading-9">
              The Inglevo Job Marketplace is designed to show curated remote
              roles, expected tools, salary ranges and how your verification
              profile can help you apply stronger.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="brand-button click-gradient-button h-12 rounded-full px-7">
                <Link href="/signup">
                  Start verification
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full bg-white px-7">
                <Link href="/job-crm">See Job CRM</Link>
              </Button>
            </div>
            <p className="mt-5 text-sm font-semibold text-neutral-500">
              Curated examples · Verified profile match · No job guarantee
            </p>
          </div>

          <JobMarketplaceMockup />
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.12fr_0.88fr]">
            <div className="rounded-[2rem] border border-black/5 bg-white p-5 shadow-[0_24px_90px_rgba(7,9,12,0.08)] sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="section-kicker">Role listings</p>
                  <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.045em]">
                    Opportunities with context.
                  </h2>
                </div>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
                  <div className="rounded-full border border-black/10 bg-[#f8f8f7] py-3 pl-10 pr-5 text-sm font-semibold text-neutral-500">
                    Search remote roles
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                {featuredJobs.map((job, index) => {
                  const match = [92, 88, 84, 86, 81, 79][index] ?? 80;

                  return (
                    <article key={job.id} className="rounded-[1.5rem] border border-black/5 bg-[#fbfbfd] p-5">
                      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
                        <div>
                          <p className="text-2xl font-extrabold tracking-[-0.045em]">{job.title}</p>
                          <p className="mt-1 text-sm font-semibold text-neutral-500">
                            {job.company} · {job.type} · {job.location}
                          </p>
                          <p className="mt-3 text-xl font-extrabold">{job.salaryRange}</p>
                          <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600">
                            {job.description}
                          </p>
                        </div>
                        <div className="rounded-[1.2rem] bg-white p-4 text-center shadow-sm">
                          <p className="text-4xl font-extrabold tracking-[-0.055em] text-[#6f45dd]">
                            {match}%
                          </p>
                          <p className="text-xs font-black uppercase tracking-[0.12em] text-neutral-400">
                            match
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="rounded-full bg-[#d0f5e3] px-3 py-1.5 text-xs font-black text-emerald-900">
                          English {job.requiredEnglishLevel}
                        </span>
                        <span className="rounded-full bg-[#f3efff] px-3 py-1.5 text-xs font-black text-[#6f45dd]">
                          Score {job.requiredReadinessScore}+
                        </span>
                        {job.skills.slice(0, 3).map((skill) => (
                          <span key={skill} className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-neutral-600">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <ApplicationPrepMockup />
          </div>
        </section>

        <section className="bg-[#f4f2ef] px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="section-kicker">Not a generic job board</p>
              <h2 className="mt-4 text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                The marketplace only matters if it helps you apply better.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
                Inglevo connects roles to the signals you are building:
                English, setup, role tools, CV, templates and Job CRM.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {marketplaceSignals.map((signal) => (
                <div key={signal} className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-4 text-sm font-bold shadow-sm">
                  <BadgeCheck className="size-4 text-[#6f45dd]" />
                  {signal}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
            {[
              ["Find", "See remote roles with salary ranges, role tools and English expectations.", Globe2],
              ["Prepare", "Use your verified profile, templates, CV and practice suggestions.", Wrench],
              ["Track", "Move each role into your Job CRM and follow up professionally.", BriefcaseBusiness],
            ].map(([title, copy, Icon]) => (
              <article key={title as string} className="landing-card">
                <div className="click-icon-tile">
                  <Icon className="size-5" />
                </div>
                <h2 className="mt-7 text-2xl font-extrabold tracking-[-0.04em]">{title as string}</h2>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{copy as string}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6">
          <div className="click-feature-card mx-auto max-w-6xl rounded-[2.4rem] p-8 text-white shadow-[0_24px_90px_rgba(90,70,255,0.18)] sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="section-kicker text-white/70">Job Marketplace</p>
                <h2 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl">
                  Apply with stronger signals, not just another CV.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
                  Start with verification, then use the marketplace and CRM to
                  apply with structure.
                </p>
              </div>
              <Button asChild variant="secondary" className="h-12 rounded-full px-7">
                <Link href="/signup">
                  Start for free
                  <Sparkles />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
