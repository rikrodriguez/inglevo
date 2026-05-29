import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  BriefcaseBusiness,
  CalendarClock,
  Check,
  CircleDollarSign,
  Clock,
  MessageSquareText,
  Sparkles,
} from "lucide-react";

import { PublicFooter } from "@/components/shared/public-footer";
import { PublicNav } from "@/components/shared/public-nav";
import { Button } from "@/components/ui/button";

const crmFeatures = [
  "Saved roles and salary ranges",
  "Application stages",
  "Interview notes",
  "Follow-up reminders",
  "Verified profile match",
  "Recruiter message tracking",
] as const;

const stages = [
  {
    title: "Saved",
    count: "7",
    cards: [
      ["Remote Support Specialist", "$1.8k-$2.4k/mo", "92% match"],
      ["Customer Success Associate", "$2.0k-$3.0k/mo", "88% match"],
    ],
  },
  {
    title: "Applied",
    count: "12",
    cards: [
      ["SDR Associate", "$2.2k-$3.5k/mo", "86% match"],
      ["VA for US Agency", "$1.4k-$2.1k/mo", "84% match"],
    ],
  },
  {
    title: "Interview",
    count: "3",
    cards: [
      ["Project Coordinator", "$2.5k-$4.2k/mo", "Interview Friday"],
      ["Support Lead", "$3.0k-$4.8k/mo", "Prep needed"],
    ],
  },
  {
    title: "Offer",
    count: "1",
    cards: [
      ["Operations Assistant", "$2.0k-$3.0k/mo", "Negotiation"],
    ],
  },
] as const;

const reminders = [
  ["Follow up with recruiter", "Today 4:00 PM", Bell],
  ["Prepare support conflict story", "Tomorrow", MessageSquareText],
  ["Review salary expectations", "Friday", CircleDollarSign],
] as const;

function JobCrmWorkspaceMockup() {
  return (
    <div className="rounded-[2rem] border border-black/5 bg-white p-4 shadow-[0_24px_90px_rgba(7,9,12,0.1)] sm:p-6">
      <div className="flex flex-col gap-4 border-b border-black/5 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="section-kicker">Job CRM Workspace</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.045em]">
            Application pipeline
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-[#d0f5e3] px-3 py-2 text-xs font-black text-emerald-900">
            34 active roles
          </span>
          <span className="rounded-full bg-black px-3 py-2 text-xs font-black text-white">
            5 follow-ups
          </span>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto pb-2">
        <div className="grid min-w-[920px] grid-cols-4 gap-4">
          {stages.map((stage) => (
            <div key={stage.title} className="rounded-[1.4rem] border border-black/5 bg-[#f8f8f7] p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-black uppercase tracking-[0.12em] text-neutral-500">
                  {stage.title}
                </p>
                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-black">
                  {stage.count}
                </span>
              </div>
              <div className="mt-4 grid gap-3">
                {stage.cards.map(([role, salary, status]) => (
                  <div key={role} className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-sm font-extrabold tracking-[-0.03em]">{role}</p>
                    <p className="mt-2 text-xs font-semibold text-neutral-500">{salary}</p>
                    <div className="mt-4 flex items-center justify-between gap-2">
                      <span className="rounded-full bg-[#f3efff] px-2.5 py-1 text-[0.65rem] font-black text-[#6f45dd]">
                        {status}
                      </span>
                      <BadgeCheck className="size-4 text-emerald-600" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function JobCrmSidePanelMockup() {
  return (
    <div className="rounded-[2rem] border border-black/5 bg-white p-5 shadow-[0_22px_80px_rgba(30,27,75,0.06)]">
      <p className="section-kicker">Next actions</p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.045em]">
        Follow-up system
      </h2>
      <div className="mt-6 grid gap-3">
        {reminders.map(([title, time, Icon]) => (
          <div key={title} className="flex items-start gap-3 rounded-2xl bg-[#f8f8f7] p-4">
            <div className="grid size-10 shrink-0 place-items-center rounded-full bg-white">
              <Icon className="size-4" />
            </div>
            <div>
              <p className="font-extrabold">{title}</p>
              <p className="mt-1 text-sm text-neutral-500">{time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-[1.5rem] bg-[linear-gradient(135deg,#7459f6,#5fb7f7_52%,#de61bf)] p-5 text-white">
        <p className="text-sm font-semibold text-white/70">Verified profile attached</p>
        <p className="mt-2 text-2xl font-extrabold tracking-[-0.045em]">
          inglevo.com/ricardorodriguez
        </p>
      </div>
    </div>
  );
}

export default function JobCrmPage() {
  return (
    <>
      <PublicNav />
      <main className="overflow-hidden bg-white text-black">
        <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="brand-chip mb-6">Job CRM</div>
            <h1 className="max-w-4xl text-6xl font-extrabold leading-[0.95] tracking-[-0.045em] sm:text-7xl lg:text-[5.4rem]">
              Manage your remote job search like a serious candidate.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-neutral-600 sm:text-2xl sm:leading-9">
              Track applications, interviews, salary ranges, follow-ups and
              verified profile usage in one organized workspace.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="brand-button click-gradient-button h-12 rounded-full px-7">
                <Link href="/signup">
                  Organize my search
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full bg-white px-7">
                <Link href="/job-marketplace">See job marketplace</Link>
              </Button>
            </div>
          </div>

          <JobCrmSidePanelMockup />
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <JobCrmWorkspaceMockup />
          </div>
        </section>

        <section className="bg-[#f4f2ef] px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="section-kicker">Why it matters</p>
              <h2 className="mt-4 text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                Applying randomly makes good candidates look average.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
                A CRM helps you track where you applied, who needs a follow-up,
                what salary range was offered and which roles match your
                verified profile.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {crmFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-4 text-sm font-bold shadow-sm">
                  <Check className="size-4 text-[#6f45dd]" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
            {[
              ["Save", "Keep roles, tools and salary expectations organized before applying.", BriefcaseBusiness],
              ["Prepare", "Use templates, interview practice and verified profile context.", Clock],
              ["Follow up", "Track reminders so your applications do not disappear.", CalendarClock],
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
                <p className="section-kicker text-white/70">Apply with structure</p>
                <h2 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl">
                  Better applications need a system.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
                  Keep your opportunities, follow-ups and verified profile in
                  one place.
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
