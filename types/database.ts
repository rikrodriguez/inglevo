export type EnglishLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type SubscriptionPlan = "free" | "pro";

export type SubscriptionStatus =
  | "inactive"
  | "trialing"
  | "active"
  | "past_due"
  | "canceled";

export type PracticeScore = {
  overall_score: number | null;
  clarity: number | null;
  grammar: number | null;
  professional_tone: number | null;
  structure: number | null;
  opportunity_readiness: number | null;
};
