"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { trackEvent } from "@/lib/analytics";

function cleanLabel(value: string | null | undefined) {
  return value?.replace(/\s+/g, " ").trim().slice(0, 90) || null;
}

function getElementLabel(element: HTMLElement) {
  return cleanLabel(
    element.getAttribute("data-analytics-label") ??
      element.getAttribute("aria-label") ??
      element.textContent
  );
}

function getSurface(element: HTMLElement) {
  const surface = element.closest("header, footer, nav, aside, main, section");

  if (!surface) {
    return "unknown";
  }

  return surface.tagName.toLowerCase();
}

function getHref(element: HTMLElement) {
  if (element instanceof HTMLAnchorElement) {
    return element.href;
  }

  return element.getAttribute("data-href");
}

function normalizeHref(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  try {
    const url = new URL(value, window.location.origin);

    if (url.origin === window.location.origin) {
      return `${url.pathname}${url.search}`;
    }

    return url.hostname;
  } catch {
    return value.slice(0, 120);
  }
}

function isOutboundHref(value: string | null | undefined) {
  if (!value) {
    return false;
  }

  try {
    return new URL(value, window.location.origin).origin !== window.location.origin;
  } catch {
    return false;
  }
}

export function AnalyticsCapture() {
  const pathname = usePathname();
  const startedAtRef = useRef(0);
  const maxScrollRef = useRef(0);
  const flushedRef = useRef(false);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target : null;
      const element = target?.closest("a, button, [role='button']");

      if (!(element instanceof HTMLElement)) {
        return;
      }

      const href = getHref(element);
      const label = getElementLabel(element);
      const normalizedHref = normalizeHref(href);
      const isOutbound = isOutboundHref(href);

      trackEvent(isOutbound ? "outbound_link_clicked" : "cta_clicked", {
        label,
        href: normalizedHref,
        path: window.location.pathname,
        surface: getSurface(element),
      });

      if (normalizedHref === "/book-a-call" || label?.toLowerCase().includes("book a call")) {
        trackEvent("book_call_clicked", {
          label,
          href: normalizedHref,
          path: window.location.pathname,
        });
      }

      if (normalizedHref === "/contact" || label?.toLowerCase().includes("contact")) {
        trackEvent("contact_started", {
          label,
          href: normalizedHref,
          path: window.location.pathname,
        });
      }
    }

    function onSubmit(event: SubmitEvent) {
      const form = event.target instanceof HTMLFormElement ? event.target : null;

      if (!form) {
        return;
      }

      trackEvent("form_submitted", {
        form_id: form.id || null,
        form_name: form.getAttribute("name"),
        action: normalizeHref(form.getAttribute("action")),
        path: window.location.pathname,
      });
    }

    document.addEventListener("click", onClick, true);
    document.addEventListener("submit", onSubmit, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("submit", onSubmit, true);
    };
  }, []);

  useEffect(() => {
    startedAtRef.current = Date.now();
    maxScrollRef.current = 0;
    flushedRef.current = false;

    function updateScrollDepth() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollable <= 0) {
        maxScrollRef.current = Math.max(maxScrollRef.current, 100);
        return;
      }

      const depth = Math.round((window.scrollY / scrollable) * 100);
      maxScrollRef.current = Math.max(maxScrollRef.current, Math.min(depth, 100));
    }

    function flushEngagement(reason: string) {
      if (flushedRef.current) {
        return;
      }

      const seconds = Math.round((Date.now() - startedAtRef.current) / 1000);

      if (seconds < 5 && maxScrollRef.current < 25) {
        return;
      }

      flushedRef.current = true;
      trackEvent("page_engaged", {
        path: window.location.pathname,
        engagement_seconds: seconds,
        scroll_depth: maxScrollRef.current,
        reason,
      });
    }

    function onVisibilityChange() {
      if (document.visibilityState === "hidden") {
        flushEngagement("hidden");
      }
    }

    function onPageHide() {
      flushEngagement("pagehide");
    }

    window.addEventListener("scroll", updateScrollDepth, { passive: true });
    window.addEventListener("pagehide", onPageHide);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      flushEngagement("route_change");
      window.removeEventListener("scroll", updateScrollDepth);
      window.removeEventListener("pagehide", onPageHide);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [pathname]);

  return null;
}
