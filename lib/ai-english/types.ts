import type { PracticeEvaluation, PracticeScoreBand } from "@/lib/ai-english/scoring";
import type { EnglishLevel } from "@/types";

export type AIEnglishRoleId =
  | "virtual_assistant"
  | "customer_support"
  | "marketing_assistant";

export type AIEnglishScenarioType = "interview" | "writing" | "role_scenario";

export type AIEnglishDifficulty = "starter" | "intermediate" | "advanced";

export type AIEnglishMainGoal =
  | "Prepare for remote job interviews"
  | "Improve professional writing"
  | "Sound more confident"
  | "Build stronger job application answers";

export type AIEnglishConfidence = "Low" | "Medium" | "High";

export type InterviewRubricKey =
  | "clarity"
  | "grammar_control"
  | "structure"
  | "professional_tone"
  | "role_relevance"
  | "specificity"
  | "remote_communication"
  | "confidence"
  | "actionability";

export type WritingRubricKey =
  | "clarity"
  | "grammar_control"
  | "structure"
  | "professional_tone"
  | "concision"
  | "ownership"
  | "actionability"
  | "remote_communication";

export type AIEnglishScenario = {
  id: string;
  role_id: AIEnglishRoleId;
  scenario_type: AIEnglishScenarioType;
  difficulty: AIEnglishDifficulty;
  title: string;
  context: string;
  user_task: string;
  question: string;
  what_this_measures: string[];
  rubric_weights: Partial<Record<InterviewRubricKey | WritingRubricKey, number>>;
  ideal_answer_guidance: string;
  common_mistakes: string[];
  suggested_phrases: string[];
  tags: string[];
  estimated_time_minutes: number;
};

export type AIEnglishRole = {
  id: AIEnglishRoleId;
  title: string;
  description: string;
  common_tools: string[];
  interview_scenarios: AIEnglishScenario[];
  writing_tasks: AIEnglishScenario[];
  role_scenarios: AIEnglishScenario[];
  vocabulary: string[];
  common_mistakes: string[];
};

export type EnglishTrainingProfile = {
  id: string;
  user_id: string;
  target_role: AIEnglishRoleId;
  english_level: EnglishLevel | "Not sure";
  main_goal: AIEnglishMainGoal;
  interview_confidence: AIEnglishConfidence;
  writing_confidence: AIEnglishConfidence;
  speaking_confidence: AIEnglishConfidence;
  created_at: string;
  updated_at: string;
};

export type PracticeAttempt = {
  id: string;
  session_id: string;
  user_id: string;
  answer_text: string;
  overall_score: number;
  score_band: PracticeScoreBand;
  rubric_scores: PracticeEvaluation["rubric_scores"];
  ai_feedback: PracticeEvaluation;
  improved_answer: string;
  prompt_version: string;
  rubric_version: string;
  model_used: string;
  created_at: string;
};

export type PracticeSession = {
  id: string;
  user_id: string;
  role_id: AIEnglishRoleId;
  scenario_id: string;
  scenario_type: AIEnglishScenarioType;
  title: string;
  context: string;
  question: string;
  what_this_measures: string[];
  status: "active" | "completed";
  best_score: number | null;
  attempts: PracticeAttempt[];
  created_at: string;
  updated_at: string;
};

export type AnswerBankAssetType =
  | "Interview Answer"
  | "Async Writing"
  | "Recruiter Message"
  | "Client Response"
  | "Slack Update"
  | "Role Scenario";

export type AnswerBankItem = {
  id: string;
  user_id: string;
  role_id: AIEnglishRoleId;
  asset_type: AnswerBankAssetType;
  title: string;
  original_answer: string;
  improved_answer: string;
  score: number;
  score_band: PracticeScoreBand;
  tags: string[];
  source_session_id: string | null;
  source_attempt_id: string | null;
  is_ready: boolean;
  created_at: string;
  updated_at: string;
};

export type UsageFeature = "text_practice" | "writing_task" | "saved_answer";

export type UsageSnapshot = {
  user_id: string;
  plan: "free" | "paid";
  text_practices_used: number;
  writing_tasks_used: number;
  saved_answers_count: number;
  period_start: string;
  period_end: string;
  updated_at: string;
};
