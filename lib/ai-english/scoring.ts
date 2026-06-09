export const PROMPT_VERSION = "ai_english_feedback_v1";
export const RUBRIC_VERSION = "inglevo_english_rubric_v1";

export type PracticeScoreBand =
  | "Not ready"
  | "Developing"
  | "Workable"
  | "Job-ready"
  | "Strong signal";

export type PracticeEvaluation = {
  overall_score: number;
  score_band: PracticeScoreBand;
  summary: string;
  rubric_scores: {
    clarity: number;
    grammar_control: number;
    structure: number;
    professional_tone: number;
    role_relevance: number;
    specificity: number;
    remote_communication: number;
    confidence: number;
    actionability: number;
  };
  strengths: string[];
  improvements: string[];
  improved_answer: string;
  suggested_phrases: string[];
  next_step: string;
  prompt_version: typeof PROMPT_VERSION;
  rubric_version: typeof RUBRIC_VERSION;
  model_used: string;
  source: "openai" | "mock";
};

export type PracticeAttemptScore = {
  overall_score: number;
};

export function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function getPracticeScoreBand(score: number): PracticeScoreBand {
  const safeScore = clampScore(score);

  if (safeScore <= 39) {
    return "Not ready";
  }

  if (safeScore <= 59) {
    return "Developing";
  }

  if (safeScore <= 74) {
    return "Workable";
  }

  if (safeScore <= 84) {
    return "Job-ready";
  }

  return "Strong signal";
}

export function getScoreDelta(
  attempts: PracticeAttemptScore[],
  newScore: number
) {
  const previous = attempts.at(-1);

  if (!previous) {
    return null;
  }

  const previousScore = clampScore(previous.overall_score);
  const nextScore = clampScore(newScore);

  return {
    previousScore,
    newScore: nextScore,
    delta: nextScore - previousScore,
  };
}

export function createMockPracticeEvaluation({
  answerText,
  roleTitle,
  modelUsed = "mock-ai-english-evaluator",
}: {
  answerText: string;
  roleTitle: string;
  modelUsed?: string;
}): PracticeEvaluation {
  const wordCount = answerText.trim().split(/\s+/).filter(Boolean).length;
  const hasExample = /\b(example|customer|client|manager|team|project|issue|problem|result)\b/i.test(
    answerText
  );
  const baseScore = clampScore(52 + Math.min(wordCount, 80) * 0.35 + (hasExample ? 12 : 0));
  const scoreBand = getPracticeScoreBand(baseScore);

  return {
    overall_score: baseScore,
    score_band: scoreBand,
    summary:
      "Your answer is understandable and professional, but it needs a clearer structure and one concrete example to become stronger.",
    rubric_scores: {
      clarity: clampScore(baseScore + 6),
      grammar_control: clampScore(baseScore - 3),
      structure: clampScore(baseScore - 5),
      professional_tone: clampScore(baseScore + 4),
      role_relevance: clampScore(baseScore + 2),
      specificity: clampScore(hasExample ? baseScore : baseScore - 10),
      remote_communication: clampScore(baseScore),
      confidence: clampScore(baseScore - 2),
      actionability: clampScore(baseScore - 1),
    },
    strengths: [
      "You answered the main question directly.",
      "Your tone is polite and appropriate for a professional context.",
    ],
    improvements: [
      "Add one concrete example from your real experience.",
      "Use a simple structure: situation, action, result and next step.",
    ],
    improved_answer:
      `In my experience as a ${roleTitle.toLowerCase()}, I try to communicate clearly, understand the situation first, and take ownership of the next step. When a customer or team member needs help, I listen carefully, confirm the priority, explain what I can do, and follow up until the issue is resolved. This helps me stay professional and reliable in remote work situations.`,
    suggested_phrases: [
      "In my previous experience, I helped...",
      "The main challenge was...",
      "My next step would be...",
    ],
    next_step:
      "Try again using one specific example and a clearer closing sentence.",
    prompt_version: PROMPT_VERSION,
    rubric_version: RUBRIC_VERSION,
    model_used: modelUsed,
    source: "mock",
  };
}
