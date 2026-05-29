import { getPracticeSessions } from "@/lib/data";
import { EmptyState } from "@/components/shared/empty-state";
import type { CoachFeedback } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function getFeedbackSummary(feedback: unknown) {
  if (
    feedback &&
    typeof feedback === "object" &&
    "quickDiagnosis" in feedback &&
    typeof (feedback as CoachFeedback).quickDiagnosis === "string"
  ) {
    return (feedback as CoachFeedback).quickDiagnosis;
  }

  return "Feedback summary is not available.";
}

export default async function HistoryPage() {
  const sessions = await getPracticeSessions();

  return (
    <div className="mx-auto grid max-w-5xl gap-6">
      <section className="hero-panel">
        <p className="section-kicker">Practice History</p>
        <h1 className="page-title mt-2">Practice history</h1>
        <p className="page-copy mt-3">
          Review your answers, improved versions and progress signals so you can
          repeat with more intention.
        </p>
      </section>
      <div className="mt-6 grid gap-4">
        {sessions.length ? (
          sessions.map((session) => (
            <article
              key={session.id}
              className="premium-card p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">{session.scenario}</h2>
                <span className="rounded-full bg-muted px-3 py-1 text-sm">
                  {session.overall_score ?? "-"} / 100
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {new Intl.DateTimeFormat("en", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }).format(new Date(session.created_at))}
              </p>
              <p className="mt-3 text-sm font-medium text-muted-foreground">Your answer</p>
              <p className="mt-1">{session.user_answer}</p>
              {session.improved_answer ? (
                <>
                  <p className="mt-4 text-sm font-medium text-muted-foreground">
                    Improved version
                  </p>
                  <p className="mt-1 rounded-xl bg-muted p-4">
                    {session.improved_answer}
                  </p>
                </>
              ) : null}
              <p className="mt-4 text-sm font-medium text-muted-foreground">
                Feedback summary
              </p>
              <p className="mt-1 text-sm">{getFeedbackSummary(session.feedback_json)}</p>
              <Button asChild variant="outline" className="mt-4">
                <Link href="/app/interview">Practice this again</Link>
              </Button>
            </article>
          ))
        ) : (
          <EmptyState
            title="You do not have saved practices yet."
            description="Start with Interview English and save your first improved answer."
          />
        )}
      </div>
    </div>
  );
}
