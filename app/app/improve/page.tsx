import Link from "next/link";
import {
  ArrowRight,
  Clock,
  FileText,
  MessageSquareText,
  Mic,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const modules = [
  {
    title: "Interview English",
    description:
      "Practice answers for remote job interviews and learn how to sound clear, structured and professional.",
    cta: "Start interview practice",
    href: "/app/interview",
    icon: MessageSquareText,
    active: true,
    status: "Active",
    score: 78,
    next: "Salary expectations",
    time: "8 min",
  },
  {
    title: "Speaking Confidence",
    description:
      "Practice spoken answers and improve clarity, confidence and structure.",
    cta: "Roadmap module",
    icon: Mic,
    active: false,
    status: "Roadmap",
    score: null,
    next: "Spoken intro practice",
    time: "6 min",
  },
  {
    title: "Async Writing",
    description:
      "Assess Slack updates, blocker explanations and meeting follow-ups for remote teams.",
    cta: "Start async writing assessment",
    href: "/app/improve/async-writing",
    icon: FileText,
    active: true,
    status: "Active",
    score: 72,
    next: "Blocker explanation",
    time: "7 min",
  },
  {
    title: "Remote Work Communication",
    description:
      "Learn how to explain blockers, give updates, ask for clarification and communicate ownership.",
    cta: "Roadmap module",
    icon: Clock,
    active: false,
    status: "Roadmap",
    score: null,
    next: "Status update",
    time: "5 min",
  },
  {
    title: "Salary & Negotiation English",
    description:
      "Practice how to discuss salary, rates and expectations without sounding insecure or aggressive.",
    cta: "Roadmap module",
    icon: TrendingUp,
    active: false,
    status: "Roadmap",
    score: null,
    next: "Salary range answer",
    time: "6 min",
  },
];

export default function ImproveEnglishPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-6">
      <section className="hero-panel">
        <p className="section-kicker">Job English Training</p>
        <h1 className="page-title mt-2">
          Improve English for your job
        </h1>
        <p className="page-copy mt-3">
          Practice the English your target role actually requires: interviews,
          tools, async updates, meetings and task-based conversations.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) => (
          <article
            key={module.title}
            className="premium-card p-5 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex size-11 items-center justify-center rounded-xl bg-[#d0f5e3] text-black">
              <module.icon className="size-5" />
            </div>
            <div className="mt-4 flex items-start justify-between gap-3">
              <h2 className="text-xl font-semibold">{module.title}</h2>
              <span
                className={
                  module.active
                    ? "badge-ready"
                    : module.status === "Roadmap"
                      ? "badge-progress"
                      : "badge-pending"
                }
              >
                {module.status}
              </span>
            </div>
            <p className="mt-2 min-h-20 text-sm leading-6 text-muted-foreground">
              {module.description}
            </p>
            <div className="mt-4 grid gap-3 rounded-xl border border-border/80 bg-muted/40 p-3">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-muted-foreground">Current score</span>
                <span className="font-semibold">
                  {module.score === null ? "Not assessed" : `${module.score}/100`}
                </span>
              </div>
              <div className="soft-progress">
                <div
                  className="soft-progress-fill"
                  style={{ width: `${module.score ?? 0}%` }}
                />
              </div>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-muted-foreground">Next</span>
                <span className="text-right font-medium">{module.next}</span>
              </div>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-muted-foreground">Estimated time</span>
                <span className="font-medium">{module.time}</span>
              </div>
            </div>
            <div className="mt-5">
              {module.href ? (
                <Button asChild className="w-full justify-between">
                  <Link href={module.href}>
                    {module.cta}
                    <ArrowRight />
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" className="w-full bg-muted/50" disabled>
                  {module.cta}
                </Button>
              )}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
