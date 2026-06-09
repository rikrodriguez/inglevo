import assert from "node:assert/strict";

import { createMockPracticeEvaluation } from "./scoring.ts";
import {
  createLocalAIEnglishStorage,
  createMemoryAIEnglishStorage,
} from "./storage.ts";

const storage = createMemoryAIEnglishStorage();
const userId = "demo-user";

const profile = await storage.saveTrainingProfile(userId, {
  target_role: "customer_support",
  english_level: "B1",
  main_goal: "Prepare for remote job interviews",
  interview_confidence: "Medium",
  writing_confidence: "Low",
  speaking_confidence: "Medium",
});

assert.equal(profile.user_id, userId);
assert.equal(profile.target_role, "customer_support");
assert.equal((await storage.getTrainingProfile(userId))?.main_goal, profile.main_goal);

const session = await storage.createPracticeSession(userId, {
  role_id: "customer_support",
  scenario_id: "cs-difficult-situations",
  scenario_type: "interview",
  title: "Customer Support Interview Practice",
  context: "You are interviewing for a support role.",
  question: "Tell me about helping customers.",
  what_this_measures: ["clarity"],
});

const evaluation = createMockPracticeEvaluation({
  answerText: "I listen to customers and explain next steps clearly.",
  roleTitle: "Customer Support",
});
const attempt = await storage.addPracticeAttempt(userId, session.id, {
  answer_text: "I listen to customers and explain next steps clearly.",
  evaluation,
});

const sessions = await storage.getPracticeSessions(userId);
assert.equal(sessions.length, 1);
assert.equal(sessions[0].best_score, evaluation.overall_score);
assert.equal(sessions[0].attempts[0].id, attempt.id);

const saved = await storage.saveAnswerBankItem(userId, {
  role_id: "customer_support",
  asset_type: "Interview Answer",
  title: "Customer Support Interview Practice",
  original_answer: attempt.answer_text,
  improved_answer: attempt.improved_answer,
  score: attempt.overall_score,
  score_band: attempt.score_band,
  tags: ["customer-support"],
  source_session_id: session.id,
  source_attempt_id: attempt.id,
});

assert.equal(saved.is_ready, false);
assert.equal((await storage.getAnswerBankItems(userId)).length, 1);
assert.equal((await storage.incrementUsage(userId, "saved_answer")).saved_answers_count, 1);
await storage.deleteAnswerBankItem(userId, saved.id);
assert.equal((await storage.getAnswerBankItems(userId)).length, 0);

const localStorageData = new Map<string, string>();
globalThis.window = {
  localStorage: {
    getItem(key: string) {
      return localStorageData.get(key) ?? null;
    },
    setItem(key: string, value: string) {
      localStorageData.set(key, value);
    },
  },
} as unknown as Window & typeof globalThis;

const localUserId = "demo-local-user";
const firstLocalStorage = createLocalAIEnglishStorage("qa_local_storage");
await firstLocalStorage.saveTrainingProfile(localUserId, {
  target_role: "marketing_assistant",
  english_level: "B2",
  main_goal: "Build stronger job application answers",
  interview_confidence: "High",
  writing_confidence: "Medium",
  speaking_confidence: "Low",
});
const localSession = await firstLocalStorage.createPracticeSession(localUserId, {
  role_id: "marketing_assistant",
  scenario_id: "ma-campaign-results",
  scenario_type: "interview",
  title: "Marketing Assistant Interview Practice",
  context: "You are applying for a remote Marketing Assistant role.",
  question: "Tell me about a campaign you helped with.",
  what_this_measures: ["specificity"],
});
const localEvaluation = createMockPracticeEvaluation({
  answerText:
    "I helped organize a campaign, prepared content, reviewed feedback and shared next steps with the team.",
  roleTitle: "Marketing Assistant",
});
const localAttempt = await firstLocalStorage.addPracticeAttempt(
  localUserId,
  localSession.id,
  {
    answer_text:
      "I helped organize a campaign, prepared content, reviewed feedback and shared next steps with the team.",
    evaluation: localEvaluation,
  }
);
const localAnswer = await firstLocalStorage.saveAnswerBankItem(localUserId, {
  role_id: "marketing_assistant",
  asset_type: "Interview Answer",
  title: "Marketing campaign answer",
  original_answer: localAttempt.answer_text,
  improved_answer: localAttempt.improved_answer,
  score: localAttempt.overall_score,
  score_band: localAttempt.score_band,
  tags: ["marketing"],
  source_session_id: localSession.id,
  source_attempt_id: localAttempt.id,
});
await firstLocalStorage.markAnswerBankItemReady(localUserId, localAnswer.id, true);

const refreshedStorage = createLocalAIEnglishStorage("qa_local_storage");
assert.equal(
  (await refreshedStorage.getTrainingProfile(localUserId))?.target_role,
  "marketing_assistant"
);
assert.equal((await refreshedStorage.getPracticeSessions(localUserId))[0].attempts.length, 1);
assert.equal((await refreshedStorage.getAnswerBankItems(localUserId))[0].is_ready, true);

await refreshedStorage.deleteAnswerBankItem(localUserId, localAnswer.id);
const afterDeleteRefresh = createLocalAIEnglishStorage("qa_local_storage");
assert.equal((await afterDeleteRefresh.getAnswerBankItems(localUserId)).length, 0);
