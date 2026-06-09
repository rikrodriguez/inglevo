"use client";

import { useMemo, useState } from "react";
import { Check, CheckCircle2, Copy, Save, Send } from "lucide-react";

import { asyncWritingAssessments } from "@/data/async-writing-assessments";
import { Button } from "@/components/ui/button";
import type { AsyncWritingFeedback, Profile } from "@/types";

type ApiResponse = {
  source: "mock" | "openai";
  saved: boolean;
  saveError?: string | null;
  message: string;
} & AsyncWritingFeedback;

type WritingAttempt = {
  id: string;
  message: string;
  result: ApiResponse;
};

export function AsyncWritingAssessment({ profile }: { profile: Profile }) {
  const [assessmentId, setAssessmentId] = useState(asyncWritingAssessments[0].id);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<WritingAttempt[]>([]);
  const [copied, setCopied] = useState(false);
  const [savingAsset, setSavingAsset] = useState(false);
  const [assetSaved, setAssetSaved] = useState(false);
  const [assetError, setAssetError] = useState<string | null>(null);

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
    setAssetError(null);
    setAssetSaved(false);
    setCopied(false);
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

      const feedbackData = data as ApiResponse;
      setResult(feedbackData);
      setAttempts((current) => [
        ...current,
        {
          id: `${Date.now()}`,
          message: userMessage,
          result: feedbackData,
        },
      ]);
    } catch {
      setError("No pudimos conectar con el coach de escritura. Intenta otra vez.");
    } finally {
      setLoading(false);
    }
  }

  async function copyImprovedMessage() {
    if (!result?.improvedMessage) {
      return;
    }

    await navigator.clipboard.writeText(result.improvedMessage);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  async function saveImprovedMessageAsset() {
    if (!result?.improvedMessage) {
      return;
    }

    setSavingAsset(true);
    setAssetError(null);

    try {
      const response = await fetch("/api/remote-job-assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assetType: "follow_up_email",
          userRole: profile.role ?? "Professional",
          userGoal: profile.main_goal ?? "Get a remote job",
          directTitle: `${assessment.title} - improved message`,
          directContent: result.improvedMessage,
          directRationale:
            "Saved exactly from the improved async writing version so the candidate can reuse the strongest remote-work communication pattern.",
          directTips: [
            "Adapt the details before sending it to a real team.",
            "Keep the next step and owner clear.",
            "Use it as a template for similar remote-work updates.",
          ],
          inputContext: `Async writing scenario: ${assessment.title}
Prompt: ${assessment.prompt}

Original message:
${message}

Improved version:
${result.improvedMessage}

Save this exact improved version as a reusable remote-work communication asset for Inglevo verification training.`,
        }),
      });
      const data = (await response.json()) as {
        saved?: boolean;
        message?: string;
        error?: string;
      };

      if (!response.ok || !data.saved) {
        setAssetError(
          data.error ??
            data.message ??
            "We could not save this improved message as a job asset yet."
        );
        return;
      }

      setAssetSaved(true);
    } catch {
      setAssetError("No pudimos guardar el asset. Intenta otra vez.");
    } finally {
      setSavingAsset(false);
    }
  }

  const latestAttempt = attempts[attempts.length - 1];
  const previousAttempt = attempts[attempts.length - 2];
  const scoreDelta =
    latestAttempt && previousAttempt
      ? latestAttempt.result.overallScore - previousAttempt.result.overallScore
      : null;

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
                  setAttempts([]);
                  setCopied(false);
                  setAssetSaved(false);
                  setAssetError(null);
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
                  {result.source === "openai" ? "AI feedback" : "Practice feedback"}
                </span>
              </div>
              <div className="mt-5 rounded-2xl border border-border bg-muted/40 p-5 leading-7">
                {result.improvedMessage}
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button type="button" variant="outline" onClick={copyImprovedMessage}>
                  {copied ? "Copied" : "Copy improved message"}
                  {copied ? <Check /> : <Copy />}
                </Button>
                <Button
                  type="button"
                  onClick={saveImprovedMessageAsset}
                  disabled={savingAsset || assetSaved}
                >
                  {savingAsset
                    ? "Saving..."
                    : assetSaved
                      ? "Saved as asset"
                      : "Save communication asset"}
                  {assetSaved ? <Check /> : <Save />}
                </Button>
              </div>
              {assetError ? <p className="mt-3 text-sm text-black">{assetError}</p> : null}
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
              {scoreDelta !== null ? (
                <div className="mt-4 rounded-xl border border-[#d0f5e3] bg-[#d0f5e3]/70 p-4 text-sm text-black">
                  <p className="font-semibold">
                    Attempt {attempts.length - 1} → Attempt {attempts.length}
                  </p>
                  <p className="mt-1">
                    Score delta: {scoreDelta >= 0 ? "+" : ""}
                    {scoreDelta} points. Practice again to increase your score
                    and build stronger verification evidence.
                  </p>
                </div>
              ) : attempts.length === 1 ? (
                <div className="mt-4 rounded-xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
                  Attempt 1 saved. Edit your message and evaluate again to see
                  your score comparison.
                </div>
              ) : null}
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
