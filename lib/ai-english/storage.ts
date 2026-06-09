"use client";

import type { PracticeEvaluation } from "./scoring";
import type {
  AIEnglishRoleId,
  AIEnglishScenarioType,
  AnswerBankItem,
  EnglishTrainingProfile,
  PracticeAttempt,
  PracticeSession,
  UsageFeature,
  UsageSnapshot,
} from "./types";

export const DEMO_USER_ID = "demo-user";
const defaultStorageKey = "inglevo_ai_english_v1";

export type SaveTrainingProfileInput = Pick<
  EnglishTrainingProfile,
  | "target_role"
  | "english_level"
  | "main_goal"
  | "interview_confidence"
  | "writing_confidence"
  | "speaking_confidence"
>;

export type CreatePracticeSessionInput = {
  role_id: AIEnglishRoleId;
  scenario_id: string;
  scenario_type: AIEnglishScenarioType;
  title: string;
  context: string;
  question: string;
  what_this_measures: string[];
};

export type AddPracticeAttemptInput = {
  answer_text: string;
  evaluation: PracticeEvaluation;
};

export type SaveAnswerBankItemInput = Omit<
  AnswerBankItem,
  "id" | "user_id" | "is_ready" | "created_at" | "updated_at"
>;

type AIEnglishStorageState = {
  profiles: Record<string, EnglishTrainingProfile>;
  sessions: Record<string, PracticeSession[]>;
  answerBankItems: Record<string, AnswerBankItem[]>;
  usage: Record<string, UsageSnapshot>;
};

export type AIEnglishStorage = {
  getTrainingProfile(userId: string): Promise<EnglishTrainingProfile | null>;
  saveTrainingProfile(
    userId: string,
    profile: SaveTrainingProfileInput
  ): Promise<EnglishTrainingProfile>;
  getPracticeSessions(userId: string): Promise<PracticeSession[]>;
  createPracticeSession(
    userId: string,
    data: CreatePracticeSessionInput
  ): Promise<PracticeSession>;
  addPracticeAttempt(
    userId: string,
    sessionId: string,
    attempt: AddPracticeAttemptInput
  ): Promise<PracticeAttempt>;
  getAnswerBankItems(userId: string): Promise<AnswerBankItem[]>;
  saveAnswerBankItem(
    userId: string,
    item: SaveAnswerBankItemInput
  ): Promise<AnswerBankItem>;
  markAnswerBankItemReady(
    userId: string,
    itemId: string,
    isReady: boolean
  ): Promise<AnswerBankItem | null>;
  deleteAnswerBankItem(userId: string, itemId: string): Promise<void>;
  getUsage(userId: string): Promise<UsageSnapshot>;
  incrementUsage(userId: string, feature: UsageFeature): Promise<UsageSnapshot>;
};

function createEmptyState(): AIEnglishStorageState {
  return {
    profiles: {},
    sessions: {},
    answerBankItems: {},
    usage: {},
  };
}

function now() {
  return new Date().toISOString();
}

