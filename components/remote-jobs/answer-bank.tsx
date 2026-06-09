"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Profile } from "@/types";

type AnswerBankItem = {
  id: string;
  category: string;
  scenario: string;
  question: string;
  user_answer: string;
  improved_answer: string | null;
  overall_score: number | null;
};

const categories = [
  "Tell me about yourself",
  "Why should we hire you?",
  "Salary expectations",
  "Challenge solved",
  "Remote work experience",
];

function getCategory(scenario: string) {
  if (scenario.includes("Tell me about yourself")) {
    return "Tell me about yourself";
  }

  if (scenario.includes("Why should we hire you")) {
    return "Why should we hire you?";
  }

  if (scenario.includes("salary expectations")) {
    return "Salary expectations";
  }

  if (scenario.includes("challenge")) {
    return "Challenge solved";
  }

  if (scenario.includes("remotely") || scenario.includes("teams")) {
    return "Remote work experience";
  }

  return "Remote work experience";
}

export function AnswerBank({
  profile,
  answers,
}: {
  profile: Profile;
  answers: Omit<AnswerBankItem, "category">[];
}) {
  const normalizedAnswers = useMemo(
    () =>
      answers.map((answer) => ({
        ...answer,
        category: getCategory(answer.scenario),
      })),
    [answers]
  );
  const [category, setCategory] = useState(categories[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const visibleAnswers = normalizedAnswers.filter((answer) => answer.category === category);

  async function copyAnswer(answer: AnswerBankItem) {
    if (!answer.improved_answer) {
      return;
    }

    await navigator.clipboard.writeText(answer.improved_answer);
    setCopiedId(answer.id);
    window.setTimeout(() => setCopiedId(null), 1500);
  }

  async function improveAndSave(answer: AnswerBankItem) {
    if (!answer.improved_answer) {
      return;
    }

    setSavingId(answer.id);
    setError(null);

    try {
      const response = await fetch("/api/remote-job-assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assetType: "interview_answer",
          sourceSessionId: answer.id,
          userRole: profile.role ?? "Professional",
          userGoal: profile.main_goal ?? "Get a remote job",
          directTitle: `${answer.scenario} - improved answer`,
          directContent: answer.improved_answer,
          directRationale:
            "Saved exactly from the improved answer bank version so the candidate can rehearse it and reuse it for remote job interviews.",
          directTips: [
            "Practice it naturally before using it live.",
            "Keep examples truthful and specific.",
            "Adjust the ending for each company or role.",
          ],
          inputContext: `Question: ${answer.question}

Original answer:
${answer.user_answer}

Improved answer:
${answer.improved_answer}

Save this exact answer-bank version as a job asset that I can practice and reuse in remote job interviews.`,
        }),
      });
      const data = (await response.json()) as { saved?: boolean; message?: string; error?: string };

      if (!response.ok || !data.saved) {
        setError(data.error ?? data.message ?? "We could not save this answer as an asset.");
        return;
      }

      setSavedId(answer.id);
      window.setTimeout(() => setSavedId(null), 1800);
    } catch {
      setError("No pudimos conectar con el answer bank. Intenta otra vez.");
    } finally {
      setSavingId(null);
    }
  }

  return (
    <section className="premium-panel">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            My Answer Bank
          </p>
          <h2 className="mt-1 text-2xl font-semibold">
            Strong interview answers you can reuse
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            These are your best improved answers from practice. Copy them,
            rehearse them, or save a polished version as a job application asset.
          </p>
        </div>
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setCategory(item);
              setError(null);
            }}
            className={`shrink-0 rounded-full border px-3 py-2 text-sm transition ${
              category === item
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-white hover:bg-muted"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {error ? <p className="mt-4 text-sm text-black">{error}</p> : null}

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {visibleAnswers.length ? (
          visibleAnswers.map((answer) => (
            <article key={answer.id} className="rounded-xl border border-border p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{answer.scenario}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {answer.overall_score ?? "-"} / 100
                  </p>
                </div>
              </div>
              <div className="mt-4 rounded-xl bg-muted/40 p-4 text-sm leading-6">
                {answer.improved_answer}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button type="button" variant="outline" onClick={() => copyAnswer(answer)}>
                  {copiedId === answer.id ? "Copied" : "Copy final answer"}
                  {copiedId === answer.id ? <Check /> : <Copy />}
                </Button>
                <Button
                  type="button"
                  onClick={() => improveAndSave(answer)}
                  disabled={savingId === answer.id}
                >
                  {savingId === answer.id
                    ? "Saving..."
                    : savedId === answer.id
                      ? "Saved"
                      : "Save exact asset"}
                  {savedId === answer.id ? <Check /> : <Sparkles />}
                </Button>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground md:col-span-2">
            <p className="font-medium text-foreground">No answer saved in this category yet.</p>
            <p className="mt-2">
              Practice this interview scenario and your improved answer will appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
