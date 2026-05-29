import { Code2, Frame, Headphones, MessageSquareText, PhoneCall, Workflow } from "lucide-react";

const simulations = [
  {
    title: "Slack update simulation",
    copy: 'Your manager writes: “Can you update me before EOD?”',
    verifies: "clarity, ownership, next steps",
    icon: MessageSquareText,
  },
  {
    title: "Zoom interview simulation",
    copy: "Answer role-specific follow-ups like a real remote interview.",
    verifies: "structure, confidence, role fit",
    icon: PhoneCall,
  },
  {
    title: "Figma presentation simulation",
    copy: 'A client asks: “Why did you change the checkout layout?”',
    verifies: "design rationale, vocabulary, stakeholder communication",
    icon: Frame,
  },
  {
    title: "GitHub/Jira blocker simulation",
    copy: "Explain a login bug and next steps during standup.",
    verifies: "technical clarity, precision, blocker communication",
    icon: Code2,
  },
  {
    title: "GHL/CRM follow-up simulation",
    copy: "A lead asks for pricing. Write a CRM note and reply.",
    verifies: "sales tone, summary, clear next step",
    icon: Workflow,
  },
  {
    title: "Zendesk escalation simulation",
    copy: "A customer is angry about a refund. Respond and escalate.",
    verifies: "empathy, support tone, escalation judgment",
    icon: Headphones,
  },
] as const;

export function ToolSimulationsSection() {
  return (
    <section id="tool-practice" className="bg-white px-4 py-28 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="section-kicker">Tool-based practice</p>
            <h2 className="brand-section-title mt-4 text-6xl sm:text-7xl">
              Practice the tools and conversations remote teams actually use.
            </h2>
          </div>
          <p className="max-w-2xl text-xl leading-8 text-neutral-600">
            Inglevo does not need to connect to your tools to train you. It
            simulates the conversations, updates and tasks you will face inside
            them.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {simulations.map((item) => (
            <article key={item.title} className="landing-card min-h-[250px]">
              <div className="grid size-11 place-items-center rounded-2xl bg-[#d0f5e3]">
                <item.icon className="size-5 text-black" />
              </div>
              <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">{item.copy}</p>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Verifies
              </p>
              <p className="mt-2 text-sm font-medium">{item.verifies}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
