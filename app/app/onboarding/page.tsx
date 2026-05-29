import { OnboardingForm } from "@/components/shared/onboarding-form";
import { AnalyticsEvent } from "@/components/shared/analytics-event";
import { getViewer } from "@/lib/data";

export default async function OnboardingPage() {
  const { profile } = await getViewer();

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center">
      <AnalyticsEvent event="onboarding_started" />
      <OnboardingForm email={profile.email} />
    </div>
  );
}
