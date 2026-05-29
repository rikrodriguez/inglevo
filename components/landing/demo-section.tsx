import { Award, CheckCircle2, Compass, Mic, Sparkles } from "lucide-react";

import { ScoreRing } from "@/components/shared/score-ring";

export function DemoSection() {
  const readinessAreas = [
    ["English Communication", 78],
    ["Interview Readiness", 74],
    ["Async Writing", 81],
    ["Remote Setup", 67],
  ] as const;

  return (
    <div id="readiness-score" className="product-orbit motion-rise">
      <div className="absolute -left-3 top-10 hidden rounded-2xl border border-border bg-white p-4 shadow-xl lg:block">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Mic className="size-4 text-black" />
          Voice practice
        </div>
        <p className="mt-2 text-xs text-muted-foreground">AI listens, scores and follows up.</p>
      </div>

      <div className="absolute -right-2 bottom-12 hidden rounded-2xl border border-[#dfdbd6] bg-[#dfdbd6] p-4 shadow-xl lg:block">
        <div className="flex items-center gap-2 text-sm font-medium text-black">
          <Award className="size-4" />
          Certificate
        </div>
        <p className="mt-2 text-xs text-black">Remote Work Ready</p>
      </div>

      <div className="passport-panel p-5">
        <div className="flex items-start justify-between gap-4">
        <div>
          <p className="section-kicker">
            Product preview
          </p>
          <h2 className="mt-2 text-xl font-semibold">
            Remote Readiness Passport
          </h2>
        </div>
        <div className="certificate-seal size-12">
          <Award className="size-6" />
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
        <ScoreRing score={72} label="Score" />
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Current level
          </p>
          <p className="mt-1 text-2xl font-semibold">Interview Ready</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Your profile shows progress in written communication and interview
            structure. The next checkpoint is spoken confidence.
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        {readinessAreas.map(([label, value], index) => (
          <div
            key={label}
            className="motion-stamp rounded-xl border border-border bg-white p-3"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-muted-foreground">{label}</p>
              <p className="mono-stat font-semibold">{value}</p>
            </div>
            <div className="soft-progress mt-3">
              <div className="soft-progress-fill" style={{ width: `${value}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#d0f5e3] bg-[#d0f5e3] p-4">
          <p className="flex items-center gap-2 text-sm font-medium text-black">
            <CheckCircle2 className="size-4" />
            Next best step
          </p>
          <p className="mt-2 text-sm text-black">
            Record your spoken self-introduction again.
          </p>
        </div>
        <div className="rounded-2xl border border-[#dfdbd6] bg-white p-4">
          <p className="flex items-center gap-2 text-sm font-medium">
            <Compass className="size-4 text-black" />
            Opportunity match
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            4 roles are close to your current readiness.
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-[#dfdbd6] bg-[#dfdbd6] p-4">
        <p className="text-sm font-medium text-black">
          <Sparkles className="mr-2 inline size-4" />
          Output
        </p>
        <p className="mt-2 text-sm text-black">
          Improved answer, recruiter message, async update, readiness report and
          certificate progress.
        </p>
      </div>
      </div>
    </div>
  );
}
