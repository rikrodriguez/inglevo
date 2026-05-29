import OpenAI from "openai";

import { logInternalEvent } from "@/lib/internal-events";
import { createMockFeedback } from "@/lib/mock";
import {
  asyncWritingFeedbackOutputSchema,
  coachFeedbackOutputSchema,
  interviewConversationOutputSchema,
  remoteJobAssetOutputSchema,
} from "@/lib/validations";
import type {
  AsyncWritingFeedback,
  InterviewConversationTurn,
  RemoteJobAssetOutput,
  RemoteJobAssetType,
} from "@/types";

type CoachInput = {
  scenario: string;
  question: string;
  userAnswer: string;
  userLevel?: string;
  userRole?: string;
  userGoal?: string;
};

type InterviewConversationInput = {
  scenario: string;
  currentQuestion: string;
  userAnswer: string;
  improvedAnswer: string;
  quickDiagnosis: string;
  userLevel?: string;
  userRole?: string;
  userGoal?: string;
  turnCount?: number;
};

type AsyncWritingInput = {
  assessmentType: "slack_update" | "blocker_explanation" | "meeting_follow_up";
  prompt: string;
  userMessage: string;
  userLevel?: string;
  userRole?: string;
  userGoal?: string;
};

type RemoteJobAssetInput = {
  assetType: RemoteJobAssetType;
  inputContext: string;
  userRole?: string;
  userGoal?: string;
};

const scoreKeys = [
  "overallScore",
  "clarity",
  "grammar",
  "professionalTone",
  "structure",
  "opportunityReadiness",
  "employability",
  "remoteReadiness",
  "confidence",
  "specificity",
  "sellsYou",
] as const;

const writingScoreKeys = [
  "overallScore",
  "clarity",
  "tone",
  "concision",
  "ownership",
  "actionability",
] as const;

const model = "gpt-5.4-mini";
const systemPrompt = `You are Inglevo, an AI English career coach for Latin American professionals who want to work with US companies, get remote jobs, pass interviews, speak with clients, and negotiate better opportunities in English.

You are not a generic English teacher.

You evaluate the user's answer based on:
1. English clarity
2. Grammar
3. Professional tone
4. Structure
5. Confidence
6. Specificity
7. Employability
8. Remote readiness
9. Whether the answer sells the candidate's value
10. Suitability for US/international remote work contexts

Your job is to help the user sound clear, professional, confident and hireable — not perfect or native.

Never shame the user.
Never guarantee a job, income, visa, sponsorship or employment.
Never use overly academic explanations.
Never overcorrect in a way that makes the answer sound robotic.

Always return valid JSON only.

The improved answer must:
- sound natural
- sound professional
- match the user's role and goal
- keep the user's original intent
- avoid sounding desperate
- avoid sounding arrogant
- be suitable for a Latin American professional speaking with a US or international company

You must provide three improved versions:
- clearVersion: simple, clear, natural English at the user's likely level
- professionalVersion: polished and interview-ready, still natural
- highValueVersion: stronger value proposition with outcomes, ownership and remote readiness, without inventing facts

Feedback language should be Spanish.
Improved answer and key phrases should be English.`;

const interviewerSystemPrompt = `You are Inglevo's AI interviewer for Latin American professionals practicing remote job interviews in English.

You are not a generic chatbot.
You simulate a realistic, supportive interview conversation.

Your job:
- React briefly to the user's spoken answer.
- Sound like a professional interviewer and communication coach.
- Keep the conversation moving with one natural follow-up question.
- Do not shame the user.
- Do not guarantee jobs, income, visas, sponsorship, or employment.
- Keep feedback language in Spanish.
- Keep the follow-up question in English.
- Return valid JSON only.`;

const asyncWritingSystemPrompt = `You are Inglevo, an AI remote work communication coach for Latin American professionals who want to work with US and international teams.

You are not a generic grammar checker.

You evaluate async writing for remote work based on:
1. Clarity
2. Professional tone
3. Concision
4. Ownership
5. Actionability
6. Suitability for Slack, email, updates and follow-ups

Help the user sound clear, professional, reliable and easy to work with.

Never shame the user.
Never guarantee jobs, income, visas, sponsorship or employment.
Feedback language should be Spanish.
The improved message and key phrases should be English.
Return valid JSON only.`;

