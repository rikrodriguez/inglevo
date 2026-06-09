import type {
  AIEnglishRole,
  AIEnglishRoleId,
  AIEnglishScenario,
  AIEnglishScenarioType,
} from "@/lib/ai-english/types";

type ScenarioSeed = Omit<
  AIEnglishScenario,
  "role_id" | "scenario_type" | "estimated_time_minutes"
>;

function scenario(
  roleId: AIEnglishRoleId,
  scenarioType: AIEnglishScenarioType,
  seed: ScenarioSeed
): AIEnglishScenario {
  return {
    ...seed,
    role_id: roleId,
    scenario_type: scenarioType,
    estimated_time_minutes: scenarioType === "interview" ? 5 : 7,
  };
}

const interviewWeights = {
  clarity: 1,
  grammar_control: 1,
  structure: 1,
  professional_tone: 1,
  role_relevance: 1,
  specificity: 1,
  remote_communication: 1,
  confidence: 1,
  actionability: 1,
};

const writingWeights = {
  clarity: 1,
  grammar_control: 1,
  structure: 1,
  professional_tone: 1,
  concision: 1,
  ownership: 1,
  actionability: 1,
  remote_communication: 1,
};

const sharedInterviewMistakes = [
  "Answering too generally without role context.",
  "Listing qualities without an example.",
  "Using weak endings such as 'and that's it'.",
];

const virtualAssistantInterview: ScenarioSeed[] = [
  {
    id: "va-priorities-founder",
    difficulty: "starter",
    title: "Virtual Assistant Interview Practice",
    context:
      "You are applying for a remote Virtual Assistant role supporting a busy founder.",
    user_task: "Explain how you organize priorities and communicate remotely.",
    question:
      "Tell me how you organize tasks, manage priorities and communicate updates remotely.",
    what_this_measures: ["structure", "remote communication", "specificity"],
    rubric_weights: interviewWeights,
    ideal_answer_guidance:
      "Mention a simple system for tasks, how you decide priorities, and how you keep the founder updated.",
    common_mistakes: sharedInterviewMistakes,
    suggested_phrases: [
      "I usually organize tasks by urgency and impact.",
      "I send concise updates so the founder can make decisions quickly.",
      "If priorities change, I confirm the new order before moving forward.",
    ],
    tags: ["interview", "prioritization", "founder-support"],
  },
  {
    id: "va-calendar-conflict",
    difficulty: "starter",
    title: "Handling Calendar Conflicts",
    context:
      "A hiring manager asks how you would manage overlapping meetings for an executive.",
    user_task: "Show calm ownership and a practical solution.",
    question:
      "What would you do if two important meetings overlap and your manager is unavailable?",
    what_this_measures: ["actionability", "professional tone", "remote communication"],
    rubric_weights: interviewWeights,
    ideal_answer_guidance:
      "Explain how you check priority, propose options, communicate clearly and document the change.",
    common_mistakes: sharedInterviewMistakes,
    suggested_phrases: [
      "I would first check which meeting is more urgent.",
      "I would propose two options and explain the tradeoff.",
      "I would update the calendar and confirm the final decision.",
    ],
    tags: ["interview", "calendar", "ownership"],
  },
  {
    id: "va-sensitive-information",
    difficulty: "intermediate",
    title: "Handling Confidential Information",
    context:
      "You are interviewing for a role that requires access to documents, calendars and inboxes.",
    user_task: "Demonstrate trust, discretion and process.",
    question:
      "How do you handle sensitive information when supporting a remote executive or team?",
    what_this_measures: ["professional tone", "role relevance", "confidence"],
    rubric_weights: interviewWeights,
    ideal_answer_guidance:
      "Mention permissions, confidentiality, careful documentation and asking before sharing information.",
    common_mistakes: sharedInterviewMistakes,
    suggested_phrases: [
      "I treat confidential information with care.",
      "I only share information with the right people.",
      "When I am not sure, I ask before taking action.",
    ],
    tags: ["interview", "confidentiality", "trust"],
  },
  {
    id: "va-proactive-support",
    difficulty: "intermediate",
    title: "Proactive Remote Support",
    context:
      "The interviewer wants to know if you can work independently without constant supervision.",
    user_task: "Show initiative without exaggerating.",
    question:
      "Can you describe a time when you noticed a problem and solved it before someone asked?",
    what_this_measures: ["specificity", "confidence", "actionability"],
    rubric_weights: interviewWeights,
    ideal_answer_guidance:
      "Use a real example with situation, action and result; avoid inventing metrics.",
    common_mistakes: sharedInterviewMistakes,
    suggested_phrases: [
      "I noticed that...",
      "I took the initiative to...",
      "As a result, the process became clearer.",
    ],
    tags: ["interview", "initiative", "remote-work"],
  },
  {
    id: "va-tools-and-updates",
    difficulty: "starter",
    title: "Tools and Daily Updates",
    context:
      "A remote company asks how you keep work visible across tools and messages.",
    user_task: "Connect tools with communication habits.",
    question:
      "Which tools have you used to manage tasks, and how do you keep people updated?",
    what_this_measures: ["role relevance", "remote communication", "clarity"],
    rubric_weights: interviewWeights,
    ideal_answer_guidance:
      "Name only tools you actually know and explain how you use them for visibility.",
    common_mistakes: sharedInterviewMistakes,
    suggested_phrases: [
      "I use tools like...",
      "I keep updates short and specific.",
      "I make sure the next step is clear.",
    ],
    tags: ["interview", "tools", "async-updates"],
  },
];

