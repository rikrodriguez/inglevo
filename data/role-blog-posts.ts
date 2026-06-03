import type { BlogPost } from "@/data/blog-posts";

type RoleGuide = {
  role: string;
  roleSlug: string;
  interviewTitle: string;
  interviewPrimaryKeyword: string;
  interviewIntent: string;
  interviewDescription: string;
  interviewExcerpt: string;
  resumeTitle: string;
  resumePrimaryKeyword: string;
  resumeDescription: string;
  communicationTitle: string;
  communicationSlug: string;
  communicationPrimaryKeyword: string;
  communicationDescription: string;
  communicationExcerpt: string;
  coreSignal: string;
  tools: string[];
  hiringSignals: string[];
  interviewQuestions: string[];
  sampleQuestion: string;
  sampleAnswer: string;
  responsibilities: string[];
  outcomes: string[];
  resumeBullet: string;
  communicationContext: string;
  communicationTemplates: string[];
  professionalPhrases: string[];
};

const publishedAt = "2026-06-03";
const roleCluster = "Role-specific remote jobs";

const roleGuides: RoleGuide[] = [
  {
    role: "Customer Support",
    roleSlug: "customer-support",
    interviewTitle: "Customer Support Interview Questions in English for Remote Jobs",
    interviewPrimaryKeyword: "customer support interview questions in English",
    interviewIntent: "Prepare for a remote customer support interview",
    interviewDescription:
      "Prepare for remote customer support interviews in English with answers for empathy, ticket handling, escalation and difficult customers.",
    interviewExcerpt:
      "A role-specific guide for LATAM candidates applying to chat, email and help desk support roles.",
    resumeTitle: "Customer Support Resume Keywords for Remote Jobs",
    resumePrimaryKeyword: "customer support resume keywords",
    resumeDescription:
      "Use customer support resume keywords for remote roles, including ticketing tools, empathy, escalation, knowledge base and customer satisfaction outcomes.",
    communicationTitle: "Customer Support Chat and Email Templates in English for Remote Jobs",
    communicationSlug: "customer-support-chat-email-templates-english",
    communicationPrimaryKeyword: "customer support email templates in English",
    communicationDescription:
      "Use clear English templates for remote customer support chats, email replies, escalations and follow-ups.",
    communicationExcerpt:
      "Practical phrases for support candidates who need to sound calm, helpful and professional in English.",
    coreSignal:
      "calm problem solving, empathy, escalation judgment and clear written responses",
    tools: ["Zendesk", "Intercom", "Help Scout", "Freshdesk", "Slack", "billing tools"],
    hiringSignals: [
      "Explains issues without blaming the customer.",
      "Documents tickets with clear internal notes.",
      "Uses macros without sounding robotic.",
      "Escalates with context, screenshots and impact.",
      "Keeps a calm tone when the customer is frustrated.",
    ],
    interviewQuestions: [
      "How do you handle an angry customer?",
      "How do you decide when to escalate a ticket?",
      "Tell me about a time you solved an issue without a script.",
      "How do you write a clear support reply in English?",
      "What would you do if you do not know the answer?",
      "How do you handle several chats at the same time?",
      "How do you document customer issues for another team?",
      "What support tools have you used?",
    ],
    sampleQuestion: "Question: How do you handle an angry customer?",
    sampleAnswer:
      "I first acknowledge the frustration and make sure the customer feels heard. Then I restate the issue in simple language, check what has already happened and explain the next step clearly. If I need another team, I escalate with the ticket history, screenshots and urgency so the customer does not have to repeat everything.",
    responsibilities: [
      "ticket triage",
      "chat support",
      "email support",
      "customer escalation",
      "knowledge base updates",
      "internal notes",
    ],
    outcomes: [
      "faster first response time",
      "higher customer satisfaction",
      "fewer repeated tickets",
      "better escalation quality",
    ],
    resumeBullet:
      "Resolved 60+ weekly chat and email tickets using Zendesk, documented recurring issues for product teams and improved customer follow-up quality across billing and onboarding cases.",
    communicationContext:
      "Customer support writing needs to be warm, direct and specific. The goal is not to sound fancy; it is to reduce anxiety and move the issue forward.",
    communicationTemplates: [
      "Thanks for sharing the details. I understand how frustrating this is, and I am checking the account history now so I can give you the right next step.",
      "I am going to escalate this to our technical team with the screenshots and steps you provided. I will keep this ticket open and update you as soon as I have confirmation.",
      "Here is what we can do next: first, please try [step]. If the issue continues, reply to this message and I will review the case again.",
    ],
    professionalPhrases: [
      "I understand the urgency.",
      "Let me confirm the details before I give you the next step.",
      "I will document this clearly for the team.",
      "Here is what I can do right now.",
      "I will follow up once I have an update.",
    ],
  },
  {
    role: "Virtual Assistant",
    roleSlug: "virtual-assistant",
    interviewTitle: "Virtual Assistant Interview Questions in English for Remote Jobs",
    interviewPrimaryKeyword: "virtual assistant interview questions in English",
    interviewIntent: "Prepare for a remote virtual assistant interview",
    interviewDescription:
      "Prepare for virtual assistant interviews in English with answers for calendar management, email, discretion, priorities and remote follow-through.",
    interviewExcerpt:
      "A practical guide for assistants supporting founders, executives and remote teams across time zones.",
    resumeTitle: "Virtual Assistant Resume Keywords for Remote Jobs",
    resumePrimaryKeyword: "virtual assistant resume keywords",
    resumeDescription:
      "Add virtual assistant resume keywords for remote support roles, including scheduling, inbox management, CRM updates, SOPs and executive support.",
    communicationTitle: "Virtual Assistant Email and Calendar Templates in English",
    communicationSlug: "virtual-assistant-email-calendar-templates-english",
    communicationPrimaryKeyword: "virtual assistant email templates in English",
    communicationDescription:
      "Use English templates for calendar coordination, inbox follow-up, task clarification and executive support messages.",
    communicationExcerpt:
      "Templates for VAs who need to coordinate schedules, clarify tasks and follow up professionally.",
    coreSignal:
      "reliable follow-through, discretion, prioritization and written communication",
    tools: ["Google Workspace", "Notion", "Trello", "Asana", "Calendly", "Slack", "CRM tools"],
    hiringSignals: [
      "Clarifies vague tasks before executing.",
      "Manages calendars without creating conflicts.",
      "Protects confidential information.",
      "Follows up without being reminded.",
      "Turns repeated work into simple SOPs.",
    ],
    interviewQuestions: [
      "How do you manage competing priorities?",
      "How do you organize an executive calendar?",
      "How do you handle confidential information?",
      "Tell me about a time you had to clarify a vague task.",
      "What tools do you use to track tasks?",
      "How do you communicate availability across time zones?",
      "How do you handle last-minute schedule changes?",
      "How do you keep a remote manager updated?",
    ],
    sampleQuestion: "Question: What do you do when a task is unclear?",
    sampleAnswer:
      "I first repeat what I understand, then ask one or two specific questions so the manager can answer quickly. If the task is urgent, I propose a reasonable next step instead of waiting passively. I also document the final process if it is likely to happen again.",
    responsibilities: [
      "calendar management",
      "email management",
      "data entry",
      "CRM updates",
      "travel coordination",
      "SOP documentation",
    ],
    outcomes: [
      "hours saved per week",
      "fewer scheduling conflicts",
      "cleaner inbox workflow",
      "faster executive follow-up",
    ],
    resumeBullet:
      "Managed calendars, inbox triage and CRM updates for a remote executive team, reducing scheduling conflicts and improving follow-up visibility across weekly priorities.",
    communicationContext:
      "VA communication should make the manager feel that work is under control. Short, precise updates are usually better than long explanations.",
    communicationTemplates: [
      "I found two available options for the meeting: [time 1] or [time 2]. Please let me know which one you prefer and I will send the invite.",
      "Just confirming the priority: should I complete [task A] first, or should [task B] move ahead because of the deadline?",
      "I updated the tracker with the latest status. The only open item is [item], and I am waiting on [person/team] before I can complete it.",
    ],
    professionalPhrases: [
      "I can take care of that.",
      "To avoid confusion, I want to confirm one detail.",
      "I updated the tracker.",
      "Here are the available options.",
      "I will follow up before the deadline.",
    ],
  },
  {
    role: "SDR",
    roleSlug: "sdr",
    interviewTitle: "SDR Objection Handling in English for Remote Sales Interviews",
    interviewPrimaryKeyword: "SDR objection handling in English",
    interviewIntent: "Practice remote SDR objection handling in English",
    interviewDescription:
      "Prepare for SDR interviews with English answers for rejection, objections, prospect research, CRM discipline and remote sales follow-up.",
    interviewExcerpt:
      "A sales-focused guide for remote SDR candidates who need to sound clear, persistent and professional.",
    resumeTitle: "SDR Resume Keywords for Remote Sales Jobs",
    resumePrimaryKeyword: "SDR resume keywords",
    resumeDescription:
      "Use SDR resume keywords for remote sales roles, including prospecting, outbound sequences, CRM hygiene, discovery and booked meetings.",
    communicationTitle: "SDR Cold Email and Follow-Up Templates in English",
    communicationSlug: "sdr-cold-email-follow-up-templates-english",
    communicationPrimaryKeyword: "SDR cold email examples in English",
    communicationDescription:
      "Use SDR cold email and follow-up templates in English for remote sales outreach, prospecting and interview assignments.",
    communicationExcerpt:
      "Practical outreach templates for SDR candidates applying to remote sales teams.",
    coreSignal:
      "prospecting discipline, rejection handling, concise writing and CRM consistency",
    tools: ["Salesforce", "HubSpot", "Apollo", "LinkedIn Sales Navigator", "Outreach", "Salesloft"],
    hiringSignals: [
      "Researches accounts before sending outreach.",
      "Handles objections without sounding defensive.",
      "Keeps CRM notes accurate and useful.",
      "Follows up with context, not generic pressure.",
      "Can write concise cold emails in English.",
    ],
    interviewQuestions: [
      "How do you handle rejection?",
      "How would you respond to 'not interested'?",
      "How do you research a prospect?",
      "What makes a good discovery question?",
      "How do you prioritize accounts?",
      "How do you keep CRM data clean?",
      "Write a short cold email for this company.",
      "Tell me about a time you worked toward a sales goal.",
    ],
    sampleQuestion: "Question: How do you respond when a prospect says they are not interested?",
    sampleAnswer:
      "I acknowledge it and avoid pushing too hard. Then I try to understand if it is a timing issue, a relevance issue or the wrong contact. For example, I might say: 'Totally fair. Is this not a priority right now, or is there someone else who owns this area?' That keeps the conversation respectful and gives me useful information for the CRM.",
    responsibilities: [
      "prospecting",
      "cold email",
      "lead qualification",
      "CRM hygiene",
      "meeting booking",
      "follow-up sequences",
    ],
    outcomes: [
      "qualified meetings booked",
      "higher reply rates",
      "cleaner pipeline notes",
      "consistent outbound activity",
    ],
    resumeBullet:
      "Managed outbound prospecting through HubSpot and LinkedIn Sales Navigator, wrote tailored email sequences and booked qualified meetings while maintaining accurate CRM notes.",
    communicationContext:
      "SDR writing should be short, relevant and easy to answer. Long cold emails usually create friction.",
    communicationTemplates: [
      "Hi [Name], I noticed [specific signal]. Teams like yours often struggle with [problem]. Would it be worth a quick conversation to see if [solution] is relevant?",
      "Thanks for the quick reply. If now is not the right time, should I follow up in [month], or is there another person who owns this priority?",
      "Just bringing this back to the top of your inbox. The reason I reached out is [specific reason]. Open to a short call this week?",
    ],
    professionalPhrases: [
      "Totally fair.",
      "Is this a timing issue or not a priority?",
      "I do not want to assume.",
      "Would it be worth a quick conversation?",
      "I will update my notes and follow up at a better time.",
    ],
  },
  {
    role: "Project Coordinator",
    roleSlug: "project-coordinator",
    interviewTitle: "Project Coordinator Interview Questions in English for Remote Jobs",
    interviewPrimaryKeyword: "project coordinator interview questions in English",
    interviewIntent: "Prepare for a remote project coordinator interview",
    interviewDescription:
      "Prepare for project coordinator interviews in English with answers for timelines, stakeholders, documentation, status updates and competing deadlines.",
    interviewExcerpt:
      "A coordination-focused guide for LATAM candidates applying to remote project support roles.",
    resumeTitle: "Project Coordinator Resume Keywords for Remote Jobs",
    resumePrimaryKeyword: "project coordinator resume keywords",
    resumeDescription:
      "Use project coordinator resume keywords for remote roles, including task tracking, stakeholder communication, status reporting and project tools.",
    communicationTitle: "Project Status Update Emails in English for Remote Teams",
    communicationSlug: "project-status-update-email-english",
    communicationPrimaryKeyword: "project status update email in English",
    communicationDescription:
      "Write project status updates in English with clear templates for risks, blockers, deadlines and stakeholder communication.",
    communicationExcerpt:
      "Templates for remote project coordinators who need to keep teams aligned without extra meetings.",
    coreSignal:
      "timeline ownership, stakeholder communication, documentation and follow-up",
    tools: ["Asana", "Monday.com", "Jira", "Smartsheet", "Microsoft Project", "Excel", "Slack"],
    hiringSignals: [
      "Tracks tasks and owners clearly.",
      "Communicates risks before deadlines slip.",
      "Writes useful meeting notes.",
      "Keeps stakeholders aligned without extra meetings.",
      "Can organize vague work into a timeline.",
    ],
    interviewQuestions: [
      "How do you track a project with multiple deadlines?",
      "How do you communicate a delay?",
      "Tell me about a time you managed competing priorities.",
      "How do you prepare meeting notes?",
      "What tools do you use for project tracking?",
      "How do you handle a stakeholder who is not responding?",
      "How do you keep remote teams aligned?",
      "What information should be in a status update?",
    ],
    sampleQuestion: "Question: How do you communicate a delay?",
    sampleAnswer:
      "I communicate delays early and with options. I explain what changed, the impact on the timeline and what decision is needed. I also update the project tracker so everyone has the same information. My goal is not to hide the problem; it is to help the team choose the next best action.",
    responsibilities: [
      "task management",
      "timeline coordination",
      "meeting notes",
      "status reporting",
      "stakeholder communication",
      "risk tracking",
    ],
    outcomes: [
      "clearer project visibility",
      "fewer missed deadlines",
      "better stakeholder alignment",
      "faster blocker resolution",
    ],
    resumeBullet:
      "Coordinated project timelines in Asana, prepared weekly status reports and tracked blockers across design, operations and leadership stakeholders.",
    communicationContext:
      "Project updates should help people decide. A good update includes status, risk, owner and next step.",
    communicationTemplates: [
      "Status: [on track / at risk / blocked]. Main progress this week: [progress]. Current blocker: [blocker]. Owner: [person]. Next step: [action] by [date].",
      "This deadline is at risk because [reason]. I see two options: [option A] or [option B]. Please confirm which direction you prefer.",
      "Here are the meeting notes: decisions made, open questions, owners and due dates. I updated the tracker with the same information.",
    ],
    professionalPhrases: [
      "This is currently at risk.",
      "The next decision needed is...",
      "I updated the project tracker.",
      "Here are the owners and due dates.",
      "To keep the timeline moving, I suggest...",
    ],
  },
  {
    role: "Software Developer",
    roleSlug: "software-developer",
    interviewTitle: "Software Developer Interview Communication in English for Remote Jobs",
    interviewPrimaryKeyword: "software developer interview English",
    interviewIntent: "Explain technical work clearly in remote developer interviews",
    interviewDescription:
      "Prepare for software developer interviews in English with answers for technical tradeoffs, code reviews, blockers, async updates and remote collaboration.",
    interviewExcerpt:
      "A communication-first guide for developers who need to explain technical work clearly in English.",
    resumeTitle: "Software Developer Resume Keywords for Remote Jobs",
    resumePrimaryKeyword: "software developer resume keywords",
    resumeDescription:
      "Use software developer resume keywords for remote roles, including frameworks, APIs, cloud tools, CI/CD, documentation and measurable engineering impact.",
    communicationTitle: "Code Review Communication in English for Remote Developers",
    communicationSlug: "code-review-communication-english-remote-developer",
    communicationPrimaryKeyword: "code review comments in English",
    communicationDescription:
      "Write better code review comments in English with examples for bugs, tradeoffs, blockers and technical clarification.",
    communicationExcerpt:
      "Practical phrases for remote developers who collaborate through pull requests and async updates.",
    coreSignal:
      "technical clarity, ownership, documentation and collaboration across async channels",
    tools: ["GitHub", "GitLab", "Jira", "Slack", "CI/CD", "React", "Node.js", "PostgreSQL"],
    hiringSignals: [
      "Explains technical decisions in simple English.",
      "Communicates blockers with context and proposed next steps.",
      "Writes clear pull request summaries.",
      "Documents tradeoffs instead of hiding them.",
      "Collaborates with product, design and QA.",
    ],
    interviewQuestions: [
      "Explain a technical project you are proud of.",
      "How do you handle code review feedback?",
      "Tell me about a bug you solved.",
      "How do you communicate a blocker?",
      "How do you decide between two technical approaches?",
      "How do you work with designers or product managers?",
      "How do you document your code or decisions?",
      "What do you do when requirements are unclear?",
    ],
    sampleQuestion: "Question: How do you communicate a technical blocker?",
    sampleAnswer:
      "I describe the expected behavior, what is happening now, what I already tried and what I need to move forward. If possible, I include logs, screenshots or a small reproduction. I also suggest a temporary workaround when the blocker affects the timeline.",
    responsibilities: [
      "frontend development",
      "backend APIs",
      "CI/CD",
      "debugging",
      "code review",
      "technical documentation",
    ],
    outcomes: [
      "faster releases",
      "fewer regressions",
      "better performance",
      "clearer engineering handoffs",
    ],
    resumeBullet:
      "Built and maintained React and Node.js features for a remote product team, documented API changes and used GitHub pull requests to improve review quality and release reliability.",
    communicationContext:
      "Developer communication should make technical work easier for others to evaluate. Good English reduces back-and-forth in pull requests, tickets and standups.",
    communicationTemplates: [
      "PR summary: this change adds [feature], updates [area] and includes tests for [case]. The main tradeoff is [tradeoff].",
      "I found a blocker with [issue]. I tried [step 1] and [step 2]. I need input on [specific decision] before I continue.",
      "Small suggestion: could we extract this into [helper/component]? It may make the logic easier to test and reuse.",
    ],
    professionalPhrases: [
      "The tradeoff is...",
      "I can reproduce the issue with these steps.",
      "I suggest this approach because...",
      "This might be easier to maintain if...",
      "I need clarification on one requirement.",
    ],
  },
  {
    role: "QA Tester",
    roleSlug: "qa-tester",
    interviewTitle: "QA Tester Interview Questions in English for Remote Jobs",
    interviewPrimaryKeyword: "QA tester interview questions in English",
    interviewIntent: "Prepare for a remote QA tester interview",
    interviewDescription:
      "Prepare for QA tester interviews in English with answers for bug reports, regression testing, test cases, automation and remote collaboration.",
    interviewExcerpt:
      "A QA-focused guide for candidates who need to explain testing decisions clearly in English.",
    resumeTitle: "QA Engineer Resume Keywords for Remote Jobs",
    resumePrimaryKeyword: "QA engineer resume keywords",
    resumeDescription:
      "Use QA engineer resume keywords for remote roles, including test automation, regression testing, API testing, bug tracking, CI/CD and release quality.",
    communicationTitle: "Bug Report Examples in English for QA Testers",
    communicationSlug: "bug-report-examples-english-qa",
    communicationPrimaryKeyword: "bug report examples in English",
    communicationDescription:
      "Write better QA bug reports in English with templates for steps to reproduce, expected behavior, actual behavior and severity.",
    communicationExcerpt:
      "Clear bug report templates for QA candidates applying to remote product and software teams.",
    coreSignal:
      "clear bug reporting, test thinking, release judgment and collaboration with developers",
    tools: ["Jira", "TestRail", "Postman", "Selenium", "Cypress", "Playwright", "GitHub Actions"],
    hiringSignals: [
      "Explains bugs with steps, evidence and impact.",
      "Understands regression and exploratory testing.",
      "Can discuss automation without exaggerating.",
      "Prioritizes severity based on user impact.",
      "Communicates clearly with developers in English.",
    ],
    interviewQuestions: [
      "How do you write a good bug report?",
      "How do you decide severity and priority?",
      "Tell me about a difficult bug you found.",
      "How do you test a feature with unclear requirements?",
      "What is your process for regression testing?",
      "What testing tools have you used?",
      "How do you work with developers?",
      "How do you explain a bug in English?",
    ],
    sampleQuestion: "Question: What makes a good bug report?",
    sampleAnswer:
      "A good bug report makes the issue easy to reproduce and easy to prioritize. I include the environment, steps to reproduce, expected behavior, actual behavior, screenshots or logs and the user impact. If I am unsure about severity, I explain the risk and ask for confirmation.",
    responsibilities: [
      "test cases",
      "manual testing",
      "regression testing",
      "bug tracking",
      "API testing",
      "test automation",
    ],
    outcomes: [
      "fewer production defects",
      "higher test coverage",
      "faster bug resolution",
      "more reliable releases",
    ],
    resumeBullet:
      "Created regression test cases, reported defects in Jira with reproducible steps and supported API validation with Postman across weekly remote releases.",
    communicationContext:
      "QA writing should remove ambiguity. A developer should understand what happened, why it matters and how to reproduce it without asking three follow-up questions.",
    communicationTemplates: [
      "Title: [feature] shows [issue] when [condition]. Steps: [1], [2], [3]. Expected: [expected result]. Actual: [actual result]. Impact: [user/business impact].",
      "I can reproduce this in [environment] using [browser/device]. I attached screenshots and logs. It seems related to [area], but I need developer confirmation.",
      "This looks like a regression because the same flow worked in [previous version/date]. I recommend prioritizing it before release.",
    ],
    professionalPhrases: [
      "Steps to reproduce are...",
      "Expected behavior is...",
      "Actual behavior is...",
      "The user impact is...",
      "This may be a regression.",
    ],
  },
  {
    role: "Operations Coordinator",
    roleSlug: "operations-coordinator",
    interviewTitle: "Operations Coordinator Interview Questions in English for Remote Jobs",
    interviewPrimaryKeyword: "operations coordinator interview questions in English",
    interviewIntent: "Prepare for a remote operations coordinator interview",
    interviewDescription:
      "Prepare for operations coordinator interviews in English with answers for SOPs, process improvement, vendors, task tracking and cross-functional work.",
    interviewExcerpt:
      "A remote operations guide for candidates who need to show organization, process thinking and clear updates.",
    resumeTitle: "Operations Coordinator Resume Keywords for Remote Jobs",
    resumePrimaryKeyword: "operations coordinator resume keywords",
    resumeDescription:
      "Use operations coordinator resume keywords for remote roles, including SOPs, workflow coordination, vendor management, reporting and process improvement.",
    communicationTitle: "SOP and Process Update Emails in English for Operations Roles",
    communicationSlug: "sop-process-update-english-operations",
    communicationPrimaryKeyword: "SOP update email in English",
    communicationDescription:
      "Write SOP and process update emails in English for remote operations teams, including handoffs, blockers and workflow changes.",
    communicationExcerpt:
      "Templates for operations candidates who need to document process changes and keep teams aligned.",
    coreSignal:
      "process ownership, prioritization, documentation and cross-functional coordination",
    tools: ["Notion", "Airtable", "Zapier", "Excel", "Google Sheets", "Slack", "Asana"],
    hiringSignals: [
      "Turns repeated work into documented processes.",
      "Prioritizes requests from different teams.",
      "Tracks vendors, handoffs and operational risks.",
      "Improves workflows without overcomplicating them.",
      "Communicates process changes clearly.",
    ],
    interviewQuestions: [
      "How do you improve a recurring process?",
      "How do you prioritize requests from multiple teams?",
      "Tell me about a time you created an SOP.",
      "What tools do you use to track operations work?",
      "How do you handle a vendor delay?",
      "How do you measure whether a process improved?",
      "How do you communicate a workflow change?",
      "What do you do when there is no playbook?",
    ],
    sampleQuestion: "Question: What do you do when there is no playbook?",
    sampleAnswer:
      "I create a simple version first. I identify the goal, the owner, the repeated steps and the common risks. Then I test the process with one or two real cases, update the SOP and share it with the team. I avoid making the process too complex before we know what actually works.",
    responsibilities: [
      "SOP documentation",
      "workflow coordination",
      "vendor follow-up",
      "reporting",
      "process improvement",
      "task tracking",
    ],
    outcomes: [
      "time saved",
      "fewer handoff errors",
      "clearer ownership",
      "more reliable workflows",
    ],
    resumeBullet:
      "Documented SOPs in Notion, coordinated vendor follow-ups and improved weekly operations reporting across sales, support and leadership requests.",
    communicationContext:
      "Operations writing should make work repeatable. If the process lives only in someone's head, the team will lose time.",
    communicationTemplates: [
      "I updated the SOP for [process]. Main change: [change]. Owner: [owner]. When to use it: [situation]. Link: [link].",
      "The current blocker is [blocker]. It affects [workflow/team]. I recommend [next step] and will follow up by [date].",
      "Process update: we are moving from [old workflow] to [new workflow] to reduce [problem]. Please use the new version starting [date].",
    ],
    professionalPhrases: [
      "I documented the process here.",
      "The current owner is...",
      "This reduces manual follow-up.",
      "The blocker affects...",
      "I recommend updating the workflow.",
    ],
  },
  {
    role: "Marketing Coordinator",
    roleSlug: "marketing-coordinator",
    interviewTitle: "Marketing Coordinator Interview Questions in English for Remote Jobs",
    interviewPrimaryKeyword: "marketing coordinator interview questions in English",
    interviewIntent: "Prepare for a remote marketing coordinator interview",
    interviewDescription:
      "Prepare for marketing coordinator interviews in English with answers for campaign organization, analytics, content, collaboration and reporting.",
    interviewExcerpt:
      "A marketing-focused guide for candidates who need to explain campaigns, metrics and teamwork in English.",
    resumeTitle: "Marketing Coordinator Resume Keywords for Remote Jobs",
    resumePrimaryKeyword: "marketing coordinator resume keywords",
    resumeDescription:
      "Use marketing coordinator resume keywords for remote roles, including campaign coordination, analytics, email marketing, social media and reporting.",
    communicationTitle: "Marketing Campaign Update Templates in English for Remote Teams",
    communicationSlug: "marketing-campaign-update-english-templates",
    communicationPrimaryKeyword: "marketing campaign update template in English",
    communicationDescription:
      "Write marketing campaign updates in English with templates for results, blockers, next steps and cross-functional coordination.",
    communicationExcerpt:
      "Templates for marketing candidates who need to report campaign progress and performance clearly.",
    coreSignal:
      "campaign organization, analytics literacy, creative coordination and clear reporting",
    tools: ["GA4", "HubSpot", "Meta Ads", "Canva", "Mailchimp", "Notion", "Google Sheets"],
    hiringSignals: [
      "Can explain campaign results with simple metrics.",
      "Organizes creative, copy and launch tasks.",
      "Collaborates with sales, design and content.",
      "Understands basic analytics and reporting.",
      "Communicates blockers before launch dates slip.",
    ],
    interviewQuestions: [
      "How do you organize a marketing campaign?",
      "What metrics do you track after a campaign?",
      "Tell me about a campaign you supported.",
      "How do you work with designers or sales teams?",
      "How do you handle feedback on copy or creative?",
      "What marketing tools have you used?",
      "How do you report campaign results?",
      "How do you prioritize tasks before a launch?",
    ],
    sampleQuestion: "Question: How do you report campaign results?",
    sampleAnswer:
      "I start with the goal, then report the most relevant metrics instead of listing everything. For example, if the goal was lead generation, I would share traffic, conversion rate, leads, cost per lead if available and what we should improve next. I also separate facts from recommendations so the team can decide quickly.",
    responsibilities: [
      "campaign coordination",
      "content calendar",
      "email marketing",
      "social media scheduling",
      "analytics reporting",
      "creative review",
    ],
    outcomes: [
      "higher conversion rate",
      "cleaner launch process",
      "better reporting visibility",
      "more consistent content output",
    ],
    resumeBullet:
      "Coordinated email and social campaigns across HubSpot, Canva and Google Sheets, tracked weekly performance metrics and prepared clear updates for remote marketing stakeholders.",
    communicationContext:
      "Marketing updates should connect activity to outcomes. A remote team needs to know what launched, what changed, what the numbers mean and what happens next.",
    communicationTemplates: [
      "Campaign status: [on track / at risk / complete]. Goal: [goal]. Latest result: [metric]. Main blocker: [blocker]. Next step: [action].",
      "The campaign generated [result]. The strongest channel was [channel]. My recommendation is to [next action] based on [reason].",
      "Creative update: copy is ready, design is in review and tracking links still need approval before launch.",
    ],
    professionalPhrases: [
      "The main metric to watch is...",
      "The campaign is currently on track.",
      "My recommendation is based on...",
      "The launch risk is...",
      "I separated results from next steps below.",
    ],
  },
];

