import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  FileText,
  GraduationCap,
  Laptop,
  ShieldCheck,
  Wrench,
} from "lucide-react";

import { PublicFooter } from "@/components/shared/public-footer";
import { PublicNav } from "@/components/shared/public-nav";
import { Button } from "@/components/ui/button";

const pathSteps = [
  ["01", "Improve role English", "Practice interviews, async updates, meetings and role-specific communication."],
  ["02", "Verify your setup", "Show your internet, laptop, camera, microphone, workspace and availability signals."],
  ["03", "Verify role tools", "Build proof around tools your role uses, like Slack, Zendesk, HubSpot, Figma or GitHub."],
  ["04", "Apply stronger", "Use your verified profile, CV, templates and Job CRM to compete for US remote opportunities."],
] as const;

const included = [
  ["AI English Tutor", "Train the English your target role actually requires.", GraduationCap],
  ["Verified Profile", "Share one active link with English, setup and tools verified.", ShieldCheck],
  ["Remote Setup Check", "Turn your work environment into a stronger trust signal.", Laptop],
  ["Role Tools Verification", "Show practical familiarity with the tools used in remote teams.", Wrench],
  ["CV Builder", "Position your experience for US remote job applications.", FileText],
  ["Job CRM", "Track roles, follow-ups, interviews and next actions.", BriefcaseBusiness],
] as const;

const roles = [
  "Customer Support",
  "Sales / SDR",
  "Project Manager",
  "Software Engineer",
  "Product Designer",
  "Virtual Assistant",
  "Marketing",
  "Operations",
] as const;