const customerSupportInterview: ScenarioSeed[] = [
  {
    id: "cs-difficult-situations",
    difficulty: "starter",
    title: "Customer Support Interview Practice",
    context:
      "You are interviewing for a remote customer support role at a US SaaS company.",
    user_task: "Explain how you help customers and handle difficult situations.",
    question:
      "Tell me about your experience helping customers and handling difficult situations.",
    what_this_measures: ["empathy", "structure", "role relevance", "ownership"],
    rubric_weights: interviewWeights,
    ideal_answer_guidance:
      "Mention listening, confirming the issue, explaining the next step and following up.",
    common_mistakes: sharedInterviewMistakes,
    suggested_phrases: [
      "I start by listening carefully to understand the issue.",
      "I confirm the problem before offering a solution.",
      "I follow up to make sure the customer feels supported.",
    ],
    tags: ["interview", "customer-support", "saas"],
  },
  {
    id: "cs-upset-customer",
    difficulty: "starter",
    title: "Upset Customer Response",
    context:
      "A hiring manager asks how you respond when a customer is frustrated or angry.",
    user_task: "Show empathy and control.",
    question:
      "How would you respond to a customer who is upset because their issue has not been solved yet?",
    what_this_measures: ["professional tone", "actionability", "confidence"],
    rubric_weights: interviewWeights,
    ideal_answer_guidance:
      "Use empathy, ownership, clear next steps and realistic expectations.",
    common_mistakes: sharedInterviewMistakes,
    suggested_phrases: [
      "I understand why this is frustrating.",
      "Let me check the details and give you a clear next step.",
      "I will follow up by...",
    ],
    tags: ["interview", "empathy", "escalation"],
  },
  {
    id: "cs-escalation",
    difficulty: "intermediate",
    title: "Escalating an Issue",
    context:
      "A SaaS support team wants to know if you can escalate issues without losing ownership.",
    user_task: "Explain when and how you escalate.",
    question:
      "When would you escalate a support issue, and how would you communicate it to the team?",
    what_this_measures: ["remote communication", "structure", "actionability"],
    rubric_weights: interviewWeights,
    ideal_answer_guidance:
      "Mention severity, evidence, concise internal notes and customer follow-up.",
    common_mistakes: sharedInterviewMistakes,
    suggested_phrases: [
      "I would escalate when...",
      "I would include the customer impact and steps already tried.",
      "I would keep the customer informed without overpromising.",
    ],
    tags: ["interview", "escalation", "team-communication"],
  },
  {
    id: "cs-product-knowledge",
    difficulty: "starter",
    title: "Learning a New Product",
    context:
      "The company needs support reps who can learn a SaaS product quickly.",
    user_task: "Show a practical learning process.",
    question:
      "How do you learn a new product so you can support customers effectively?",
    what_this_measures: ["role relevance", "specificity", "confidence"],
    rubric_weights: interviewWeights,
    ideal_answer_guidance:
      "Describe reading docs, testing workflows, asking questions and saving useful notes.",
    common_mistakes: sharedInterviewMistakes,
    suggested_phrases: [
      "I start by learning the main customer workflows.",
      "I take notes on common issues and solutions.",
      "I ask questions when something is unclear.",
    ],
    tags: ["interview", "product-learning", "support"],
  },
  {
    id: "cs-ticket-priorities",
    difficulty: "intermediate",
    title: "Managing Ticket Priorities",
    context:
      "A remote support team asks how you manage many tickets at the same time.",
    user_task: "Show prioritization and calm communication.",
    question:
      "How do you prioritize support tickets when several customers need help at once?",
    what_this_measures: ["structure", "actionability", "remote communication"],
    rubric_weights: interviewWeights,
    ideal_answer_guidance:
      "Mention urgency, customer impact, SLAs if known, and clear status updates.",
    common_mistakes: sharedInterviewMistakes,
    suggested_phrases: [
      "I prioritize based on urgency and customer impact.",
      "I keep notes clear so the team can understand the status.",
      "I communicate realistic next steps.",
    ],
    tags: ["interview", "tickets", "prioritization"],
  },
];

