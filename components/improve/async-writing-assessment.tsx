"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

import { asyncWritingAssessments } from "@/data/async-writing-assessments";
import { Button } from "@/components/ui/button";
import type { AsyncWritingFeedback, Profile } from "@/types";

type ApiResponse = {
  source: "mock" | "openai";
  saved: boolean;
  saveError?: string | null;
  message: string;
} & AsyncWritingFeedback;

export function AsyncWritingAssessment({ profile }: { profile: Profile }) {
  const [assessmentId, setAssessmentId] = useState(asyncWritingAssessments[0].id);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const assessment = useMemo(
    () =>
      asyncWritingAssessments.find((item) => item.id === assessmentId) ??
      asyncWritingAssessments[0],
    [assessmentId]
  );

  async function analyze() {
    const userMessage = message.trim();

    if (userMessage.length < 12) {
      setError("Write a slightly more complete message before analyzing.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/async-writing-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assessmentType: assessment.id,
          prompt: assessment.prompt,
          userMessage,
          userLevel: profile.english_level ?? "B1",
          userRole: profile.role ?? "Professional",
          userGoal: profile.main_goal ?? "Get a remote job",
        }),
      });
      const data = (await response.json()) as Partial<ApiResponse> & {
        error?: string;
      };

      if (!response.ok || !data.improvedMessage) {
        setError(data.error ?? "No pudimos evaluar tu mensaje. Intenta de nuevo.");
        return;
      }

      setResult(data as ApiResponse);
    } catch {
      setError("No pudimos conectar con el coach de escritura. Intenta otra vez.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      <section className="rounded-2xl border border-border bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-muted-foreground">Assessments</p>
        <div className="mt-4 grid gap-3">
          {asyncWritingAssessments.map((item) => {
            const selected = item.id === assessmentId;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setAssessmentId(item.id);
                  setMessage("");
                  setResult(null);
                  setError(null);
                }}
                className={`rounded-xl border p-4 text-left transition ${
                  selected
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-white hover:bg-muted"
                }`}
              >
                <p className="font-medium">{item.title}</p>
                <p
                  className={`mt-1 text-sm ${
                    selected ? "text-background/70" : "text-muted-foreground"
                  }`}
                >
                  {item.context}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6">
        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">
            Async Writing Assessment
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            {assessment.title}
          </h1>
          <p className="mt-3 text-muted-foreground">{assessment.prompt}</p>
          <div className="mt-5 rounded-xl border border-dashed border-border bg-muted/40 p-4 text-sm text-muted-foreground">
            Goal: {assessment.goal}
          </div>

          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={assessment.placeholder}
            className="mt-5 min-h-44 w-full resize-y rounded-2xl border border-border bg-white p-4 text-sm leading-6 outline-none transition focus:border-foreground"
          />
          {error ? <p className="mt-3 text-sm text-black">{error}</p> : null}

          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              type="button"
              onClick={analyze}
              disabled={loading || message.trim().length < 12}
            >
              {loading ? "Evaluating..." : "Evaluate async writing"}
              <Send />
            </Button>
          </div>
        </div>

        {result ? (
          <section className="grid gap-6 xl:grid-cols-[1fr_320px]">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-black">
                    Remote work asset
                  </p>
                  <h2 className="text-2xl font-semibold">Improved message</h2>
                </div>
                <span className="rounded-full bg-[#d0f5e3] px-3 py-1 text-sm text-black">
                  {result.source === "openai" ? "AI feedback" : "Mock feedback"}
                </span>
              </div>
              <div className="mt-5 rounded-2xl border border-border bg-muted/40 p-5 leading-7">
                {result.improvedMessage}
              </div>
              <h3 className="mt-6 font-semibold">Quick diagnosis</h3>
              <p className="mt-2 text-muted-foreground">{result.quickDiagnosis}</p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold">What worked</h3>
                  <ul className="mt-2 grid gap-2 text-sm text-muted-foreground">
                    {result.whatWorked.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold">What to improve</h3>
                  <ul className="mt-2 grid gap-2 text-sm text-muted-foreground">
                    {result.whatToImprove.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <h3 className="mt-6 font-semibold">Key phrases</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {result.keyPhrases.map((phrase) => (
                  <span
                    key={phrase}
                    className="rounded-full border border-border bg-muted px-3 py-1 text-sm"
                  >
                    {phrase}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-sm text-muted-foreground">{result.message}</p>
            </div>

            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Async Writing Score</h2>
              <div className="mt-5 grid gap-3">
                {[
                  ["Overall", result.overallScore],
                  ["Clarity", result.clarity],
                  ["Tone", result.tone],
                  ["Concision", result.concision],
                  ["Ownership", result.ownership],
                  ["Actionability", result.actionability],
                ].map(([label, score]) => (
                  <div key={label}>
                    <div className="flex items-center justify-between text-sm">
                      <span>{label}</span>
                      <span className="font-medium">{score}/100</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-black"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2 font-medium text-foreground">
                  <CheckCircle2 className="size-4 text-black" />
                  Next practice
                </div>
                <p className="mt-2">{result.nextPractice}</p>
              </div>
            </div>
          </section>
        ) : null}
      </section>
    </div>
  );
}
