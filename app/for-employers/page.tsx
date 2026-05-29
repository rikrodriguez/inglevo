import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  Globe2,
  Search,
  ShieldCheck,
  UsersRound,
  Wrench,
} from "lucide-react";

import { PublicFooter } from "@/components/shared/public-footer";
import { PublicNav } from "@/components/shared/public-nav";
import { Button } from "@/components/ui/button";

const proofSignals = [
  {
    title: "Verified communication",
    copy: "Review role English, interview performance and async writing signals before the first call.",
    icon: BadgeCheck,
  },
  {
    title: "Remote setup signals",
    copy: "Understand whether a candidate has the basics for serious remote work: internet, camera, mic and workspace.",
    icon: ShieldCheck,
  },
  {
    title: "Role tools context",
    copy: "See tool familiarity signals for workflows like support, sales, design, PM, engineering and operations.",
    icon: Wrench,
  },
] as const;

const hiringNoise = [
  "Too many applicants",
  "Generic CVs",
  "Weak English claims",
  "No setup proof",
  "No tool context",
  "Wasted interviews",
] as const;

const latamAdvantages = [
  ["US timezone overlap", "More collaboration hours with lean teams.", Globe2],
  ["Strong talent supply", "Remote-compatible professionals across major LATAM markets.", UsersRound],
  ["Cost-efficient hiring", "Build stronger teams without defaulting to high US salary bands.", BriefcaseBusiness],
  ["Higher motivation", "USD opportunities can create meaningful career mobility.", BadgeCheck],
] as const;

const hiringSteps = [
  ["01", "Define the role", "Tell us the communication, tools, setup and timezone signals that matter for the position."],
  ["02", "Review verified profiles", "Prioritize candidates with English, setup and role-tool context already visible."],
  ["03", "Interview fewer people", "Spend hiring time on stronger shortlists instead of filtering generic applicants manually."],
  ["04", "Hire with more confidence", "Use Inglevo as a trust layer. It supports better screening without guaranteeing outcomes."],
] as const;

const accessModels = [
  ["Pilot access", "Start with one role and a focused candidate shortlist."],
  ["Recurring hiring", "Build a repeatable lane for support, sales, ops or other remote roles."],
  ["Placement support", "Use Inglevo signals to reduce screening friction during searches."],
] as const;

