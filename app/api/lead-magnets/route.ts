import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { leadMagnets } from "@/data/lead-magnets";
import { logInternalEvent } from "@/lib/internal-events";
import { checkRateLimit } from "@/lib/rate-limit";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const leadMagnetSlugs = leadMagnets.map((leadMagnet) => leadMagnet.slug) as [
  string,
  ...string[],
];

const leadMagnetSchema = z.object({
  email: z.string().email().max(160),
  role: z.string().trim().min(2).max(80).nullable().optional(),
  leadMagnet: z.enum(leadMagnetSlugs),
  sourcePath: z.string().trim().min(1).max(240),
  consent: z.literal(true),
  utmSource: z.string().trim().max(100).nullable().optional(),
  utmMedium: z.string().trim().max(100).nullable().optional(),
  utmCampaign: z.string().trim().max(120).nullable().optional(),
});

function cleanPath(path: string) {
  if (!path.startsWith("/")) {
    return "/";
  }

  return path.split("#")[0].slice(0, 240);
}

export async function POST(request: NextRequest) {
  const rateLimitResponse = checkRateLimit({
    request,
    route: "lead-magnets",
    limit: 8,
    windowMs: 10 * 60 * 1000,
  });

  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const body = await request.json().catch(() => null);
  const parsed = leadMagnetSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid lead magnet request.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const input = parsed.data;
  const email = input.email.trim().toLowerCase();
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    await logInternalEvent({
      eventType: "lead_magnet_storage_missing",
      severity: "warning",
      route: "lead-magnets",
      message: "Lead magnet submitted without Supabase storage configured.",
      metadata: {
        lead_magnet: input.leadMagnet,
        source_path: cleanPath(input.sourcePath),
      },
    });

    return NextResponse.json({
      ok: true,
      saved: false,
      message: "Resource ready.",
    });
  }

  const { error } = await supabase.from("lead_magnet_leads").upsert(
    {
      email,
      role: input.role ?? null,
      lead_magnet: input.leadMagnet,
      source_path: cleanPath(input.sourcePath),
      utm_source: input.utmSource ?? null,
      utm_medium: input.utmMedium ?? null,
      utm_campaign: input.utmCampaign ?? null,
      metadata: {
        user_agent: request.headers.get("user-agent")?.slice(0, 240) ?? null,
        country: request.headers.get("x-vercel-ip-country") ?? null,
      },
      updated_at: new Date().toISOString(),
    },
    { onConflict: "email,lead_magnet" }
  );

  if (error) {
    await logInternalEvent({
      eventType: "lead_magnet_error",
      severity: "warning",
      route: "lead-magnets",
      message: "Lead magnet submission could not be saved.",
      metadata: {
        lead_magnet: input.leadMagnet,
        source_path: cleanPath(input.sourcePath),
        error: error.message,
      },
    });

    return NextResponse.json({
      ok: true,
      saved: false,
      message: "Resource ready.",
    });
  }

  return NextResponse.json({
    ok: true,
    saved: true,
    message: "Resource ready.",
  });
}
