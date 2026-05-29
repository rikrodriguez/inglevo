import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  BriefcaseBusiness,
  Check,
  FileText,
  LibraryBig,
  LineChart,
  MonitorCheck,
  UsersRound,
  Wrench,
} from "lucide-react";

import {
  AiTrainerMockup,
  AnalyticsMockup,
  CertificateProfileMockup,
  JobCrmMockup,
  ResumeBuilderMockup,
} from "@/components/landing/product-mockups";
import { PublicFooter } from "@/components/shared/public-footer";
import { PublicNav } from "@/components/shared/public-nav";
import { Button } from "@/components/ui/button";

const coreFeatures = [
  {
    title: "AI English Tutor",
    copy: "Practice interviews, meetings, role vocabulary and written communication for US remote work.",
    icon: Bot,
  },
  {
    title: "Remote Setup Verification",
    copy: "Show stronger signals around internet, laptop, camera, microphone, workspace and availability.",
    icon: MonitorCheck,
  },
  {
    title: "Role Tools Verification",
    copy: "Build tool familiarity signals for workflows like support, sales, design, PM, engineering and ops.",
    icon: Wrench,
  },
  {
    title: "Verified Profile",
    copy: "Turn your progress into an active profile you can share in CVs, LinkedIn and applications.",
    icon: BadgeCheck,
  },
  {
    title: "CV Builder",
    copy: "Create a stronger CV with role-specific wording and your Inglevo Verified profile link.",
    icon: FileText,
  },
  {
    title: "Job CRM",
    copy: "Track saved roles, applications, interviews, follow-ups and next steps like a serious candidate.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Templates Library",
    copy: "Use recruiter messages, follow-ups, salary scripts and role-specific application assets.",
    icon: LibraryBig,
  },
  {
    title: "Progress Analytics",
    copy: "See profile strength, practice progress and the signals that still need work.",
    icon: LineChart,
  },
] as const;

const signalRows = [
  ["English", "role interviews, async writing, speaking confidence"],
  ["Setup", "internet, laptop, camera, microphone, workspace"],
  ["Tools", "Slack, Zendesk, HubSpot, Figma, GitHub, Jira and more"],
  ["Profile", "active verification link and candidate proof"],
] as const;

const workflow = [
  ["01", "Practice", "Train the English and scenarios your target role actually requires."],
  ["02", "Verify", "Build signals around communication, setup, tools and professionalism."],
  ["03", "Package", "Turn progress into a CV, profile, templates and application system."],
  ["04", "Apply", "Use stronger proof when applying to US remote opportunities."],
] as const;

function SignalSystemMockup() {
  return (
    <div className="rounded-[2rem] border border-black/5 bg-white p-5 shadow-[0_24px_90px_rgba(7,9,12,0.1)] sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="section-kicker">Verification system</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.045em] sm:text-4xl">
            One profile. Multiple trust signals.
          </h2>
        </div>
        <div className="rounded-full bg-[#d0f5e3] px-4 py-2 text-sm font-extrabold">
          Active
        </div>
      </div>
      <div className="mt-7 grid gap-3">
        {signalRows.map(([label, detail]) => (
          <div key={label} className="flex gap-4 rounded-[1.35rem] border border-border bg-[#f8f8f7] p-4">
            <div className="grid size-10 shrink-0 place-items-center rounded-full bg-white">
              <Check className="size-4" />
            </div>
            <div>
              <p className="font-extrabold">{label} verified</p>
              <p className="mt-1 text-sm leading-6 text-neutral-600">{detail}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-[1.5rem] bg-black p-5 text-white">
        <p className="text-sm font-semibold text-white/60">Public profile link</p>
        <p className="mt-2 truncate text-lg font-extrabold">inglevo.com/ricardorodriguez</p>
      </div>
    </div>
  );
}

export default function FeaturesPage() {
  return (
    <>
      <PublicNav />
      <main className="overflow-hidden bg-white text-black">
        <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <div className="brand-chip mb-6">Product features</div>
            <h1 className="max-w-4xl text-6xl font-extrabold leading-[0.95] tracking-[-0.045em] sm:text-7xl lg:text-[5.6rem]">
              Everything you need to build a verified remote profile.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-neutral-600 sm:text-2xl sm:leading-9">
              Inglevo combines role English practice, remote setup checks,
              tool-based signals, CV assets and job tracking into one career
              system for LATAM talent.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="brand-button click-gradient-button h-12 rounded-full px-7">
                <Link href="/signup">
                  Start for free
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full bg-white px-7">
                <Link href="/pricing">See pricing</Link>
              </Button>
            </div>
          </div>

          <SignalSystemMockup />
        </section>

        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="section-kicker">Core system</p>
              <h2 className="mt-4 text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                Features that turn practice into stronger hiring signals.
              </h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {coreFeatures.map(({ title, copy, icon: Icon }, index) => (
                <article
                  key={title}
                  className={`landing-card ${index === 3 ? "click-feature-card border-white/25 text-white" : ""}`}
                >
                  <div className={index === 3 ? "grid size-11 place-items-center rounded-2xl bg-white/20" : "click-icon-tile"}>
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-7 text-2xl font-extrabold tracking-[-0.04em]">{title}</h3>
                  <p className={`mt-3 text-sm leading-6 ${index === 3 ? "text-white/75" : "text-neutral-600"}`}>
                    {copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-4">
            {workflow.map(([step, title, copy]) => (
              <article key={step} className="rounded-[1.8rem] border border-border bg-[#f8f8f7] p-6">
                <p className="mono-stat text-sm text-neutral-400">{step}</p>
                <h3 className="mt-8 text-2xl font-extrabold tracking-[-0.04em]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
            <div className="lg:col-span-2">
              <p className="section-kicker">Product modules</p>
              <h2 className="mt-4 max-w-4xl text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                A practical workspace for becoming a stronger candidate.
              </h2>
            </div>
            <AiTrainerMockup />
            <ResumeBuilderMockup />
            <JobCrmMockup />
            <CertificateProfileMockup />
            <AnalyticsMockup />
            <div className="rounded-[2rem] border border-black/5 bg-black p-7 text-white shadow-[0_24px_90px_rgba(7,9,12,0.12)]">
              <div className="grid size-12 place-items-center rounded-2xl bg-white/10">
                <UsersRound className="size-5" />
              </div>
              <h3 className="mt-8 text-3xl font-extrabold tracking-[-0.045em]">
                Community and live role calls
              </h3>
              <p className="mt-4 max-w-md text-sm leading-6 text-white/65">
                Keep momentum with live practice sessions, mock interview
                formats and role-specific English support.
              </p>
              <div className="mt-6 grid gap-2">
                {["Mock Interview Fridays", "English for Customer Service", "English for SDRs"].map((item) => (
                  <div key={item} className="rounded-full bg-white/10 px-4 py-3 text-sm font-bold">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6">
          <div className="click-feature-card mx-auto max-w-6xl rounded-[2.4rem] p-8 text-white shadow-[0_24px_90px_rgba(90,70,255,0.18)] sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="section-kicker text-white/70">Start building signals</p>
                <h2 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl">
                  Your profile should show proof, not just claims.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
                  Use Inglevo to improve, verify and package the signals that
                  help you compete for stronger US remote opportunities.
                </p>
              </div>
              <Button asChild variant="secondary" className="h-12 rounded-full px-7">
                <Link href="/signup">
                  Start for free
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
