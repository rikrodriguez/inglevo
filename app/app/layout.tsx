import { redirect } from "next/navigation";

import { AppShell } from "@/components/shared/app-shell";
import { getAdminState } from "@/lib/admin";
import { getViewer } from "@/lib/data";
import { hasSupabaseConfig } from "@/lib/supabase/config";

export default async function ProtectedAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const viewer = await getViewer();
  const admin = await getAdminState();

  if (hasSupabaseConfig() && !viewer.user) {
    redirect("/login");
  }

  return (
    <AppShell
      profile={viewer.profile}
      isDemoMode={viewer.isDemoMode}
      isAdmin={admin.isAdmin}
    >
      {children}
    </AppShell>
  );
}