const marketingAssistantInterview: ScenarioSeed[] = [
  {
    id: "ma-campaign-results",
    difficulty: "starter",
    title: "Marketing Assistant Interview Practice",
    context:
      "You are applying for a remote Marketing Assistant role at a US startup.",
    user_task: "Describe campaign work and your contribution.",
    question:
      "Tell me about a marketing campaign you helped with and what results you contributed to.",
    what_this_measures: ["specificity", "role relevance", "structure"],
    rubric_weights: interviewWeights,
    ideal_answer_guidance:
      "Mention the campaign goal, your responsibilities, what changed and the result only if true.",
    common_mistakes: sharedInterviewMistakes,
    suggested_phrases: [
      "The goal of the campaign was...",
      "My responsibility was...",
      "I contributed by...",
    ],
    tags: ["interview", "campaigns", "marketing"],
  },
  {
    id: "ma-content-calendar",
    difficulty: "starter",
    title: "Content Calendar Ownership",
    context:
      "A startup asks how you organize content work with a distributed team.",
    user_task: "Show planning and collaboration.",
    question:
      "How do you organize a content calendar and keep the team aligned remotely?",
    what_this_measures: ["remote communication", "structure", "actionability"],
    rubric_weights: interviewWeights,
    ideal_answer_guidance:
      "Explain planning themes, deadlines, review steps and update habits.",
    common_mistakes: sharedInterviewMistakes,
    suggested_phrases: [
      "I organize content by priority, deadline and channel.",
      "I keep the calendar updated so the team has visibility.",
      "I confirm feedback before publishing.",
    ],
    tags: ["interview", "content", "remote-team"],
  },
  {
    id: "ma-performance-update",
    difficulty: "intermediate",
    title: "Campaign Performance",
    context:
      "A hiring manager wants to know if you can read basic campaign performance and suggest next steps.",
    user_task: "Show practical marketing thinking.",
    question:
      "How would you explain campaign performance and recommend next steps to your manager?",
    what_this_measures: ["clarity", "role relevance", "actionability"],
    rubric_weights: interviewWeights,
    ideal_answer_guidance:
      "Mention key observations, what improved or did not, and one realistic next step.",
    common_mistakes: sharedInterviewMistakes,
    suggested_phrases: [
      "The main result I noticed was...",
      "One possible reason is...",
      "My suggested next step would be...",
    ],
    tags: ["interview", "analytics", "recommendations"],
  },
  {
    id: "ma-feedback-revision",
    difficulty: "starter",
    title: "Receiving Feedback",
    context:
      "A remote team needs someone who can revise copy or creative work without defensiveness.",
    user_task: "Show coachability and ownership.",
    question:
      "Tell me about a time you received feedback on your marketing work and improved it.",
    what_this_measures: ["professional tone", "specificity", "confidence"],
    rubric_weights: interviewWeights,
    ideal_answer_guidance:
      "Use a real example and explain what changed after feedback.",
    common_mistakes: sharedInterviewMistakes,
    suggested_phrases: [
      "I received feedback that...",
      "I adjusted the message by...",
      "The final version was stronger because...",
    ],
    tags: ["interview", "feedback", "copy"],
  },
  {
    id: "ma-creative-brief",
    difficulty: "intermediate",
    title: "Creative Brief Communication",
    context:
      "You need to explain how you turn a marketing idea into clear instructions for designers or teammates.",
    user_task: "Show clarity and cross-functional communication.",
    question:
      "How do you communicate a marketing idea or creative brief to a remote teammate?",
    what_this_measures: ["structure", "remote communication", "actionability"],
    rubric_weights: interviewWeights,
    ideal_answer_guidance:
      "Mention objective, audience, message, examples, deadline and feedback process.",
    common_mistakes: sharedInterviewMistakes,
    suggested_phrases: [
      "I start with the objective and audience.",
      "I include examples so the direction is clear.",
      "I confirm the deadline and review process.",
    ],
    tags: ["interview", "creative-brief", "collaboration"],
  },
];

