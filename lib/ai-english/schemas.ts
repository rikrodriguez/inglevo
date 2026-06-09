import { z } from "zod";

const scoreSchema = z.number().int().min(0).max(100);

export const practiceScoreBandSchema = z.enum([
  "Not ready",
  "Developing",
  "Workable",
  "Job-ready",
  "Strong signal",
]);

export const practiceEvaluateRequestSchema = z.object({
  roleId: z.enum([
    "virtual_assistant",
    "customer_support",
    "marketing_assistant",
  ]),
  scenarioId: z.string().min(2).max(120),
  scenarioType: z.enum(["interview", "writing", "role_scenario"]),
  question: z.string().min(10).max(1200),
  answerText: z.string().min(20).max(2400),
  englishLevel: z.enum(["A1", "A2", "B1", "B2", "C1", "Not sure"]),
  mainGoal: z.string().min(2).max(160),
});

export const practiceEvaluationSchema = z.object({
  overall_score: scoreSchema,
  score_band: practiceScoreBandSchema,
  summary: z.string().min(1).max(1200),
  rubric_scores: z.object({
    clarity: scoreSchema,
    grammar_control: scoreSchema,
    structure: scoreSchema,
    professional_tone: scoreSchema,
    role_relevance: scoreSchema,
    specificity: scoreSchema,
    remote_communication: scoreSchema,
    confidence: scoreSchema,
    actionability: scoreSchema,
  }),
  strengths: z.array(z.string().min(1).max(300)).min(1).max(5),
  improvements: z.array(z.string().min(1).max(300)).min(1).max(5),
  improved_answer: z.string().min(1).max(2400),
  suggested_phrases: z.array(z.string().min(1).max(160)).min(1).max(6),
  next_step: z.string().min(1).max(500),
  prompt_version: z.literal("ai_english_feedback_v1"),
  rubric_version: z.literal("inglevo_english_rubric_v1"),
  model_used: z.string().min(1).max(120),
  source: z.enum(["openai", "mock"]),
});
