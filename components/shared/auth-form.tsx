"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { loginSchema, signupSchema } from "@/lib/validations";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function getAuthErrorMessage(message: string) {
    const normalized = message.toLowerCase();

    if (normalized.includes("email not confirmed")) {
      return "Your email is not confirmed yet. Check your inbox or disable email confirmation in Supabase while testing locally.";
    }

    if (normalized.includes("failed to fetch") || normalized.includes("fetch failed")) {
      return "We could not connect to Supabase. Check the URL and anon key in .env.local, then restart the server.";
    }

    if (normalized.includes("invalid api key")) {
      return "Supabase rejected the anon key. Check NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.";
    }

    if (normalized.includes("signup") && normalized.includes("disabled")) {
      return "Signups are disabled in Supabase Auth. Enable signups to test this flow.";
    }

    if (normalized.includes("rate limit")) {
      return "Supabase hit the temporary email confirmation rate limit. Wait a few minutes or disable Email Confirmations for local QA.";
    }

    return `Supabase responded: ${message}`;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");
    const fullName = String(form.get("fullName") ?? "");
    const parsed =
      mode === "signup"
        ? signupSchema.safeParse({ email, password, fullName })
        : loginSchema.safeParse({ email, password });

    if (!parsed.success) {
      setError(
        mode === "signup"
          ? "Add your name, use a valid email and a password with at least 6 characters."
          : "Check your email and password. Both are required to continue."
      );
      setLoading(false);
      return;
    }

    if (mode === "signup") {
      trackEvent("signup_started", { source: "auth_form" });
    } else {
      trackEvent("login_started", { source: "auth_form" });
    }

    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      if (mode === "signup") {
        trackEvent("signup_completed", { mode: "demo" });
      }
      router.push(mode === "signup" ? "/app/onboarding" : "/app");
      return;
    }

    const result =
      mode === "signup"
        ? await supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: fullName } },
          })
        : await supabase.auth.signInWithPassword({ email, password });

    if (result.error) {
      setError(getAuthErrorMessage(result.error.message));
      setLoading(false);
      return;
    }

    if (mode === "signup" && !result.data.session) {
      trackEvent("signup_completed", { requires_email_confirmation: true });
      setError(
        "Account created. Supabase requires email confirmation before login. Check your inbox or disable Email Confirmations for local QA."
      );
      setLoading(false);
      return;
    }

    if (mode === "signup") {
      trackEvent("signup_completed", { requires_email_confirmation: false });
      await fetch("/api/product-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventName: "signup_completed",
          metadata: {
            source: "auth_form",
          },
        }),
      }).catch(() => null);
    }

    router.push(mode === "signup" ? "/app/onboarding" : "/app");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      {mode === "signup" ? (
        <label className="grid gap-2 text-sm font-medium">
          Name
          <input
            name="fullName"
            required
            className="h-11 rounded-lg border border-border bg-white px-3 outline-none focus:ring-2 focus:ring-foreground/15"
            placeholder="Your name"
          />
        </label>
      ) : null}
      <label className="grid gap-2 text-sm font-medium">
        Email
        <input
          name="email"
          required
          type="email"
          className="h-11 rounded-lg border border-border bg-white px-3 outline-none focus:ring-2 focus:ring-foreground/15"
          placeholder="you@email.com"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Password
        <input
          name="password"
          required
          type="password"
          minLength={6}
          className="h-11 rounded-lg border border-border bg-white px-3 outline-none focus:ring-2 focus:ring-foreground/15"
          placeholder="At least 6 characters"
        />
      </label>
      {error ? <p className="text-sm text-black">{error}</p> : null}
      <Button disabled={loading} className="h-11">
        {loading
          ? "Preparing..."
          : mode === "signup"
            ? "Start practicing"
            : "Log in and practice"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        {mode === "signup" ? "Already have an account?" : "New to Inglevo?"}{" "}
        <Link
          href={mode === "signup" ? "/login" : "/signup"}
          className="font-medium text-foreground"
        >
          {mode === "signup" ? "Log in" : "Create a free account"}
        </Link>
      </p>
    </form>
  );
}
