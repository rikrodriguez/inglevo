"use client";

export const analyticsConsentKey = "inglevo_analytics_consent";

const analyticsAnonymousIdKey = "inglevo_analytics_anonymous_id";
const analyticsSessionKey = "inglevo_analytics_session";
const analyticsSessionStartedAtKey = "inglevo_analytics_session_started_at";
const sessionTtlMs = 30 * 60 * 1000;
const sensitivePropertyPattern =
  /(email|mail|name|phone|password|token|secret|answer|transcript|message|prompt|cv|resume|salary|address)/i;

export type AnalyticsEvent =
  | "page_view"
  | "page_engaged"
  | "cta_clicked"
  | "outbound_link_clicked"
  | "form_submitted"
  | "blog_viewed"
  | "blog_post_viewed"
  | "signup_started"
  | "signup_completed"
  | "login_started"
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
  | "contact_started"
  | "book_call_clicked"
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
  cta_clicked: "Lead",
  signup_completed: "Lead",
  onboarding_completed: "CompleteRegistration",
  checkout_clicked: "InitiateCheckout",
  subscription_created: "Purchase",
};

function cleanProperties(properties?: AnalyticsProperties) {
  if (!properties) {
    return undefined;
  }

  const clean: AnalyticsProperties = {};

  Object.entries(properties)
    .slice(0, 24)
    .forEach(([key, value]) => {
      if (value === undefined || sensitivePropertyPattern.test(key)) {
        return;
      }

      if (typeof value === "string") {
        if (value.includes("@")) {
          return;
        }

        clean[key] = value.slice(0, 180);
        return;
      }

      clean[key] = value;
    });

  return Object.keys(clean).length ? clean : undefined;
}

function hasAnalyticsConsent() {
  try {
    return window.localStorage.getItem(analyticsConsentKey) === "accepted";
  } catch {
    return false;
  }
}

export function clearAnalyticsIdentity() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(analyticsAnonymousIdKey);
    window.sessionStorage.removeItem(analyticsSessionKey);
    window.sessionStorage.removeItem(analyticsSessionStartedAtKey);
  } catch {
    // Consent cleanup should not block the visible preference change.
  }
}

function createClientId(prefix: string) {
  const random =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  return `${prefix}_${random.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 48)}`;
}

function getStoredId(key: string, prefix: string) {
  try {
    const existing = window.localStorage.getItem(key);

    if (existing) {
      return existing;
    }

    const next = createClientId(prefix);
    window.localStorage.setItem(key, next);
    return next;
  } catch {
    return null;
  }
}

function getSessionId() {
  try {
    const existing = window.sessionStorage.getItem(analyticsSessionKey);
    const startedAt = Number(
      window.sessionStorage.getItem(analyticsSessionStartedAtKey) ?? 0
    );

    if (existing && startedAt && Date.now() - startedAt < sessionTtlMs) {
      return existing;
    }

    const next = createClientId("ses");
    window.sessionStorage.setItem(analyticsSessionKey, next);
    window.sessionStorage.setItem(analyticsSessionStartedAtKey, String(Date.now()));
    return next;
  } catch {
    return null;
  }
}

function getClientContext() {
  const searchParams = new URLSearchParams(window.location.search);
  const context: AnalyticsProperties = {
    path: window.location.pathname,
    referrer_host: document.referrer ? new URL(document.referrer).hostname : null,
    viewport_width: window.innerWidth,
    device:
      window.innerWidth < 640
        ? "mobile"
        : window.innerWidth < 1024
          ? "tablet"
          : "desktop",
  };

  ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach(
    (key) => {
      const value = searchParams.get(key);

      if (value) {
        context[key] = value;
      }
    }
  );

  return context;
}

function sendFirstPartyEvent(event: AnalyticsEvent, properties?: AnalyticsProperties) {
  if (!hasAnalyticsConsent()) {
    return;
  }

  const anonymousId = getStoredId(analyticsAnonymousIdKey, "anon");
  const sessionId = getSessionId();
  const body = JSON.stringify({
    eventName: event,
    properties: cleanProperties({
      ...getClientContext(),
      ...properties,
    }),
    anonymousId,
    sessionId,
    consent: true,
    timestamp: new Date().toISOString(),
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon(
      "/api/analytics-events",
      new Blob([body], { type: "application/json" })
    );
    return;
  }

  fetch("/api/analytics-events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => null);
}

export function trackEvent(event: AnalyticsEvent, properties?: AnalyticsProperties) {
  if (typeof window === "undefined") {
    return;
  }

  const clean = cleanProperties(properties);

  sendFirstPartyEvent(event, clean);

  if (!hasAnalyticsConsent()) {
    return;
  }

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
