"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

export function PricingCheckoutButton() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function startCheckout() {
    setLoading(true);
    setMessage(null);
    trackEvent("upgrade_clicked", { plan: "pro", source: "pricing" });
    trackEvent("checkout_clicked", { plan: "pro", source: "pricing" });

    try {
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
      });
      const data = (await response.json()) as {
        checkoutUrl: string | null;
        message?: string;
      };

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }

      setMessage(data.message ?? "Checkout is not configured yet.");
    } catch {
      setMessage("Checkout is not configured yet.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-3">
      <Button onClick={startCheckout} disabled={loading} className="h-11">
        {loading ? "Preparando..." : "Probar Pro"}
      </Button>
      {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
    </div>
  );
}
