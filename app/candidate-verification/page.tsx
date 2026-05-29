import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ClipboardCheck,
  FileCheck2,
  Filter,
  MonitorCheck,
  Search,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Wrench,
} from "lucide-react";

import { PublicFooter } from "@/components/shared/public-footer";
import { PublicNav } from "@/components/shared/public-nav";
import { Button } from "@/components/ui/button";

const verificationLayers = [
  {
    title: "Role English",
    copy: "Can the candidate communicate in English for the job, not just pass a generic level claim?",
    icon: BadgeCheck,
    checks: ["Interview answers", "Async updates", "Role vocabulary", "Professional tone"],
  },
  {
    title: "Remote Setup",
    copy: "Does the candidate have the basic environment to work reliably with a US remote team?",
    icon: MonitorCheck,
    checks: ["Internet", "Camera", "Microphone", "Workspace"],
  },
  {
    title: "Role Tools",
    copy: "Can the candidate handle realistic tool-based situations for support, sales, PM, design, ops or engineering?",
    icon: Wrench,
    checks: ["Slack", "Zendesk", "HubSpot", "Figma / Jira"],
  },
  {
    title: "Professional Signals",
    copy: "Does the profile show ownership, clarity, follow-through and a more serious candidate posture?",
    icon: UsersRound,
    checks: ["Responsiveness", "Follow-up", "Ownership", "Reliability"],
  },
] as const;

const scoreRows = [
  ["English for role", "84/100", "Verified"],
  ["Remote setup", "Passed", "Verified"],
  ["Role tools", "81/100", "Verified"],
  ["Professional signals", "Active", "Verified"],
] as const;

const comparisonRows = [
  ["English", "“Advanced English” claim", "Role communication verified"],
  ["Setup", "No proof of work environment", "Internet, camera and workspace signals"],
  ["Tools", "Listed tools on CV", "Scenario-based tool familiarity"],
  ["Profile", "Static resume", "Active verification profile"],
  ["Screening", "Manual guesswork", "Clearer pre-interview signals"],
] as const;

