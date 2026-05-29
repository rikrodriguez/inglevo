import {
  BriefcaseBusiness,
  CheckCircle2,
  Headphones,
  Laptop,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";

const communication = [
  "English for the role",
  "Interview speaking",
  "Async writing",
  "Professional tone",
  "Meetings",
  "Client communication",
  "Confidence",
] as const;

const setup = [
  "Internet speed",
  "Backup hotspot",
  "Laptop quality",
  "Webcam quality",
  "Microphone quality",
  "Headphones",
  "Quiet workspace",
  "Lighting",
  "Timezone availability",
  "Calendar availability",
  "Typing speed",
  "Updated browser/system",
] as const;

const professionalism = [
  "Punctuality",
  "Ownership",
  "Responsiveness",
  "Follow-up habits",
  "Documentation habits",
  "Communication maturity",
  "Reliability",
] as const;

const toolGroups = [
  ["General", ["Slack", "Zoom", "Google Meet", "Teams", "Google Workspace", "Notion"]],
  ["Sales", ["GHL", "HubSpot", "Salesforce"]],
  ["Support", ["Zendesk", "Intercom", "Help Scout"]],
  ["Design", ["Figma", "Canva"]],
  ["Engineering", ["GitHub", "Jira", "Linear"]],
  ["PM", ["Asana", "Trello", "ClickUp", "Monday"]],
  ["Marketing", ["Meta Ads", "Google Analytics", "CRM tools"]],
] as const;

const layers = [
  {
    title: "Communication",
    icon: MessageSquareText,
    copy: "Role English, interviews, async writing, meetings and client-ready tone.",
    items: communication,
  },
  {
    title: "Role tools",
    icon: BriefcaseBusiness,
    copy: "Familiarity with the tools and workflows remote teams actually use.",
    toolGroups,
  },
  {
    title: "Remote setup",
    icon: Laptop,
    copy: "Basic work-from-home requirements before someone represents a team.",
    items: setup,
  },
  {
    title: "Professional reliability",
    icon: Headphones,
    copy: "Signals that show whether a candidate can communicate and follow through in a remote team.",
    items: professionalism,
  },
] as const;

export function VerificationLayersSection() {
  return (
    <section className="px-4 py-28 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="section-kicker">What Inglevo verifies</p>
            <h2 className="brand-section-title mt-4 text-6xl sm:text-7xl">
              Not just English. Job proof.
            </h2>
          </div>
          <p className="max-w-2xl text-xl leading-8 text-neutral-600">
            Inglevo is built around four employability layers: communication,
            role tools, remote setup and professional reliability.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {layers.map((layer) => (
            <article key={layer.title} className="landing-card min-h-[360px]">
              <div className="flex items-start justify-between gap-4">
                <div className="grid size-12 place-items-center rounded-2xl bg-[#d0f5e3] text-black">
                  <layer.icon className="size-6" />
                </div>
                <span className="passport-stamp">
                  <ShieldCheck className="size-4" />
                  Verified layer
                </span>
              </div>
              <h3 className="mt-8 text-4xl font-semibold tracking-[-0.045em]">
                {layer.title}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-600">
                {layer.copy}
              </p>

              {"toolGroups" in layer ? (
                <div className="mt-6 grid gap-3">
                  {layer.toolGroups.map(([group, tools]) => (
                    <div key={group} className="rounded-2xl border border-border bg-white p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        {group}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {tools.map((tool) => (
                          <ToolLogo key={tool} name={tool} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-6 flex flex-wrap gap-2">
                  {layer.items.map((item) => (
                    <span key={item} className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-xs font-medium text-neutral-700">
                      <CheckCircle2 className="size-3.5 text-black" />
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolLogo({ name }: { name: string }) {
  const initials = name
    .replace("Google Analytics", "GA")
    .replace("Google Workspace", "GW")
    .replace("Google Meet", "GM")
    .replace("Help Scout", "HS")
    .replace("Meta Ads", "MA")
    .split(/\s|\/|-/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#dfdbd6]/60 px-3 py-2 text-xs font-semibold text-black">
      <span className="grid size-6 place-items-center rounded-full bg-white text-[10px] shadow-sm">
        {initials || name.slice(0, 2).toUpperCase()}
      </span>
      {name}
    </span>
  );
}