function interviewSlug(role: RoleGuide) {
  return `${role.roleSlug}-interview-questions-english-remote`;
}

function resumeSlug(role: RoleGuide) {
  return `${role.roleSlug}-resume-keywords-remote`;
}

function secondaryKeywords(role: RoleGuide, extra: string[]) {
  return [
    `${role.role.toLowerCase()} remote jobs`,
    `${role.role.toLowerCase()} English interview`,
    ...extra,
  ];
}

function makeInterviewPost(role: RoleGuide): BlogPost {
  const slug = interviewSlug(role);
  const resume = resumeSlug(role);

  return {
    slug,
    title: role.interviewTitle,
    description: role.interviewDescription,
    category: "Role Interviews",
    cluster: roleCluster,
    intent: role.interviewIntent,
    primaryKeyword: role.interviewPrimaryKeyword,
    secondaryKeywords: secondaryKeywords(role, [
      `${role.role.toLowerCase()} interview answers`,
      `remote ${role.role.toLowerCase()} interview`,
    ]),
    excerpt: role.interviewExcerpt,
    readTime: "9 min read",
    publishedAt,
    updatedAt: publishedAt,
    cta: {
      label: "Practice this interview in English",
      href: "/ai-english-trainer",
    },
    sections: [
      {
        heading: `What remote ${role.role} interviews test`,
        body: [
          `Remote ${role.role} interviews test more than job knowledge. Hiring teams listen for ${role.coreSignal}.`,
          `For LATAM candidates, the strongest answer is usually short, structured and specific. Mention the tools you have used, the situations you handled and the result your work created.`,
        ],
        bullets: role.hiringSignals,
      },
      {
        heading: "Questions to practice in English",
        body: [
          "Use these questions to prepare out loud. Do not memorize a full script. Build flexible answers with context, action and result.",
        ],
        bullets: role.interviewQuestions,
      },
      {
        heading: "Answer example that sounds specific",
        body: [
          "A good answer should make your work visible. Avoid saying only that you are responsible or organized. Show the process you follow when the situation is difficult.",
        ],
        example: {
          label: "Example answer",
          items: [role.sampleQuestion, role.sampleAnswer],
        },
      },
      {
        heading: "Mistakes to avoid",
        body: [
          `Many ${role.role} candidates lose strength because they answer in generic English. The interviewer should hear how you work in a remote team.`,
        ],
        bullets: [
          "Do not say you are good at communication without giving an example.",
          `Do not list tools only. Explain how you used ${role.tools.slice(0, 3).join(", ")} in real work.`,
          "Do not hide blockers. Remote teams value early, clear updates.",
          "Do not translate a long Spanish answer word by word.",
        ],
      },
    ],
    faqs: [
      {
        question: `Do remote ${role.role} jobs require advanced English?`,
        answer:
          "They usually require clear professional English. Some roles need more speaking, but written clarity, structured updates and calm explanations matter in every remote role.",
      },
      {
        question: `What tools should I mention for ${role.role} roles?`,
        answer: `Mention tools you can actually discuss, such as ${role.tools.join(", ")}. It is better to show one real workflow than to list tools you barely know.`,
      },
      {
        question: "How should I practice before the interview?",
        answer:
          "Practice answers out loud, record yourself, reduce long explanations and prepare examples that show ownership, communication and measurable outcomes.",
      },
    ],
    relatedSlugs: [resume, role.communicationSlug, "remote-job-interview-questions-english"],
  };
}

