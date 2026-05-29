import { z } from "zod";

export const onboardingSchema = z.object({
  mainGoal: z.string().min(2),
  role: z.string().min(2),
  englishLevel: z.enum(["A1", "A2", "B1", "B2", "C1", "Not sure"]),
  targetSalary: z.string().min(2),
  applyingRemoteJobs: z.string().min(2),
  biggestBlocker: z.string().min(2),
  recommendedPath: z.enum(["Improve English", "Remote Jobs", "My Readiness"]),
});

export const coachFeedbackSchema = z.object({
  scenario: z.string().min(2).max(160),
  question: z.string().min(5).max(600),
  userAnswer: z.string().min(8).max(4000),
  userLevel: z.string().max(40).optional(),
  userRole: z.string().max(100).optional(),
  userGoal: z.string().max(160).optional(),
  voiceMetrics: z
    .object({
      durationSeconds: z.number().min(1).max(600),
      source: z.literal("voice"),
    })
    .optional(),
});

export const coachFeedbackOutputSchema = z.object({
  overallScore: z.number().min(0).max(100),
  clarity: z.number().min(0).max(100),
  grammar: z.number().min(0).max(100),
  professionalTone: z.number().min(0).max(100),
  structure: z.number().min(0).max(100),
  opportunityReadiness: z.number().min(0).max(100),
  employability: z.number().min(0).max(100),
  remoteReadiness: z.number().min(0).max(100),
  confidence: z.number().min(0).max(100),
  specificity: z.number().min(0).max(100),
  sellsYou: z.number().min(0).max(100),
  quickDiagnosis: z.string().min(1),
  employabilityFeedback: z.string().min(1),
  remoteReadinessFeedback: z.string().min(1),
  professionalToneFeedback: z.string().min(1),
  confidenceFeedback: z.string().min(1),
  specificityFeedback: z.string().min(1),
  sellsYouFeedback: z.string().min(1),
  whatWorked: z.array(z.string().min(1)).min(1),
  whatToImprove: z.array(z.string().min(1)).min(1),
  improvedAnswer: z.string().min(1),
  improvedAnswers: z.object({
    clearVersion: z.string().min(1),
    professionalVersion: z.string().min(1),
    highValueVersion: z.string().min(1),
  }),
  keyPhrases: z.array(z.string().min(1)).min(1),
  nextPractice: z.string().min(1),
});

export const asyncWritingAssessmentSchema = z.object({
  assessmentType: z.enum(["slack_update", "blocker_explanation", "meeting_follow_up"]),
  prompt: z.string().min(10).max(1200),
  userMessage: z.string().min(12).max(4000),
  userLevel: z.string().max(40).optional(),
  userRole: z.string().max(100).optional(),
  userGoal: z.string().max(160).optional(),
});

export const asyncWritingFeedbackOutputSchema = z.object({
  overallScore: z.number().min(0).max(100),
  clarity: z.number().min(0).max(100),
  tone: z.number().min(0).max(100),
  concision: z.number().min(0).max(100),
  ownership: z.number().min(0).max(100),
  actionability: z.number().min(0).max(100),
  quickDiagnosis: z.string().min(1),
  whatWorked: z.array(z.string().min(1)).min(1),
  whatToImprove: z.array(z.string().min(1)).min(1),
  improvedMessage: z.string().min(1),
  keyPhrases: z.array(z.string().min(1)).min(1),
  nextPractice: z.string().min(1),
});

export const interviewConversationSchema = z.object({
  scenario: z.string().min(2).max(160),
  currentQuestion: z.string().min(5).max(600),
  userAnswer: z.string().min(8).max(4000),
  improvedAnswer: z.string().min(1).max(4000),
  quickDiagnosis: z.string().min(1).max(1200),
  userLevel: z.string().max(40).optional(),
  userRole: z.string().max(100).optional(),
  userGoal: z.string().max(160).optional(),
  turnCount: z.number().int().min(1).max(5).default(1),
});

export const interviewConversationOutputSchema = z.object({
  interviewerReply: z.string().min(1),
  followUpQuestion: z.string().min(5),
});

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(2),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const profileSettingsSchema = z.object({
  fullName: z.string().min(2),
  englishLevel: z.enum(["A1", "A2", "B1", "B2", "C1", "Not sure"]),
  role: z.string().min(2),
  mainGoal: z.string().min(2),
});

export const setupCheckSchema = z.object({
  stableInternet: z.boolean(),
  workingMicrophone: z.boolean(),
  canJoinVideoCalls: z.boolean(),
  quietPlace: z.boolean(),
  headphonesAvailable: z.boolean(),
  timezoneOverlap: z.boolean(),
  timezone: z.string().min(1).max(80).nullable(),
  microphoneStatus: z.string().max(80).nullable(),
  cameraStatus: z.string().max(80).nullable(),
});

export const remoteJobAssetSchema = z.object({
  assetType: z.enum([
    "recruiter_message",
    "linkedin_headline",
    "linkedin_about",
    "resume_bullet",
    "follow_up_email",
    "salary_script",
    "interview_answer",
  ]),
  inputContext: z.string().min(10).max(4000),
  sourceSessionId: z.uuid().nullable().optional(),
  userRole: z.string().max(100).optional(),
  userGoal: z.string().max(160).optional(),
});

export const remoteJobAssetOutputSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  rationale: z.string().min(1),
  tips: z.array(z.string().min(1)).min(1),
});