const remoteJobAssetSystemPrompt = `You are Inglevo, an AI career communication coach for Latin American professionals applying to remote jobs with US and international companies.

You create practical English job application assets:
- recruiter messages
- LinkedIn headlines
- LinkedIn About sections
- resume/CV bullets
- follow-up emails
- salary expectation scripts
- interview answer bank entries

The output must sound professional, natural, clear and credible.
Do not exaggerate experience.
Do not guarantee jobs, income, visas, sponsorship or employment.
Avoid desperate, arrogant, robotic or overhyped wording.
Return valid JSON only.`;

export async function generateCoachFeedback(input: CoachInput) {
  if (!process.env.OPENAI_API_KEY) {
    return {
      feedback: createMockFeedback(input.userAnswer),
      source: "mock" as const,
    };
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model,
      max_output_tokens: 1400,
      input: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: `Evaluate this English interview answer. Do not focus only on grammar. Explain feedback in Spanish, but write improvedAnswer, improvedAnswers and keyPhrases in English.

Scenario: ${input.scenario}
Question: ${input.question}
User level: ${input.userLevel ?? "Unknown"}
User role: ${input.userRole ?? "Unknown"}
User goal: ${input.userGoal ?? "Unknown"}
User answer: ${input.userAnswer}

All score fields must be integers from 0 to 100. Do not use a 0 to 10 scale.

Return JSON with:
{
  "overallScore": number,
  "clarity": number,
  "grammar": number,
  "professionalTone": number,
  "structure": number,
  "opportunityReadiness": number,
  "employability": number,
  "remoteReadiness": number,
  "confidence": number,
  "specificity": number,
  "sellsYou": number,
  "quickDiagnosis": string,
  "employabilityFeedback": string,
  "remoteReadinessFeedback": string,
  "professionalToneFeedback": string,
  "confidenceFeedback": string,
  "specificityFeedback": string,
  "sellsYouFeedback": string,
  "whatWorked": string[],
  "whatToImprove": string[],
  "improvedAnswer": "same as improvedAnswers.professionalVersion",
  "improvedAnswers": {
    "clearVersion": string,
    "professionalVersion": string,
    "highValueVersion": string
  },
  "keyPhrases": string[],
  "nextPractice": string
}`,
        },
      ],
    });

    const text = response.output_text;
    const parsed = coachFeedbackOutputSchema.parse(JSON.parse(text));
    const usesTenPointScale = scoreKeys.every((key) => parsed[key] <= 10);
    const feedback = usesTenPointScale
      ? {
          ...parsed,
          ...Object.fromEntries(
            scoreKeys.map((key) => [key, Math.min(parsed[key] * 10, 100)])
          ),
        }
      : parsed;

    return {
      feedback,
      source: "openai" as const,
    };
  } catch (error) {
    await logInternalEvent({
      eventType: "openai_error",
      severity: "warning",
      route: "/api/coach-feedback",
      message: "OpenAI coach feedback failed and returned mock fallback.",
      metadata: {
        error: error instanceof Error ? error.message : "Unknown error",
        scenario: input.scenario,
      },
    });

    return {
      feedback: createMockFeedback(input.userAnswer),
      source: "mock" as const,
    };
  }
}

export async function generateInterviewConversationTurn(
  input: InterviewConversationInput
): Promise<{ turn: InterviewConversationTurn; source: "mock" | "openai" }> {
  if (!process.env.OPENAI_API_KEY) {
    return {
      turn: createMockConversationTurn(input),
      source: "mock",
    };
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model,
      max_output_tokens: 500,
      input: [
        {
          role: "system",
          content: interviewerSystemPrompt,
        },
        {
          role: "user",
          content: `Continue this interview practice as a conversational AI interviewer.

Scenario: ${input.scenario}
Current question: ${input.currentQuestion}
User level: ${input.userLevel ?? "Unknown"}
User role: ${input.userRole ?? "Unknown"}
User goal: ${input.userGoal ?? "Unknown"}
Conversation turn: ${input.turnCount ?? 1}

User spoken answer:
${input.userAnswer}

Coach diagnosis:
${input.quickDiagnosis}

Improved answer reference:
${input.improvedAnswer}

Return JSON with:
{
  "interviewerReply": "Spanish, 1-2 short sentences. React like an interviewer/coach, mention one concrete thing to improve or what sounded strong.",
  "followUpQuestion": "English, one realistic follow-up interview question connected to the user's answer."
}`,
        },
      ],
    });

    const turn = interviewConversationOutputSchema.parse(
      JSON.parse(response.output_text)
    );

    return {
      turn,
      source: "openai",
    };
  } catch (error) {
    await logInternalEvent({
      eventType: "openai_error",
      severity: "warning",
      route: "/api/interview-conversation",
      message: "OpenAI interview conversation failed and returned mock fallback.",
      metadata: {
        error: error instanceof Error ? error.message : "Unknown error",
        scenario: input.scenario,
      },
    });

    return {
      turn: createMockConversationTurn(input),
      source: "mock",
    };
  }
}

