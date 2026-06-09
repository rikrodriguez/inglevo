import { NextResponse, type NextRequest } from "next/server";

import { requireApiUser } from "@/lib/api-auth";
import { getSessionOwnerId } from "@/lib/data";
import { generateRemoteJobAsset } from "@/lib/openai";
import { checkRateLimit } from "@/lib/rate-limit";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { remoteJobAssetSchema } from "@/lib/validations";
import type { RemoteJobAssetOutput } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const { user, response: authResponse } = await requireApiUser();
    if (authResponse) {
      return authResponse;
    }

    const rateLimitResponse = checkRateLimit({
      request,
      userId: user?.id,
      route: "remote-job-assets",
      limit: 15,
      windowMs: 10 * 60 * 1000,
    });
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const body = await request.json().catch(() => null);
    const parsed = remoteJobAssetSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid remote job asset input.",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const isDirectSave = Boolean(parsed.data.directContent);
    const generated = isDirectSave
      ? null
      : await generateRemoteJobAsset(parsed.data);
    const asset: RemoteJobAssetOutput = isDirectSave
      ? {
          title: parsed.data.directTitle ?? "Saved Inglevo asset",
          content: parsed.data.directContent!,
          rationale:
            parsed.data.directRationale ??
            "Saved exactly from the user's strongest improved version so it can be reused without losing context.",
          tips:
            parsed.data.directTips?.length
              ? parsed.data.directTips
              : [
                  "Practice this out loud before using it.",
                  "Keep the facts accurate to your real experience.",
                  "Adapt the wording to each role before sending it.",
                ],
        }
      : generated!.asset;
    const source = isDirectSave ? "direct" : generated!.source;
    const supabase = await createSupabaseServerClient().catch(() => null);
    let saved = false;
    let saveError: string | null = null;

    if (supabase && user) {
      const { error } = await supabase.from("job_assets").insert({
        user_id: getSessionOwnerId(user.id),
        type: parsed.data.assetType,
        title: asset.title,
        content: asset.content,
        source_session_id: parsed.data.sourceSessionId ?? null,
      });

      saved = !error;
      saveError = error?.message ?? null;
    }

    return NextResponse.json({
      ...asset,
      source,
      saved,
      saveError,
      message: saved
        ? "Job asset saved."
        : isDirectSave
          ? "Asset prepared, but it could not be saved to your workspace."
          : "Asset generated. Apply migration 005_job_assets.sql to save assets.",
    });
  } catch {
    return NextResponse.json(
      {
        error: "Remote job asset generation failed safely. Please try again.",
      },
      { status: 500 }
    );
  }
}
