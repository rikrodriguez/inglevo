import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Clock3,
  FileText,
  Globe2,
  MailCheck,
  Mic,
  ShieldCheck,
  Star,
  UserRoundCheck,
  WalletCards,
  X,
} from "lucide-react";

import { BrandLogo } from "@/components/shared/brand-logo";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Remote Ready Verification Path",
  description:
    "A high-intent conversion path for LATAM professionals who want role English practice, CV signals, remote-readiness checks and a verified Inglevo profile for US remote jobs.",
  alternates: {
    canonical: "/remote-ready",
  },
  openGraph: {
    title: "Remote Ready Verification Path | Inglevo",
    description:
      "Become a stronger remote-job candidate with role English, interview practice, CV assets and verified readiness signals.",
    url: "/remote-ready",
    type: "website",
  },
};

const primaryCta = "/signup?source=remote-ready&intent=verification";
const pricingCta = "/signup?source=remote-ready&intent=payment";

const outcomes = [
  "A verified profile you can send with applications",
  "Role-specific interview answers in professional English",
  "CV and LinkedIn signals matched to remote hiring intent",
  "Remote setup, tools and communication proof in one place",
] as const;

const weakSignals = [
  "Generic CV",
  "Translated interview answers",
  "No proof of remote setup",
  "Tool list without context",
  "Weak follow-up messages",
] as const;

const strongSignals = [
  "Verified Inglevo profile",
  "Role-ready English answers",
  "Setup and tool readiness",
  "Proof-based CV bullets",
  "Async messages that sound professional",
] as const;

const timeline = [
  {
    days: "Days 1-3",
    title: "Position your target role",
    copy: "Choose the role path and identify the English, tools and proof signals that matter for the jobs you want.",
  },
  {
    days: "Days 4-10",
    title: "Practice answers that sound employable",
    copy: "Build concise answers for interviews, follow-ups, blockers, salary questions and remote-work scenarios.",
  },
  {
    days: "Days 11-17",
    title: "Upgrade the application assets",
    copy: "Turn your CV, role language and profile story into assets that make recruiters understand your value faster.",
  },
  {
    days: "Days 18-21",
    title: "Publish your verified signal",
    copy: "Complete readiness checks and use your Inglevo profile as a stronger proof layer in applications.",
  },
] as const;

const offerStack = [
  {
    icon: Mic,
    title: "Interview English practice",
    copy: "Remote-job answers for customer support, SDR, VA, operations, product, QA and software roles.",
  },
  {
    icon: FileText,
    title: "Remote CV signal system",
    copy: "Proof-based bullets, ATS keywords and role language that sound aligned with US remote teams.",
  },
  {
    icon: ShieldCheck,
    title: "Remote setup verification",
    copy: "Internet, camera, microphone, workspace, tools and professional readiness checks.",
  },
  {
    icon: UserRoundCheck,
    title: "Verified candidate profile",
    copy: "One active profile that brings English, setup, tools and career signals together.",
  },
  {
    icon: MailCheck,
    title: "Async communication templates",
    copy: "Follow-ups, updates, blockers and recruiter replies that sound direct and professional.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Role path and weekly momentum",
    copy: "A practical path designed for candidates applying now, not passive English learners.",
  },
] as const;

const objections = [
  {
    question: "Is this an English course?",
    answer:
      "No. It is a remote-job readiness path. English practice is included, but the output is stronger hiring signals, not generic lessons.",
  },
  {
    question: "Does it guarantee a job?",
    answer:
      "No. It helps you apply with stronger proof. Hiring still depends on experience, timing, market fit and the employer.",
  },
  {
    question: "Can I use it before Stripe is connected?",
    answer:
      "Yes. You can start the free account path now. Once checkout is active, this page can send buyers directly to payment.",
  },
] as const;

const roles = [
  "Customer Support",
  "Virtual Assistant",
  "SDR",
  "Project Coordinator",
  "QA Tester",
  "Software Developer",
] as const;

function ConversionHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/88 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <BrandLogo />
        <nav className="hidden items-center gap-7 text-sm font-semibold text-neutral-500 lg:flex">
          <a href="#path" className="transition hover:text-black">
            How it works
          </a>
          <a href="#included" className="transition hover:text-black">
            Included
          </a>
          <a href="#offer" className="transition hover:text-black">
            Pricing
          </a>
          <a href="#faq" className="transition hover:text-black">
            FAQ
          </a>
        </nav>
        <Button asChild className="h-10 rounded-full bg-black px-5 text-white hover:bg-black/90">
          <Link href={primaryCta} data-analytics-label="remote_ready_header_start">
            Start
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </header>
  );
}

function HeroMockup() {
  return (
    <div className="relative">
      <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-[linear-gradient(135deg,rgba(123,63,242,0.22),rgba(56,189,248,0.20),rgba(255,94,188,0.18))] blur-2xl" />
      <div className="rounded-[2rem] border border-black/10 bg-white p-4 shadow-[0_30px_100px_rgba(7,9,12,0.12)] sm:p-5">
        <div className="rounded-[1.5rem] bg-[#07090c] p-5 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-white/58">Inglevo Verified Profile</p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.045em]">
                Ricardo Rodriguez
              </h2>
              <p className="mt-1 text-sm text-white/68">Customer Support Specialist · LATAM</p>
            </div>
            <span className="rounded-full bg-[#d0f5e3] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-black">
              Active
            </span>
          </div>

          <div className="mt-6 grid gap-3">
            {[
              ["Role English", "Verified", "94%"],
              ["Remote Setup", "Ready", "91%"],
              ["CV Signal", "Upgraded", "88%"],
              ["Async Writing", "Professional", "90%"],
            ].map(([label, status, score]) => (
              <div key={label} className="rounded-2xl bg-white/8 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{label}</p>
                    <p className="mt-1 text-xs text-white/55">{status}</p>
                  </div>
                  <span className="text-lg font-black">{score}</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#7b3ff2,#38bdf8,#ff5ebc)]"
                    style={{ width: score }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-[1fr_0.72fr]">
          <div className="rounded-[1.5rem] border border-black/5 bg-[#f8f8f7] p-5">
            <div className="flex items-center gap-2 text-sm font-bold">
              <Clock3 className="size-4 text-[#6f45dd]" />
              21-day readiness path
            </div>
            <div className="mt-4 grid gap-2">
              {["Tell me about yourself", "Customer escalation", "Salary expectation"].map(
                (item) => (
                  <div key={item} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm">
                    <span>{item}</span>
                    <Check className="size-4 text-[#12824c]" />
                  </div>
                )
              )}
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-black/5 bg-[#d0f5e3] p-5">
            <p className="text-sm font-bold">Beta access</p>
            <p className="mt-4 text-5xl font-black tracking-[-0.07em]">$245</p>
            <p className="mt-2 text-xs font-semibold text-black/55">One-time lifetime path</p>
            <div className="mt-5 rounded-2xl bg-white/75 p-3 text-xs font-semibold">
              2 payments $129 · 3 payments $89
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignalComparison() {
  return (
    <section className="bg-[#07090c] px-4 py-20 text-white sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div>
          <h2 className="max-w-xl text-4xl font-black leading-[0.95] tracking-[-0.045em] sm:text-6xl">
            Remote jobs do not only judge your English.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/68">
            They judge whether you look easy to trust, easy to interview and easy
            to place into a remote team. This page sells that signal system.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-2 text-sm font-bold text-white/70">
              <X className="size-4 text-[#ff8abf]" />
              Generic applicant
            </div>
            <div className="mt-5 grid gap-3">
              {weakSignals.map((signal) => (
                <p key={signal} className="rounded-2xl bg-white/7 px-4 py-3 text-sm text-white/65">
                  {signal}
                </p>
              ))}
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-[#d0f5e3]/50 bg-[#d0f5e3] p-5 text-black">
            <div className="flex items-center gap-2 text-sm font-black">
              <Check className="size-4" />
              Verified candidate
            </div>
            <div className="mt-5 grid gap-3">
              {strongSignals.map((signal) => (
                <p key={signal} className="rounded-2xl bg-white/70 px-4 py-3 text-sm font-semibold">
                  {signal}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OfferCard() {
  return (
    <section id="offer" className="px-4 py-20 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <h2 className="max-w-2xl text-4xl font-black leading-[0.95] tracking-[-0.045em] sm:text-6xl">
            The offer is simple: build stronger hiring proof before your next application.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
            You are not buying motivational content. You are buying a structured
            path that turns English practice, CV work and readiness checks into
            application assets.
          </p>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-white p-5 shadow-[0_28px_100px_rgba(7,9,12,0.10)] sm:p-7">
          <div className="rounded-[1.6rem] bg-[#07090c] p-6 text-white">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
              <div>
                <p className="text-sm font-bold text-white/55">Remote Ready Verification Path</p>
                <p className="mt-4 text-7xl font-black tracking-[-0.08em]">$245</p>
                <p className="mt-2 text-sm font-semibold text-white/58">
                  One-time beta lifetime access
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 text-sm text-white/70">
                <WalletCards className="mb-3 size-5 text-[#d0f5e3]" />
                2 payments of $129 or 3 payments of $89 when payment plans are active.
              </div>
            </div>

            <div className="mt-7 grid gap-3">
              {[
                "Verified profile path",
                "Interview and async English practice",
                "CV, templates and role signal assets",
                "Readiness checks for remote work",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-semibold text-white/82">
                  <Check className="size-4 text-[#d0f5e3]" />
                  {item}
                </div>
              ))}
            </div>

            <Button asChild className="mt-7 h-12 w-full rounded-full bg-white text-black hover:bg-white/90">
              <Link href={pricingCta} data-analytics-label="remote_ready_offer_primary">
                Start the verification path
                <ArrowRight />
              </Link>
            </Button>
            <p className="mt-4 text-center text-xs leading-5 text-white/45">
              No employment guarantee. You get a stronger proof system for serious applications.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function RemoteReadyPage() {
  return (
    <>
      <ConversionHeader />
      <main className="bg-white text-black">
        <section className="relative overflow-hidden px-4 pb-14 pt-14 sm:px-6 lg:pb-20 lg:pt-18">
          <div className="absolute inset-x-0 top-0 -z-10 h-[620px] bg-[radial-gradient(circle_at_12%_8%,rgba(123,63,242,0.12),transparent_28%),radial-gradient(circle_at_88%_5%,rgba(56,189,248,0.15),transparent_30%),linear-gradient(180deg,#ffffff,#fbfbfa)]" />
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="lg:pt-10">
              <h1 className="max-w-3xl text-6xl font-black leading-[0.9] tracking-[-0.065em] text-black sm:text-7xl lg:text-[6rem]">
                Get remote-job ready in 21 days.
              </h1>
              <p className="mt-7 max-w-2xl text-xl leading-8 text-neutral-700 sm:text-2xl sm:leading-9">
                Role English, CV signals, interview practice and a verified
                profile built for LATAM talent applying to US remote jobs.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-12 rounded-full bg-black px-7 text-white shadow-[0_18px_44px_rgba(7,9,12,0.22)] hover:bg-black/90">
                  <Link href={primaryCta} data-analytics-label="remote_ready_hero_primary">
                    Start the verification path
                    <ArrowRight />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-12 rounded-full border-black/10 bg-white px-7 shadow-sm">
                  <a href="#included">See what is included</a>
                </Button>
              </div>

              <div className="mt-8 grid max-w-2xl gap-3 text-sm font-semibold text-neutral-700 sm:grid-cols-3">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="size-4 text-[#12824c]" />
                  Active profile output
                </div>
                <div className="flex items-center gap-2">
                  <Globe2 className="size-4 text-[#6f45dd]" />
                  LATAM to US remote
                </div>
                <div className="flex items-center gap-2">
                  <Star className="size-4 text-[#ff5ebc]" />
                  Built for applications
                </div>
              </div>
            </div>

            <HeroMockup />
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
            {outcomes.map((outcome) => (
              <div key={outcome} className="rounded-[1.35rem] border border-black/5 bg-[#f8f8f7] p-5 text-sm font-semibold leading-6 text-neutral-800">
                <Check className="mb-4 size-5 text-[#12824c]" />
                {outcome}
              </div>
            ))}
          </div>
        </section>

        <SignalComparison />

        <section id="included" className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div>
                <h2 className="max-w-3xl text-4xl font-black leading-[0.95] tracking-[-0.045em] sm:text-6xl">
                  Everything points to one conversion event: a stronger application.
                </h2>
              </div>
              <p className="max-w-lg text-lg leading-8 text-neutral-600">
                The page sells outcomes, but the product delivers the pieces:
                practice, assets, proof and momentum.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {offerStack.map((item) => {
                const Icon = item.icon;

                return (
                  <article key={item.title} className="rounded-[1.5rem] border border-black/5 bg-white p-6 shadow-[0_18px_70px_rgba(7,9,12,0.055)]">
                    <div className="grid size-11 place-items-center rounded-2xl bg-[#f0edff] text-[#6f45dd]">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mt-5 text-2xl font-black tracking-[-0.04em]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-neutral-600">{item.copy}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="path" className="bg-[#f4f2ef] px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <h2 className="max-w-xl text-4xl font-black leading-[0.95] tracking-[-0.045em] sm:text-6xl">
                A focused path for candidates applying now.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
                No endless course library. No vague lessons. Each week creates
                proof that helps you explain your value faster.
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {roles.map((role) => (
                  <span key={role} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-neutral-700">
                    {role}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid gap-4">
              {timeline.map((step, index) => (
                <article key={step.days} className="grid gap-5 rounded-[1.5rem] border border-black/5 bg-white p-6 shadow-sm sm:grid-cols-[120px_1fr]">
                  <div>
                    <p className="text-sm font-black text-[#6f45dd]">{step.days}</p>
                    <p className="mt-3 text-5xl font-black tracking-[-0.065em] text-neutral-200">
                      0{index + 1}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-[-0.04em]">{step.title}</h3>
                    <p className="mt-3 text-base leading-7 text-neutral-600">{step.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <OfferCard />

        <section className="px-4 pb-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <h2 className="max-w-xl text-4xl font-black leading-[0.95] tracking-[-0.045em] sm:text-6xl">
                The objections are already built into the offer.
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-8 text-neutral-600">
                High conversion does not mean hiding reality. It means making the
                next step feel obvious, credible and low confusion.
              </p>
            </div>
            <div id="faq" className="grid gap-4">
              {objections.map((item) => (
                <article key={item.question} className="rounded-[1.5rem] border border-black/5 bg-[#f8f8f7] p-6">
                  <h3 className="text-xl font-black tracking-[-0.035em]">{item.question}</h3>
                  <p className="mt-3 text-base leading-7 text-neutral-600">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-28 sm:px-6">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#07090c,#20124d_54%,#7b3ff2)] p-8 text-white shadow-[0_28px_100px_rgba(7,9,12,0.18)] sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="max-w-3xl text-4xl font-black leading-[0.95] tracking-[-0.045em] sm:text-6xl">
                  Stop applying like a generic candidate.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
                  Start building the English, CV and verification signals that
                  make your application easier to trust.
                </p>
              </div>
              <Button asChild className="h-12 rounded-full bg-white px-7 text-black hover:bg-white/90">
                <Link href={primaryCta} data-analytics-label="remote_ready_final_primary">
                  Start now
                  <ChevronRight />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/5 bg-white px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <BrandLogo compact />
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-black">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-black">
              Terms
            </Link>
            <Link href="/pricing" className="hover:text-black">
              General pricing
            </Link>
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/94 p-3 shadow-[0_-18px_45px_rgba(7,9,12,0.10)] backdrop-blur-xl sm:hidden">
        <Button asChild className="h-12 w-full rounded-full bg-black text-white hover:bg-black/90">
          <Link href={primaryCta} data-analytics-label="remote_ready_sticky_mobile">
            Start the verification path
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </>
  );
}
