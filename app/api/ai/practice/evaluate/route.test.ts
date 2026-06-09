import assert from "node:assert/strict";

import { POST } from "./route.ts";

process.env.OPENAI_API_KEY = "";
process.env.OPENAI_MODEL = "gpt-5.4-mini";

const response = await POST(
  new Request("http://localhost/api/ai/practice/evaluate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      roleId: "customer_support",
      scenarioId: "cs-difficult-situations",
      scenarioType: "interview",
      question:
        "Tell me about your experience helping customers and handling difficult situations.",
      answerText:
        "I listen carefully to customers, confirm the problem, explain the next step, and follow up until the issue is solved.",
      englishLevel: "B1",
      mainGoal: "Prepare for remote job interviews",
    }),
  }) as never
);

const data = await response.json();

assert.equal(response.status, 200);
assert.equal(data.source, "mock");
assert.equal(data.model_used, "gpt-5.4-mini");
assert.equal(data.prompt_version, "ai_english_feedback_v1");
assert.equal(data.rubric_version, "inglevo_english_rubric_v1");
assert.ok(data.overall_score >= 0 && data.overall_score <= 100);
assert.ok(data.summary.length > 20);
assert.ok(data.improved_answer.length > 20);
assert.ok(data.strengths.length > 0);
assert.ok(data.improvements.length > 0);
