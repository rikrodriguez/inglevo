import { getViewer } from "@/lib/data";
import { SettingsForm } from "@/components/shared/settings-form";

export default async function SettingsPage() {
  const { profile, isDemoMode } = await getViewer();

  return (
    <div className="mx-auto grid max-w-3xl gap-6">
      <section className="hero-panel">
        <p className="section-kicker">Settings</p>
        <h1 className="page-title mt-2">Basic settings</h1>
        <p className="page-copy mt-3">
          Keep your profile updated so practices and job assets stay aligned
          with your professional goal.
        </p>
      </section>
      <div className="premium-panel">
        <p className="mb-5 text-sm text-muted-foreground">Email: {profile.email}</p>
        <SettingsForm profile={profile} isDemoMode={isDemoMode} />
        {isDemoMode ? (
          <p className="mt-6 rounded-xl bg-[#dfdbd6] p-4 text-sm text-black">
            Supabase is not configured. This view uses demo data until you add
            the environment variables.
          </p>
        ) : null}
      </div>
    </div>
  );
}
