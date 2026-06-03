"use client";

import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import { analyticsConsentKey, clearAnalyticsIdentity } from "@/lib/analytics";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("inglevo:analytics-consent", onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("inglevo:analytics-consent", onStoreChange);
  };
}

function getConsentSnapshot() {
  return window.localStorage.getItem(analyticsConsentKey) ?? "pending";
}

function getServerSnapshot() {
  return "hidden";
}

export function CookieConsent() {
  const consent = useSyncExternalStore(
    subscribe,
    getConsentSnapshot,
    getServerSnapshot
  );
  const visible = consent === "pending";

  function setConsent(value: "accepted" | "declined") {
    window.localStorage.setItem(analyticsConsentKey, value);

    if (value === "declined") {
      clearAnalyticsIdentity();
    }

    window.dispatchEvent(new Event("inglevo:analytics-consent"));
  }

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-2xl border border-border bg-white p-4 shadow-2xl">
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="font-semibold">Help us improve Inglevo</p>
          <p className="mt-1 text-sm text-muted-foreground">
            We use optional analytics and pixels to understand product usage and
            campaign performance. We do not load them until you accept.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" onClick={() => setConsent("declined")}>
            Rechazar
          </Button>
          <Button type="button" onClick={() => setConsent("accepted")}>
            Aceptar
          </Button>
        </div>
      </div>
    </div>
  );
}
