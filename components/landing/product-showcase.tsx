import {
  Award,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  Radar,
  UserRoundCheck,
} from "lucide-react";
import type { ReactNode } from "react";

const scoreBreakdown = [
  ["Interview Performance", 84],
  ["Async Writing", 79],
  ["Tool-Based Tasks", 76],
  ["Role Communication", 86],
  ["Remote Setup", 92],
  ["Application Assets", 81],
] as const;

export function ProductShowcase() {
  return (
    <section id="features" className="px-4 py-28 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-20">
        <ShowcaseBlock
          id="readiness"
          eyebrow="Verified profile"
          title="Know what your profile proves."
          copy="Inglevo summarizes the signals companies care about: role English, async writing, tool familiarity, remote setup and application assets."
          visual={<ReadinessVisual />}
        />
        <ShowcaseBlock
          eyebrow="Role-based training"
          title="Train the English your role actually requires."
          copy="A support specialist, software engineer, SDR and designer do not need the same English. Inglevo adapts practice to the work."
          visual={<RoleTrainingVisual />}
          reverse
        />
        <ShowcaseBlock
          eyebrow="Application assets"
          title="Turn your English into remote job assets."
          copy="Practice does not end in feedback. It becomes recruiter messages, answer banks, salary scripts and follow-ups you can actually use."
          visual={<AssetsVisual />}
        />
        <ShowcaseBlock
          id="certificate"
          eyebrow="Certificate by role"
          title='From "advanced English" to "verified for the role."'
          copy="Earn a role-specific signal that shows professional English, tool-based task simulations, async writing and interview performance."
          visual={<CertificateVisual />}
          reverse
        />
      </div>
    </section>
  );
}

function ShowcaseBlock({
  id,
  eyebrow,
  title,
  copy,
  visual,
  reverse = false,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  copy: string;
  visual: ReactNode;
  reverse?: boolean;
}) {
  return (
    <article
      id={id}
      className={`grid gap-10 lg:grid-cols-2 lg:items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
    >
      <div>
        <p className="section-kicker">{eyebrow}</p>
        <h2 className="brand-section-title mt-4 max-w-xl text-6xl sm:text-7xl">
          {title}
        </h2>
        <p className="mt-7 max-w-lg text-xl leading-8 text-neutral-600">
          {copy}
        </p>
      </div>
      {visual}
    </article>
  );
}

function ReadinessVisual() {
  return (
    <div className="mockup-screen min-h-[460px]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="section-kicker">Job English Score</p>
          <p className="mono-stat mt-2 text-7xl font-semibold tracking-[-0.06em]">82/100</p>
          <p className="mt-2 text-lg font-semibold text-black">
            Role-ready
          </p>
        </div>
        <Radar className="size-10 text-black" />
      </div>
      <div className="mt-8 grid gap-4">
        {scoreBreakdown.map(([label, value], index) => (
          <div key={label} className="motion-stamp" style={{ animationDelay: `${index * 70}ms` }}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{label}</span>
              <span className="mono-stat">{value}</span>
            </div>
            <div className="soft-progress mt-2">
              <div className="soft-progress-fill" style={{ width: `${value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RoleTrainingVisual() {
  const items = [
    "Handle angry customers",
    "Explain refunds",
    "Escalate tickets",
    "Follow up professionally",
    "Interview: customer conflict story",
  ];

  return (
    <div className="mockup-screen min-h-[460px]">
      <div className="rounded-3xl bg-[var(--brand-black)] p-6 text-white">
        <div className="flex items-center gap-3">
          <UserRoundCheck className="size-6 text-[#d0f5e3]" />
          <p className="font-semibold">Customer Service English</p>
        </div>
        <p className="mt-3 text-sm leading-6 text-white/70">
          Role path built for empathy, clarity, tickets and remote customer
          communication.
        </p>
      </div>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-3 rounded-2xl border border-border bg-white p-4">
            <CheckCircle2 className="size-5 text-black" />
            <span className="text-sm font-medium">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AssetsVisual() {
  const assets = [
    ["Recruiter Message", "Clear intro + fit + call to action"],
    ["Interview Answer Bank", "Reusable high-value answers"],
    ["Salary Expectations Script", "Confident, not desperate"],
    ["LinkedIn English Profile", "Headline and summary in English"],
    ["Follow-up Email", "Professional next step"],
  ] as const;

  return (
    <div className="mockup-screen min-h-[460px]">
      <div className="flex items-center justify-between">
        <div>
          <p className="section-kicker">Remote job assets</p>
          <h3 className="mt-2 text-2xl font-semibold">Application workspace</h3>
        </div>
        <FileText className="size-8 text-black" />
      </div>
      <div className="mt-6 grid gap-3">
        {assets.map(([title, copy]) => (
          <div key={title} className="rounded-2xl border border-border bg-white p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold">{title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{copy}</p>
              </div>
              <BriefcaseBusiness className="size-4 text-black" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CertificateVisual() {
  return (
    <div className="mockup-screen min-h-[460px]">
      <div className="rounded-[2rem] border border-dashed border-[#d0f5e3] bg-[#dfdbd6] p-7">
        <div className="certificate-seal size-16">
          <Award className="size-8" />
        </div>
        <p className="section-kicker mt-8">Inglevo Verified</p>
        <h3 className="mt-3 text-3xl font-semibold tracking-tight">
          Customer Service English
        </h3>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <MiniField label="Score" value="82/100" />
          <MiniField label="Role" value="Customer Service" />
          <MiniField label="Tools" value="Zendesk · Slack" />
          <MiniField label="Certificate ID" value="ING-2026-4821" />
        </div>
        <p className="mt-6 text-xs leading-5 text-black">
          This certificate reflects performance in Inglevo assessments and
          simulations. It does not guarantee employment, income, visas,
          sponsorship or job placement.
        </p>
      </div>
    </div>
  );
}

function MiniField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#dfdbd6] bg-white/75 p-4">
      <p className="text-xs font-semibold uppercase text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}
