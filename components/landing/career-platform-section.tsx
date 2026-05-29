import {
  CalendarClock,
  CheckCircle2,
  CircleDollarSign,
  FileText,
  Library,
  UsersRound,
} from "lucide-react";
import type { ReactNode } from "react";

const notAnother = [
  ["Not Fiverr", "We build careers, not gigs."],
  ["Not Indeed", "We improve your chances before applying."],
  ["Not LinkedIn", "We verify skills, not just profiles."],
  ["Not an English school", "We train for hiring outcomes."],
] as const;

const trainerFeatures = [
  "Speaking practice",
  "Mock interviews",
  "Real role conversations",
  "Writing corrections",
  "Salary negotiation practice",
  "Meeting simulations",
  "Confidence builder",
  "Daily drills",
] as const;

const crmStages = [
  "Saved",
  "Preparing",
  "Applied",
  "Viewed",
  "Screening",
  "Interview 1",
  "Interview 2",
  "Final Round",
  "Offer",
  "Negotiation",
] as const;

const libraryTools = [
  "Resume templates",
  "Salary scripts",
  "Recruiter messages",
  "Follow-up templates",
  "Interview question banks",
  "Home office checklist",
  "Internet setup guide",
  "US company culture guide",
] as const;

export function CareerPlatformSection() {
  return (
    <>
      <section className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="section-kicker">Not a job board</p>
              <h2 className="brand-section-title mt-4 text-6xl sm:text-7xl">
                Not another place to apply blindly.
              </h2>
              <p className="mt-7 max-w-xl text-xl leading-8 text-neutral-600">
                Inglevo helps you become the candidate companies actually want
                before you apply.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {notAnother.map(([title, copy]) => (
                <article key={title} className="landing-card">
                  <p className="text-2xl font-semibold tracking-[-0.04em]">
                    {title}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.92fr] lg:items-stretch">
          <div className="ink-panel p-8 sm:p-10">
            <p className="section-kicker text-white/50">English Trainer</p>
            <h2 className="brand-section-title mt-4 text-6xl text-white sm:text-7xl">
              Your English trainer for real remote work.
            </h2>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-white/70">
              Practice the conversations, interviews, meetings and writing that
              affect your ability to earn in USD.
            </p>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {trainerFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.08] p-4 text-sm font-medium text-white">
                  <CheckCircle2 className="size-4 text-[#d0f5e3]" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="mockup-screen min-h-full">
            <p className="section-kicker">Live practice preview</p>
            <div className="mt-6 rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm text-muted-foreground">Scenario</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                Handle an angry customer in English.
              </h3>
              <div className="mt-5 rounded-2xl bg-[#dfdbd6]/60 p-4 text-sm leading-6">
                “The customer says their refund was denied and asks to speak to
                a manager. Respond with empathy and next steps.”
              </div>
              <div className="mt-5 grid gap-3">
                {["Professional tone", "Ownership", "Clarity", "Escalation judgment"].map((item, index) => (
                  <div key={item} className="motion-stamp flex items-center justify-between rounded-2xl border border-border bg-white p-3 text-sm" style={{ animationDelay: `${index * 80}ms` }}>
                    <span>{item}</span>
                    <span className="mono-stat font-semibold">{82 - index * 3}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="section-kicker">Career operating system</p>
            <h2 className="brand-section-title mx-auto mt-4 max-w-5xl text-6xl sm:text-7xl">
              Build the assets that make you easier to hire.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <MockupPanel
              icon={<FileText className="size-6" />}
              kicker="CV Builder"
              title="Build a CV built for the job you want"
              copy="ATS optimized resume, role-specific wording, stronger bullets, LinkedIn summary, cover letter and Inglevo Verified badge."
            >
              {["Customer support resume", "Empathy + ticket metrics", "Remote tools: Zendesk, Slack", "Inglevo Verified badge"].map((item) => (
                <div key={item} className="rounded-2xl border border-border bg-white p-4 text-sm font-medium">
                  {item}
                </div>
              ))}
            </MockupPanel>

            <MockupPanel
              icon={<CalendarClock className="size-6" />}
              kicker="Application CRM"
              title="Manage your job search like a top performer"
              copy="Track opportunities, reminders, notes, salary ranges, follow-ups and probability across your pipeline."
            >
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {crmStages.map((stage) => (
                  <div key={stage} className="rounded-2xl border border-border bg-white px-3 py-3 text-xs font-semibold">
                    {stage}
                  </div>
                ))}
              </div>
            </MockupPanel>
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="landing-card">
            <div className="grid size-12 place-items-center rounded-2xl bg-[#d0f5e3]">
              <UsersRound className="size-6" />
            </div>
            <p className="section-kicker mt-8">Free community</p>
            <h2 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">
              Join the free career growth community.
            </h2>
            <p className="mt-5 text-lg leading-8 text-neutral-600">
              Free Skool Community included with weekly live calls: English for
              Designers, Customer Support, SDRs, PMs, Mock Interview Fridays,
              Salary Growth Q&A and US Hiring Trends.
            </p>
          </div>

          <div className="landing-card">
            <div className="grid size-12 place-items-center rounded-2xl bg-[#dfdbd6]">
              <Library className="size-6" />
            </div>
            <p className="section-kicker mt-8">Career tools library</p>
            <h2 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">
              Everything you use to apply better.
            </h2>
            <div className="mt-7 grid gap-2 sm:grid-cols-2">
              {libraryTools.map((tool) => (
                <div key={tool} className="rounded-2xl border border-border bg-white px-4 py-3 text-sm font-medium">
                  {tool}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-[2.4rem] border border-black/5 bg-white p-8 shadow-[0_24px_90px_rgba(7,9,12,0.08)] sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="section-kicker">Pricing</p>
              <h2 className="brand-section-title mt-4 text-6xl sm:text-7xl">
                Start from $89/month.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
                Full certification total is $245. Flexible options currently
                include two payments of $129 or three payments of $89.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <PriceCard title="Free" price="$0" items={["Community", "Intro tools", "Free score", "Limited English practice"]} />
              <PriceCard
                title="Certification Path"
                price="$89/mo"
                note="Full total $245"
                items={["English trainer", "CV builder", "Job CRM", "Certificate path"]}
                featured
              />
              <PriceCard title="Fast Track" price="$445" items={["Priority review", "Mock interview", "CV optimization", "Faster review"]} />
              <PriceCard title="Employers" price="Book a call" items={["Candidate filters", "Verified signals", "Hiring pipeline", "Custom access"]} dark />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function MockupPanel({
  icon,
  kicker,
  title,
  copy,
  children,
}: {
  icon: ReactNode;
  kicker: string;
  title: string;
  copy: string;
  children: ReactNode;
}) {
  return (
    <article className="mockup-screen min-h-[520px]">
      <div className="flex items-start justify-between gap-4">
        <div className="click-icon-tile size-12">
          {icon}
        </div>
        <CircleDollarSign className="size-7 text-black" />
      </div>
      <p className="section-kicker mt-8">{kicker}</p>
      <h3 className="mt-3 text-4xl font-semibold tracking-[-0.05em]">
        {title}
      </h3>
      <p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground">
        {copy}
      </p>
      <div className="mt-7 grid gap-3">{children}</div>
    </article>
  );
}

function PriceCard({
  title,
  price,
  note,
  items,
  featured = false,
  dark = false,
}: {
  title: string;
  price: string;
  note?: string;
  items: string[];
  featured?: boolean;
  dark?: boolean;
}) {
  return (
    <article
      className={`rounded-3xl border p-5 ${
        dark
          ? "click-feature-card border-white/25"
          : featured
            ? "click-feature-card border-white/25"
            : "border-border bg-[#f8f8f7]"
      }`}
    >
      <p className="font-semibold">{title}</p>
      <p className="mt-3 text-3xl font-semibold tracking-[-0.04em]">{price}</p>
      {note ? (
        <p className={`mt-1 text-xs ${dark || featured ? "text-white/70" : "text-muted-foreground"}`}>
          {note}
        </p>
      ) : null}
      <div className="mt-5 grid gap-2">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="size-4" />
            {item}
          </div>
        ))}
      </div>
    </article>
  );
}
