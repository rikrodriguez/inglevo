"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { aiEnglishRoles, getRoleById, getTodayMission } from "@/lib/ai-english/role-library";
import {
  createLocalAIEnglishStorage,
  type SaveTrainingProfileInput,
} from "@/lib/ai-english/storage";
import type {
  AIEnglishConfidence,
  AIEnglishMainGoal,
  AIEnglishRoleId,
} from "@/lib/ai-english/types";
import type { EnglishLevel } from "@/types";

const englishLevels: Array<EnglishLevel | "Not sure"> = [
  "Not sure",
  "A2",
  "B1",
  "B2",
  "C1",
];

const mainGoals: AIEnglishMainGoal[] = [
  "Prepare for remote job interviews",
  "Improve professional writing",
  "Sound more confident",
  "Build stronger job application answers",
];

const confidenceOptions: AIEnglishConfidence[] = ["Low", "Medium", "High"];

function ConfidenceSelect({
  label,
  value,
  onChange,
}: {
  label: string;
  value: AIEnglishConfidence;
  onChange: (value: AIEnglishConfidence) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as AIEnglishConfidence)}
        className="h-11 rounded-lg border border-border bg-white px-3 outline-none focus:ring-2 focus:ring-foreground/15"
      >
        {confidenceOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function RoleSetupForm({ userId }: { userId: string }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<SaveTrainingProfileInput>({
    target_role: "customer_support",
    english_level: "B1",
    main_goal: "Prepare for remote job interviews",
    interview_confidence: "Medium",
    writing_confidence: "Medium",
    speaking_confidence: "Medium",
  });
  const selectedRole = getRoleById(form.target_role);
  const firstMission = getTodayMission({
    targetRole: form.target_role,
    mainGoal: form.main_goal,
  });

  function update<Key extends keyof SaveTrainingProfileInput>(
    key: Key,
    value: SaveTrainingProfileInput[Key]
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function saveProfile() {
    setSaving(true);
    setError(null);

    try {
      const storage = createLocalAIEnglishStorage();
      await storage.saveTrainingProfile(userId, form);
      router.push("/app/ai-trainer");
      router.refresh();
    } catch {
      setError("We could not save your training profile. Please try again.");
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <section className="premium-panel">
        <div className="flex flex-wrap items-center gap-2">
          <span className="badge-ready">Step 1</span>
          <span className="badge-pending">Role-based practice</span>
        </div>
        <p className="section-kicker mt-5">English Role Setup</p>
        <h1 className="page-title mt-2">Choose the role you want to practice for.</h1>
        <p className="page-copy mt-3">
          Your role shapes the questions, feedback and saved English assets.
          Start with one focused path; you can change it later.
        </p>

        <div className="mt-6 grid gap-3">
          {aiEnglishRoles.map((role) => {
            const selected = form.target_role === role.id;

            return (
              <button
                key={role.id}
                type="button"
                onClick={() => update("target_role", role.id as AIEnglishRoleId)}
                className={`rounded-2xl border p-5 text-left transition ${
                  selected
                    ? "border-black bg-black text-white"
                    : "border-border bg-white hover:-translate-y-0.5 hover:bg-muted hover:shadow-sm"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">{role.title}</h2>
                    <p
                      className={`mt-2 text-sm leading-6 ${
                        selected ? "text-white/70" : "text-muted-foreground"
                      }`}
                    >
                      {role.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {role.common_tools.slice(0, 3).map((tool) => (
                        <span
                          key={tool}
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            selected
                              ? "bg-white/10 text-white/80"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  {selected ? <CheckCircle2 className="size-5 shrink-0" /> : null}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <aside className="premium-panel h-fit lg:sticky lg:top-24">
        <div className="rounded-2xl border border-[#d0f5e3] bg-[#d0f5e3]/45 p-4">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4" />
            <p className="text-sm font-semibold">First mission preview</p>
          </div>
          <p className="mt-3 text-sm font-semibold">{firstMission.title}</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {firstMission.question}
          </p>
        </div>

        <h2 className="mt-6 text-xl font-semibold">Training profile</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Training for <span className="font-semibold text-foreground">{selectedRole.title}</span>.
          Keep this honest so feedback stays useful.
        </p>
        <div className="mt-5 grid gap-4">
          <label className="grid gap-2 text-sm font-medium">
            Current English level
            <select
              value={form.english_level}
              onChange={(event) =>
                update("english_level", event.target.value as EnglishLevel | "Not sure")
              }
              className="h-11 rounded-lg border border-border bg-white px-3 outline-none focus:ring-2 focus:ring-foreground/15"
            >
              {englishLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium">
            Main goal
            <select
              value={form.main_goal}
              onChange={(event) =>
                update("main_goal", event.target.value as AIEnglishMainGoal)
              }
              className="min-h-11 rounded-lg border border-border bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-foreground/15"
            >
              {mainGoals.map((goal) => (
                <option key={goal} value={goal}>
                  {goal}
                </option>
              ))}
            </select>
          </label>

          <ConfidenceSelect
            label="Interview confidence"
            value={form.interview_confidence}
            onChange={(value) => update("interview_confidence", value)}
          />
          <ConfidenceSelect
            label="Writing confidence"
            value={form.writing_confidence}
            onChange={(value) => update("writing_confidence", value)}
          />
          <ConfidenceSelect
            label="Speaking confidence"
            value={form.speaking_confidence}
            onChange={(value) => update("speaking_confidence", value)}
          />
        </div>

        {error ? <p className="mt-4 text-sm text-black">{error}</p> : null}

        <Button
          type="button"
          onClick={saveProfile}
          disabled={saving}
          className="mt-6 h-11 w-full justify-between"
        >
          {saving ? "Saving profile..." : "Create training profile"}
          <ArrowRight />
        </Button>
      </aside>
    </div>
  );
}