function EmployerPipelineMockup() {
  const candidates = [
    ["Ana Torres", "Customer Support", "84/100", "English 80+", "AT"],
    ["Mateo Ruiz", "Project Manager", "81/100", "Setup verified", "MR"],
    ["Camila Vega", "Sales Rep", "78/100", "CRM tools", "CV"],
  ] as const;

  return (
    <div className="rounded-[2rem] border border-black/5 bg-white p-5 shadow-[0_24px_90px_rgba(7,9,12,0.1)] sm:p-7">
      <div className="flex items-center justify-between">
        <div>
          <p className="section-kicker">Employer dashboard</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.045em] sm:text-4xl">
            Verified candidate pipeline
          </h2>
        </div>
        <div className="grid size-12 place-items-center rounded-full border border-black/10 bg-white">
          <Search className="size-6" />
        </div>
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-[0.72fr_1fr]">
        <div className="rounded-[1.6rem] bg-[#f8f8f7] p-4">
          <p className="font-bold">Filters</p>
          <div className="mt-4 grid gap-2">
            {["English 80+", "Setup verified", "Support", "EST overlap"].map((filter) => (
              <div key={filter} className="rounded-full bg-white px-4 py-3 text-sm font-bold">
                {filter}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3">
          {candidates.map(([name, role, score, signal, initials]) => (
            <div key={name} className="flex items-center gap-3 rounded-[1.35rem] border border-border bg-white p-3 shadow-sm">
              <div className="grid size-11 shrink-0 place-items-center rounded-full bg-[#f0ecff] text-sm font-extrabold">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-extrabold tracking-[-0.03em]">{name}</p>
                <p className="truncate text-sm text-neutral-500">{role} · LATAM</p>
                <p className="mt-1 text-xs font-bold text-neutral-400">{signal}</p>
              </div>
              <span className="rounded-full bg-[#d0f5e3] px-3 py-2 text-sm font-extrabold">
                {score}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ForEmployersPage() {
  return (
    <>
      <PublicNav />
      <main className="overflow-hidden bg-white text-black">
        <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <div className="brand-chip mb-6">
              For US companies hiring LATAM talent
            </div>
            <h1 className="max-w-4xl text-6xl font-extrabold leading-[0.95] tracking-[-0.045em] sm:text-7xl lg:text-[5.6rem]">
              Hire LATAM candidates with stronger proof.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-neutral-600 sm:text-2xl sm:leading-9">
              Inglevo helps hiring teams review role English, remote setup,
              tools and professionalism signals before spending time in
              interviews.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="brand-button click-gradient-button h-12 rounded-full px-7">
                <Link href="/book-a-call">
                  Book a hiring call
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full bg-white px-7">
                <Link href="#how-it-works">See how it works</Link>
              </Button>
            </div>
            <p className="mt-5 text-sm font-semibold text-neutral-500">
              Fewer cold resumes · Stronger candidate signals · Better shortlists
            </p>
          </div>

          <EmployerPipelineMockup />
        </section>

        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
            {proofSignals.map(({ title, copy, icon: Icon }) => (
              <article key={title} className="landing-card">
                <div className="click-icon-tile">
                  <Icon className="size-5" />
                </div>
                <h2 className="mt-6 text-2xl font-extrabold tracking-[-0.04em]">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-8 rounded-[2.4rem] border border-black/5 bg-[#f8f8f7] p-8 sm:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="section-kicker">The hiring problem</p>
              <h2 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                Remote hiring creates too much noise.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
                Generic applicants are everywhere. Hiring teams need a faster
                way to see who can communicate, show up prepared and work
                remotely with less friction.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {hiringNoise.map((pain) => (
                <div key={pain} className="rounded-2xl border border-black/5 bg-white p-5 text-sm font-bold shadow-sm">
                  {pain}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <p className="section-kicker">How it works</p>
              <h2 className="mt-4 text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                A cleaner hiring flow before the first interview.
              </h2>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-4">
              {hiringSteps.map(([step, title, copy]) => (
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
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="section-kicker">Why LATAM</p>
              <h2 className="mt-4 text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                LATAM talent can be a serious remote advantage.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
                The opportunity is strong. The challenge is filtering for trust
                signals before your team spends time interviewing.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {latamAdvantages.map(([title, copy, Icon]) => (
                <article key={title} className="rounded-[1.6rem] border border-border bg-white p-6 shadow-sm">
                  <Icon className="size-5" />
                  <h3 className="mt-5 text-xl font-extrabold tracking-[-0.035em]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-10 rounded-[2.4rem] border border-black/5 bg-white p-8 shadow-[0_24px_90px_rgba(7,9,12,0.08)] sm:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="section-kicker">Access model</p>
              <h2 className="mt-4 text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                Custom hiring access, built around your role volume.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
                We do not publish employer pricing because access depends on
                hiring volume, role type and support needed. Start with a focused
                hiring conversation.
              </p>
              <Button asChild className="click-gradient-button mt-8 rounded-full px-7">
                <Link href="/book-a-call">
                  Get custom access
                  <ArrowRight />
                </Link>
              </Button>
            </div>

            <div className="grid gap-4">
              {accessModels.map(([title, copy]) => (
                <article key={title} className="flex gap-4 rounded-[1.5rem] border border-border bg-[#f8f8f7] p-5">
                  <div className="grid size-10 shrink-0 place-items-center rounded-full bg-black text-white">
                    <Check className="size-4" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold tracking-[-0.035em]">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-neutral-600">{copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6">
          <div className="click-feature-card mx-auto max-w-6xl rounded-[2.4rem] p-8 text-white shadow-[0_24px_90px_rgba(90,70,255,0.18)] sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="section-kicker text-white/70">For hiring teams</p>
                <h2 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl">
                  Your team doesn’t need more applicants. It needs better signals.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
                  Review candidates with clearer proof before you spend another
                  hour in the wrong interview.
                </p>
              </div>
              <Button asChild variant="secondary" className="h-12 rounded-full px-7">
                <Link href="/book-a-call">
                  Book a hiring call
                  <ArrowRight />
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
