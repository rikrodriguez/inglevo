import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { requireApiUser } from "@/lib/api-auth";
import { trackProductEvent } from "@/lib/product-events";
import { checkRateLimit } from "@/lib/rate-limit";

const productEventSchema = z.object({
  eventName: z.enum([
    "signup_completed",
    "onboarding_completed",
    "readiness_viewed",
    "remote_jobs_viewed",
    "asset_created",
    "upgrade_clicked",
  ]),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(request: NextRequest) {
  const { user, response: authResponse } = await requireApiUser();
  if (authResponse) {
    return authResponse;
  }

  const rateLimitResponse = checkRateLimit({
    request,
    userId: user?.id,
    route: "product-events",
    limit: 20,
    windowMs: 10 * 60 * 1000,
  });
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const body = await request.json().catch(() => null);
  const parsed = productEventSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid product event.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const result = await trackProductEvent({
    eventName: parsed.data.eventName,
    userId: user?.id,
    email: user?.email,
    name:
      typeof user?.user_metadata?.full_name === "string"
        ? user.user_metadata.full_name
        : null,
    metadata: parsed.data.metadata,
  });

  return NextResponse.json({
    ok: true,
    email: result,
  });
}
