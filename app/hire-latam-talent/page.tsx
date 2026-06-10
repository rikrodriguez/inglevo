import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Filter,
  Search,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Wrench,
} from "lucide-react";

import { VerifiedCandidatePipelineSection } from "@/components/landing/verified-candidate-pipeline-section";
import { PublicFooter } from "@/components/shared/public-footer";
import { PublicNav } from "@/components/shared/public-nav";
import { Button } from "@/components/ui/button";

const employerSignals = [
  ["English for the role", "Communication signals tied to the job, not generic language claims.", BadgeCheck],
  ["Remote setup", "Internet, camera, microphone, workspace and timezone indicators.", ShieldCheck],
  ["Role tools", "Tool familiarity signals for support, sales, PM, design, engineering and ops.", Wrench],
  ["Professionalism", "Ownership, clarity, responsiveness and follow-up habits.", UsersRound],
] as const;

const candidateRows = [
  ["Ana Torres", "Customer Support", "84/100", "English 80+ · Zendesk"],
  ["Mateo Ruiz", "Project Manager", "81/100", "Setup verified · Asana"],
  ["Camila Vega", "Sales Rep", "78/100", "CRM tools · Objections"],
] as const;

const hiringFlow = [
  ["01", "Tell us the role", "Define English, tools, setup, timezone and salary expectations."],
  ["02", "Review verified candidates", "Prioritize LATAM talent with stronger proof before interviews."],
  ["03", "Interview fewer people", "Spend time on candidates who already show relevant signals."],
  ["04", "Hire with more confidence", "Use verification as a trust layer, not as a guarantee."],
] as const;

function EmployerSearchMockup() {
  return (
    <div className="rounded-[2rem] border border-black/5 bg-white p-5 shadow-[0_24px_90px_rgba(7,9,12,0.1)] sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="section-kicker">Hiring dashboard</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.045em] sm:text-4xl">
            Verified LATAM candidate pool
          </h2>
        </div>
        <div className="grid size-12 place-items-center rounded-full border border-black/10 bg-white">
          <Search className="size-6" />
        </div>
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-[0.7fr_1fr]">
        <div className="rounded-[1.5rem] bg-[#f8f8f7] p-4">
          <div className="flex items-center gap-2">
            <Filter className="size-4" />
            <p className="font-extrabold">Filters</p>
          </div>
          <div className="mt-4 grid gap-2">
            {["English 80+", "Setup verified", "Customer Support", "EST overlap", "Zendesk"].map((filter) => (
              <span key={filter} className="rounded-full bg-white px-4 py-3 text-sm font-bold">
                {filter}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-3">
          {candidateRows.map(([name, role, score, signal], index) => (
            <div key={name} className="flex items-center gap-3 rounded-[1.35rem] border border-border bg-white p-3 shadow-sm">
              <div className="grid size-11 shrink-0 place-items-center rounded-full bg-[#f3efff] text-sm font-extrabold text-[#6f45dd]">
                {name.split(" ").map((part) => part[0]).join("")}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-extrabold tracking-[-0.03em]">{name}</p>
                <p className="truncate text-sm text-neutral-500">{role} · LATAM</p>
                <p className="mt-1 truncate text-xs font-bold text-neutral-400">{signal}</p>
              </div>
              <span className={`rounded-full px-3 py-2 text-sm font-extrabold ${index === 0 ? "bg-[#d0f5e3]" : "bg-[#f3efff] text-[#6f45dd]"}`}>
                {score}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HireLatamTalentPage() {
  return (
    <>
      <PublicNav />
      <main className="overflow-hidden bg-white text-black">
        <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="brand-chip mb-6">Hire LATAM Talent</div>
            <h1 className="max-w-4xl text-6xl font-extrabold leading-[0.95] tracking-[-0.045em] sm:text-7xl lg:text-[5.4rem]">
              Hire LATAM talent with stronger proof before the interview.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-neutral-600 sm:text-2xl sm:leading-9">
              Inglevo helps US companies review candidates already screened for
              communication, remote setup, role tools and professionalism
              signals.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="brand-button click-gradient-button h-12 rounded-full px-7">
                <Link href="/book-a-call">
                  Book a hiring call
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full bg-white px-7">
                <Link href="/employers">See employers page</Link>
              </Button>
            </div>
            <p className="mt-5 text-sm font-semibold text-neutral-500">
              Less screening noise · Stronger shortlists · LATAM timezone overlap
            </p>
          </div>

          <EmployerSearchMockup />
        </section>

        <VerifiedCandidatePipelineSection />

        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-4">
            {employerSignals.map(([title, copy, Icon]) => (
              <article key={title} className="landing-card">
                <div className="click-icon-tile">
                  <Icon className="size-5" />
                </div>
                <h2 className="mt-7 text-2xl font-extrabold tracking-[-0.04em]">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#f4f2ef] px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="section-kicker">The hiring problem</p>
              <h2 className="mt-4 text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                More applicants do not mean better candidates.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
                Generic CVs and “advanced English” claims still leave hiring
                teams guessing. Inglevo is designed to give clearer signals
                before the first interview.
              </p>
            </div>
            <div className="grid gap-3">
              {[
                ["Generic applicant", "CV claims · no setup proof · unclear role English"],
                ["Inglevo Verified", "communication · setup · tools · profile status"],
                ["Hiring team", "fewer weak interviews · stronger shortlist context"],
              ].map(([title, copy], index) => (
                <article
                  key={title}
                  className={`rounded-[1.6rem] p-5 ${
                    index === 1
                      ? "bg-[linear-gradient(135deg,#7459f6,#5fb7f7_52%,#de61bf)] text-white"
                      : "border border-black/5 bg-white"
                  }`}
                >
                  <p className={`section-kicker ${index === 1 ? "text-white/65" : ""}`}>{title}</p>
                  <p className="mt-3 text-2xl font-extrabold tracking-[-0.04em]">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <p className="section-kicker">How it works</p>
              <h2 className="mt-4 text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                A cleaner path from role need to stronger shortlist.
              </h2>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-4">
              {hiringFlow.map(([step, title, copy]) => (
                <article key={step} className="landing-card">
                  <p className="mono-stat text-sm text-neutral-400">{step}</p>
                  <h3 className="mt-8 text-2xl font-extrabold tracking-[-0.04em]">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-10 rounded-[2.4rem] border border-black/5 bg-white p-8 shadow-[0_24px_90px_rgba(7,9,12,0.08)] sm:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="section-kicker">Why LATAM</p>
              <h2 className="mt-4 text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                LATAM gives US teams timezone overlap and strong remote talent.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
                The opportunity is real. The bottleneck is trust. Inglevo helps
                companies understand candidate signals before spending time in
                interviews.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "US timezone overlap",
                "Strong talent supply",
                "Remote-compatible roles",
                "USD-aligned motivation",
                "Lower hiring waste",
                "Better pre-interview context",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-[#f8f8f7] p-4 text-sm font-bold">
                  <Check className="size-4 text-[#6f45dd]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6">
          <div className="click-feature-card mx-auto max-w-6xl rounded-[2.4rem] p-8 text-white shadow-[0_24px_90px_rgba(90,70,255,0.18)] sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="section-kicker text-white/70">Hiring access</p>
                <h2 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl">
                  Start with a focused hiring conversation.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
                  Employer access is custom based on hiring volume, role type
                  and support needed.
                </p>
              </div>
              <Button asChild variant="secondary" className="h-12 rounded-full px-7">
                <Link href="/book-a-call">
                  Book a hiring call
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
