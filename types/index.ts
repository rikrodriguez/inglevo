export type EnglishLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "Not sure";

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  english_level: EnglishLevel | null;
  role: string | null;
  main_goal: string | null;
  target_salary: string | null;
  applying_remote_jobs: string | null;
  biggest_blocker: string | null;
  recommended_path: "Improve English" | "Remote Jobs" | "My Readiness" | null;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
};

export type InterviewScenario = {
  id: string;
  scenario: string;
  question: string;
  goal: string;
};

export type CoachFeedback = {
  overallScore: number;
  clarity: number;
  grammar: number;
  professionalTone: number;
  structure: number;
  opportunityReadiness: number;
  employability: number;
  remoteReadiness: number;
  confidence: number;
  specificity: number;
  sellsYou: number;
  quickDiagnosis: string;
  employabilityFeedback: string;
  remoteReadinessFeedback: string;
  professionalToneFeedback: string;
  confidenceFeedback: string;
  specificityFeedback: string;
  sellsYouFeedback: string;
  whatWorked: string[];
  whatToImprove: string[];
  improvedAnswer: string;
  improvedAnswers: {
    clearVersion: string;
    professionalVersion: string;
    highValueVersion: string;
  };
  voiceFeedback?: {
    durationSeconds: number;
    wordCount: number;
    speakingSpeedWpm: number;
    fillerWords: string[];
    fillerWordCount: number;
    estimatedPauses: string;
    answerLength: string;
    confidenceMarkers: string[];
    repetitions: string[];
    spokenStructure: string;
    transcriptQuality: string;
    summary: string;
  };
  keyPhrases: string[];
  nextPractice: string;
};

export type AsyncWritingFeedback = {
  overallScore: number;
  clarity: number;
  tone: number;
  concision: number;
  ownership: number;
  actionability: number;
  quickDiagnosis: string;
  whatWorked: string[];
  whatToImprove: string[];
  improvedMessage: string;
  keyPhrases: string[];
  nextPractice: string;
};

export type RemoteJobAssetType =
  | "recruiter_message"
  | "linkedin_headline"
  | "linkedin_about"
  | "resume_bullet"
  | "follow_up_email"
  | "salary_script"
  | "interview_answer";

export type RemoteJobAssetOutput = {
  title: string;
  content: string;
  rationale: string;
  tips: string[];
};

export type RemoteJobAsset = {
  id: string;
  user_id: string;
  type: RemoteJobAssetType;
  title: string;
  content: string;
  source_session_id: string | null;
  created_at: string;
  updated_at: string;
};

export type ReadinessAssessment = {
  id: string;
  user_id: string;
  assessment_type: string;
  score: number;
  area_scores: Record<string, unknown>;
  feedback_json: Record<string, unknown>;
  status: "completed" | "partial" | "failed";
  created_at: string;
};

export type InterviewConversationTurn = {
  interviewerReply: string;
  followUpQuestion: string;
};

export type WritingAssessment = {
  id: string;
  user_id: string;
  assessment_type: string;
  prompt: string;
  user_message: string;
  improved_message: string | null;
  overall_score: number | null;
  clarity: number | null;
  tone: number | null;
  concision: number | null;
  ownership: number | null;
  actionability: number | null;
  feedback_json: AsyncWritingFeedback | Record<string, unknown>;
  created_at: string;
};

export type PracticeSession = {
  id: string;
  user_id: string;
  scenario: string;
  question: string;
  user_answer: string;
  improved_answer: string | null;
  overall_score: number | null;
  clarity: number | null;
  grammar: number | null;
  professional_tone: number | null;
  structure: number | null;
  opportunity_readiness: number | null;
  feedback_json: CoachFeedback | Record<string, unknown>;
  created_at: string;
};

export type RemoteSetupCheck = {
  id: string;
  user_id: string;
  stable_internet: boolean;
  working_microphone: boolean;
  can_join_video_calls: boolean;
  quiet_place: boolean;
  headphones_available: boolean;
  timezone_overlap: boolean;
  timezone: string | null;
  microphone_status: string | null;
  camera_status: string | null;
  score: number;
  created_at: string;
  updated_at: string;
};

export type Template = {
  id: string;
  category: string;
  title: string;
  use_case: string;
  content: string;
  created_at?: string;
};

export type RemoteOpportunity = {
  id: string;
  title: string;
  company: string;
  location: string;
  salaryRange: string;
  type: string;
  requiredEnglishLevel: "B1" | "B2" | "C1";
  requiredReadinessScore: number;
  roleCategory: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  sourceLabel: string;
  externalUrl: string;
  tags: string[];
};

export type SavedOpportunity = {
  id: string;
  user_id: string;
  opportunity_id: string;
  status: "saved" | "preparing" | "applied";
  created_at: string;
};
