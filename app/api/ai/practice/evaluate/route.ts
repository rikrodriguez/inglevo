import { NextResponse, type NextRequest } from "next/server";

import { evaluatePracticeAnswer } from "@/lib/ai-english/evaluation";
import { practiceEvaluateRequestSchema } from "@/lib/ai-english/schemas";
import { logInternalEvent } from "@/lib/internal-events";

const defaultModel = "gpt-5.4-mini";

function getModel() {
  return process.env.OPENAI_MODEL || defaultModel;
}

export async function POST(request: NextRequest) {
  const modelUsed = getModel();

  try {
    const body = await request.json().catch(() => null);
    const parsed = practiceEvaluateRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid practice evaluation input.",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const evaluation = await evaluatePracticeAnswer({
      apiKey: process.env.OPENAI_API_KEY,
      model: modelUsed,
      roleId: parsed.data.roleId,
      scenarioId: parsed.data.scenarioId,
      scenarioType: parsed.data.scenarioType,
      question: parsed.data.question,
      answerText: parsed.data.answerText,
      englishLevel: parsed.data.englishLevel,
      mainGoal: parsed.data.mainGoal,
      onError: async (error) => {
        await logInternalEvent({
          eventType: "openai_error",
          severity: "warning",
          route: "/api/ai/practice/evaluate",
          message: "AI English practice evaluation failed and returned mock fallback.",
          metadata: {
            error: error instanceof Error ? error.message : "Unknown error",
            roleId: parsed.data.roleId,
            scenarioId: parsed.data.scenarioId,
          },
        });
      },
    });

    return NextResponse.json(evaluation);
  } catch {
    return NextResponse.json(
      {
        error: "We could not evaluate your answer right now. Please try again.",
      },
      { status: 500 }
    );
  }
}
