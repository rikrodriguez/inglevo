"use client";

import { useMemo, useState } from "react";
import { Camera, CheckCircle2, Headphones, Mic, Save, Wifi } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { RemoteSetupCheck } from "@/types";

type SetupState = {
  stableInternet: boolean;
  workingMicrophone: boolean;
  canJoinVideoCalls: boolean;
  quietPlace: boolean;
  headphonesAvailable: boolean;
  timezoneOverlap: boolean;
  timezone: string | null;
  microphoneStatus: string | null;
  cameraStatus: string | null;
};

const setupItems: Array<{
  key: keyof Pick<
    SetupState,
    | "stableInternet"
    | "workingMicrophone"
    | "canJoinVideoCalls"
    | "quietPlace"
    | "headphonesAvailable"
    | "timezoneOverlap"
  >;
  label: string;
  description: string;
}> = [
  {
    key: "stableInternet",
    label: "I have stable internet",
    description: "You can join video calls and work without frequent drops.",
  },
  {
    key: "workingMicrophone",
    label: "I have a working microphone",
    description: "You can speak clearly in interviews and team calls.",
  },
  {
    key: "canJoinVideoCalls",
    label: "I can join Zoom/Google Meet",
    description: "You know how to enter calls, mute, share and troubleshoot basics.",
  },
  {
    key: "quietPlace",
    label: "I have a quiet place for calls",
    description: "You can take interviews or meetings without major interruptions.",
  },
  {
    key: "headphonesAvailable",
    label: "I can use headphones",
    description: "You can reduce echo and sound more professional on calls.",
  },
  {
    key: "timezoneOverlap",
    label: "I can work across time zones",
    description: "You can communicate during overlapping hours with US/international teams.",
  },
];

function initialState(initialCheck?: RemoteSetupCheck | null): SetupState {
  return {
    stableInternet: initialCheck?.stable_internet ?? false,
    workingMicrophone: initialCheck?.working_microphone ?? false,
    canJoinVideoCalls: initialCheck?.can_join_video_calls ?? false,
    quietPlace: initialCheck?.quiet_place ?? false,
    headphonesAvailable: initialCheck?.headphones_available ?? false,
    timezoneOverlap: initialCheck?.timezone_overlap ?? false,
    timezone:
      initialCheck?.timezone ??
      Intl.DateTimeFormat().resolvedOptions().timeZone ??
      null,
    microphoneStatus: initialCheck?.microphone_status ?? null,
    cameraStatus: initialCheck?.camera_status ?? null,
  };
}

export function SetupCheck({
  initialCheck,
}: {
  initialCheck?: RemoteSetupCheck | null;
}) {
  const [state, setState] = useState<SetupState>(() => initialState(initialCheck));
  const [saving, setSaving] = useState(false);
  const [testingMic, setTestingMic] = useState(false);
  const [testingCamera, setTestingCamera] = useState(false);
  const [message, setMessage] = useState<string | null>(
    initialCheck ? "Saved setup check loaded from Supabase." : null
  );

  const score = useMemo(() => {
    const checked = setupItems.filter((item) => state[item.key]).length;
    return Math.round((checked / setupItems.length) * 100);
  }, [state]);

  function toggle(key: (typeof setupItems)[number]["key"]) {
    setState((current) => ({
      ...current,
      [key]: !current[key],
    }));
    setMessage(null);
  }

  async function testMicrophone() {
    setTestingMic(true);
    setMessage(null);

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        setState((current) => ({
          ...current,
          workingMicrophone: false,
          microphoneStatus: "Microphone test is not supported in this browser.",
        }));
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      setState((current) => ({
        ...current,
        workingMicrophone: true,
        microphoneStatus: "Microphone permission granted and input detected.",
      }));
    } catch {
      setState((current) => ({
        ...current,
        workingMicrophone: false,
        microphoneStatus: "Microphone permission was blocked or no microphone was found.",
      }));
    } finally {
      setTestingMic(false);
    }
  }

  async function testCamera() {
    setTestingCamera(true);
    setMessage(null);

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        setState((current) => ({
          ...current,
          cameraStatus: "Camera test is not supported in this browser.",
        }));
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      setState((current) => ({
        ...current,
        canJoinVideoCalls: true,
        cameraStatus: "Camera permission granted.",
      }));
    } catch {
      setState((current) => ({
        ...current,
        cameraStatus: "Camera permission was blocked or no camera was found.",
      }));
    } finally {
      setTestingCamera(false);
    }
  }

  async function saveSetupCheck() {
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch("/api/setup-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      const data = (await response.json()) as {
        saved?: boolean;
        score?: number;
        message?: string;
        error?: string;
      };

      setMessage(
        data.message ??
          data.error ??
          "Setup check calculated, but we could not confirm if it was saved."
      );

      if (!response.ok) {
        return;
      }
    } catch {
      setMessage("Could not save setup check. Try again in a few seconds.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="premium-panel">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Setup Check</p>
          <h2 className="mt-1 text-xl font-semibold">Remote work basics</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            This validates basic signals companies expect from remote talent:
            clear audio, reliable calls, overlap availability and a professional
            environment.
          </p>
        </div>
        <div className="rounded-xl bg-muted px-4 py-3 text-sm">
          <span className="font-semibold">{score}/100</span> setup readiness
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {setupItems.map((item) => {
          const isChecked = state[item.key];

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => toggle(item.key)}
              className={`flex items-start gap-3 rounded-xl border p-4 text-left text-sm transition ${
                isChecked
                  ? "border-[#d0f5e3] bg-[#d0f5e3] text-black"
                  : "border-border bg-white hover:bg-muted"
              }`}
            >
              <CheckCircle2
                className={`mt-0.5 size-5 shrink-0 ${
                  isChecked ? "text-black" : "text-muted-foreground"
                }`}
              />
              <span>
                <span className="block font-medium">{item.label}</span>
                <span className="mt-1 block text-muted-foreground">
                  {item.description}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-muted/40 p-4">
          <div className="flex items-center gap-2 font-medium">
            <Wifi className="size-4" />
            Time zone
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {state.timezone ?? "Timezone not detected"}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-muted/40 p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-medium">
              <Mic className="size-4" />
              Microphone
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={testMicrophone}
              disabled={testingMic}
            >
              {testingMic ? "Testing..." : "Test"}
            </Button>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {state.microphoneStatus ?? "Manual check plus optional browser test."}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-muted/40 p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-medium">
              <Camera className="size-4" />
              Camera
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={testCamera}
              disabled={testingCamera}
            >
              {testingCamera ? "Testing..." : "Optional test"}
            </Button>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {state.cameraStatus ?? "Optional, but useful for interviews."}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {message ??
            "Save this check to include Setup Readiness in your Remote Readiness Score."}
        </p>
        <Button type="button" onClick={saveSetupCheck} disabled={saving}>
          {saving ? "Saving..." : "Save setup check"}
          <Save />
        </Button>
      </div>
      <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
        <Headphones className="size-3.5" />
        We store the checklist result and browser test status, not audio or video.
      </p>
    </section>
  );
}