function CandidateProfileMockup() {
  return (
    <div className="rounded-[2rem] border border-black/5 bg-white p-5 shadow-[0_24px_90px_rgba(7,9,12,0.1)] sm:p-7">
      <div className="flex items-center justify-between gap-4 border-b border-black/5 pb-5">
        <div className="flex items-center gap-3">
          <div className="grid size-12 place-items-center rounded-full bg-[linear-gradient(135deg,#7459f6,#5fb7f7_55%,#de61bf)] text-base font-extrabold text-white">
            AT
          </div>
          <div>
            <p className="text-lg font-extrabold tracking-[-0.04em]">Ana Torres</p>
            <p className="text-sm text-neutral-500">Customer Support · LATAM</p>
          </div>
        </div>
        <span className="rounded-full bg-[#d0f5e3] px-4 py-2 text-sm font-extrabold text-[#07472f]">
          Active
        </span>
      </div>

      <div className="mt-6 grid gap-3">
        {scoreRows.map(([label, score, status]) => (
          <div key={label} className="flex items-center justify-between gap-4 rounded-2xl bg-[#f8f8f7] p-4">
            <div className="flex items-center gap-3">
              <div className="grid size-8 place-items-center rounded-full bg-white">
                <Check className="size-4 text-[#6f45dd]" />
              </div>
              <div>
                <p className="font-extrabold">{label}</p>
                <p className="text-xs font-bold text-neutral-400">{status}</p>
              </div>
            </div>
            <p className="text-sm font-extrabold text-neutral-700">{score}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-[1.4rem] border border-black/5 p-4">
        <p className="section-kicker">Public profile</p>
        <p className="mt-2 truncate text-sm font-bold text-neutral-600">
          inglevo.com/ana-torres
        </p>
      </div>
    </div>
  );
}

function ScreeningMockup() {
  const candidates = [
    ["Ana Torres", "Customer Support", "84/100", "Strong match"],
    ["Mateo Ruiz", "Project Manager", "81/100", "Review"],
    ["Camila Vega", "Sales Rep", "78/100", "Review"],
  ];

  return (
    <div className="rounded-[2rem] border border-black/5 bg-white p-5 shadow-[0_24px_90px_rgba(7,9,12,0.08)] sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="section-kicker">Screening view</p>
          <h3 className="mt-3 text-3xl font-extrabold tracking-[-0.045em]">
            Filter by proof, not claims.
          </h3>
        </div>
        <div className="grid size-11 place-items-center rounded-full border border-black/10">
          <Search className="size-5" />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[0.62fr_1fr]">
        <div className="rounded-[1.5rem] bg-[#f8f8f7] p-4">
          <div className="flex items-center gap-2 text-sm font-extrabold">
            <Filter className="size-4" />
            Filters
          </div>
          <div className="mt-4 grid gap-2">
            {["English 80+", "Setup passed", "Zendesk", "EST overlap"].map((filter) => (
              <span key={filter} className="rounded-full bg-white px-4 py-3 text-sm font-bold">
                {filter}
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-3">
          {candidates.map(([name, role, score, status], index) => (
            <article key={name} className="flex items-center gap-3 rounded-[1.35rem] border border-border bg-white p-3">
              <div className="grid size-10 shrink-0 place-items-center rounded-full bg-[#f3efff] text-xs font-extrabold text-[#6f45dd]">
                {name.split(" ").map((part) => part[0]).join("")}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-extrabold tracking-[-0.03em]">{name}</p>
                <p className="truncate text-sm text-neutral-500">{role} · LATAM</p>
              </div>
              <div className="text-right">
                <p className={`rounded-full px-3 py-1 text-sm font-extrabold ${index === 0 ? "bg-[#d0f5e3]" : "bg-[#f3efff] text-[#6f45dd]"}`}>
                  {score}
                </p>
                <p className="mt-1 text-xs font-bold text-neutral-400">{status}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CandidateVerificationPage() {
  return (
    <>
      <PublicNav />
      <main className="overflow-hidden bg-white text-black">
        <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <div className="brand-chip mb-6">Candidate Verification</div>
            <h1 className="max-w-4xl text-6xl font-extrabold leading-[0.95] tracking-[-0.045em] sm:text-7xl lg:text-[5.35rem]">
              Verify LATAM candidates before the first interview.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-neutral-600 sm:text-2xl sm:leading-9">
              Inglevo helps hiring teams see clearer proof of role English,
              remote setup, role tools and professional signals before spending
              time in interviews.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="brand-button click-gradient-button h-12 rounded-full px-7">
                <Link href="/hire-latam-talent">
                  Hire LATAM talent
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full bg-white px-7">
                <Link href="/employers">For employers</Link>
              </Button>
            </div>
            <p className="mt-5 text-sm font-semibold text-neutral-500">
              Verification supports screening. It does not replace interviews or final hiring decisions.
            </p>
          </div>

          <CandidateProfileMockup />
        </section>

        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="section-kicker">What Inglevo verifies</p>
              <h2 className="mt-4 text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                A verified profile turns candidate claims into clearer signals.
              </h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {verificationLayers.map(({ title, copy, icon: Icon, checks }) => (
                <article key={title} className="landing-card">
                  <div className="click-icon-tile">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-7 text-2xl font-extrabold tracking-[-0.04em]">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">{copy}</p>
                  <div className="mt-6 grid gap-2">
                    {checks.map((check) => (
                      <span key={check} className="rounded-full bg-[#f8f8f7] px-3 py-2 text-xs font-bold text-neutral-600">
                        {check}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f4f2ef] px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="section-kicker">Why it matters</p>
              <h2 className="mt-4 text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                Generic resumes make hiring teams guess.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
                Candidate verification gives your team a faster way to compare
                practical signals before scheduling calls. It makes the first
                interview more focused.
              </p>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-[0_24px_90px_rgba(7,9,12,0.08)]">
              <div className="grid grid-cols-[0.8fr_1fr_1fr] border-b border-border bg-[#fbfaf8] px-5 py-4 text-sm font-extrabold">
                <span>Area</span>
                <span>Traditional applicant</span>
                <span>Inglevo Verified</span>
              </div>
              {comparisonRows.map(([area, oldWay, newWay]) => (
                <div key={area} className="grid grid-cols-[0.8fr_1fr_1fr] gap-3 border-b border-border px-5 py-5 last:border-b-0">
                  <p className="font-extrabold">{area}</p>
                  <p className="text-neutral-500">{oldWay}</p>
                  <p className="font-extrabold">{newWay}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <ScreeningMockup />
            <div>
              <p className="section-kicker">Screening workflow</p>
              <h2 className="mt-4 text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                See who is worth interviewing first.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
                Filter candidates by verified areas, role fit and practical
                signals. Your team still interviews and decides, but with less
                noise at the top of the funnel.
              </p>
              <div className="mt-7 grid gap-3">
                {[
                  "Prioritize candidates with active verified profiles.",
                  "Review English, setup and role tools in one place.",
                  "Use verification as context before the interview.",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-[#f8f8f7] p-4 text-sm font-bold">
                    <Check className="size-4 text-[#6f45dd]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-7xl rounded-[2.4rem] border border-black/5 bg-white p-8 shadow-[0_24px_90px_rgba(7,9,12,0.08)] sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="section-kicker">Designed for trust</p>
                <h2 className="mt-4 text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                  Proof over claims.
                </h2>
                <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
                  Inglevo is building a candidate trust layer for LATAM remote
                  hiring. The goal is not to guarantee outcomes. The goal is to
                  make serious candidates easier to evaluate.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  [ClipboardCheck, "Pre-interview context", "Use verified signals before the first call."],
                  [FileCheck2, "Active profile link", "Review a shareable profile instead of only a CV."],
                  [ShieldCheck, "Lower uncertainty", "Reduce guesswork around communication and setup."],
                  [Sparkles, "Stronger shortlist", "Focus interviews on candidates with clearer proof."],
                ].map(([Icon, title, copy]) => (
                  <article key={title as string} className="rounded-[1.5rem] bg-[#f8f8f7] p-5">
                    <Icon className="size-5 text-[#6f45dd]" />
                    <h3 className="mt-5 text-xl font-extrabold tracking-[-0.04em]">{title as string}</h3>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">{copy as string}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6">
          <div className="click-feature-card mx-auto max-w-6xl rounded-[2.4rem] p-8 text-white shadow-[0_24px_90px_rgba(90,70,255,0.18)] sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="section-kicker text-white/70">Employer access</p>
                <h2 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl">
                  Want to review verified LATAM candidates?
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
                  Start with a focused hiring conversation around the roles,
                  signals and candidate filters your team needs.
                </p>
              </div>
              <Button asChild variant="secondary" className="h-12 rounded-full px-7">
                <Link href="/hire-latam-talent">
                  Hire LATAM talent
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
