export type TutorModuleStatus =
  | "not_started"
  | "in_progress"
  | "improving"
  | "strong";

export type TutorModuleId =
  | "interview_english"
  | "async_writing"
  | "speaking_confidence"
  | "meeting_simulations";

export type TutorModule = {
  id: TutorModuleId;
  title: string;
  description: string;
  goal: string;
  whatItImproves: string[];
  verificationImpact: string;
  scenarios: string[];
  recommendedOrder: number;
  ctaLabel: string;
  targetRoute: string;
};

export type TutorRecommendedAction = {
  title: string;
  reason: string;
  ctaLabel: string;
  href: string;
  moduleId: TutorModuleId | "assets";
};

export type TutorProgressSummary = {
  interviewEnglish: number | null;
  asyncWriting: number | null;
  speakingConfidence: number | null;
  meetingSimulations: number | null;
  savedAssets: number | null;
};

export const aiTutorModules: TutorModule[] = [
  {
    id: "interview_english",
    title: "Interview English",
    description:
      "Practice answers recruiters actually ask and turn stronger versions into reusable job assets.",
    goal: "Sound clear, structured and credible in US remote interviews.",
    whatItImproves: ["clarity", "structure", "professional tone", "role fit"],
    verificationImpact:
      "Feeds Interview Readiness and strengthens proof for your Inglevo Verification Profile.",
    scenarios: [
      "Tell me about yourself",
      "Why should we hire you?",
      "Salary expectations",
      "Challenge solved",
    ],
    recommendedOrder: 1,
    ctaLabel: "Practice interview English",
    targetRoute: "/app/interview",
  },
  {
    id: "async_writing",
    title: "Async Writing",
    description:
      "Improve the Slack updates, blocker explanations and follow-ups remote teams rely on.",
    goal: "Write concise, useful updates that make you easy to trust remotely.",
    whatItImproves: ["clarity", "ownership", "concision", "actionability"],
    verificationImpact:
      "Adds async communication evidence to your readiness and candidate profile.",
    scenarios: ["Slack update", "Blocker explanation", "Meeting follow-up"],
    recommendedOrder: 2,
    ctaLabel: "Improve async writing",
    targetRoute: "/app/improve/async-writing",
  },
  {
    id: "speaking_confidence",
    title: "Speaking Confidence",
    description:
      "Practice spoken role answers with feedback on delivery, pace and confidence markers.",
    goal: "Speak with enough control for interviews, client calls and team conversations.",
    whatItImproves: [
      "delivery",
      "pace",
      "filler words",
      "confidence markers",
      "spoken structure",
    ],
    verificationImpact:
      "Turns voice practice into transcript, feedback and scores without storing audio.",
    scenarios: ["Spoken self-introduction", "Remote work answer", "Role impact answer"],
    recommendedOrder: 3,
    ctaLabel: "Practice speaking",
    targetRoute: "/app/interview?mode=speak",
  },
  {
    id: "meeting_simulations",
    title: "Meeting Simulations",
    description:
      "Practice realistic remote work conversations before they happen in a hiring process or role.",
    goal: "Handle common remote work situations with calm, professional English.",
    whatItImproves: ["meetings", "follow-ups", "client communication", "salary communication"],
    verificationImpact:
      "Builds role communication signals that support your verification story.",
    scenarios: [
      "Daily standup",
      "Blocker update",
      "Client call",
      "Support escalation",
      "Salary conversation",
    ],
    recommendedOrder: 4,
    ctaLabel: "Start simulation",
    targetRoute: "/app/interview?mode=speak&simulation=meeting",
  },
];

export const weeklyTrainingPath = [
  {
    day: "Day 1",
    title: "Interview English",
    action: "Practice your strongest remote-job introduction.",
    href: "/app/interview",
  },
  {
    day: "Day 2",
    title: "Async Writing",
    action: "Write a clear blocker update for a remote team.",
    href: "/app/improve/async-writing",
  },
  {
    day: "Day 3",
    title: "Speaking Confidence",
    action: "Record a spoken answer and reduce filler words.",
    href: "/app/interview?mode=speak",
  },
  {
    day: "Day 4",
    title: "Meeting Simulation",
    action: "Practice a standup, client call or escalation.",
    href: "/app/interview?mode=speak&simulation=meeting",
  },
  {
    day: "Day 5",
    title: "Job Assets",
    action: "Save your strongest answers as job assets.",
    href: "/app/remote-jobs",
  },
];

export const meetingSimulationScenarios = [
  {
    id: "daily-standup",
    label: "Daily standup",
    prompt:
      "Give a concise update: what you completed, what you are doing next and whether anything is blocked.",
  },
  {
    id: "blocker-update",
    label: "Blocker update",
    prompt:
      "Explain a blocker with context, impact, what you tried and the decision or help you need.",
  },
  {
    id: "client-call",
    label: "Client call",
    prompt:
      "Explain project progress to a client in clear, calm and professional English.",
  },
  {
    id: "support-escalation",
    label: "Support escalation",
    prompt:
      "Handle a support escalation with ownership, empathy and a clear next step.",
  },
  {
    id: "salary-conversation",
    label: "Salary conversation",
    prompt:
      "Discuss salary expectations with confidence, flexibility and professional boundaries.",
  },
];
