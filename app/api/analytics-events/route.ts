import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { logInternalEvent } from "@/lib/internal-events";
import { checkRateLimit } from "@/lib/rate-limit";

const analyticsEventNames = [
  "page_view",
  "page_engaged",
  "cta_clicked",
  "outbound_link_clicked",
  "form_submitted",
  "blog_viewed",
  "blog_post_viewed",
  "signup_started",
  "signup_completed",
  "login_started",
  "onboarding_started",
  "onboarding_completed",
  "interview_started",
  "feedback_generated",
  "practice_saved",
  "readiness_viewed",
  "remote_jobs_viewed",
  "template_copied",
  "pricing_viewed",
  "checkout_clicked",
  "asset_created",
  "upgrade_clicked",
  "contact_started",
  "book_call_clicked",
  "subscription_created",
] as const;

const propertyValueSchema = z.union([
  z.string().max(180),
  z.number().finite(),
  z.boolean(),
  z.null(),
]);

const analyticsEventSchema = z.object({
  eventName: z.enum(analyticsEventNames),
  properties: z.record(z.string().max(48), propertyValueSchema).optional(),
  anonymousId: z
    .string()
    .regex(/^[a-zA-Z0-9_-]{8,80}$/)
    .nullable()
    .optional(),
  sessionId: z
    .string()
    .regex(/^[a-zA-Z0-9_-]{8,80}$/)
    .nullable()
    .optional(),
  consent: z.literal(true),
  timestamp: z.string().datetime().optional(),
});

const sensitivePropertyPattern =
  /(email|mail|name|phone|password|token|secret|answer|transcript|message|prompt|cv|resume|salary|address)/i;

function asSafeString(value: unknown) {
  return typeof value === "string" ? value.slice(0, 180) : null;
}

function sanitizeProperties(properties: Record<string, unknown> | undefined) {
  const clean: Record<string, string | number | boolean | null> = {};

  Object.entries(properties ?? {})
    .slice(0, 24)
    .forEach(([key, value]) => {
      if (sensitivePropertyPattern.test(key)) {
        return;
      }

      if (typeof value === "string") {
        if (value.includes("@")) {
          return;
        }

        clean[key] = value.slice(0, 180);
        return;
      }

      if (typeof value === "number" || typeof value === "boolean" || value === null) {
        clean[key] = value;
      }
    });

  return clean;
}

function getReferrerHost(value: unknown) {
  const referrer = asSafeString(value);

  if (!referrer) {
    return null;
  }

  try {
    return new URL(referrer).hostname;
  } catch {
    return referrer.replace(/^https?:\/\//, "").split("/")[0].slice(0, 80);
  }
}

export async function POST(request: NextRequest) {
  const rateLimitResponse = checkRateLimit({
    request,
    route: "analytics-events",
    limit: 180,
    windowMs: 10 * 60 * 1000,
  });

  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const body = await request.json().catch(() => null);
  const parsed = analyticsEventSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid analytics event.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const properties = sanitizeProperties(parsed.data.properties);
  const metadata = {
    ...properties,
    event_name: parsed.data.eventName,
    anonymous_id: parsed.data.anonymousId ?? null,
    session_id: parsed.data.sessionId ?? null,
    referrer_host: getReferrerHost(properties.referrer_host),
    country: request.headers.get("x-vercel-ip-country") ?? null,
    device: asSafeString(properties.device),
    received_at: new Date().toISOString(),
    client_timestamp: parsed.data.timestamp ?? null,
  };

  await logInternalEvent({
    eventType: `analytics:${parsed.data.eventName}`,
    severity: "info",
    route: "analytics",
    message: `Analytics event: ${parsed.data.eventName}`,
    metadata,
  });

  return new NextResponse(null, { status: 204 });
}
