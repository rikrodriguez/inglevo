"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

import { analyticsConsentKey, trackEvent } from "@/lib/analytics";

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
  return "pending";
}

function getPageType(pathname: string) {
  if (pathname === "/") {
    return "home";
  }

  if (pathname === "/blog") {
    return "blog_index";
  }

  if (pathname.startsWith("/blog/")) {
    return "blog_post";
  }

  if (pathname.startsWith("/app")) {
    return "app";
  }

  return "marketing";
}

export function RouteAnalytics() {
  const pathname = usePathname();
  const consent = useSyncExternalStore(
    subscribe,
    getConsentSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    if (consent !== "accepted") {
      return;
    }

    const pageType = getPageType(pathname);
    const search = window.location.search;

    trackEvent("page_view", {
      path: pathname,
      page_type: pageType,
      has_query: Boolean(search),
    });

    if (pageType === "blog_index") {
      trackEvent("blog_viewed", { path: pathname });
    }

    if (pageType === "blog_post") {
      trackEvent("blog_post_viewed", {
        path: pathname,
        slug: pathname.split("/").filter(Boolean).at(-1),
      });
    }

    if (pathname === "/pricing") {
      trackEvent("pricing_viewed", { path: pathname });
    }

    if (pathname === "/app/remote-jobs") {
      trackEvent("remote_jobs_viewed", { path: pathname });
    }
  }, [consent, pathname]);

  return null;
}
