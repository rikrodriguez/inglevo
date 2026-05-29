import { NextResponse, type NextRequest } from "next/server";
import OpenAI from "openai";

import { requireApiUser } from "@/lib/api-auth";
import { logInternalEvent } from "@/lib/internal-events";
import { checkRateLimit } from "@/lib/rate-limit";
import { checkInterviewPracticeQuota } from "@/lib/usage-limits";

export const runtime = "nodejs";

const maxAudioSize = 12 * 1024 * 1024;
const allowedAudioTypes = new Set([
  "audio/webm",
  "audio/mp4",
  "audio/mpeg",
  "audio/wav",
  "audio/x-wav",
  "audio/m4a",
  "audio/x-m4a",
]);

export async function POST(request: NextRequest) {
  const { user, response: authResponse } = await requireApiUser();
  if (authResponse) {
    return authResponse;
  }

  const rateLimitResponse = checkRateLimit({
    request,
    userId: user?.id,
    route: "transcribe",
    limit: 10,
    windowMs: 10 * 60 * 1000,
  });
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const quotaResponse = await checkInterviewPracticeQuota(user?.id);
  if (quotaResponse) {
    return quotaResponse;
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      {
        error:
          "OpenAI is not configured. Add OPENAI_API_KEY to transcribe spoken answers.",
      },
      { status: 503 }
    );
  }

  try {
    const formData = await request.formData();
    const audio = formData.get("audio");

    if (!(audio instanceof File)) {
      return NextResponse.json(
        { error: "No recibimos audio para transcribir." },
        { status: 400 }
      );
    }

    if (audio.size > maxAudioSize) {
      return NextResponse.json(
        { error: "The audio is too large. Try recording a shorter answer." },
        { status: 413 }
      );
    }

    if (audio.type && !allowedAudioTypes.has(audio.type)) {
      return NextResponse.json(
        { error: "Formato de audio no soportado. Graba de nuevo desde el navegador." },
        { status: 415 }
      );
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const transcription = await client.audio.transcriptions.create({
      file: audio,
      model: "gpt-4o-mini-transcribe",
      prompt:
        "The speaker is practicing professional English for remote job interviews. Preserve the user's wording and transcribe in English.",
    });

    return NextResponse.json({
      transcript: transcription.text?.trim() ?? "",
    });
  } catch (error) {
    await logInternalEvent({
      eventType: "openai_error",
      severity: "error",
      route: "/api/transcribe",
      message: "OpenAI transcription failed.",
      metadata: {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      userId: user?.id,
    });

    return NextResponse.json(
      {
        error:
          "We could not transcribe the audio. Check your connection or try recording again.",
      },
      { status: 500 }
    );
  }
}
