import { NextResponse } from "next/server";

import { logInternalEvent } from "@/lib/internal-events";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const activeSubscriptionStatuses = new Set(["active", "trialing"]);

export function getFreePracticeLimit() {
  const value = Number(process.env.FREE_PRACTICE_LIMIT ?? 3);

  return Number.isFinite(value) && value > 0 ? value : 3;
}

export async function checkInterviewPracticeQuota(userId?: string | null) {
  if (!userId) {
    return null;
  }

  const supabase = await createSupabaseServerClient().catch(() => null);

  if (!supabase) {
    return null;
  }

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("plan,status")
    .eq("user_id", userId)
    .maybeSingle();

  if (
    subscription?.plan === "pro" &&
    activeSubscriptionStatuses.has(String(subscription.status))
  ) {
    return null;
  }

  const limit = getFreePracticeLimit();
  const { count } = await supabase
    .from("practice_sessions")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);
  const used = count ?? 0;

  if (used < limit) {
    return null;
  }

  await logInternalEvent({
    eventType: "usage_limit_reached",
    severity: "info",
    route: "/api/coach-feedback",
    message: "Free interview practice limit reached.",
    metadata: { limit, used },
    userId,
  });

  return NextResponse.json(
    {
      code: "FREE_PRACTICE_LIMIT_REACHED",
      error: `Your Free plan includes ${limit} interview practices. Upgrade to Pro for unlimited practice.`,
      limit,
      used,
    },
    { status: 402 }
  );
}