function newId(prefix: string) {
  if (globalThis.crypto?.randomUUID) {
    return `${prefix}_${globalThis.crypto.randomUUID()}`;
  }

  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function getDefaultUsage(userId: string): UsageSnapshot {
  const createdAt = now();
  const periodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  return {
    user_id: userId,
    plan: "free",
    text_practices_used: 0,
    writing_tasks_used: 0,
    saved_answers_count: 0,
    period_start: createdAt,
    period_end: periodEnd,
    updated_at: createdAt,
  };
}

function sortNewest<T extends { created_at: string }>(items: T[]) {
  return [...items].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

function createStateStorage({
  read,
  write,
}: {
  read: () => AIEnglishStorageState;
  write: (state: AIEnglishStorageState) => void;
}): AIEnglishStorage {
  function getUserSessions(state: AIEnglishStorageState, userId: string) {
    state.sessions[userId] ??= [];
    return state.sessions[userId];
  }

  function getUserItems(state: AIEnglishStorageState, userId: string) {
    state.answerBankItems[userId] ??= [];
    return state.answerBankItems[userId];
  }

  return {
    async getTrainingProfile(userId) {
      return read().profiles[userId] ?? null;
    },

    async saveTrainingProfile(userId, profile) {
      const state = read();
      const previous = state.profiles[userId];
      const timestamp = now();
      const next: EnglishTrainingProfile = {
        id: previous?.id ?? `profile_${userId}`,
        user_id: userId,
        ...profile,
        created_at: previous?.created_at ?? timestamp,
        updated_at: timestamp,
      };

      state.profiles[userId] = next;
      write(state);
      return next;
    },

    async getPracticeSessions(userId) {
      return sortNewest(read().sessions[userId] ?? []);
    },

    async createPracticeSession(userId, data) {
      const state = read();
      const sessions = getUserSessions(state, userId);
      const timestamp = now();
      const session: PracticeSession = {
        id: newId("session"),
        user_id: userId,
        ...data,
        status: "active",
        best_score: null,
        attempts: [],
        created_at: timestamp,
        updated_at: timestamp,
      };

      sessions.unshift(session);
      write(state);
      return session;
    },

    async addPracticeAttempt(userId, sessionId, attemptInput) {
      const state = read();
      const sessions = getUserSessions(state, userId);
      const session = sessions.find((item) => item.id === sessionId);

      if (!session) {
        throw new Error("Practice session not found.");
      }

      const timestamp = now();
      const attempt: PracticeAttempt = {
        id: newId("attempt"),
        session_id: session.id,
        user_id: userId,
        answer_text: attemptInput.answer_text,
        overall_score: attemptInput.evaluation.overall_score,
        score_band: attemptInput.evaluation.score_band,
        rubric_scores: attemptInput.evaluation.rubric_scores,
        ai_feedback: attemptInput.evaluation,
        improved_answer: attemptInput.evaluation.improved_answer,
        prompt_version: attemptInput.evaluation.prompt_version,
        rubric_version: attemptInput.evaluation.rubric_version,
        model_used: attemptInput.evaluation.model_used,
        created_at: timestamp,
      };

      session.attempts.push(attempt);
      session.status = "completed";
      session.best_score =
        session.best_score === null
          ? attempt.overall_score
          : Math.max(session.best_score, attempt.overall_score);
      session.updated_at = timestamp;
      write(state);
      return attempt;
    },

    async getAnswerBankItems(userId) {
      return sortNewest(read().answerBankItems[userId] ?? []);
    },

    async saveAnswerBankItem(userId, itemInput) {
      const state = read();
      const items = getUserItems(state, userId);
      const timestamp = now();
      const item: AnswerBankItem = {
        id: newId("answer"),
        user_id: userId,
        ...itemInput,
        is_ready: false,
        created_at: timestamp,
        updated_at: timestamp,
      };

      items.unshift(item);
      write(state);
      return item;
    },

    async markAnswerBankItemReady(userId, itemId, isReady) {
      const state = read();
      const item = getUserItems(state, userId).find((entry) => entry.id === itemId);

      if (!item) {
        return null;
      }

      item.is_ready = isReady;
      item.updated_at = now();
      write(state);
      return item;
    },

    async deleteAnswerBankItem(userId, itemId) {
      const state = read();
      state.answerBankItems[userId] = getUserItems(state, userId).filter(
        (item) => item.id !== itemId
      );
      write(state);
    },

    async getUsage(userId) {
      const state = read();
      state.usage[userId] ??= getDefaultUsage(userId);
      write(state);
      return state.usage[userId];
    },

    async incrementUsage(userId, feature) {
      const state = read();
      const usage = state.usage[userId] ?? getDefaultUsage(userId);

      if (feature === "text_practice") {
        usage.text_practices_used += 1;
      }

      if (feature === "writing_task") {
        usage.writing_tasks_used += 1;
      }

      if (feature === "saved_answer") {
        usage.saved_answers_count += 1;
      }

      usage.updated_at = now();
      state.usage[userId] = usage;
      write(state);
      return usage;
    },
  };
}

export function createMemoryAIEnglishStorage(initialState?: AIEnglishStorageState) {
  let state = initialState ?? createEmptyState();

  return createStateStorage({
    read: () => structuredClone(state),
    write: (nextState) => {
      state = structuredClone(nextState);
    },
  });
}

export function createLocalAIEnglishStorage(storageKey = defaultStorageKey) {
  const memoryFallback = createMemoryAIEnglishStorage();

  if (typeof window === "undefined" || !window.localStorage) {
    return memoryFallback;
  }

  function read() {
    try {
      const raw = window.localStorage.getItem(storageKey);
      return raw ? (JSON.parse(raw) as AIEnglishStorageState) : createEmptyState();
    } catch {
      return createEmptyState();
    }
  }

  function write(state: AIEnglishStorageState) {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      // Keep the UI functional even if browser storage is unavailable.
    }
  }

  return createStateStorage({ read, write });
}