function createMockConversationTurn(
  input: InterviewConversationInput
): InterviewConversationTurn {
  const followUpQuestion =
    input.turnCount && input.turnCount > 1
      ? "Can you describe one concrete result you achieved in that situation?"
      : "Can you give me one specific example that shows your impact?";

  return {
    interviewerReply:
      "Good. Your main idea is understandable; now try to sound more specific and connect your experience with professional impact.",
    followUpQuestion,
  };
}

export async function generateAsyncWritingFeedback(input: AsyncWritingInput) {
  if (!process.env.OPENAI_API_KEY) {
    return {
      feedback: createMockAsyncWritingFeedback(input),
      source: "mock" as const,
    };
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model,
      max_output_tokens: 1000,
      input: [
        {
          role: "system",
          content: asyncWritingSystemPrompt,
        },
        {
          role: "user",
          content: `Evaluate this async remote work message. Explain feedback in Spanish, but write improvedMessage and keyPhrases in English.

Assessment type: ${input.assessmentType}
Prompt: ${input.prompt}
User level: ${input.userLevel ?? "Unknown"}
User role: ${input.userRole ?? "Unknown"}
User goal: ${input.userGoal ?? "Unknown"}
User message:
${input.userMessage}

All score fields must be integers from 0 to 100. Do not use a 0 to 10 scale.

Return JSON with:
{
  "overallScore": number,
  "clarity": number,
  "tone": number,
  "concision": number,
  "ownership": number,
  "actionability": number,
  "quickDiagnosis": string,
  "whatWorked": string[],
  "whatToImprove": string[],
  "improvedMessage": string,
  "keyPhrases": string[],
  "nextPractice": string
}`,
        },
      ],
    });

    const parsed = asyncWritingFeedbackOutputSchema.parse(
      JSON.parse(response.output_text)
    );
    const usesTenPointScale = writingScoreKeys.every((key) => parsed[key] <= 10);
    const feedback = usesTenPointScale
      ? {
          ...parsed,
          ...Object.fromEntries(
            writingScoreKeys.map((key) => [
              key,
              Math.min(parsed[key] * 10, 100),
            ])
          ),
        }
      : parsed;

    return {
      feedback,
      source: "openai" as const,
    };
  } catch (error) {
    await logInternalEvent({
      eventType: "openai_error",
      severity: "warning",
      route: "/api/async-writing-feedback",
      message: "OpenAI async writing feedback failed and returned mock fallback.",
      metadata: {
        error: error instanceof Error ? error.message : "Unknown error",
        assessmentType: input.assessmentType,
      },
    });

    return {
      feedback: createMockAsyncWritingFeedback(input),
      source: "mock" as const,
    };
  }
}

function createMockAsyncWritingFeedback(input: AsyncWritingInput): AsyncWritingFeedback {
  const hasStructure = input.userMessage.includes("\n") || input.userMessage.length > 140;
  const base = hasStructure ? 78 : 66;

  return {
    overallScore: base,
    clarity: base + 4,
    tone: base + 6,
    concision: base - 2,
    ownership: base - 4,
    actionability: base - 1,
    quickDiagnosis:
      "Your message is understandable, but it can sound clearer and more actionable for a remote team.",
    whatWorked: [
      "You communicate the main idea.",
      "The message keeps a professional tone.",
    ],
    whatToImprove: [
      "Add concrete next steps.",
      "Make it clearer who needs to do what.",
      "Reduce vague phrases and use a scannable structure.",
    ],
    improvedMessage:
      "Quick update: yesterday I completed the first draft and reviewed the main requirements. Today I’m refining the final details and preparing the next version for review. I’m currently blocked by one missing decision on scope. Could you confirm which option we should prioritize by end of day?",
    keyPhrases: [
      "Quick update:",
      "I’m currently blocked by...",
      "Could you confirm which option we should prioritize?",
    ],
    nextPractice:
      input.assessmentType === "blocker_explanation"
        ? "Practice writing a meeting follow-up with clear action items."
        : "Practice explaining a blocker with impact and next steps.",
  };
}

