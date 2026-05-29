import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  MessageSquareText,
  Mic,
  PenLine,
  Play,
  Sparkles,
  Video,
} from "lucide-react";

import { AiTrainerMockup } from "@/components/landing/product-mockups";
import { PublicFooter } from "@/components/shared/public-footer";
import { PublicNav } from "@/components/shared/public-nav";
import { Button } from "@/components/ui/button";

const practiceModes = [
  {
    title: "Speaking practice",
    copy: "Practice answers out loud for interviews, meetings and role scenarios.",
    icon: Mic,
  },
  {
    title: "Mock interviews",
    copy: "Train the answers US remote hiring teams expect to hear clearly.",
    icon: Video,
  },
  {
    title: "Async writing",
    copy: "Improve Slack updates, follow-ups, blocker explanations and client messages.",
    icon: PenLine,
  },
  {
    title: "Role conversations",
    copy: "Customer support, sales, PM, design and other paths use different English.",
    icon: MessageSquareText,
  },
] as const;

const roleScenarios = [
  ["Customer Support", "Calm an angry customer", "Zendesk · Slack · Intercom"],
  ["Sales / SDR", "Handle a pricing objection", "HubSpot · CRM · Zoom"],
  ["Project Manager", "Explain a delayed deadline", "Asana · Notion · Meet"],
  ["Product Designer", "Present a design decision", "Figma · Slack · Handoff"],
] as const;

const feedbackAreas = [
  "Clarity",
  "Structure",
  "Professional tone",
  "Specificity",
  "Confidence",
  "Remote work fit",
] as const;

function TutorConversationMockup() {
  return (
    <div className="rounded-[2rem] border border-black/5 bg-white p-5 shadow-[0_24px_90px_rgba(7,9,12,0.1)] sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="section-kicker">AI tutor session</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.045em] sm:text-4xl">
            Interview English for Customer Support
          </h2>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-[#d0f5e3] px-4 py-2 text-sm font-extrabold text-emerald-900">
          <span className="size-2 rounded-full bg-emerald-500" />
          Live
        </span>
      </div>

      <div className="mt-7 grid gap-3">
        <div className="rounded-[1.4rem] bg-[#f8f8f7] p-4">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-neutral-400">Prompt</p>
          <p className="mt-2 text-lg font-extrabold tracking-[-0.035em]">
            Tell me about a time you handled a frustrated customer.
          </p>
        </div>
        <div className="rounded-[1.4rem] border border-[#6f45dd]/20 bg-[linear-gradient(135deg,#f3efff,#ffffff)] p-4">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[#6f45dd]">Your answer</p>
          <p className="mt-2 text-sm leading-6 text-neutral-700">
            I listened carefully, apologized for the issue and explained the next steps clearly...
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-[1.5rem] bg-black p-5 text-white">
        <div className="flex items-center justify-between">
          <p className="font-extrabold">Feedback score</p>
          <p className="text-3xl font-extrabold tracking-[-0.055em]">82/100</p>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {feedbackAreas.slice(0, 4).map((area) => (
            <div key={area} className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-bold">
              <Check className="size-3.5 text-[#d0f5e3]" />
              {area}
            </div>
          ))}
        </div>
      </div>

      <Button asChild className="mt-5 h-12 w-full rounded-full bg-black text-white hover:bg-black/90">
        <Link href="/signup">
          Start a practice session
          <Play className="size-4" />
        </Link>
      </Button>
    </div>
  );
}

export default function AiEnglishTrainerPage() {
  return (
    <>
      <PublicNav />
      <main className="overflow-hidden bg-white text-black">
        <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <div className="brand-chip mb-6">AI English Tutor</div>
            <h1 className="max-w-4xl text-6xl font-extrabold leading-[0.95] tracking-[-0.045em] sm:text-7xl lg:text-[5.6rem]">
              Practice the English your remote role actually requires.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-neutral-600 sm:text-2xl sm:leading-9">
              Inglevo helps LATAM talent practice interviews, spoken answers,
              async writing and role-specific conversations for US remote work.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="brand-button click-gradient-button h-12 rounded-full px-7">
                <Link href="/signup">
                  Start practicing
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full bg-white px-7">
                <Link href="/pricing">See pricing</Link>
              </Button>
            </div>
            <p className="mt-5 text-sm font-semibold text-neutral-500">
              Speaking · Interviews · Async writing · Role scenarios
            </p>
          </div>

          <TutorConversationMockup />
        </section>

        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-4">
            {practiceModes.map(({ title, copy, icon: Icon }) => (
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
              <p className="section-kicker">Role-based practice</p>
              <h2 className="mt-4 text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                Generic English is not enough for serious remote roles.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
                A support agent, SDR, PM and designer do not need the same
                English. The tutor is designed around the situations your role
                actually faces.
              </p>
            </div>

            <div className="grid gap-4">
              {roleScenarios.map(([role, scenario, tools], index) => (
                <article
                  key={role}
                  className={`rounded-[1.6rem] border p-5 shadow-sm ${
                    index === 0
                      ? "border-[#6f45dd]/25 bg-[linear-gradient(135deg,#f3efff,#ffffff)]"
                      : "border-border bg-white"
                  }`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-2xl font-extrabold tracking-[-0.04em]">{role}</h3>
                      <p className="mt-2 text-sm font-semibold text-neutral-600">{scenario}</p>
                    </div>
                    <span className="w-fit rounded-full bg-[#d0f5e3] px-3 py-2 text-xs font-black uppercase tracking-[0.1em] text-emerald-900">
                      {index === 0 ? "Open now" : "Preview"}
                    </span>
                  </div>
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-neutral-400">
                    Tools context: {tools}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
            <div>
              <p className="section-kicker">Feedback</p>
              <h2 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                Feedback that goes beyond grammar.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
                The goal is not to sound academic. The goal is to sound clear,
                professional and ready for the job context.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {feedbackAreas.map((area) => (
                  <div key={area} className="flex items-center gap-3 rounded-2xl border border-black/5 bg-[#f8f8f7] p-4 text-sm font-bold">
                    <BadgeCheck className="size-4 text-[#6f45dd]" />
                    {area}
                  </div>
                ))}
              </div>
            </div>
            <AiTrainerMockup />
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6">
          <div className="click-feature-card mx-auto max-w-6xl rounded-[2.4rem] p-8 text-white shadow-[0_24px_90px_rgba(90,70,255,0.18)] sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="section-kicker text-white/70">Start training</p>
                <h2 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl">
                  Your English should help you prove you can do the work.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
                  Practice the work conversations that matter before you apply.
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
