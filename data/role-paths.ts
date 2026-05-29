export type RolePath = {
  role: string;
  focus: string;
  status?: "active" | "coming-soon";
  roleTools: string[];
  roleEnglishScenarios: string[];
  remoteCommunicationScenarios: string[];
  assessmentExamples: string[];
  verifies: string;
};

export const rolePaths: RolePath[] = [
  {
    role: "Customer Service",
    focus: "Support conversations",
    status: "active",
    roleTools: ["Zendesk", "Intercom", "Help Scout", "Slack", "Google Workspace", "Zoom / Meet"],
    roleEnglishScenarios: [
      "calm an angry customer",
      "explain a refund policy",
      "escalate a ticket",
      "write a support follow-up",
    ],
    remoteCommunicationScenarios: ["summarize a customer issue", "update a manager about a case"],
    assessmentExamples: [
      "A customer is upset about a refund. Respond with empathy and next steps.",
    ],
    verifies: "Empathy, clarity, escalation judgment and customer-ready tone.",
  },
  {
    role: "Sales / SDR",
    focus: "Revenue conversations",
    status: "coming-soon",
    roleTools: ["GoHighLevel", "HubSpot", "Salesforce", "Slack", "Zoom", "Google Workspace"],
    roleEnglishScenarios: [
      "handle a pricing objection",
      "follow up after a discovery call",
      "book a meeting",
      "qualify a lead",
    ],
    remoteCommunicationScenarios: ["write a CRM note", "explain next steps"],
    assessmentExamples: [
      "A lead asks for pricing. Write a CRM note and a follow-up message.",
    ],
    verifies: "Sales tone, objection handling, next steps and CRM-style summaries.",
  },
  {
    role: "Software Engineer",
    focus: "Technical clarity",
    status: "coming-soon",
    roleTools: ["GitHub", "Jira", "Linear", "Slack", "Notion", "Google Meet"],
    roleEnglishScenarios: [
      "explain a blocker in standup",
      "describe a bug",
      "respond to a code review",
      "explain a technical trade-off",
    ],
    remoteCommunicationScenarios: ["write a ticket update", "ask for requirement clarification"],
    assessmentExamples: [
      "A login flow fails after deployment. Explain the issue and your next steps in standup.",
    ],
    verifies: "Technical precision, ownership, blocker communication and async updates.",
  },
  {
    role: "Project Manager",
    focus: "Team coordination",
    status: "coming-soon",
    roleTools: ["Asana", "Trello", "ClickUp", "Monday", "Slack", "Notion", "Google Meet"],
    roleEnglishScenarios: [
      "explain a delayed deadline",
      "summarize a meeting",
      "align stakeholders",
      "communicate project risk",
    ],
    remoteCommunicationScenarios: ["clarify scope", "assign next steps"],
    assessmentExamples: [
      "A project is delayed. Update stakeholders with risk, owner and next step.",
    ],
    verifies: "Deadline communication, stakeholder clarity, ownership and prioritization.",
  },
  {
    role: "UX/UI Designer",
    focus: "Design storytelling",
    status: "coming-soon",
    roleTools: ["Figma", "Notion", "Slack", "Jira / Linear", "Google Meet"],
    roleEnglishScenarios: [
      "explain a design decision",
      "present a redesign",
      "respond to client feedback",
      "handoff to developers",
    ],
    remoteCommunicationScenarios: ["justify UX choices", "summarize design changes"],
    assessmentExamples: [
      "A client asks why you changed the checkout layout. Explain the design reasoning.",
    ],
    verifies: "Design rationale, stakeholder communication, vocabulary and confidence.",
  },
  {
    role: "Virtual Assistant",
    focus: "Client operations",
    status: "coming-soon",
    roleTools: ["Google Workspace", "Slack", "Zoom", "Calendly", "Trello", "GoHighLevel"],
    roleEnglishScenarios: [
      "coordinate a calendar change",
      "write a client update",
      "prioritize tasks",
      "ask for clarification",
    ],
    remoteCommunicationScenarios: ["follow up on a pending item", "update a CRM/contact record"],
    assessmentExamples: [
      "A client changes a meeting time. Coordinate the calendar and confirm next steps.",
    ],
    verifies: "Task clarity, client tone, prioritization and operational reliability.",
  },
  {
    role: "Marketing / Growth",
    focus: "Growth communication",
    status: "coming-soon",
    roleTools: ["Meta Ads", "Google Analytics", "HubSpot", "GoHighLevel", "Notion", "Slack"],
    roleEnglishScenarios: [
      "present campaign results",
      "explain performance changes",
      "write a client update",
      "summarize next steps",
    ],
    remoteCommunicationScenarios: ["explain a test", "report a blocker"],
    assessmentExamples: [
      "Campaign performance dropped this week. Explain what changed and what you will test next.",
    ],
    verifies: "Metric communication, strategic clarity, client updates and ownership.",
  },
  {
    role: "Operations",
    focus: "Remote reliability",
    status: "coming-soon",
    roleTools: ["Notion", "Airtable", "Google Sheets", "Slack", "Asana / ClickUp", "Google Meet"],
    roleEnglishScenarios: [
      "document a process",
      "report operational issue",
      "coordinate handoff",
      "summarize metrics",
    ],
    remoteCommunicationScenarios: ["explain a workflow improvement", "update a team on progress"],
    assessmentExamples: [
      "A handoff is delayed. Summarize what happened, what is next and who owns it.",
    ],
    verifies: "Process clarity, reporting, ownership and cross-functional communication.",
  },
];
