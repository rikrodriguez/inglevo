import assert from "node:assert/strict";

import {
  clampScore,
  createMockPracticeEvaluation,
  getPracticeScoreBand,
  getScoreDelta,
} from "./scoring.ts";

assert.equal(getPracticeScoreBand(0), "Not ready");
assert.equal(getPracticeScoreBand(39), "Not ready");
assert.equal(getPracticeScoreBand(40), "Developing");
assert.equal(getPracticeScoreBand(59), "Developing");
assert.equal(getPracticeScoreBand(60), "Workable");
assert.equal(getPracticeScoreBand(74), "Workable");
assert.equal(getPracticeScoreBand(75), "Job-ready");
assert.equal(getPracticeScoreBand(84), "Job-ready");
assert.equal(getPracticeScoreBand(85), "Strong signal");
assert.equal(getPracticeScoreBand(100), "Strong signal");

assert.equal(clampScore(-12), 0);
assert.equal(clampScore(42.7), 43);
assert.equal(clampScore(140), 100);

assert.deepEqual(getScoreDelta([], 76), null);
assert.deepEqual(getScoreDelta([{ overall_score: 62 }], 76), {
  previousScore: 62,
  newScore: 76,
  delta: 14,
});

const fallback = createMockPracticeEvaluation({
  answerText:
    "I usually listen to the customer, confirm the issue, explain the next step, and follow up until the problem is solved.",
  roleTitle: "Customer Support",
});

assert.equal(fallback.score_band, getPracticeScoreBand(fallback.overall_score));
assert.equal(fallback.prompt_version, "ai_english_feedback_v1");
assert.equal(fallback.rubric_version, "inglevo_english_rubric_v1");
assert.ok(fallback.improved_answer.includes("customer"));
assert.ok(fallback.strengths.length >= 1);
assert.ok(fallback.improvements.length >= 1);
assert.ok(fallback.suggested_phrases.length >= 1);
