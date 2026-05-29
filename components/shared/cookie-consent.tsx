"use client";

import { useState } from "react";

import { analyticsConsentKey } from "@/components/shared/analytics-provider";
import { Button } from "@/components/ui/button";

export function CookieConsent() {
  const [visible, setVisible] = useState(
    () =>
      typeof window !== "undefined" &&
      !window.localStorage.getItem(analyticsConsentKey)
  );

  function setConsent(value: "accepted" | "declined") {
    window.localStorage.setItem(analyticsConsentKey, value);
    window.dispatchEvent(new Event("inglevo:analytics-consent"));
    setVisible(false);
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
            Usamos analytics y pixels opcionales para entender uso del producto y
            measure campaigns. We do not load these scripts until you accept.
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
