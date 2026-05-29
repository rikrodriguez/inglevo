import Link from "next/link";
import { ArrowRight, FileText, MessageSquareText, Mic, Video } from "lucide-react";

import { Button } from "@/components/ui/button";

const trainerModules = [
  {
    title: "Interview English",
    copy: "Practice answers for US remote interviews and get feedback on clarity, tone and role fit.",
    href: "/app/interview",
    cta: "Start interview practice",
    icon: MessageSquareText,
    status: "Active",
  },
  {
    title: "Async Writing",
    copy: "Improve Slack updates, blocker explanations and meeting follow-ups for remote teams.",
    href: "/app/improve/async-writing",
    cta: "Start writing assessment",
    icon: FileText,
    status: "Active",
  },
  {
    title: "Speaking Confidence",
    copy: "Practice spoken role scenarios and build confidence for interviews and team calls.",
    cta: "Coming soon",
    icon: Mic,
    status: "Next",
  },
  {
    title: "Meeting Simulations",
    copy: "Prepare standups, client calls, support escalations and role-specific remote conversations.",
    cta: "Coming soon",
    icon: Video,
    status: "Soon",
  },
];

export default function AiTrainerPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-6">
      <section className="hero-panel">
        <p className="section-kicker">English Trainer</p>
        <h1 className="page-title mt-2">Train English for the job you want</h1>
        <p className="page-copy mt-3">
          Practice interviews, async writing, role conversations and salary
          communication for US remote opportunities.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {trainerModules.map((module) => (
          <article key={module.title} className="premium-card p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="grid size-11 place-items-center rounded-xl bg-[#d0f5e3]">
                <module.icon className="size-5" />
              </div>
              <span className={module.status === "Active" ? "badge-ready" : "badge-pending"}>
                {module.status}
              </span>
            </div>
            <h2 className="mt-5 text-2xl font-semibold">{module.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {module.copy}
            </p>
            <div className="mt-6">
              {module.href ? (
                <Button asChild className="w-full justify-between">
                  <Link href={module.href}>
                    {module.cta}
                    <ArrowRight />
                  </Link>
                </Button>
              ) : (
                <Button disabled variant="outline" className="w-full">
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