export default function ForTalentPage() {
  return (
    <>
      <PublicNav />
      <main className="bg-white text-black">
        <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:py-24">
          <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(circle_at_18%_12%,rgba(123,63,242,0.12),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(56,189,248,0.14),transparent_30%)]" />
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="motion-rise">
              <p className="inline-flex rounded-full bg-[#f6f2ff] px-3.5 py-2 text-sm font-bold text-[#6f45dd]">
                Built for LATAM talent pursuing US remote jobs
              </p>
              <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[0.95] tracking-[-0.07em] sm:text-7xl">
                Improve your English. Get verified. Access US remote jobs.
              </h1>
              <p className="mt-7 max-w-2xl text-xl leading-8 text-neutral-700">
                Improve your role English, verify your remote setup and tools,
                and apply with a profile that gives US companies clearer proof
                before the first interview.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-12 rounded-full bg-black px-7 text-white hover:bg-black/90">
                  <Link href="/signup">
                    Start my path
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-12 rounded-full border-black/10 bg-white px-7">
                  <Link href="/pricing">See pricing</Link>
                </Button>
              </div>
            </div>

            <TalentProfileMockup />
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
            {[
              ["Role English", "Practice the communication your target job actually requires."],
              ["Verified setup", "Show that your environment can support serious remote work."],
              ["Verified profile", "Apply with one active profile link instead of unsupported claims."],
            ].map(([title, copy]) => (
              <article key={title} className="rounded-[1.7rem] border border-black/5 bg-white p-6 shadow-[0_22px_80px_rgba(30,27,75,0.06)]">
                <BadgeCheck className="size-5 text-[#6f45dd]" />
                <h2 className="mt-5 text-2xl font-semibold tracking-[-0.045em]">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] border border-black/5 bg-[#fbfbfd] p-7 shadow-[0_24px_90px_rgba(30,27,75,0.07)] sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
                What Inglevo helps you build
              </p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.06em] sm:text-5xl">
                A verified candidate profile for the remote job market.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-neutral-600">
                Inglevo is not a generic English course. It is a focused path
                to improve the signals that matter when US companies review
                LATAM remote candidates.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {included.map(([title, copy, Icon]) => (
                <article key={title} className="rounded-3xl border border-black/5 bg-white p-4 shadow-sm">
                  <div className="flex gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-[#f3efff] text-[#6f45dd]">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold">{title}</h3>
                      <p className="mt-2 text-xs leading-5 text-neutral-500">{copy}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
                How it works
              </p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.06em] sm:text-5xl">
                Improve. Verify. Apply stronger.
              </h2>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-4">
              {pathSteps.map(([number, title, copy]) => (
                <article key={title} className="rounded-[1.7rem] border border-black/5 bg-white p-6 shadow-[0_22px_80px_rgba(30,27,75,0.06)]">
                  <span className="grid size-10 place-items-center rounded-full bg-[linear-gradient(135deg,#7459f6,#5fb7f7,#de61bf)] text-xs font-black text-white">
                    {number}
                  </span>
                  <h3 className="mt-6 text-xl font-semibold tracking-[-0.04em]">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Role paths
              </p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.06em] sm:text-5xl">
                Verify for the role you actually want.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-neutral-600">
                Customer Support is the first open path. Other role paths will
                expand the same verification logic to more remote job profiles.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {roles.map((role, index) => (
                <div key={role} className={`rounded-3xl border p-5 ${index === 0 ? "border-[#6f45dd]/25 bg-[linear-gradient(135deg,#f3efff,#ffffff)]" : "border-black/5 bg-white"}`}>
                  <p className="text-lg font-semibold tracking-[-0.04em]">{role}</p>
                  <p className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-neutral-400">
                    {index === 0 ? "Open path" : "Roadmap"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
            <article className="rounded-[2rem] border border-black/5 bg-[#f8f8f7] p-7 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Before
              </p>
              {["Generic CV", "Advanced English claim", "No setup proof", "No active profile"].map((item) => (
                <div key={item} className="mt-3 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-neutral-600">
                  {item}
                </div>
              ))}
            </article>
            <article className="rounded-[2rem] bg-[linear-gradient(135deg,#7459f6,#5fb7f7_52%,#de61bf)] p-7 text-white sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/65">
                With Inglevo
              </p>
              {["Role English verified", "Remote setup checked", "Role tools checked", "Public active profile"].map((item) => (
                <div key={item} className="mt-3 flex items-center gap-3 rounded-2xl bg-white/15 px-4 py-3 text-sm font-bold backdrop-blur">
                  <Check className="size-4" />
                  {item}
                </div>
              ))}
            </article>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-[2rem] bg-[#f4f2ef] p-7 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Next step
              </p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.055em]">
                Start building the profile US remote opportunities can understand faster.
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-12 rounded-full bg-black px-7 text-white hover:bg-black/90">
                <Link href="/signup">Start free</Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full border-black/10 bg-white px-7">
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}

function TalentProfileMockup() {
  return (
    <div className="mockup-float rounded-[2rem] border border-black/5 bg-white p-4 shadow-[0_30px_90px_rgba(30,27,75,0.13)]">
      <div className="rounded-[1.6rem] bg-[#fbfbfd] p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-neutral-400">
              Inglevo Verified Profile
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.045em]">
              Ricardo Rodriguez
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Customer Support · LATAM
            </p>
          </div>
          <span className="rounded-full bg-[#d0f5e3] px-3 py-1 text-xs font-black uppercase tracking-[0.1em] text-emerald-800">
            Active
          </span>
        </div>

        <div className="mt-7 grid gap-3">
          {[
            ["Role English", "82/100"],
            ["Remote Setup", "Passed"],
            ["Role Tools", "Verified"],
            ["Profile Link", "Active"],
          ].map(([label, value], index) => (
            <div key={label} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm">
              <div className="flex items-center gap-3">
                <span className={`grid size-8 place-items-center rounded-full ${index === 0 ? "bg-[#f3efff] text-[#6f45dd]" : "bg-[#d0f5e3] text-emerald-700"}`}>
                  <Check className="size-4" />
                </span>
                <span className="text-sm font-semibold">{label}</span>
              </div>
              <span className="rounded-full bg-[#f8f8f7] px-3 py-1 text-xs font-bold text-neutral-700">
                {value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-3xl bg-[linear-gradient(135deg,#7459f6,#5fb7f7_52%,#de61bf)] p-5 text-white">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-white/65">
            Shareable signal
          </p>
          <p className="mt-3 text-xl font-semibold tracking-[-0.045em]">
            inglevo.com/ricardorodriguez
          </p>
          <p className="mt-2 text-sm text-white/70">
            Add it to your CV, LinkedIn and applications.
          </p>
        </div>
      </div>
    </div>
  );
}
