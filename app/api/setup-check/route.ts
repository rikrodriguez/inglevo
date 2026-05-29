import { NextResponse } from "next/server";

import { createSupabaseServerClient, getCurrentUser } from "@/lib/supabase/server";
import { setupCheckSchema } from "@/lib/validations";

function calculateSetupScore(input: {
  stableInternet: boolean;
  workingMicrophone: boolean;
  canJoinVideoCalls: boolean;
  quietPlace: boolean;
  headphonesAvailable: boolean;
  timezoneOverlap: boolean;
}) {
  const values = [
    input.stableInternet,
    input.workingMicrophone,
    input.canJoinVideoCalls,
    input.quietPlace,
    input.headphonesAvailable,
    input.timezoneOverlap,
  ];

  return Math.round((values.filter(Boolean).length / values.length) * 100);
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const parsed = setupCheckSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid setup check input.",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const user = await getCurrentUser().catch(() => null);
    const supabase = await createSupabaseServerClient().catch(() => null);

    if (!user || !supabase) {
      return NextResponse.json(
        {
          saved: false,
          score: calculateSetupScore(parsed.data),
          message:
            "Setup check calculated locally. Sign in and connect Supabase to save it.",
        },
        { status: 200 }
      );
    }

    const score = calculateSetupScore(parsed.data);
    const { error } = await supabase.from("setup_checks").upsert(
      {
        user_id: user.id,
        stable_internet: parsed.data.stableInternet,
        working_microphone: parsed.data.workingMicrophone,
        can_join_video_calls: parsed.data.canJoinVideoCalls,
        quiet_place: parsed.data.quietPlace,
        headphones_available: parsed.data.headphonesAvailable,
        timezone_overlap: parsed.data.timezoneOverlap,
        timezone: parsed.data.timezone,
        microphone_status: parsed.data.microphoneStatus,
        camera_status: parsed.data.cameraStatus,
        score,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );

    if (error) {
      return NextResponse.json(
        {
          saved: false,
          score,
          message:
            "Setup score calculated, but it was not saved. Apply migration 002_setup_checks.sql in Supabase.",
          saveError: error.message,
        },
        { status: 200 }
      );
    }

    await supabase
      .from("readiness_assessments")
      .insert({
        user_id: user.id,
        assessment_type: "setup_readiness",
        score,
        area_scores: {
          setupReadiness: score,
        },
        feedback_json: {
          stableInternet: parsed.data.stableInternet,
          workingMicrophone: parsed.data.workingMicrophone,
          canJoinVideoCalls: parsed.data.canJoinVideoCalls,
          quietPlace: parsed.data.quietPlace,
          headphonesAvailable: parsed.data.headphonesAvailable,
          timezoneOverlap: parsed.data.timezoneOverlap,
          timezone: parsed.data.timezone,
          microphoneStatus: parsed.data.microphoneStatus,
          cameraStatus: parsed.data.cameraStatus,
        },
        status: "completed",
      });

    return NextResponse.json({
      saved: true,
      score,
      message: "Setup check saved.",
    });
  } catch {
    return NextResponse.json(
      {
        error: "Setup check failed safely. Please try again.",
      },
      { status: 500 }
    );
  }
}
