"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { profileSettingsSchema } from "@/lib/validations";
import type { Profile } from "@/types";

export function SettingsForm({
  profile,
  isDemoMode,
}: {
  profile: Profile;
  isDemoMode: boolean;
}) {
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);

    const form = new FormData(event.currentTarget);
    const parsed = profileSettingsSchema.safeParse({
      fullName: form.get("fullName"),
      englishLevel: form.get("englishLevel"),
      role: form.get("role"),
      mainGoal: form.get("mainGoal"),
    });

    if (!parsed.success) {
      setMessage("Check the fields. All of them are required.");
      setSaving(false);
      return;
    }

    if (isDemoMode) {
      setMessage("Demo mode: connect Supabase to save real changes.");
      setSaving(false);
      return;
    }

    const supabase = createSupabaseBrowserClient();

    let user = null;
    try {
      const result = (await supabase?.auth.getUser()) ?? { data: { user: null } };
      user = result.data.user;
    } catch {
      setMessage("We could not validate your session. Try logging in again.");
      setSaving(false);
      return;
    }

    if (!supabase || !user) {
      setMessage("You need to log in to save changes.");
      setSaving(false);
      return;
    }

    let errorMessage: string | null = null;
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: parsed.data.fullName,
          english_level:
            parsed.data.englishLevel === "Not sure" ? null : parsed.data.englishLevel,
          role: parsed.data.role,
          main_goal: parsed.data.mainGoal,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      errorMessage = error?.message ?? null;
    } catch {
      errorMessage = "We could not save changes. Try again.";
    }

    setMessage(errorMessage ?? "Profile updated.");
    setSaving(false);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <label className="grid gap-2 text-sm font-medium">
        Name
        <input
          name="fullName"
          defaultValue={profile.full_name ?? ""}
          className="h-11 rounded-lg border border-border bg-white px-3 outline-none focus:ring-2 focus:ring-foreground/15"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        English level
        <select
          name="englishLevel"
          defaultValue={profile.english_level ?? "Not sure"}
          className="h-11 rounded-lg border border-border bg-white px-3 outline-none focus:ring-2 focus:ring-foreground/15"
        >
          {["A1", "A2", "B1", "B2", "C1", "Not sure"].map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Role
        <input
          name="role"
          defaultValue={profile.role ?? ""}
          className="h-11 rounded-lg border border-border bg-white px-3 outline-none focus:ring-2 focus:ring-foreground/15"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Main goal
        <input
          name="mainGoal"
          defaultValue={profile.main_goal ?? ""}
          className="h-11 rounded-lg border border-border bg-white px-3 outline-none focus:ring-2 focus:ring-foreground/15"
        />
      </label>
      {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
      <Button disabled={saving}>{saving ? "Saving..." : "Save changes"}</Button>
    </form>
  );
}
