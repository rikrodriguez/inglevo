import Link from "next/link";
import { ArrowRight, Clock, Target } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { AIEnglishScenario } from "@/lib/ai-english/types";

export function TodayMissionCard({ mission }: { mission: AIEnglishScenario }) {
  return (
    <section className="ink-panel p-6 sm:p-8">
      <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-full bg-[#d0f5e3] px-3 py-1 text-xs font-semibold text-black">
              Start here
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
              Today’s English Mission
            </span>
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {mission.title}
          </h2>
          <div className="mt-6 grid gap-5 rounded-2xl border border-white/10 bg-white/8 p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
                Scenario
              </p>
              <p className="mt-2 text-sm leading-6 text-white/80">{mission.context}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
                Question
              </p>
              <p className="mt-2 text-xl font-semibold leading-8 text-white">
                {mission.question}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {mission.what_this_measures.slice(0, 4).map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80"
              >
                <Target className="size-3" />
                {item}
              </span>
            ))}
            <span className="inline-flex items-center gap-2 rounded-full bg-[#d0f5e3] px-3 py-1 text-xs font-semibold text-black">
              <Clock className="size-3" />
              {mission.estimated_time_minutes} min
            </span>
          </div>
        </div>
        <Button asChild className="h-12 w-full bg-white text-black hover:bg-white/90 lg:w-64">
          <Link href="/app/ai-trainer/practice">
            Start 5-minute practice
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}
