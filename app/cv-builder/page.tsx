import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Download,
  FileText,
  Sparkles,
  Wand2,
} from "lucide-react";

import { PublicFooter } from "@/components/shared/public-footer";
import { PublicNav } from "@/components/shared/public-nav";
import { Button } from "@/components/ui/button";

const cvFeatures = [
  "Role-specific professional summary",
  "Achievement bullets for US recruiters",
  "Inglevo Verified profile link",
  "ATS-friendly structure",
  "Remote work positioning",
  "LinkedIn and recruiter copy",
] as const;

const bulletSuggestions = [
  "Reduced first-response time by improving support macros and follow-up clarity.",
  "Handled customer escalations with professional tone across Slack and Zendesk.",
  "Documented recurring issues and shared weekly updates with remote managers.",
] as const;

const sections = [
  ["Profile", "A sharper summary for the remote role you want."],
  ["Experience", "Bullets rewritten around outcomes, tools and ownership."],
  ["Verification", "Your Inglevo profile link included as a trust signal."],
  ["Export", "A clean CV structure ready to share or improve further."],
] as const;

function CvBuilderWorkspaceMockup() {
  return (
    <div className="rounded-[2rem] border border-black/5 bg-white p-4 shadow-[0_24px_90px_rgba(7,9,12,0.1)] sm:p-6">
      <div className="flex flex-col gap-3 border-b border-black/5 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="section-kicker">CV Builder Workspace</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.045em]">
            Customer Support Specialist CV
          </h2>
        </div>
        <div className="flex gap-2">
          <span className="rounded-full bg-[#d0f5e3] px-3 py-2 text-xs font-black text-emerald-900">
            ATS 91%
          </span>
          <span className="rounded-full bg-black px-3 py-2 text-xs font-black text-white">
            PDF ready
          </span>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="grid gap-3">
          <div className="rounded-[1.4rem] bg-[#f8f8f7] p-4">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-neutral-400">
              Role target
            </p>
            <p className="mt-2 text-xl font-extrabold tracking-[-0.04em]">
              Remote Customer Support
            </p>
            <p className="mt-2 text-sm text-neutral-600">Zendesk · Slack · Intercom</p>
          </div>

          <div className="rounded-[1.4rem] border border-[#6f45dd]/20 bg-[linear-gradient(135deg,#f3efff,#ffffff)] p-4">
            <div className="flex items-center gap-2">
              <Wand2 className="size-4 text-[#6f45dd]" />
              <p className="text-sm font-extrabold">Suggested bullets</p>
            </div>
            <div className="mt-4 grid gap-2">
              {bulletSuggestions.map((bullet) => (
                <div key={bullet} className="rounded-2xl bg-white p-3 text-xs leading-5 text-neutral-700 shadow-sm">
                  {bullet}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.4rem] bg-black p-4 text-white">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-white/45">
              Verified link
            </p>
            <p className="mt-2 truncate text-sm font-extrabold">
              inglevo.com/ricardorodriguez
            </p>
          </div>
        </div>

        <div className="rounded-[1.4rem] border border-black/10 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-3xl font-extrabold tracking-[-0.055em]">
                Ricardo Rodriguez
              </p>
              <p className="mt-1 text-sm font-semibold text-neutral-500">
                Customer Support Specialist · LATAM Remote
              </p>
            </div>
            <FileText className="size-7 text-neutral-400" />
          </div>

          <div className="mt-5 rounded-2xl bg-[#f8f8f7] p-4">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-neutral-400">
              Professional summary
            </p>
            <p className="mt-3 text-sm leading-6 text-neutral-700">
              Customer support specialist with experience handling remote
              customer conversations, ticket follow-ups and escalation updates
              in English.
            </p>
          </div>

          <div className="mt-5 grid gap-3">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-neutral-400">
              Experience bullets
            </p>
            {bulletSuggestions.map((bullet) => (
              <div key={bullet} className="flex gap-3 rounded-2xl border border-black/5 p-3 text-sm leading-6">
                <Check className="mt-1 size-4 shrink-0 text-[#6f45dd]" />
                {bullet}
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-3 rounded-2xl bg-[#d0f5e3] p-4 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <p className="text-sm font-extrabold">Inglevo Verified Profile</p>
              <p className="mt-1 text-xs font-semibold text-emerald-900/70">
                Role English · Setup · Tools verified
              </p>
            </div>
            <span className="rounded-full bg-white px-3 py-2 text-xs font-black">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniResumePreview() {
  return (
    <div className="rounded-[2rem] border border-black/5 bg-[#fbfbfd] p-5 shadow-[0_22px_80px_rgba(30,27,75,0.06)]">
      <div className="rounded-[1.5rem] bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-extrabold tracking-[-0.05em]">CV preview</p>
            <p className="mt-1 text-sm text-neutral-500">ATS-friendly layout</p>
          </div>
          <Download className="size-6" />
        </div>
        <div className="mt-6 grid gap-3">
          {sections.map(([title, copy]) => (
            <div key={title} className="rounded-2xl border border-black/5 bg-[#f8f8f7] p-4">
              <p className="font-extrabold">{title}</p>
              <p className="mt-1 text-sm leading-6 text-neutral-600">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CvBuilderPage() {
  return (
    <>
      <PublicNav />
      <main className="overflow-hidden bg-white text-black">
        <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="brand-chip mb-6">CV Builder</div>
            <h1 className="max-w-4xl text-6xl font-extrabold leading-[0.95] tracking-[-0.045em] sm:text-7xl lg:text-[5.4rem]">
              Build a CV that supports your verified profile.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-neutral-600 sm:text-2xl sm:leading-9">
              Turn your experience into clearer role-specific bullets, stronger
              remote positioning and an Inglevo Verified link recruiters can
              review.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="brand-button click-gradient-button h-12 rounded-full px-7">
                <Link href="/signup">
                  Build my CV
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full bg-white px-7">
                <Link href="/verification-profile">See verified profile</Link>
              </Button>
            </div>
          </div>

          <MiniResumePreview />
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <CvBuilderWorkspaceMockup />
          </div>
        </section>

        <section className="bg-[#f4f2ef] px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="section-kicker">What it improves</p>
              <h2 className="mt-4 text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                Your CV should make your value easier to understand.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
                The goal is not a prettier document. The goal is clearer
                positioning for US remote roles.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {cvFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-4 text-sm font-bold shadow-sm">
                  <BadgeCheck className="size-4 text-[#6f45dd]" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
            {[
              ["Before", "Generic CV with tasks, weak English positioning and no verification link."],
              ["Builder", "Role-specific bullets, remote context and sharper professional summary."],
              ["After", "CV connected to your active Inglevo Verified profile."],
            ].map(([title, copy], index) => (
              <article
                key={title}
                className={`rounded-[1.8rem] p-6 ${
                  index === 2
                    ? "bg-[linear-gradient(135deg,#7459f6,#5fb7f7_52%,#de61bf)] text-white"
                    : "border border-black/5 bg-white shadow-sm"
                }`}
              >
                <p className={`section-kicker ${index === 2 ? "text-white/65" : ""}`}>{title}</p>
                <p className="mt-6 text-2xl font-extrabold leading-tight tracking-[-0.045em]">
                  {copy}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6">
          <div className="click-feature-card mx-auto max-w-6xl rounded-[2.4rem] p-8 text-white shadow-[0_24px_90px_rgba(90,70,255,0.18)] sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="section-kicker text-white/70">Career asset</p>
                <h2 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl">
                  Your CV and verified profile should work together.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
                  Build the document and the trust signal behind it.
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
