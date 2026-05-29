import type { CoachFeedback, Profile } from "@/types";

export const mockUserId = "00000000-0000-0000-0000-000000000001";

export const mockProfile: Profile = {
  id: mockUserId,
  email: "demo@inglevo.app",
  full_name: "LATAM Professional",
  english_level: "B1",
  role: "Marketer",
  main_goal: "Get a remote job",
  target_salary: null,
  applying_remote_jobs: null,
  biggest_blocker: "I do not answer interviews well",
  recommended_path: "Improve English",
  onboarding_completed: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export function createMockFeedback(userAnswer: string): CoachFeedback {
  const hasDetail = userAnswer.split(" ").length > 18;
  const base = hasDetail ? 78 : 64;

  return {
    overallScore: base,
    clarity: base + 2,
    grammar: base - 8,
    professionalTone: base + 4,
    structure: base - 3,
    opportunityReadiness: base,
    employability: base - 1,
    remoteReadiness: base,
    confidence: base - 5,
    specificity: hasDetail ? base : base - 10,
    sellsYou: hasDetail ? base + 1 : base - 8,
    quickDiagnosis:
      "Your answer is understandable, but it sounds too basic and does not sell your experience well.",
    employabilityFeedback:
      "The answer communicates intention, but it needs impact and evidence to sound more hireable.",
    remoteReadinessFeedback:
      "It can better connect your experience with remote collaboration, ownership and international communication.",
    professionalToneFeedback:
      "The tone is correct, but it can sound more strategic and less basic.",
    confidenceFeedback:
      "It needs to sound more confident: avoid over-explaining and speak from contribution.",
    specificityFeedback:
      "Add concrete examples, tools, results or types of projects.",
    sellsYouFeedback:
      "It does not strongly sell your professional value yet; it needs a clearer reason to choose you.",
    whatWorked: [
      "You explain your goal directly.",
      "The main idea is clear.",
    ],
    whatToImprove: [
      "Add concrete experience.",
      "Avoid sounding like you only want a better salary.",
      "Use a more professional structure.",
    ],
    improvedAnswer:
      "I’m a marketing professional with experience in content strategy and lead generation. I’m looking for a remote role where I can contribute to an international team, improve campaign performance, and continue growing professionally.",
    improvedAnswers: {
      clearVersion:
        "I’m a marketing professional with experience in content strategy and lead generation. I’m looking for a remote role where I can contribute to an international team and keep growing professionally.",
      professionalVersion:
        "I’m a marketing professional with experience in content strategy and lead generation. I’m looking for a remote role where I can contribute to an international team, improve campaign performance, and continue growing professionally.",
      highValueVersion:
        "I’m a marketing professional with experience building content and lead-generation systems that help companies attract and convert better opportunities. I’m looking for a remote role with an international team where I can bring ownership, clear communication, and a growth-focused mindset to improve campaign performance.",
    },
    keyPhrases: [
      "I’m a marketing professional with experience in...",
      "I’m looking for a remote role where...",
      "contribute to an international team",
    ],
    nextPractice: "Practice answering: Why should we hire you?",
  };
}
