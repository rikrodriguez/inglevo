import {
  BadgeCheck,
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  Eye,
  FileText,
  Mic2,
  Search,
  ShieldCheck,
  TrendingUp,
  UsersRound,
} from "lucide-react";

const pipeline = [
  ["Saved", 7],
  ["Preparing", 4],
  ["Applied", 12],
  ["Interview", 3],
  ["Offer", 1],
] as const;

const scoreRows = [
  ["English for role", 84],
  ["Tools verified", 78],
  ["Remote setup", 92],
  ["Professionalism", 86],
] as const;

export function CandidateDashboardMockup() {
  return (
    <div className="visual-grid-bg mockup-float rounded-[2.2rem] border border-black/5 p-5 shadow-[0_30px_100px_rgba(123,63,242,0.16)]">
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.7rem] bg-white p-5 shadow-sm">
          <p className="section-kicker">Candidate dashboard</p>
          <div className="mt-5 flex items-end justify-between">
            <div>
              <p className="mono-stat text-6xl font-semibold tracking-[-0.07em]">82</p>
              <p className="mt-1 text-sm font-semibold text-muted-foreground">Verified score</p>
            </div>
            <span className="rounded-full bg-[#d0f5e3] px-3 py-1 text-xs font-semibold text-black">
              Certificate eligible
            </span>
          </div>
          <div className="mt-6 grid gap-3">
            {scoreRows.map(([label, value]) => (
              <div key={label}>
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
        <div className="grid gap-4">
          <div className="rounded-[1.7rem] bg-white p-5 shadow-sm">
            <p className="font-semibold">Application pipeline</p>
            <div className="mt-4 grid grid-cols-5 gap-2">
              {pipeline.map(([stage, count]) => (
                <div key={stage} className="rounded-2xl border border-border bg-[#f8f8f7] p-3 text-center">
                  <p className="mono-stat text-xl font-semibold">{count}</p>
                  <p className="mt-1 text-[10px] font-medium text-muted-foreground">{stage}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="click-feature-card shine-card rounded-[1.7rem] p-5">
            <p className="text-sm text-white/70">Next best action</p>
            <p className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
              Practice your customer support conflict story.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ResumeBuilderMockup() {
  return (
    <div className="mockup-screen mockup-float min-h-[360px]">
      <div className="flex items-center justify-between">
        <div>
          <p className="section-kicker">Resume builder</p>
          <h3 className="mt-2 text-3xl font-semibold tracking-[-0.05em]">Support specialist CV</h3>
        </div>
        <FileText className="size-8" />
      </div>
      <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_160px]">
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold">Professional summary</p>
          <div className="mt-4 space-y-2">
            <div className="h-3 w-full rounded-full bg-[#dfdbd6]" />
            <div className="h-3 w-11/12 rounded-full bg-[#dfdbd6]" />
            <div className="h-3 w-8/12 rounded-full bg-[#dfdbd6]" />
          </div>
          <p className="mt-5 text-sm font-semibold">Role bullets</p>
          {["Reduced ticket response time", "Handled escalations", "Improved customer follow-up"].map((item) => (
            <div key={item} className="mt-3 flex items-center gap-2 rounded-2xl border border-border bg-[#f8f8f7] p-3 text-sm">
              <CheckCircle2 className="size-4" />
              {item}
            </div>
          ))}
        </div>
        <div className="grid gap-3">
          <div className="rounded-3xl bg-[#d0f5e3] p-4">
            <p className="text-sm font-semibold">ATS score</p>
            <p className="mono-stat mt-2 text-4xl font-semibold">91%</p>
          </div>
          <div className="rounded-3xl border border-border bg-white p-4">
            <p className="text-sm font-semibold">Export</p>
            <p className="mt-2 rounded-full bg-black px-3 py-2 text-center text-xs font-semibold text-white">
              PDF ready
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function JobCrmMockup() {
  const stages = [
    ["Saved", "7", "Remote Support", "$1.8k-$2.4k"],
    ["Applied", "12", "SDR Associate", "$2.2k-$3.5k"],
    ["Interview 1", "3", "Project Coordinator", "$2.5k-$4.2k"],
    ["Offer", "1", "Ops Assistant", "$2.0k-$3.0k"],
    ["Rejected", "4", "VA Role", "$1.4k-$2.0k"],
  ] as const;

  return (
    <div className="mockup-screen mockup-float min-h-[360px]">
      <div className="flex items-center justify-between">
        <div>
          <p className="section-kicker">Job CRM</p>
          <h3 className="mt-2 text-3xl font-semibold tracking-[-0.05em]">Application command center</h3>
        </div>
        <BriefcaseBusiness className="size-8" />
      </div>
      <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold">
        <span className="rounded-full bg-[#d0f5e3] px-3 py-2 text-black">
          <CalendarClock className="mr-1 inline size-3.5" />
          Follow-ups today
        </span>
        <span className="rounded-full bg-[#f3efff] px-3 py-2 text-black">
          <CircleDollarSign className="mr-1 inline size-3.5" />
          Salary tracking
        </span>
      </div>
      <div className="mt-4 grid gap-3 lg:grid-cols-5">
        {stages.map(([stage, count, role, salary]) => (
          <div key={stage} className="min-h-[170px] rounded-3xl border border-border bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase text-muted-foreground">{stage}</p>
              <ClipboardList className="size-4 text-muted-foreground" />
            </div>
            <p className="mono-stat mt-4 text-3xl font-semibold">{count}</p>
            <div className="mt-4 rounded-2xl bg-[#f8f8f7] p-3">
              <p className="text-sm font-semibold">{role}</p>
              <p className="mt-1 text-xs text-muted-foreground">{salary}</p>
              <p className="mt-3 rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-muted-foreground">
                Sample company
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AnalyticsMockup() {
  const metrics = [
    ["Applications", "34", TrendingUp],
    ["Profile views", "128", Eye],
    ["Verification", "Active", BadgeCheck],
    ["Progress", "82%", TrendingUp],
  ] as const;

  const weekly = [42, 58, 48, 74, 64, 86, 78, 92];

  return (
    <div className="mockup-screen mockup-float min-h-[360px]">
      <div className="flex items-center justify-between">
        <div>
          <p className="section-kicker">Analytics</p>
          <h3 className="mt-2 text-3xl font-semibold tracking-[-0.05em]">Profile and application insights</h3>
        </div>
        <TrendingUp className="size-8" />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-4">
        {metrics.map(([label, value, Icon]) => (
          <div key={label} className="rounded-3xl border border-border bg-white p-4">
            <Icon className="size-5 text-muted-foreground" />
            <p className="mt-3 text-sm text-muted-foreground">{label}</p>
            <p className="mono-stat mt-2 text-3xl font-semibold">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-3xl border border-border bg-white p-4">
        <div className="flex items-center justify-between">
          <p className="font-semibold">Weekly activity</p>
          <p className="text-xs font-semibold text-muted-foreground">Last 8 weeks</p>
        </div>
        <div className="mt-4 flex h-32 items-end gap-3">
          {weekly.map((height, index) => (
            <div key={index} className="flex flex-1 flex-col items-center gap-2">
              <span
                className="w-full rounded-t-2xl bg-[linear-gradient(180deg,var(--click-purple),var(--click-blue),var(--click-pink))]"
                style={{ height: `${height}%` }}
              />
              <span className="text-[10px] font-semibold text-muted-foreground">W{index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AiTrainerMockup() {
  return (
    <div className="mockup-screen mockup-float min-h-[430px]">
      <div className="flex items-start justify-between">
        <div>
          <p className="section-kicker">AI English trainer</p>
          <h3 className="mt-2 text-3xl font-semibold tracking-[-0.05em]">Voice practice for real work</h3>
        </div>
        <Mic2 className="size-8" />
      </div>
      <div className="mt-7 rounded-3xl border border-border bg-white p-5">
        <p className="text-sm font-semibold">Prompt</p>
        <p className="mt-2 text-lg leading-7">
          Explain a delayed task to your manager before EOD.
        </p>
        <div className="mt-6 flex h-16 items-end gap-1">
          {[24, 42, 36, 58, 44, 68, 50, 76, 54, 38, 62, 46, 30, 56, 42, 70].map((height, index) => (
            <span
              key={index}
              className="w-full rounded-full bg-[linear-gradient(180deg,var(--click-purple),var(--click-blue))]"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[
          ["Clarity", 84],
          ["Tone", 88],
          ["Confidence", 76],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-[#f8f8f7] p-4">
            <p className="text-xs font-semibold text-muted-foreground">{label}</p>
            <p className="mono-stat mt-2 text-3xl font-semibold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CertificateProfileMockup() {
  return (
    <div className="click-feature-card shine-card mockup-float rounded-[2.2rem] p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">Certificate profile</p>
          <h3 className="mt-3 text-3xl font-semibold tracking-[-0.05em]">Inglevo Verified</h3>
          <p className="mt-1 text-white/75">Customer Support English</p>
        </div>
        <BadgeCheck className="size-10" />
      </div>
      <div className="mt-8 grid gap-3">
        {["English verified", "Tools verified", "Setup verified", "Professionalism verified"].map((item) => (
          <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/15 p-4 text-sm font-semibold backdrop-blur">
            <ShieldCheck className="size-4" />
            {item}
          </div>
        ))}
      </div>
      <p className="mono-stat mt-8 text-5xl font-semibold">82/100</p>
    </div>
  );
}

export function EmployerDashboardMockup() {
  return (
    <div className="visual-grid-bg mockup-float rounded-[2.2rem] border border-black/5 p-5 shadow-[0_30px_100px_rgba(123,63,242,0.16)]">
      <div className="rounded-[1.7rem] bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="section-kicker">Employer dashboard</p>
            <h3 className="mt-2 text-3xl font-semibold tracking-[-0.05em]">Verified candidate pipeline</h3>
          </div>
          <Search className="size-8" />
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-[180px_1fr]">
          <div className="rounded-3xl bg-[#f8f8f7] p-4">
            <p className="text-sm font-semibold">Filters</p>
            {["English 80+", "Setup verified", "Support", "EST overlap"].map((filter) => (
              <p key={filter} className="mt-3 rounded-full bg-white px-3 py-2 text-xs font-semibold">
                {filter}
              </p>
            ))}
          </div>
          <div className="grid gap-3">
            {["Ana Torres", "Mateo Ruiz", "Camila Vega"].map((name, index) => (
              <div key={name} className="grid gap-3 rounded-3xl border border-border bg-white p-4 sm:grid-cols-[1fr_auto] sm:items-center">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-2xl bg-[#f3efff] text-sm font-semibold">
                    {name.split(" ").map((part) => part[0]).join("")}
                  </div>
                  <div>
                    <p className="font-semibold">{name}</p>
                    <p className="text-xs text-muted-foreground">Customer Support · LATAM</p>
                  </div>
                </div>
                <p className="mono-stat rounded-full bg-[#d0f5e3] px-3 py-1 text-sm font-semibold">
                  {84 - index * 3}/100
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function RolePathCardsMockup() {
  const roles = ["Support", "Sales", "Design", "PM", "Engineering"];

  return (
    <div className="grid gap-3 sm:grid-cols-5">
      {roles.map((role, index) => (
        <div
          key={role}
          className={`motion-stamp rounded-3xl border p-5 shadow-sm ${
            index === 0 ? "click-feature-card border-white/25" : "border-border bg-white"
          }`}
          style={{ animationDelay: `${index * 70}ms` }}
        >
          <UsersRound className="size-5" />
          <p className="mt-8 text-xl font-semibold tracking-[-0.04em]">{role}</p>
          <p className={`mt-2 text-xs ${index === 0 ? "text-white/70" : "text-muted-foreground"}`}>
            {index === 0 ? "Open path" : "Coming soon"}
          </p>
        </div>
      ))}
    </div>
  );
}
