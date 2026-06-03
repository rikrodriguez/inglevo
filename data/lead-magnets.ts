export type LeadMagnetSlug =
  | "remote-interview-english-cheat-sheet"
  | "latam-remote-job-cv-checklist";

export type LeadMagnet = {
  slug: LeadMagnetSlug;
  title: string;
  shortTitle: string;
  description: string;
  primaryUse: string;
  fileName: string;
  bullets: string[];
  sections: Array<{
    title: string;
    items: string[];
  }>;
};

export const leadMagnets: LeadMagnet[] = [
  {
    slug: "remote-interview-english-cheat-sheet",
    title: "Remote Interview English Cheat Sheet",
    shortTitle: "Interview cheat sheet",
    description:
      "A compact English prep sheet for remote interviews: opening answer, blocker explanation, salary phrasing, async communication and role-fit phrases.",
    primaryUse: "Best before interview practice or a recruiter call.",
    fileName: "inglevo-remote-interview-english-cheat-sheet.txt",
    bullets: [
      "60-second answer structure for Tell me about yourself.",
      "Remote work phrases for blockers, priorities and async updates.",
      "Questions to ask hiring teams about success, tools and feedback.",
      "Professional English lines for salary, availability and role fit.",
    ],
    sections: [
      {
        title: "Interview opener",
        items: [
          "I am a [role] with experience in [area]. Most of my recent work has focused on [responsibility/result].",
          "I am comfortable working remotely because I document progress, communicate blockers early and keep priorities visible.",
          "I am now looking for a remote role where I can contribute to [team outcome] and keep growing professionally.",
        ],
      },
      {
        title: "Remote communication phrases",
        items: [
          "I want to clarify one detail before I move forward.",
          "The current blocker is [blocker]. I tried [step], and I need [decision/access/context] to continue.",
          "Here is the status: [done], [in progress], [blocked], and the next step is [action].",
        ],
      },
      {
        title: "Questions to ask the company",
        items: [
          "How does the team define success in the first 90 days?",
          "What communication habits make someone strong on this remote team?",
          "How are priorities documented when several requests are urgent?",
        ],
      },
    ],
  },
  {
    slug: "latam-remote-job-cv-checklist",
    title: "LATAM Remote Job CV Checklist",
    shortTitle: "CV checklist",
    description:
      "A practical checklist for LATAM candidates applying to US and global remote roles: ATS keywords, proof bullets, tools, English signal and remote readiness.",
    primaryUse: "Best before applying to remote roles or rewriting your CV.",
    fileName: "inglevo-latam-remote-job-cv-checklist.txt",
    bullets: [
      "ATS keyword checks by role and tool category.",
      "Proof-based bullet formula for remote job applications.",
      "Remote readiness signals recruiters should see quickly.",
      "Common CV mistakes for LATAM candidates applying globally.",
    ],
    sections: [
      {
        title: "Top-of-CV checklist",
        items: [
          "Your target role is clear in the headline or summary.",
          "Your English level is framed professionally, not defensively.",
          "Your summary connects role experience, tools and remote communication.",
        ],
      },
      {
        title: "Experience bullet formula",
        items: [
          "Action + scope + tool/process + measurable outcome.",
          "Example: Resolved 60+ weekly tickets in Zendesk and documented recurring issues for product teams.",
          "Avoid: Responsible for customer support tasks.",
        ],
      },
      {
        title: "Remote readiness signals",
        items: [
          "Async communication, documentation, ownership and time-zone collaboration.",
          "Tools used in real work, not a long list copied from a job description.",
          "Clear examples of outcomes: faster response time, fewer errors, better reporting or stronger pipeline visibility.",
        ],
      },
    ],
  },
];

export function getLeadMagnet(slug: string) {
  return leadMagnets.find((leadMagnet) => leadMagnet.slug === slug);
}

export function formatLeadMagnetForDownload(leadMagnet: LeadMagnet) {
  return [
    `INGLEVO - ${leadMagnet.title}`,
    "",
    leadMagnet.description,
    "",
    "Quick checklist:",
    ...leadMagnet.bullets.map((bullet) => `- ${bullet}`),
    "",
    ...leadMagnet.sections.flatMap((section) => [
      section.title.toUpperCase(),
      ...section.items.map((item) => `- ${item}`),
      "",
    ]),
    "Next step: practice with Inglevo at https://inglevo.vercel.app/ai-english-trainer",
  ].join("\n");
}