function writingTask(roleId: AIEnglishRoleId, id: string, title: string, context: string, question: string) {
  return scenario(roleId, "writing", {
    id,
    difficulty: "starter",
    title,
    context,
    user_task: question,
    question,
    what_this_measures: ["clarity", "concision", "professional tone", "actionability"],
    rubric_weights: writingWeights,
    ideal_answer_guidance:
      "Write a concise remote-work message with context, ownership and a clear next step.",
    common_mistakes: [
      "Writing one long paragraph.",
      "Not naming the next step.",
      "Sounding too casual or too apologetic.",
    ],
    suggested_phrases: [
      "Quick update:",
      "The next step is...",
      "Could you confirm...",
    ],
    tags: ["writing", "async", "remote-work"],
  });
}

function roleScenario(roleId: AIEnglishRoleId, id: string, title: string, context: string, question: string) {
  return scenario(roleId, "role_scenario", {
    id,
    difficulty: "intermediate",
    title,
    context,
    user_task: question,
    question,
    what_this_measures: ["role communication", "remote communication", "actionability"],
    rubric_weights: interviewWeights,
    ideal_answer_guidance:
      "Respond naturally, keep the facts realistic, and show professional ownership.",
    common_mistakes: sharedInterviewMistakes,
    suggested_phrases: [
      "I can take care of that.",
      "Here is the current status.",
      "The next step I recommend is...",
    ],
    tags: ["role-scenario", "remote-work"],
  });
}

