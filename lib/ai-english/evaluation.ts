import OpenAI from "openai";

import { getRoleById } from "./role-library";
import {
  createMockPracticeEvaluation,
  getPracticeScoreBand,
  PROMPT_VERSION,
  RUBRIC_VERSION,
} from "./scoring";
import { practiceEvaluationSchema } from "./schemas";
import type { AIEnglishRoleId, AIEnglishScenarioType } from "./types";

export type EvaluatePracticeAnswerInput = {
  apiKey?: string;
  model: string;
  roleId: AIEnglishRoleId;
  scenarioId: string;
  scenarioType?: AIEnglishScenarioType;
  question: string;
  answerText: string;
  englishLevel: string;
  mainGoal: string;
  onError?: (error: unknown) => Promise<void>;
};

function parseJsonObject(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);

    if (!match) {
      throw new Error("Model response did not include a JSON object.");
    }

    return JSON.parse(match[0]);
  }
}

function getFallbackEvaluation(input: EvaluatePracticeAnswerInput) {
  const role = getRoleById(input.roleId);

  return createMockPracticeEvaluation({
    answerText: input.answerText,
    roleTitle: role.title,
    modelUsed: input.model,
  });
}

export async function evaluatePracticeAnswer(input: EvaluatePracticeAnswerInput) {
  const role = getRoleById(input.roleId);
  const scenario =
    role.interview_scenarios.find((item) => item.id === input.scenarioId) ??
    role.role_scenarios.find((item) => item.id === input.scenarioId) ??
    role.interview_scenarios[0];

  if (!input.apiKey) {
    return getFallbackEvaluation(input);
  }

  try {
    const client = new OpenAI({ apiKey: input.apiKey });
    const response = await client.responses.create({
      model: input.model,
      max_output_tokens: 1300,
      input: [
        {
          role: "system",
          content: `You are an English communication coach for LATAM professionals preparing for remote jobs. Evaluate the user's answer for practical remote-work English. Be honest but helpful. Do not invent experience, tools, companies, results or metrics. Do not certify the user. This is a Practice Score only.

The goal is not to imitate a native speaker. The goal is clear, professional communication for remote work.

Return valid JSON only. Do not wrap the JSON in markdown.`,
        },
        {
          role: "user",
          content: `Evaluate this role-specific English practice answer.

Role: ${role.title}
Role description: ${role.description}
Common role tools: ${role.common_tools.join(", ")}
Scenario title: ${scenario.title}
Scenario context: ${scenario.context}
Question/task: ${input.question}
What this measures: ${scenario.what_this_measures.join(", ")}
User English level: ${input.englishLevel}
User main goal: ${input.mainGoal}

User answer:
${input.answerText}

Rubric keys:
- clarity
- grammar_control
- structure
- professional_tone
- role_relevance
- specificity
- remote_communication
- confidence
- actionability

Rules:
- Score from 0 to 100 only.
- score_band must match the score: 0-39 Not ready, 40-59 Developing, 60-74 Workable, 75-84 Job-ready, 85-100 Strong signal.
- Call this Practice Score, not certification or verification.
- Preserve the user's meaning in improved_answer.
- Do not invent experience, tools, company names, achievements, numbers or metrics.
- If the answer is vague, improve structure without fabricating facts.
- Feedback should be practical, specific and encouraging.

Return JSON with exactly this shape:
{
  "overall_score": number,
  "score_band": "Not ready" | "Developing" | "Workable" | "Job-ready" | "Strong signal",
  "summary": string,
  "rubric_scores": {
    "clarity": number,
    "grammar_control": number,
    "structure": number,
    "professional_tone": number,
    "role_relevance": number,
    "specificity": number,
    "remote_communication": number,
    "confidence": number,
    "actionability": number
  },
  "strengths": string[],
  "improvements": string[],
  "improved_answer": string,
  "suggested_phrases": string[],
  "next_step": string,
  "prompt_version": "${PROMPT_VERSION}",
  "rubric_version": "${RUBRIC_VERSION}",
  "model_used": "${input.model}",
  "source": "openai"
}`,
        },
      ],
    });

    const raw = parseJsonObject(response.output_text);
    const normalized = {
      ...raw,
      overall_score: Math.round(Number(raw.overall_score)),
      score_band: getPracticeScoreBand(Number(raw.overall_score)),
      prompt_version: PROMPT_VERSION,
      rubric_version: RUBRIC_VERSION,
      model_used: input.model,
      source: "openai",
    };

    return practiceEvaluationSchema.parse(normalized);
  } catch (error) {
    await input.onError?.(error);
    return getFallbackEvaluation(input);
  }
}
