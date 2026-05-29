import { NextResponse, type NextRequest } from "next/server";

import { requireApiUser } from "@/lib/api-auth";
import { generateInterviewConversationTurn } from "@/lib/openai";
import { checkRateLimit } from "@/lib/rate-limit";
import { interviewConversationSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const { user, response: authResponse } = await requireApiUser();
    if (authResponse) {
      return authResponse;
    }

    const rateLimitResponse = checkRateLimit({
      request,
      userId: user?.id,
      route: "interview-conversation",
      limit: 30,
      windowMs: 10 * 60 * 1000,
    });
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const body = await request.json().catch(() => null);
    const parsed = interviewConversationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid interview conversation input.",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { turn, source } = await generateInterviewConversationTurn(parsed.data);

    return NextResponse.json({
      ...turn,
      source,
      message:
        source === "openai"
          ? "Conversational interviewer response generated."
          : "Conversational fallback generated. Add OPENAI_API_KEY for real AI interview turns.",
    });
  } catch {
    return NextResponse.json(
      {
        error: "Interview conversation failed safely. Please try again.",
      },
      { status: 500 }
    );
  }
}
