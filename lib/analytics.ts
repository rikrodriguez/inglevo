"use client";

type AnalyticsEvent =
  | "page_view"
  | "signup_started"
  | "signup_completed"
  | "onboarding_started"
  | "onboarding_completed"
  | "interview_started"
  | "feedback_generated"
  | "practice_saved"
  | "readiness_viewed"
  | "remote_jobs_viewed"
  | "template_copied"
  | "pricing_viewed"
  | "checkout_clicked"
  | "asset_created"
  | "upgrade_clicked"
  | "subscription_created";

type AnalyticsProperties = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: AnalyticsProperties) => void;
    };
    plausible?: (
      event: string,
      options?: { props?: AnalyticsProperties }
    ) => void;
    fbq?: (action: string, event: string, properties?: AnalyticsProperties) => void;
    ttq?: {
      track: (event: string, properties?: AnalyticsProperties) => void;
      page: () => void;
    };
    gtag?: (
      action: string,
      event: string,
      properties?: AnalyticsProperties
    ) => void;
  }
}

const paidEventMap: Partial<Record<AnalyticsEvent, string>> = {
  page_view: "PageView",
  signup_completed: "Lead",
  onboarding_completed: "CompleteRegistration",
  checkout_clicked: "InitiateCheckout",
  subscription_created: "Purchase",
};

function cleanProperties(properties?: AnalyticsProperties) {
  if (!properties) {
    return undefined;
  }

  return Object.fromEntries(
    Object.entries(properties).filter(([, value]) => value !== undefined)
  ) as AnalyticsProperties;
}

export function trackEvent(event: AnalyticsEvent, properties?: AnalyticsProperties) {
  if (typeof window === "undefined") {
    return;
  }

  const clean = cleanProperties(properties);
  window.posthog?.capture(event, clean);
  window.plausible?.(event, clean ? { props: clean } : undefined);
  window.gtag?.("event", event, clean);

  const paidEvent = paidEventMap[event];
  if (paidEvent) {
    window.fbq?.("track", paidEvent, clean);
    window.ttq?.track(paidEvent, clean);
  } else {
    window.fbq?.("trackCustom", event, clean);
    window.ttq?.track(event, clean);
  }
}