export const aiEnglishRoles: AIEnglishRole[] = [
  {
    id: "virtual_assistant",
    title: "Virtual Assistant",
    description:
      "Practice professional English for founder support, calendar management, task coordination and remote updates.",
    common_tools: ["Google Calendar", "Gmail", "Notion", "Slack", "Trello"],
    interview_scenarios: virtualAssistantInterview.map((item) =>
      scenario("virtual_assistant", "interview", item)
    ),
    writing_tasks: [
      writingTask("virtual_assistant", "va-writing-overlap", "Meeting Overlap", "Two meetings overlap on your manager's calendar.", "Write a message to your manager explaining that two meetings overlap and proposing a solution."),
      writingTask("virtual_assistant", "va-writing-follow-up", "Founder Follow-up", "You need a decision before continuing a task.", "Write a polite follow-up asking for the missing decision and explaining the impact."),
      writingTask("virtual_assistant", "va-writing-task-update", "Task Update", "You completed several admin tasks and need to summarize progress.", "Write a concise end-of-day update with completed tasks and open items."),
      writingTask("virtual_assistant", "va-writing-vendor", "Vendor Coordination", "A vendor has not sent information you need.", "Write a clear message requesting the missing information and confirming the deadline."),
      writingTask("virtual_assistant", "va-writing-handoff", "Handoff Note", "You will be offline tomorrow.", "Write a handoff note so the founder knows what is done, pending and urgent."),
    ],
    role_scenarios: [
      roleScenario("virtual_assistant", "va-role-inbox", "Inbox Prioritization", "A founder asks you to summarize urgent inbox items.", "Explain how you would categorize messages and communicate priorities."),
      roleScenario("virtual_assistant", "va-role-travel", "Travel Change", "A trip detail changes and you need to update the plan.", "Explain the change, options and next step."),
      roleScenario("virtual_assistant", "va-role-process", "Process Improvement", "You notice repeated confusion in a recurring admin task.", "Suggest a simple process improvement to the founder."),
    ],
    vocabulary: [
      "priority",
      "deadline",
      "calendar conflict",
      "follow-up",
      "handoff",
      "availability",
      "agenda",
      "summary",
      "urgent",
      "pending",
    ],
    common_mistakes: [
      "Saying yes to everything without clarifying priorities.",
      "Using vague updates such as 'I will do it soon'.",
      "Not explaining tradeoffs when schedules conflict.",
      "Sounding too casual with executives.",
      "Not naming the next action.",
    ],
  },
  {
    id: "customer_support",
    title: "Customer Support",
    description:
      "Practice support English for SaaS customers, difficult conversations, tickets and remote escalation.",
    common_tools: ["Zendesk", "Intercom", "Help Scout", "Slack", "Notion"],
    interview_scenarios: customerSupportInterview.map((item) =>
      scenario("customer_support", "interview", item)
    ),
    writing_tasks: [
      writingTask("customer_support", "cs-writing-upset-customer", "Upset Customer", "A customer says they were charged incorrectly.", "Write a response to an upset customer who says they were charged incorrectly."),
      writingTask("customer_support", "cs-writing-bug-update", "Bug Update", "A customer is waiting for an engineering update.", "Write a short message explaining the current status and next step."),
      writingTask("customer_support", "cs-writing-refund", "Refund Request", "A customer asks for a refund outside the normal policy.", "Write a professional response that explains the next step without overpromising."),
      writingTask("customer_support", "cs-writing-escalation", "Internal Escalation", "You need engineering help with a customer issue.", "Write an internal note with the customer impact, issue and steps already tried."),
      writingTask("customer_support", "cs-writing-resolution", "Resolution Follow-up", "A customer's issue was solved.", "Write a follow-up confirming the resolution and inviting them to reply if needed."),
    ],
    role_scenarios: [
      roleScenario("customer_support", "cs-role-ticket-triage", "Ticket Triage", "Multiple tickets arrive at once.", "Explain which ticket you would prioritize first and why."),
      roleScenario("customer_support", "cs-role-knowledge-base", "Knowledge Base Note", "You solved a repeated issue.", "Explain how you would document the solution for the team."),
      roleScenario("customer_support", "cs-role-customer-call", "Customer Call Summary", "You finished a call with a frustrated customer.", "Summarize what happened and what the next step is."),
    ],
    vocabulary: [
      "issue",
      "ticket",
      "escalation",
      "workaround",
      "refund",
      "billing",
      "follow-up",
      "resolution",
      "customer impact",
      "next step",
    ],
    common_mistakes: [
      "Apologizing repeatedly without giving a next step.",
      "Promising a solution before checking the issue.",
      "Using defensive language with upset customers.",
      "Not summarizing what the customer needs.",
      "Escalating without enough context.",
    ],
  },
  {
    id: "marketing_assistant",
    title: "Marketing Assistant",
    description:
      "Practice marketing English for campaign updates, content coordination, performance notes and startup communication.",
    common_tools: ["Canva", "HubSpot", "Google Analytics", "Notion", "Slack"],
    interview_scenarios: marketingAssistantInterview.map((item) =>
      scenario("marketing_assistant", "interview", item)
    ),
    writing_tasks: [
      writingTask("marketing_assistant", "ma-writing-performance", "Campaign Performance", "You need to update the team on campaign performance.", "Write a Slack update explaining campaign performance and your suggested next steps."),
      writingTask("marketing_assistant", "ma-writing-content-review", "Content Review", "A manager asked for changes to a post.", "Write a message confirming the feedback and explaining what you will revise."),
      writingTask("marketing_assistant", "ma-writing-brief", "Creative Brief", "You need a designer to create assets.", "Write a short brief with objective, audience, message and deadline."),
      writingTask("marketing_assistant", "ma-writing-blocker", "Marketing Blocker", "A campaign task is blocked by a missing approval.", "Write a blocker update with impact and the decision you need."),
      writingTask("marketing_assistant", "ma-writing-handoff", "Campaign Handoff", "Another teammate will continue a campaign task.", "Write a handoff note with context, status and next steps."),
    ],
    role_scenarios: [
      roleScenario("marketing_assistant", "ma-role-metrics", "Metrics Summary", "A manager asks what changed in this week's numbers.", "Explain the main result and a practical next step."),
      roleScenario("marketing_assistant", "ma-role-launch", "Launch Coordination", "A launch task needs coordination across teammates.", "Explain how you would keep the launch checklist visible."),
      roleScenario("marketing_assistant", "ma-role-copy-feedback", "Copy Feedback", "A teammate asks for feedback on campaign copy.", "Give concise feedback that is helpful and professional."),
    ],
    vocabulary: [
      "campaign",
      "audience",
      "conversion",
      "engagement",
      "creative brief",
      "launch",
      "deadline",
      "performance",
      "feedback",
      "next steps",
    ],
    common_mistakes: [
      "Saying 'I helped with marketing' without naming the work.",
      "Inventing metrics instead of explaining real contribution.",
      "Reporting numbers without a recommendation.",
      "Writing updates that are too vague.",
      "Not connecting creative work to a business goal.",
    ],
  },
];

export function getRoleById(roleId: string | null | undefined) {
  return (
    aiEnglishRoles.find((role) => role.id === roleId) ??
    aiEnglishRoles.find((role) => role.id === "customer_support")!
  );
}

export function getTodayMission({
  targetRole,
}: {
  targetRole: string | null | undefined;
  mainGoal?: string | null;
  completedScenarioIds?: string[];
}) {
  const role = getRoleById(targetRole);
  return role.interview_scenarios[0];
}
