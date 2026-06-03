import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getCurrentUser } from "@/lib/supabase/server";
import type {
  PracticeSession,
  Profile,
  ReadinessAssessment,
  RemoteJobAsset,
  WritingAssessment,
} from "@/types";

export type InternalEvent = {
  id: string;
  user_id: string | null;
  event_type: string;
  severity: "info" | "warning" | "error";
  route: string | null;
  message: string;
  metadata: Record<string, unknown>;
  created_at: string;
};

const conversionEventNames = new Set([
  "signup_started",
  "signup_completed",
  "checkout_clicked",
  "upgrade_clicked",
  "onboarding_completed",
  "book_call_clicked",
  "contact_started",
]);

const ctaEventNames = new Set([
  "cta_clicked",
  "outbound_link_clicked",
  "checkout_clicked",
  "upgrade_clicked",
  "book_call_clicked",
  "contact_started",
]);

function getAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function getAdminState() {
  const user = await getCurrentUser().catch(() => null);
  const adminEmails = getAdminEmails();
  const email = user?.email?.toLowerCase() ?? null;

  return {
    user,
    isConfigured: adminEmails.length > 0,
    isAdmin: Boolean(email && adminEmails.includes(email)),
  };
}

function average(values: Array<number | null>) {
  const valid = values.filter((value): value is number => typeof value === "number");

  if (!valid.length) {
    return null;
  }

  return Math.round(valid.reduce((sum, value) => sum + value, 0) / valid.length);
}

function metadataString(
  metadata: Record<string, unknown>,
  key: string,
  fallback = "unknown"
) {
  const value = metadata[key];

  return typeof value === "string" && value.trim() ? value : fallback;
}

function increment(
  map: Map<string, { value: number; detail?: string }>,
  label: string,
  detail?: string
) {
  const current = map.get(label);

  map.set(label, {
    value: (current?.value ?? 0) + 1,
    detail: current?.detail ?? detail,
  });
}

function toTopItems(map: Map<string, { value: number; detail?: string }>) {
  return Array.from(map.entries())
    .map(([label, item]) => ({ label, value: item.value, detail: item.detail }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);
}

function getAnalyticsSummary(events: InternalEvent[]) {
  const visitors = new Set<string>();
  const sessions = new Set<string>();
  const pages = new Map<string, { value: number; detail?: string }>();
  const ctas = new Map<string, { value: number; detail?: string }>();
  const sources = new Map<string, { value: number; detail?: string }>();
  let pageViews = 0;
  let ctaClicks = 0;
  let conversionEvents = 0;

  events.forEach((event) => {
    const metadata = event.metadata ?? {};
    const eventName = metadataString(
      metadata,
      "event_name",
      event.event_type.replace(/^analytics:/, "")
    );
    const anonymousId = metadataString(metadata, "anonymous_id", "");
    const sessionId = metadataString(metadata, "session_id", "");
    const path = metadataString(metadata, "path", "");
    const source =
      metadataString(metadata, "utm_source", "") ||
      metadataString(metadata, "referrer_host", "");

    if (anonymousId) {
      visitors.add(anonymousId);
    }

    if (sessionId) {
      sessions.add(sessionId);
    }

    if (eventName === "page_view") {
      pageViews += 1;
      increment(pages, path || "unknown", metadataString(metadata, "page_type", ""));
    }

    if (ctaEventNames.has(eventName)) {
      ctaClicks += 1;
      increment(
        ctas,
        metadataString(metadata, "label", eventName),
        metadataString(metadata, "href", "")
      );
    }

    if (conversionEventNames.has(eventName)) {
      conversionEvents += 1;
    }

    if (source) {
      increment(sources, source);
    }
  });

  return {
    eventCount: events.length,
    pageViews,
    visitors: visitors.size,
    sessions: sessions.size,
    ctaClicks,
    conversionEvents,
    topPages: toTopItems(pages),
    topCtas: toTopItems(ctas),
    topSources: toTopItems(sources),
    recentEvents: events.slice(0, 15).map((event) => ({
      id: event.id,
      eventName: metadataString(
        event.metadata,
        "event_name",
        event.event_type.replace(/^analytics:/, "")
      ),
      path: metadataString(event.metadata, "path", "-"),
      label: metadataString(event.metadata, "label", ""),
      createdAt: event.created_at,
    })),
  };
}

export async function getAdminDashboardData() {
  const admin = await getAdminState();

  if (!admin.isAdmin) {
    return { admin, data: null };
  }

  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return { admin, data: null };
  }

  const [
    usersResult,
    profilesResult,
    sessionsResult,
    readinessResult,
    writingResult,
    assetsResult,
    eventsResult,
    analyticsEventsResult,
  ] = await Promise.all([
    supabase.auth.admin.listUsers({ page: 1, perPage: 100 }),
    supabase.from("profiles").select("*").order("created_at", { ascending: false }),
    supabase
      .from("practice_sessions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50),
    supabase
      .from("readiness_assessments")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50),
    supabase
      .from("writing_assessments")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50),
    supabase
      .from("job_assets")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50),
    supabase
      .from("internal_events")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(30),
    supabase
      .from("internal_events")
      .select("*")
      .eq("route", "analytics")
      .order("created_at", { ascending: false })
      .limit(500),
  ]);

  const users = usersResult.data.users;
  const profiles = (profilesResult.data ?? []) as Profile[];
  const sessions = (sessionsResult.data ?? []) as PracticeSession[];
  const readinessAssessments = (readinessResult.data ?? []) as ReadinessAssessment[];
  const writingAssessments = (writingResult.data ?? []) as WritingAssessment[];
  const assets = (assetsResult.data ?? []) as RemoteJobAsset[];
  const internalEvents = (eventsResult.data ?? []) as InternalEvent[];
  const analyticsEvents = (analyticsEventsResult.data ?? []) as InternalEvent[];
  const sessionsByUser = new Map<string, PracticeSession[]>();

  sessions.forEach((session) => {
    const current = sessionsByUser.get(session.user_id) ?? [];
    current.push(session);
    sessionsByUser.set(session.user_id, current);
  });

  const usersOverview = profiles.map((profile) => {
    const userSessions = sessionsByUser.get(profile.id) ?? [];

    return {
      profile,
      sessionCount: userSessions.length,
      averageScore: average(userSessions.map((session) => session.overall_score)),
      latestPracticeAt: userSessions[0]?.created_at ?? null,
    };
  });

  return {
    admin,
    data: {
      totals: {
        authUsers: users.length,
        profiles: profiles.length,
        sessions: sessions.length,
        readinessAssessments: readinessAssessments.length,
        writingAssessments: writingAssessments.length,
        assets: assets.length,
        internalEvents: internalEvents.length,
        averageScore: average(sessions.map((session) => session.overall_score)),
      },
      usersOverview,
      sessions,
      readinessAssessments,
      writingAssessments,
      assets,
      internalEvents,
      analytics: getAnalyticsSummary(analyticsEvents),
      missingTables: {
        internalEvents: Boolean(eventsResult.error || analyticsEventsResult.error),
      },
    },
  };
}
