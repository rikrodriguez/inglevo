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
  ]);

  const users = usersResult.data.users;
  const profiles = (profilesResult.data ?? []) as Profile[];
  const sessions = (sessionsResult.data ?? []) as PracticeSession[];
  const readinessAssessments = (readinessResult.data ?? []) as ReadinessAssessment[];
  const writingAssessments = (writingResult.data ?? []) as WritingAssessment[];
  const assets = (assetsResult.data ?? []) as RemoteJobAsset[];
  const internalEvents = (eventsResult.data ?? []) as InternalEvent[];
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
      missingTables: {
        internalEvents: Boolean(eventsResult.error),
      },
    },
  };
}
