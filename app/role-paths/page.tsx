import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Code2,
  Headphones,
  Megaphone,
  Palette,
  Sparkles,
  UsersRound,
} from "lucide-react";

import { PublicFooter } from "@/components/shared/public-footer";
import { PublicNav } from "@/components/shared/public-nav";
import { Button } from "@/components/ui/button";

const rolePaths = [
  {
    role: "Customer Support",
    status: "Open now",
    tools: ["Zendesk", "Intercom", "Slack"],
    scenarios: ["Angry customer", "Refund policy", "Ticket update", "Escalation"],
    score: "92%",
    icon: Headphones,
  },
  {
    role: "Sales / SDR",
    status: "Preview",
    tools: ["HubSpot", "GHL", "Zoom"],
    scenarios: ["Pricing objection", "Discovery call", "CRM note", "Follow-up"],
    score: "86%",
    icon: Megaphone,
  },
  {
    role: "Project Manager",
    status: "Preview",
    tools: ["Asana", "Notion", "Slack"],
    scenarios: ["Deadline risk", "Meeting summary", "Stakeholder update", "Scope change"],
    score: "81%",
    icon: BriefcaseBusiness,
  },
  {
    role: "Product Designer",
    status: "Preview",
    tools: ["Figma", "Notion", "Meet"],
    scenarios: ["Design rationale", "Client feedback", "Handoff", "UX decision"],
    score: "84%",
    icon: Palette,
  },
  {
    role: "Software Engineer",
    status: "Preview",
    tools: ["GitHub", "Jira", "Linear"],
    scenarios: ["Standup blocker", "Bug explanation", "Code review", "Trade-off"],
    score: "79%",
    icon: Code2,
  },
  {
    role: "Virtual Assistant",
    status: "Preview",
    tools: ["G-Suite", "Calendly", "ClickUp"],
    scenarios: ["Calendar change", "Client update", "Priorities", "CRM update"],
    score: "84%",
    icon: UsersRound,
  },
] as const;

const pathLayers = [
  ["Role English", "Vocabulary, answers and conversations specific to the job."],
  ["Tool context", "Simulated tasks around tools the role commonly uses."],
  ["Remote communication", "Meetings, updates, follow-ups and async writing."],
  ["Verified profile", "Signals packaged into one profile recruiters can review."],
] as const;

function RolePathPreviewMockup() {
  const featured = rolePaths[0];
  const Icon = featured.icon;

  return (
    <div className="rounded-[2rem] border border-black/5 bg-white p-5 shadow-[0_24px_90px_rgba(7,9,12,0.1)] sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="section-kicker">Role path preview</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-[-0.055em]">
            {featured.role}
          </h2>
          <p className="mt-2 text-sm font-semibold text-neutral-500">
            Tools: {featured.tools.join(" · ")}
          </p>
        </div>
        <div className="grid size-14 place-items-center rounded-2xl bg-[linear-gradient(135deg,#7459f6,#5fb7f7_52%,#de61bf)] text-white">
          <Icon className="size-6" />
        </div>
      </div>

      <div className="mt-6 rounded-[1.5rem] bg-[linear-gradient(135deg,#f3efff,#ffffff)] p-5">
        <div className="flex items-center justify-between">
          <p className="font-extrabold">Verification match</p>
          <p className="text-4xl font-extrabold tracking-[-0.055em] text-[#6f45dd]">
            {featured.score}
          </p>
        </div>
        <div className="mt-4 h-2 rounded-full bg-white">
          <div className="h-full w-[92%] rounded-full bg-[linear-gradient(90deg,#7459f6,#5fb7f7,#de61bf)]" />
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {featured.scenarios.map((scenario) => (
          <div key={scenario} className="rounded-2xl border border-black/5 bg-[#f8f8f7] p-4 text-sm font-bold">
            {scenario}
          </div>
        ))}
      </div>
      <Button asChild className="mt-5 h-12 w-full rounded-full bg-black text-white hover:bg-black/90">
        <Link href="/signup">
          Start Customer Support path
          <ArrowRight />
        </Link>
      </Button>
    </div>
  );
}

