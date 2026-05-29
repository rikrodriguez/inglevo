import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Copy,
  FileText,
  MessageSquareText,
  Send,
  Sparkles,
} from "lucide-react";

import { PublicFooter } from "@/components/shared/public-footer";
import { PublicNav } from "@/components/shared/public-nav";
import { Button } from "@/components/ui/button";

const templateCategories = [
  {
    title: "Recruiter message",
    label: "Outbound",
    preview:
      "Hi Sarah, I saw your team is hiring remote support talent. I’m a LATAM candidate with customer support experience, verified English and remote setup through Inglevo...",
  },
  {
    title: "Follow-up email",
    label: "After applying",
    preview:
      "Hi David, I wanted to follow up on my application for the Customer Support Specialist role. I’m still very interested and have attached my verified profile...",
  },
  {
    title: "Salary expectations",
    label: "Interview script",
    preview:
      "Based on the role scope, schedule and my experience, I’m targeting a range of $2,000 to $2,800 USD per month. I’m open to discussing the full package...",
  },
  {
    title: "Slack update",
    label: "Async work",
    preview:
      "Quick update: I finished the first part of the task, found one blocker related to access permissions, and I’m waiting on confirmation before moving to the next step...",
  },
] as const;

const templateUseCases = [
  "Apply with a stronger first message",
  "Follow up without sounding pushy",
  "Explain salary expectations clearly",
  "Write remote updates with ownership",
  "Turn practice answers into reusable assets",
  "Keep communication professional and concise",
] as const;

function TemplatesWorkspaceMockup() {
  return (
    <div className="rounded-[2rem] border border-black/5 bg-white p-4 shadow-[0_24px_90px_rgba(7,9,12,0.1)] sm:p-6">
      <div className="flex flex-col gap-4 border-b border-black/5 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="section-kicker">Templates Library</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.045em]">
            Remote application assets
          </h2>
        </div>
        <span className="rounded-full bg-[#d0f5e3] px-3 py-2 text-xs font-black text-emerald-900">
          Copy ready
        </span>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="rounded-[1.4rem] bg-[#f8f8f7] p-4">
          <p className="text-sm font-extrabold">Categories</p>
          <div className="mt-4 grid gap-2">
            {templateCategories.map((template, index) => (
              <div
                key={template.title}
                className={`rounded-2xl px-4 py-3 text-sm font-bold ${
                  index === 0
                    ? "bg-[linear-gradient(135deg,#7459f6,#5fb7f7_52%,#de61bf)] text-white"
                    : "bg-white"
                }`}
              >
                {template.title}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3">
          {templateCategories.map((template, index) => (
            <article
              key={template.title}
              className={`rounded-[1.35rem] border p-4 ${
                index === 0
                  ? "border-[#6f45dd]/20 bg-[linear-gradient(135deg,#f3efff,#ffffff)]"
                  : "border-black/5 bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-neutral-400">
                    {template.label}
                  </p>
                  <h3 className="mt-2 text-xl font-extrabold tracking-[-0.04em]">
                    {template.title}
                  </h3>
                </div>
                <button className="grid size-9 place-items-center rounded-full bg-black text-white" type="button" aria-label={`Copy ${template.title}`}>
                  <Copy className="size-4" />
                </button>
              </div>
              <p className="mt-4 text-sm leading-6 text-neutral-600">{template.preview}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function MessageBuilderMockup() {
  return (
    <div className="rounded-[2rem] border border-black/5 bg-[#fbfbfd] p-5 shadow-[0_22px_80px_rgba(30,27,75,0.06)]">
      <p className="section-kicker">Message builder</p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.045em]">
        Recruiter message with proof
      </h2>
      <div className="mt-6 rounded-[1.5rem] bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-full bg-[#d0f5e3]">
            <Send className="size-4" />
          </div>
          <div>
            <p className="font-extrabold">To: Remote Hiring Manager</p>
            <p className="text-sm text-neutral-500">Subject: Verified LATAM candidate</p>
          </div>
        </div>
        <div className="mt-5 rounded-2xl bg-[#f8f8f7] p-4 text-sm leading-6 text-neutral-700">
          Hi, I’m applying for the Customer Support role. I have experience
          handling customer conversations in English, and my Inglevo profile
          includes verified role English, setup and tools.
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-black p-4 text-white">
          <BadgeCheck className="size-4 text-[#d0f5e3]" />
          <span className="text-sm font-bold">inglevo.com/ricardorodriguez</span>
        </div>
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  return (
    <>
      <PublicNav />
      <main className="overflow-hidden bg-white text-black">
        <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="brand-chip mb-6">Templates Library</div>
            <h1 className="max-w-4xl text-6xl font-extrabold leading-[0.95] tracking-[-0.045em] sm:text-7xl lg:text-[5.4rem]">
              Copy-ready templates for remote job applications.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-neutral-600 sm:text-2xl sm:leading-9">
              Use recruiter messages, follow-ups, salary scripts and async work
              updates that connect your communication to your verified profile.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="brand-button click-gradient-button h-12 rounded-full px-7">
                <Link href="/signup">
                  Start using templates
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full bg-white px-7">
                <Link href="/cv-builder">Build my CV</Link>
              </Button>
            </div>
          </div>

          <MessageBuilderMockup />
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <TemplatesWorkspaceMockup />
          </div>
        </section>

        <section className="bg-[#f4f2ef] px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="section-kicker">Why templates matter</p>
              <h2 className="mt-4 text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                Good communication should not sound translated.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
                Templates help you respond faster, stay professional and avoid
                weak messages while applying to US remote roles.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {templateUseCases.map((useCase) => (
                <div key={useCase} className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-4 text-sm font-bold shadow-sm">
                  <Check className="size-4 text-[#6f45dd]" />
                  {useCase}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
            {[
              ["Write", "Start from proven message structures instead of a blank page.", MessageSquareText],
              ["Attach proof", "Add your Inglevo Verified profile link to support your claims.", BadgeCheck],
              ["Follow up", "Use templates to stay visible without sounding pushy.", FileText],
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
                <p className="section-kicker text-white/70">Application assets</p>
                <h2 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl">
                  Send better messages with stronger proof attached.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
                  Use templates together with your CV, Job CRM and verified profile.
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
