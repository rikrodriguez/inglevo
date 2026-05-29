import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function logInternalEvent({
  eventType,
  severity,
  route,
  message,
  metadata,
  userId,
}: {
  eventType: string;
  severity: "info" | "warning" | "error";
  route?: string;
  message: string;
  metadata?: Record<string, unknown>;
  userId?: string | null;
}) {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return;
  }

  try {
    await supabase.from("internal_events").insert({
      user_id: userId ?? null,
      event_type: eventType,
      severity,
      route: route ?? null,
      message,
      metadata: metadata ?? {},
    });
  } catch {
    // Internal logging should never block the user-facing flow.
  }
}
