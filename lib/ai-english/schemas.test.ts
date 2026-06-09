import assert from "node:assert/strict";

import {
  practiceEvaluateRequestSchema,
  practiceEvaluationSchema,
} from "./schemas.ts";

const request = practiceEvaluateRequestSchema.parse({
  roleId: "customer_support",
  scenarioId: "cs-difficult-situations",
  scenarioType: "interview",
  question: "Tell me about helping customers.",
  answerText: "I listen carefully, confirm the issue and explain the next step clearly.",
  englishLevel: "B1",
  mainGoal: "Prepare for remote job interviews",
});

assert.equal(request.roleId, "customer_support");

const validFeedback = practiceEvaluationSchema.parse({
  overall_score: 72,
  score_band: "Workable",
  summary: "Clear enough, but it needs a specific example.",
  rubric_scores: {
    clarity: 78,
    grammar_control: 68,
    structure: 62,
    professional_tone: 74,
    role_relevance: 70,
    specificity: 55,
    remote_communication: 72,
    confidence: 69,
    actionability: 64,
  },
  strengths: ["You answered directly."],
  improvements: ["Add a concrete example."],
  improved_answer: "I listen carefully and explain the next step clearly.",
  suggested_phrases: ["The main challenge was..."],
  next_step: "Try again with one example.",
  prompt_version: "ai_english_feedback_v1",
  rubric_version: "inglevo_english_rubric_v1",
  model_used: "test-model",
  source: "openai",
});

assert.equal(validFeedback.score_band, "Workable");

const invalid = practiceEvaluationSchema.safeParse({
  ...validFeedback,
  score_band: "Invalid band",
});
assert.equal(invalid.success, false);
