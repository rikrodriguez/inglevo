"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { onboardingSchema } from "@/lib/validations";

const steps = [
  {
    key: "mainGoal",
    eyebrow: "Goal",
    title: "Which opportunity do you want to prepare for first?",
    helper: "We will use this to recommend more relevant scenarios and examples.",
    options: [
      "Get a remote job",
      "Pasar entrevistas",
      "Get international clients",
      "Improve meetings in English",
      "Negotiate salary or rates",
    ],
  },
  {
    key: "role",
    eyebrow: "Professional profile",
    title: "Which role best describes your work?",
    helper: "Your improved answers should sound natural for your field, not generic.",
    options: [
      "Developer",
      "Designer",
      "Marketer",
      "VA/Admin",
      "Customer Support",
      "Customer Success",
      "Sales/SDR",
      "Project Manager",
      "Data Analyst",
      "Founder/Freelancer",
      "Other",
    ],
  },
  {
    key: "englishLevel",
    eyebrow: "Current level",
    title: "How would you describe your English today?",
    helper: "It does not need to be exact. It helps adjust the feedback level.",
    options: ["A1", "A2", "B1", "B2", "C1", "Not sure"],
  },
  {
    key: "targetSalary",
    eyebrow: "Income target",
    title: "What monthly range would you like better remote opportunities to support?",
    helper: "We do not promise income. This only helps tailor language for roles and negotiation.",
    options: [
      "$1,000 - $2,000",
      "$2,000 - $3,500",
      "$3,500 - $5,000",
      "$5,000+",
      "I prefer to define it later",
    ],
  },
  {
    key: "applyingRemoteJobs",
    eyebrow: "Current status",
    title: "Are you already applying to remote jobs?",
    helper: "If you are already applying, we will prioritize assets. If not, we will prioritize foundation and readiness.",
    options: [
      "Yes, actively",
      "Yes, but without much structure",
      "Not yet, I am preparing",
      "I am only exploring",
    ],
  },
  {
    key: "biggestBlocker",
    eyebrow: "Main blocker",
    title: "What holds you back most when using professional English?",
    helper: "This helps prioritize clarity, structure, tone or confidence.",
    options: [
      "Speaking: I freeze when I speak",
      "Interviews: I do not answer well",
      "Writing: my writing is too basic",
      "Confidence: I feel insecure",
      "Salary: negotiation is difficult",
    ],
  },
];

type Answers = Record<string, string>;

function getRecommendedPath(answers: Answers) {
  const blocker = answers.biggestBlocker ?? "";
  const applying = answers.applyingRemoteJobs ?? "";
  const goal = answers.mainGoal ?? "";

  if (
    applying.includes("actively") ||
    applying.includes("without much structure") ||
    goal.includes("Get a remote job") ||
    blocker.startsWith("Salary")
  ) {
    return "Remote Jobs" as const;
  }

  if (blocker.startsWith("Writing") || blocker.startsWith("Interviews") || blocker.startsWith("Speaking")) {
    return "Improve English" as const;
  }

  return "My Readiness" as const;
}

export function OnboardingForm({ email }: { email: string }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const current = steps[step];

  async function finish(nextAnswers: Answers) {
    setSaving(true);
    setError(null);
    const normalized = {
      mainGoal: nextAnswers.mainGoal,
      role: nextAnswers.role,
      englishLevel:
        nextAnswers.englishLevel === "Not sure"
          ? "Not sure"
          : nextAnswers.englishLevel,
      targetSalary: nextAnswers.targetSalary,
      applyingRemoteJobs: nextAnswers.applyingRemoteJobs,
      biggestBlocker: nextAnswers.biggestBlocker,
      recommendedPath: getRecommendedPath(nextAnswers),
    };
    const parsed = onboardingSchema.safeParse(normalized);

    if (!parsed.success) {
      setError("We could not save onboarding. Complete every step.");
      setSaving(false);
      return;
    }

    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      window.localStorage.setItem("inglevo_onboarding", JSON.stringify(parsed.data));
      trackEvent("onboarding_completed", {
        mode: "demo",
        recommended_path: parsed.data.recommendedPath,
        main_goal: parsed.data.mainGoal,
        role: parsed.data.role,
        english_level: parsed.data.englishLevel,
      });
      router.push("/app");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You need to log in to save onboarding.");
      setSaving(false);
      return;
    }

    const { error: saveError } = await supabase.from("profiles").upsert({
      id: user.id,
      email: user.email ?? email,
      full_name: user.user_metadata?.full_name ?? null,
      english_level:
        parsed.data.englishLevel === "Not sure"
          ? null
          : parsed.data.englishLevel,
      role: parsed.data.role,
      main_goal: parsed.data.mainGoal,
      target_salary: parsed.data.targetSalary,
      applying_remote_jobs: parsed.data.applyingRemoteJobs,
      biggest_blocker: parsed.data.biggestBlocker,
      recommended_path: parsed.data.recommendedPath,
      onboarding_completed: true,
    });

    if (saveError) {
      setError(saveError.message);
      setSaving(false);
      return;
    }

    trackEvent("onboarding_completed", {
      recommended_path: parsed.data.recommendedPath,
      main_goal: parsed.data.mainGoal,
      role: parsed.data.role,
      english_level: parsed.data.englishLevel,
      applying_remote_jobs: parsed.data.applyingRemoteJobs,
      biggest_blocker: parsed.data.biggestBlocker,
    });
    await fetch("/api/product-events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: "onboarding_completed",
        metadata: {
          recommended_path: parsed.data.recommendedPath,
          main_goal: parsed.data.mainGoal,
          role: parsed.data.role,
          english_level: parsed.data.englishLevel,
        },
      }),
    }).catch(() => null);

    router.push("/app");
    router.refresh();
  }

  function select(option: string) {
    const nextAnswers = { ...answers, [current.key]: option };
    setAnswers(nextAnswers);

    if (step === steps.length - 1) {
      void finish(nextAnswers);
      return;
    }

    setStep((value) => value + 1);
  }

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm font-medium text-muted-foreground">
          Step {step + 1} of {steps.length} · {current.eyebrow}
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">{current.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{current.helper}</p>
      </div>
      {step === steps.length - 1 ? (
        <div className="mb-4 rounded-xl border border-dashed border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          When you finish, Inglevo will generate a recommended path: Improve
          English, Remote Jobs or My Readiness.
        </div>
      ) : null}
      <div className="grid gap-3 sm:grid-cols-2">
        {current.options.map((option) => (
          <button
            key={option}
            type="button"
            disabled={saving}
            onClick={() => select(option)}
            className="rounded-xl border border-border bg-white p-4 text-left text-sm font-medium transition hover:border-foreground hover:bg-muted"
          >
            {option}
          </button>
        ))}
      </div>
      {error ? <p className="mt-4 text-sm text-black">{error}</p> : null}
      {step > 0 ? (
        <Button
          type="button"
          variant="ghost"
          className="mt-6"
          onClick={() => setStep((value) => value - 1)}
        >
          Back
        </Button>
      ) : null}
    </div>
  );
}