export async function generateRemoteJobAsset(input: RemoteJobAssetInput) {
  if (!process.env.OPENAI_API_KEY) {
    return {
      asset: createMockRemoteJobAsset(input),
      source: "mock" as const,
    };
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model,
      max_output_tokens: 900,
      input: [
        {
          role: "system",
          content: remoteJobAssetSystemPrompt,
        },
        {
          role: "user",
          content: `Create a remote job application asset in English.

Asset type: ${input.assetType}
User role: ${input.userRole ?? "Unknown"}
User goal: ${input.userGoal ?? "Unknown"}
User context:
${input.inputContext}

Return JSON with:
{
  "title": string,
  "content": string,
  "rationale": "Spanish explanation of why this asset works.",
  "tips": string[]
}`,
        },
      ],
    });

    const asset = remoteJobAssetOutputSchema.parse(JSON.parse(response.output_text));

    return {
      asset,
      source: "openai" as const,
    };
  } catch (error) {
    await logInternalEvent({
      eventType: "openai_error",
      severity: "warning",
      route: "/api/remote-job-assets",
      message: "OpenAI remote job asset generation failed and returned mock fallback.",
      metadata: {
        error: error instanceof Error ? error.message : "Unknown error",
        assetType: input.assetType,
      },
    });

    return {
      asset: createMockRemoteJobAsset(input),
      source: "mock" as const,
    };
  }
}

function createMockRemoteJobAsset(input: RemoteJobAssetInput): RemoteJobAssetOutput {
  const titleByType: Record<RemoteJobAssetType, string> = {
    recruiter_message: "Recruiter outreach message",
    linkedin_headline: "Remote-ready LinkedIn headline",
    linkedin_about: "LinkedIn About section",
    resume_bullet: "Outcome-focused CV bullet",
    follow_up_email: "Interview follow-up email",
    salary_script: "Salary expectations script",
    interview_answer: "Interview answer bank entry",
  };
  const contentByType: Record<RemoteJobAssetType, string> = {
    recruiter_message:
      "Hi [Name], I hope you’re doing well. I saw the [Role] opening and wanted to reach out. I have experience in [Area] and I’m interested in contributing to a remote team where I can help improve [Outcome]. Would you be open to a quick conversation?",
    linkedin_headline:
      "Marketing Professional | Community Growth & Digital Strategy | Remote-Ready LATAM Talent",
    linkedin_about:
      "I’m a marketing professional with experience building online communities, growth systems and digital business projects. I enjoy turning ideas into clear campaigns, improving communication, and contributing to teams that value ownership, speed and practical results. I’m currently preparing for remote opportunities with international teams where I can bring strong execution, clear async communication and a growth-focused mindset.",
    resume_bullet:
      "Built and managed digital community initiatives that improved audience engagement, strengthened brand trust and supported lead generation for online business projects.",
    follow_up_email:
      "Hi [Name], thank you again for taking the time to speak with me about the [Role] position. I enjoyed learning more about the team and the goals for this role. Our conversation reinforced my interest, and I’d be excited to contribute my experience in [Area] to help with [Outcome]. Please let me know if there is any additional information I can share.",
    salary_script:
      "Based on the responsibilities of the role and my experience, I’m looking for compensation that is aligned with the market and the impact expected from the position. I’m flexible and open to discussing the full package, but I’d like to make sure the range reflects the scope of the work and the value I can contribute.",
    interview_answer:
      "I’m a professional with experience in marketing, business and building online communities. I’ve worked on projects that require clear communication, ownership and the ability to turn ideas into execution. I’m now looking for a remote role with an international team where I can contribute to growth, improve outcomes and continue developing professionally.",
  };

  return {
    title: titleByType[input.assetType],
    content: contentByType[input.assetType],
    rationale:
      "This asset works because it communicates professional value clearly, specifically and appropriately for remote opportunities.",
    tips: [
      "Personalize the placeholders before sending it.",
      "Add a concrete result if you have one.",
      "Keep the tone professional and direct.",
    ],
  };
}