function makeResumePost(role: RoleGuide): BlogPost {
  const interview = interviewSlug(role);

  return {
    slug: resumeSlug(role),
    title: role.resumeTitle,
    description: role.resumeDescription,
    category: "CV and Applications",
    cluster: roleCluster,
    intent: `Improve a ${role.role} resume for remote job applications`,
    primaryKeyword: role.resumePrimaryKeyword,
    secondaryKeywords: secondaryKeywords(role, [
      `${role.role.toLowerCase()} ATS keywords`,
      `remote ${role.role.toLowerCase()} resume`,
    ]),
    excerpt: `A role-specific keyword guide for ${role.role} candidates applying to remote jobs with US and global teams.`,
    readTime: "8 min read",
    publishedAt,
    updatedAt: publishedAt,
    cta: {
      label: "Build a stronger remote CV",
      href: "/cv-builder",
    },
    sections: [
      {
        heading: `How ATS screens remote ${role.role} resumes`,
        body: [
          "Remote job applications often get filtered before a recruiter reads the full resume. The safest approach is not keyword stuffing; it is using the right terms inside proof-based bullets.",
          `For ${role.role} roles, your resume should combine role responsibilities, tools, outcomes and remote communication signals.`,
        ],
      },
      {
        heading: "Keyword bank by category",
        body: [
          "Use this list to compare your resume with the job description. Add only the keywords you can explain in an interview.",
        ],
        bullets: [
          `Responsibilities: ${role.responsibilities.join(", ")}.`,
          `Tools: ${role.tools.join(", ")}.`,
          `Outcomes: ${role.outcomes.join(", ")}.`,
          "Remote signals: async communication, documentation, ownership, time zone collaboration, written updates.",
        ],
      },
      {
        heading: "Before and after bullet",
        body: [
          "A strong bullet uses action, scope, tool or responsibility and result. It should sound like real work, not a copied job description.",
        ],
        example: {
          label: "Resume bullet example",
          items: [
            `Weak: Responsible for ${role.role.toLowerCase()} tasks.`,
            `Strong: ${role.resumeBullet}`,
          ],
        },
      },
      {
        heading: "How to use keywords naturally",
        body: [
          "Place the most important keywords in the summary, skills and recent experience. The experience section is the most persuasive because it connects the keyword to proof.",
        ],
        bullets: [
          "Use a clean one-column resume layout.",
          "Group tools by function instead of creating a long wall of keywords.",
          "Match the job description language only when it is accurate.",
          "Add numbers where possible: volume, speed, quality, conversion, time saved or errors reduced.",
        ],
      },
    ],
    faqs: [
      {
        question: `How many ${role.role} resume keywords should I include?`,
        answer:
          "Include the keywords that match your real experience and the target job description. A smaller set with proof is stronger than a long list without context.",
      },
      {
        question: "Should I mention remote work in my resume?",
        answer:
          "Yes. Mention async communication, documentation, remote tools and autonomous ownership when you can support those claims with examples.",
      },
      {
        question: "Where should tools go on the resume?",
        answer:
          "Put key tools in a skills section, but also mention the most important ones in experience bullets where you show how you used them.",
      },
    ],
    relatedSlugs: [interview, role.communicationSlug, "remote-job-resume-ats-keywords"],
  };
}

