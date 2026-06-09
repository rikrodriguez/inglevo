import { CheckCircle2, TrendingUp } from "lucide-react";

import { ImprovedAnswerCard } from "@/components/ai-english/improved-answer-card";
import type { PracticeEvaluation } from "@/lib/ai-english/scoring";

const rubricLabels: Record<keyof PracticeEvaluation["rubric_scores"], string> = {
  clarity: "Clarity",
  grammar_control: "Grammar control",
  structure: "Structure",
  professional_tone: "Professional tone",
  role_relevance: "Role relevance",
  specificity: "Specificity",
  remote_communication: "Remote communication",
  confidence: "Confidence",
  actionability: "Actionability",
};

function getBandClass(score: number) {
  if (score >= 75) {
    return "badge-ready";
  }

  if (score >= 40) {
    return "badge-progress";
  }

  return "badge-pending";
}

export function FeedbackPanel({
  evaluation,
  scoreDelta,
}: {
  evaluation: PracticeEvaluation;
  scoreDelta?: { previousScore: number; newScore: number; delta: number } | null;
}) {
  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="premium-panel">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="section-kicker">Your Practice Feedback</p>
            <h2 className="mt-2 text-2xl font-semibold">Practice Score</h2>
          </div>
          <span className={getBandClass(evaluation.overall_score)}>
            {evaluation.score_band}
          </span>
        </div>
        <div className="mt-5 rounded-2xl border border-border bg-muted/40 p-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Current score
              </p>
              <p className="mt-1 font-mono text-4xl font-semibold">
                {evaluation.overall_score}/100
              </p>
            </div>
            {scoreDelta ? (
              <div className="rounded-xl bg-white px-4 py-3 text-sm">
                <p className="flex items-center gap-2 font-semibold">
                  <TrendingUp className="size-4" />
                  {scoreDelta.delta >= 0 ? "+" : ""}
                  {scoreDelta.delta} improvement
                </p>
                <p className="mt-1 text-muted-foreground">
                  Previous: {scoreDelta.previousScore}/100
                </p>
              </div>
            ) : null}
          </div>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            {evaluation.summary}
          </p>
        </div>

        <div className="mt-6">
          <ImprovedAnswerCard answer={evaluation.improved_answer} />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="font-semibold">Strengths</h3>
            <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
              {evaluation.strengths.map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-black" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Improvements</h3>
            <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
              {evaluation.improvements.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-black" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-white p-5">
          <h3 className="font-semibold">Suggested phrases</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {evaluation.suggested_phrases.map((phrase) => (
              <span key={phrase} className="rounded-full bg-muted px-3 py-1 text-xs">
                {phrase}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            <span className="font-medium text-foreground">Next step:</span>{" "}
            {evaluation.next_step}
          </p>
        </div>
      </div>

      <aside className="premium-panel h-fit">
        <h3 className="text-xl font-semibold">Rubric</h3>
        <div className="mt-4 grid gap-3">
          {Object.entries(evaluation.rubric_scores).map(([key, score]) => (
            <div key={key}>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span>{rubricLabels[key as keyof PracticeEvaluation["rubric_scores"]]}</span>
                <span className="font-mono font-semibold">{score}</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-black"
                  style={{ width: `${Math.max(4, score)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </aside>
    </section>
  );
}
