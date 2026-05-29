export type ReadinessArea = {
  id: string;
  name: string;
  description: string;
  metrics: string[];
  cta: "Practice now" | "Start assessment" | "Coming soon";
  href?: string;
};

export const readinessAreas: ReadinessArea[] = [
  {
    id: "spoken-english",
    name: "Spoken English",
    description:
      "Ability to speak clearly, structure answers, and communicate professional ideas in English.",
    metrics: ["clarity", "confidence", "grammar", "vocabulary", "structure"],
    cta: "Start assessment",
    href: "/app/interview",
  },
  {
    id: "interview-readiness",
    name: "Interview Readiness",
    description:
      "Ability to answer remote job interview questions with confidence, specificity, and professional tone.",
    metrics: [
      "answer structure",
      "relevance",
      "specificity",
      "value communication",
      "remote fit",
    ],
    cta: "Practice now",
    href: "/app/interview",
  },
  {
    id: "async-writing",
    name: "Async Writing",
    description:
      "Ability to write clear, concise, and professional messages for remote work.",
    metrics: ["clarity", "tone", "concision", "actionability", "ownership"],
    cta: "Practice now",
    href: "/app/templates",
  },
  {
    id: "remote-work-communication",
    name: "Remote Work Communication",
    description:
      "Ability to communicate updates, blockers, questions, and decisions in a remote team.",
    metrics: [
      "status updates",
      "blocker communication",
      "clarification",
      "follow-up",
      "ownership",
    ],
    cta: "Practice now",
    href: "/app/templates",
  },
  {
    id: "setup-readiness",
    name: "Setup Readiness",
    description: "Basic technical readiness for remote work.",
    metrics: ["internet", "microphone", "camera", "quiet environment", "device/browser"],
    cta: "Start assessment",
  },
  {
    id: "professional-culture",
    name: "Professional Culture",
    description:
      "Ability to communicate in a way that matches international remote work expectations.",
    metrics: [
      "directness",
      "politeness",
      "feedback handling",
      "ownership",
      "proactive communication",
    ],
    cta: "Coming soon",
  },
];
