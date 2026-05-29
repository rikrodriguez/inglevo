export type AsyncWritingAssessment = {
  id: "slack_update" | "blocker_explanation" | "meeting_follow_up";
  title: string;
  context: string;
  prompt: string;
  goal: string;
  placeholder: string;
};

export const asyncWritingAssessments: AsyncWritingAssessment[] = [
  {
    id: "slack_update",
    title: "Slack update",
    context: "Remote team daily update",
    prompt:
      "Write a concise Slack update for your team about what you completed yesterday, what you are working on today, and whether anything is blocked.",
    goal: "Show clarity, concision and ownership without sounding robotic.",
    placeholder:
      "Yesterday I finished... Today I am working on... I am blocked by...",
  },
  {
    id: "blocker_explanation",
    title: "Blocker explanation",
    context: "Remote project communication",
    prompt:
      "Write a message explaining a blocker to your manager or client. Include the issue, impact, what you tried, and what help or decision you need.",
    goal: "Explain the blocker clearly while showing ownership and next steps.",
    placeholder:
      "I am currently blocked by... I already tried... The impact is... I need...",
  },
  {
    id: "meeting_follow_up",
    title: "Meeting follow-up",
    context: "Post-meeting async communication",
    prompt:
      "Write a follow-up after a remote meeting. Summarize decisions, action items, owners and next steps.",
    goal: "Make the message easy to scan and useful for an async team.",
    placeholder:
      "Thanks for the meeting. Here is a quick summary... Next steps are...",
  },
];
