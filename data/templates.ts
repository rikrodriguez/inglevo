import type { Template } from "@/types";

export const professionalTemplates: Template[] = [
  {
    id: "linkedin-recruiter",
    category: "Job Search",
    title: "Contact a recruiter on LinkedIn",
    use_case: "Reach out to a recruiter about a role in a clear and professional way.",
    content:
      "Hi [Name], I hope you are doing well. I saw your post about the [Role] position and wanted to reach out. I have experience in [Skill/Area] and I am interested in learning more about the opportunity. Would you be open to a quick conversation?",
  },
  {
    id: "interview-follow-up",
    category: "Job Search",
    title: "Follow up after an interview",
    use_case: "Follow up politely when you have not heard back after an interview.",
    content:
      "Hi [Name], I hope you are doing well. I wanted to follow up on my interview for the [Role] position. I remain very interested in the opportunity and would be happy to provide any additional information. Thank you again for your time.",
  },
  {
    id: "thank-you-email",
    category: "Job Search",
    title: "Send a thank-you email",
    use_case: "Send a thank-you note after an interview.",
    content:
      "Hi [Name], thank you for taking the time to speak with me today. I enjoyed learning more about [Company] and the [Role] position. Our conversation reinforced my interest, and I would be excited to contribute to [Specific Area]. Best, [Your Name]",
  },
  {
    id: "salary-expectation",
    category: "Job Search",
    title: "Answer salary expectations",
    use_case: "Respond professionally when asked about salary expectations.",
    content:
      "Based on my experience and the responsibilities of the role, I am looking for a range around [Range]. That said, I am open to discussing the full compensation package and learning more about the expectations for the position.",
  },
  {
    id: "referral-request",
    category: "Job Search",
    title: "Ask for a referral",
    use_case: "Ask someone for a referral without sounding demanding.",
    content:
      "Hi [Name], I hope you are doing well. I noticed an opening for [Role] at [Company] and thought it aligned well with my background in [Area]. If you feel comfortable, would you be open to referring me or sharing any advice about the application process?",
  },
  {
    id: "standup-update",
    category: "Remote Work",
    title: "Share a daily standup update",
    use_case: "Give a concise async or live standup update.",
    content:
      "Yesterday, I worked on [Task/Project] and completed [Result]. Today, I plan to focus on [Next Task]. I do not have any blockers right now, but I will flag anything that comes up.",
  },
  {
    id: "clarification",
    category: "Remote Work",
    title: "Ask for clarification",
    use_case: "Ask for more details about a task or request.",
    content:
      "Hi [Name], I want to make sure I understand this correctly. Could you clarify [Specific Point]? Also, should I prioritize [Option A] or [Option B]? Once I have that context, I can move forward.",
  },
  {
    id: "blocker",
    category: "Remote Work",
    title: "Explain a blocker",
    use_case: "Explain a blocker clearly and propose the next action.",
    content:
      "I am currently blocked by [Issue]. I have already tried [Action Taken], but I need [Decision/Access/Input] to continue. My recommendation is [Proposed Next Step] so we can keep the project moving.",
  },
  {
    id: "project-status",
    category: "Remote Work",
    title: "Share a project status update",
    use_case: "Share progress, risks, and next steps with a team.",
    content:
      "Quick update on [Project]: we have completed [Completed Work], and the current status is [Status]. The main risk is [Risk], and the next step is [Next Step]. I will share another update by [Date/Time].",
  },
  {
    id: "meeting-follow-up",
    category: "Remote Work",
    title: "Follow up after a meeting",
    use_case: "Summarize a meeting and confirm action items.",
    content:
      "Hi team, thank you for the discussion today. To summarize, we agreed on [Decision]. The next steps are: [Action Item 1], [Action Item 2], and [Action Item 3]. Please let me know if I missed anything.",
  },
  {
    id: "cold-email-client",
    category: "Freelance / Clients",
    title: "Write a cold email to a client",
    use_case: "Introduce your services to a potential client.",
    content:
      "Hi [Name], I noticed that [Company] is working on [Relevant Area]. I help teams with [Service/Outcome], and I believe there may be an opportunity to support [Specific Goal]. Would you be open to a short call next week?",
  },
  {
    id: "discovery-follow-up",
    category: "Freelance / Clients",
    title: "Follow up after a discovery call",
    use_case: "Follow up after a discovery call with a potential client.",
    content:
      "Hi [Name], thank you for the call today. Based on our conversation, your main priorities are [Priority 1] and [Priority 2]. I believe I can help by [Proposed Approach]. I will send the next steps by [Date].",
  },
  {
    id: "price-objection",
    category: "Freelance / Clients",
    title: "Respond to a price objection",
    use_case: "Respond when a client says the price is too high.",
    content:
      "I understand budget is important. The price reflects the scope, timeline, and the outcome we are aiming for: [Outcome]. If needed, we can adjust the scope to fit your budget while keeping the most important priorities covered.",
  },
  {
    id: "proposal-intro",
    category: "Freelance / Clients",
    title: "Open a proposal professionally",
    use_case: "Start a proposal with a clear summary of the client problem and solution.",
    content:
      "Thank you for the opportunity to submit this proposal. Based on our conversation, the main challenge is [Client Challenge]. My proposed approach is to [Solution Summary], with the goal of achieving [Expected Outcome].",
  },
  {
    id: "upfront-payment",
    category: "Freelance / Clients",
    title: "Ask for upfront payment",
    use_case: "Ask for an upfront payment before starting client work.",
    content:
      "To begin the project, I require an upfront payment of [Amount or Percentage]. This confirms the project timeline and allows me to reserve the necessary time for the work. Once payment is received, I will start with [First Step].",
  },
];