function makeCommunicationPost(role: RoleGuide): BlogPost {
  const interview = interviewSlug(role);
  const resume = resumeSlug(role);

  return {
    slug: role.communicationSlug,
    title: role.communicationTitle,
    description: role.communicationDescription,
    category: "Async Writing",
    cluster: "Async communication",
    intent: `Write better English messages for remote ${role.role} work`,
    primaryKeyword: role.communicationPrimaryKeyword,
    secondaryKeywords: secondaryKeywords(role, [
      `${role.role.toLowerCase()} email templates`,
      `${role.role.toLowerCase()} async communication`,
    ]),
    excerpt: role.communicationExcerpt,
    readTime: "7 min read",
    publishedAt,
    updatedAt: publishedAt,
    cta: {
      label: "Use remote job templates",
      href: "/templates",
    },
    sections: [
      {
        heading: `Why written English matters for ${role.role}`,
        body: [
          role.communicationContext,
          "Remote teams make many decisions through chat, tickets, docs and email. If your message is unclear, the team loses time and you look less ready than you are.",
        ],
      },
      {
        heading: "Templates you can adapt",
        body: [
          "Use these as starting points. Replace the placeholders with real details from your work or the interview assignment.",
        ],
        example: {
          label: "Copy-ready templates",
          items: role.communicationTemplates,
        },
      },
      {
        heading: "Phrases that sound professional",
        body: [
          "These phrases are simple, but they create a stronger remote signal because they show ownership, clarity and follow-up.",
        ],
        bullets: role.professionalPhrases,
      },
      {
        heading: "How to practice this skill",
        body: [
          "Pick one real work situation and write a short message in English. Then make it shorter, clearer and more specific.",
        ],
        bullets: [
          "Lead with the status or request.",
          "Include only the context the other person needs.",
          "Name the next step and owner.",
          "Avoid apologizing too much when a clear update is enough.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should remote work messages be formal?",
        answer:
          "They should be professional, not stiff. Clear, respectful and specific English is usually better than overly formal language.",
      },
      {
        question: "Can I use templates in real interviews?",
        answer:
          "Yes, but adapt them. Interviewers can tell when a message is copied without understanding the situation.",
      },
      {
        question: "What is the fastest way to improve written English for remote jobs?",
        answer:
          "Practice short updates: status, blocker, action and deadline. This pattern appears across almost every remote role.",
      },
    ],
    relatedSlugs: [interview, resume, "slack-update-examples-english"],
  };
}

export const roleBlogPosts: BlogPost[] = roleGuides.flatMap((role) => [
  makeInterviewPost(role),
  makeResumePost(role),
  makeCommunicationPost(role),
]);
