import assert from "node:assert/strict";

import {
  aiEnglishRoles,
  getRoleById,
  getTodayMission,
} from "./role-library.ts";

assert.equal(aiEnglishRoles.length, 3);
assert.deepEqual(
  aiEnglishRoles.map((role) => role.id),
  ["virtual_assistant", "customer_support", "marketing_assistant"]
);

for (const role of aiEnglishRoles) {
  assert.equal(role.interview_scenarios.length, 5);
  assert.equal(role.writing_tasks.length, 5);
  assert.equal(role.role_scenarios.length, 3);
  assert.equal(role.vocabulary.length, 10);
  assert.equal(role.common_mistakes.length, 5);
}

assert.equal(getRoleById("customer_support").title, "Customer Support");
assert.equal(getRoleById("missing").id, "customer_support");

const mission = getTodayMission({
  targetRole: "customer_support",
  mainGoal: "Prepare for remote job interviews",
});

assert.equal(mission.role_id, "customer_support");
assert.equal(mission.scenario_type, "interview");
assert.equal(mission.estimated_time_minutes, 5);
assert.match(mission.context, /US SaaS company/i);
assert.match(mission.question, /helping customers/i);
assert.ok(!mission.question.toLowerCase().includes("tell me about yourself"));