export default function RolePathsPage() {
  return (
    <>
      <PublicNav />
      <main className="overflow-hidden bg-white text-black">
        <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="brand-chip mb-6">Role Paths</div>
            <h1 className="max-w-4xl text-6xl font-extrabold leading-[0.95] tracking-[-0.045em] sm:text-7xl lg:text-[5.4rem]">
              Verify for the role you actually want.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-neutral-600 sm:text-2xl sm:leading-9">
              A customer support specialist, SDR, PM, designer and engineer do
              not need the same English. Inglevo builds verification around the
              work context of each role.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="brand-button click-gradient-button h-12 rounded-full px-7">
                <Link href="/signup">
                  Choose my role path
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full bg-white px-7">
                <Link href="/ai-english-trainer">See AI tutor</Link>
              </Button>
            </div>
          </div>

          <RolePathPreviewMockup />
        </section>

        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-4">
            {pathLayers.map(([title, copy]) => (
              <article key={title} className="landing-card">
                <div className="click-icon-tile">
                  <Check className="size-5" />
                </div>
                <h2 className="mt-7 text-2xl font-extrabold tracking-[-0.04em]">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#f4f2ef] px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <p className="section-kicker">Available paths</p>
              <h2 className="mt-4 text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                Each path verifies different conversations, tools and remote tasks.
              </h2>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {rolePaths.map((path, index) => {
                const Icon = path.icon;

                return (
                  <article
                    key={path.role}
                    className={`rounded-[1.8rem] border p-5 shadow-sm ${
                      index === 0
                        ? "border-[#6f45dd]/25 bg-white shadow-[0_24px_90px_rgba(123,63,242,0.1)]"
                        : "border-black/5 bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="grid size-11 place-items-center rounded-2xl bg-[#f3efff] text-[#6f45dd]">
                        <Icon className="size-5" />
                      </div>
                      <span className={`rounded-full px-3 py-1.5 text-xs font-black uppercase tracking-[0.1em] ${
                        index === 0
                          ? "bg-[#d0f5e3] text-emerald-900"
                          : "bg-[#f8f8f7] text-neutral-500"
                      }`}>
                        {path.status}
                      </span>
                    </div>
                    <h3 className="mt-6 text-2xl font-extrabold tracking-[-0.045em]">{path.role}</h3>
                    <p className="mt-2 text-sm font-semibold text-neutral-500">
                      Tools: {path.tools.join(" · ")}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {path.scenarios.map((scenario) => (
                        <span key={scenario} className="rounded-full bg-[#f8f8f7] px-3 py-1.5 text-xs font-bold text-neutral-600">
                          {scenario}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                      <p className="text-xs font-black uppercase tracking-[0.12em] text-neutral-400">Preview match</p>
                      <p className="text-3xl font-extrabold tracking-[-0.055em] text-[#6f45dd]">{path.score}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-10 rounded-[2.4rem] border border-black/5 bg-white p-8 shadow-[0_24px_90px_rgba(7,9,12,0.08)] sm:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="section-kicker">Why this is different</p>
              <h2 className="mt-4 text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                “Advanced English” does not explain role performance.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
                Inglevo paths are built to show whether someone can communicate
                in scenarios close to the job: customers, blockers, sales calls,
                design reviews, updates and follow-ups.
              </p>
            </div>
            <div className="grid gap-3">
              {[
                ["Support", "Can they calm a customer and explain next steps?"],
                ["Sales", "Can they handle objections and book the next meeting?"],
                ["PM", "Can they explain risk, scope and deadlines clearly?"],
                ["Design", "Can they present work and defend UX decisions?"],
              ].map(([role, question]) => (
                <div key={role} className="rounded-2xl bg-[#f8f8f7] p-5">
                  <p className="font-extrabold">{role}</p>
                  <p className="mt-1 text-sm leading-6 text-neutral-600">{question}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6">
          <div className="click-feature-card mx-auto max-w-6xl rounded-[2.4rem] p-8 text-white shadow-[0_24px_90px_rgba(90,70,255,0.18)] sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="section-kicker text-white/70">Start with one path</p>
                <h2 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl">
                  Customer Support is open now. More paths are coming.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
                  Start with the role that matches your next US remote opportunity.
                </p>
              </div>
              <Button asChild variant="secondary" className="h-12 rounded-full px-7">
                <Link href="/signup">
                  Start role path
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
