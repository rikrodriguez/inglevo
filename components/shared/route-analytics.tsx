"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { trackEvent } from "@/lib/analytics";

export function RouteAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    trackEvent("page_view", { path: pathname });

    if (pathname === "/pricing") {
      trackEvent("pricing_viewed", { path: pathname });
    }

    if (pathname === "/app/remote-jobs") {
      trackEvent("remote_jobs_viewed", { path: pathname });
    }
  }, [pathname]);

  return null;
}
