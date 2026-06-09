import assert from "node:assert/strict";

import { evaluatePracticeAnswer } from "./evaluation.ts";

const fallback = await evaluatePracticeAnswer({
  apiKey: "",
  model: "gpt-5.4-mini",
  roleId: "customer_support",
  scenarioId: "cs-difficult-situations",
  question:
    "Tell me about your experience helping customers and handling difficult situations.",
  answerText:
    "I listen carefully to customers, confirm the problem, explain the next step, and follow up until the issue is solved.",
  englishLevel: "B1",
  mainGoal: "Prepare for remote job interviews",
});

assert.equal(fallback.source, "mock");
assert.equal(fallback.model_used, "gpt-5.4-mini");
assert.equal(fallback.prompt_version, "ai_english_feedback_v1");
assert.equal(fallback.rubric_version, "inglevo_english_rubric_v1");
assert.ok(fallback.overall_score >= 0 && fallback.overall_score <= 100);
assert.ok(fallback.improved_answer.length > 20);
assert.ok(fallback.strengths.length > 0);
assert.ok(fallback.improvements.length > 0);
