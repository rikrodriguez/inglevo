import { professionalTemplates } from "@/data/templates";
import { mockProfile, mockUserId } from "@/lib/mock";
import { hasSupabaseConfig } from "@/lib/supabase/config";
import { createSupabaseServerClient, getCurrentUser } from "@/lib/supabase/server";
import type {
  PracticeSession,
  Profile,
  ReadinessAssessment,
  RemoteJobAsset,
  RemoteSetupCheck,
  SavedOpportunity,
  Template,
  WritingAssessment,
} from "@/types";

export async function getViewer() {
  const user = await getCurrentUser();

  if (!user) {
    return {
      user: null,
      profile: mockProfile,
      isDemoMode: !hasSupabaseConfig(),
    };
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return {
      user,
      profile: mockProfile,
      isDemoMode: true,
    };
  }

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle<Profile>();

  return {
    user,
    profile:
      data ??
      ({
        ...mockProfile,
        id: user.id,
        email: user.email ?? mockProfile.email,
        full_name: user.user_metadata?.full_name ?? null,
        target_salary: null,
        applying_remote_jobs: null,
        recommended_path: null,
        onboarding_completed: false,
      } satisfies Profile),
    isDemoMode: false,
  };
}

export async function getPracticeSessions() {
  const { user, isDemoMode } = await getViewer();

  if (isDemoMode || !user) {
    return [] satisfies PracticeSession[];
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return [];
  }

  const { data } = await supabase
    .from("practice_sessions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(20);

  return (data ?? []) as PracticeSession[];
}

export async function getTemplates() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return professionalTemplates;
  }

  const { data } = await supabase
    .from("templates")
    .select("*")
    .order("category", { ascending: true });

  return ((data?.length ? data : professionalTemplates) ?? []) as Template[];
}

export async function getSetupCheck() {
  const { user, isDemoMode } = await getViewer();

  if (isDemoMode || !user) {
    return null satisfies RemoteSetupCheck | null;
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("setup_checks")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    return null;
  }

  return (data ?? null) as RemoteSetupCheck | null;
}

export async function getWritingAssessments() {
  const { user, isDemoMode } = await getViewer();

  if (isDemoMode || !user) {
    return [] satisfies WritingAssessment[];
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("writing_assessments")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    return [];
  }

  return (data ?? []) as WritingAssessment[];
}

export async function getRemoteJobAssets() {
  const { user, isDemoMode } = await getViewer();

  if (isDemoMode || !user) {
    return [] satisfies RemoteJobAsset[];
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("job_assets")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(30);

  if (error) {
    return [];
  }

  return (data ?? []) as RemoteJobAsset[];
}

export async function getReadinessAssessments() {
  const { user, isDemoMode } = await getViewer();

  if (isDemoMode || !user) {
    return [] satisfies ReadinessAssessment[];
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("readiness_assessments")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(40);

  if (error) {
    return [];
  }

  return (data ?? []) as ReadinessAssessment[];
}

export async function getSavedOpportunities() {
  const { user, isDemoMode } = await getViewer();

  if (isDemoMode || !user) {
    return [] satisfies SavedOpportunity[];
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("saved_opportunities")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return [];
  }

  return (data ?? []) as SavedOpportunity[];
}

export function getSessionOwnerId(userId?: string | null) {
  return userId ?? mockUserId;
}
