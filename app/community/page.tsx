import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Check,
  MessageSquareText,
  Mic,
  Sparkles,
  UsersRound,
  Video,
} from "lucide-react";

import { PublicFooter } from "@/components/shared/public-footer";
import { PublicNav } from "@/components/shared/public-nav";
import { Button } from "@/components/ui/button";

const liveCalls = [
  ["English for Customer Service", "Saturday 4pm", "Handle tickets, refunds and angry customers."],
  ["English for SDRs", "Wednesday 7pm", "Practice objections, pricing and discovery calls."],
  ["Mock Interview Fridays", "Friday 6pm", "Answer common remote interview questions live."],
  ["US Hiring Q&A", "Sunday 5pm", "Understand what US teams expect from LATAM candidates."],
] as const;

const communityBenefits = [
  "Practice consistently, not once",
  "Learn with LATAM professionals on the same path",
  "Get role-specific live sessions",
  "Stay accountable while applying",
  "Turn templates into real communication",
  "Build confidence before interviews",
] as const;

function LiveCommunityMockup() {
  const participants = [
    ["CR", "Customer Support", "Speaking practice", "bg-[#d0f5e3] text-emerald-900"],
    ["SD", "Sales / SDR", "Objection practice", "bg-[#f3efff] text-[#6f45dd]"],
    ["UX", "Product Design", "Design review", "bg-[#dfdbd6] text-neutral-900"],
    ["PM", "Project Mgmt", "Status update", "bg-[#eaf6ff] text-sky-900"],
  ] as const;

  return (
    <div className="rounded-[2rem] border border-black/5 bg-white p-4 shadow-[0_24px_90px_rgba(7,9,12,0.1)] sm:p-6">
      <div className="overflow-hidden rounded-[1.7rem] bg-[#111111] p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="section-kicker text-white/45">Live role call</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.045em]">
              English for Customer Service
            </h2>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-2 text-xs font-bold text-emerald-200">
            <span className="size-2 rounded-full bg-emerald-300" />
            Live
          </span>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {participants.map(([initials, role, activity, color], index) => (
            <div
              key={initials}
              className={`relative min-h-24 overflow-hidden rounded-2xl border border-white/10 ${
                index === 0
                  ? "bg-[linear-gradient(135deg,#7459f6,#5fb7f7_55%,#de61bf)]"
                  : "bg-white/8"
              }`}
            >
              <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/45 to-transparent" />
              <div className="absolute inset-4 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-black ring-2 ring-white/10 ${color}`}>
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">{role}</p>
                    <p className="truncate text-xs text-white/55">{activity}</p>
                  </div>
                </div>
                <Video className="size-4 shrink-0 text-white/60" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-white/8 p-3">
          {["Mock answer", "Role vocabulary", "Live feedback", "US hiring Q&A"].map((item) => (
            <span key={item} className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/80">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function WeeklyCalendarMockup() {
  return (
    <div className="rounded-[2rem] border border-black/5 bg-white p-5 shadow-[0_22px_80px_rgba(30,27,75,0.06)]">
      <p className="section-kicker">Weekly rhythm</p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.045em]">
        Calls that match the roles people want.
      </h2>
      <div className="mt-6 grid gap-3">
        {liveCalls.map(([title, time, copy]) => (
          <div key={title} className="flex gap-4 rounded-2xl bg-[#f8f8f7] p-4">
            <div className="grid size-10 shrink-0 place-items-center rounded-full bg-white">
              <CalendarDays className="size-4" />
            </div>
            <div>
              <p className="font-extrabold">{title}</p>
              <p className="mt-1 text-sm font-semibold text-[#6f45dd]">{time}</p>
              <p className="mt-1 text-sm leading-6 text-neutral-600">{copy}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CommunityPage() {
  return (
    <>
      <PublicNav />
      <main className="overflow-hidden bg-white text-black">
        <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="brand-chip mb-6">Community</div>
            <h1 className="max-w-4xl text-6xl font-extrabold leading-[0.95] tracking-[-0.045em] sm:text-7xl lg:text-[5.4rem]">
              Practice with people aiming for the same remote jobs.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-neutral-600 sm:text-2xl sm:leading-9">
              The Inglevo Community helps LATAM talent stay consistent with
              role-based English calls, mock interviews and US hiring Q&A.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="brand-button click-gradient-button h-12 rounded-full px-7">
                <Link href="/signup">
                  Join the community
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full bg-white px-7">
                <Link href="/role-paths">See role paths</Link>
              </Button>
            </div>
          </div>

          <LiveCommunityMockup />
        </section>

        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
            {[
              ["Live practice", "Speak and write more often so English becomes easier under pressure.", Mic],
              ["Role groups", "Practice with people targeting support, sales, PM, design and other remote roles.", UsersRound],
              ["Career momentum", "Stay accountable while improving your profile, CV and applications.", MessageSquareText],
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

        <section className="bg-[#f4f2ef] px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="section-kicker">Why it matters</p>
              <h2 className="mt-4 text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                English improves faster when practice becomes a weekly habit.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
                The community exists to keep candidates moving. It supports the
                verification path by turning practice into repetition,
                confidence and accountability.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {communityBenefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-4 text-sm font-bold shadow-sm">
                  <Check className="size-4 text-[#6f45dd]" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <WeeklyCalendarMockup />
            <div>
              <p className="section-kicker">Not just content</p>
              <h2 className="mt-4 text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                The community connects practice to real application moments.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
                Each session should help you do something practical: answer an
                interview question, write a better update, follow up with a
                recruiter or explain your role in English.
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6">
          <div className="click-feature-card mx-auto max-w-6xl rounded-[2.4rem] p-8 text-white shadow-[0_24px_90px_rgba(90,70,255,0.18)] sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="section-kicker text-white/70">Stay consistent</p>
                <h2 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl">
                  Join the path with other LATAM professionals.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
                  Practice weekly while building your verified profile and
                  applying with stronger signals.
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
