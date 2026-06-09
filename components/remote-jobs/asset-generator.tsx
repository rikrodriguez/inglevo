"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Save, Send } from "lucide-react";

import { remoteJobAssetConfigs } from "@/data/remote-job-assets";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import type { Profile, RemoteJobAsset, RemoteJobAssetOutput, RemoteJobAssetType } from "@/types";

type ApiResponse = {
  source: "mock" | "openai" | "direct";
  saved: boolean;
  saveError?: string | null;
  message: string;
} & RemoteJobAssetOutput;

export function AssetGenerator({
  profile,
  assets,
  answerBank,
}: {
  profile: Profile;
  assets: RemoteJobAsset[];
  answerBank: Array<{
    id: string;
    scenario: string;
    improved_answer: string | null;
    overall_score: number | null;
  }>;
}) {
  const [assetType, setAssetType] = useState<RemoteJobAssetType>("recruiter_message");
  const [inputContext, setInputContext] = useState("");
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const config = useMemo(
    () => remoteJobAssetConfigs.find((item) => item.id === assetType) ?? remoteJobAssetConfigs[0],
    [assetType]
  );

  async function generateAsset() {
    const context = inputContext.trim();

    if (context.length < 10) {
      setError("Add a little more context to generate a useful asset.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setCopied(false);

    try {
      const response = await fetch("/api/remote-job-assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assetType,
          inputContext: context,
          userRole: profile.role ?? "Professional",
          userGoal: profile.main_goal ?? "Get a remote job",
        }),
      });
      const data = (await response.json()) as Partial<ApiResponse> & {
        error?: string;
      };

      if (!response.ok || !data.content || !data.title) {
        setError(data.error ?? "No pudimos generar el asset. Intenta otra vez.");
        return;
      }

      setResult(data as ApiResponse);
      trackEvent("asset_created", {
        asset_type: assetType,
        source: data.source,
        saved: data.saved,
      });
    } catch {
      setError("No pudimos conectar con el generador. Intenta otra vez.");
    } finally {
      setLoading(false);
    }
  }

  async function copyAsset() {
    if (!result) {
      return;
    }

    await navigator.clipboard.writeText(result.content);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      <section className="premium-panel p-5">
        <p className="section-kicker">Asset builder</p>
        <div className="mt-4 grid gap-3">
          {remoteJobAssetConfigs.map((item) => {
            const selected = item.id === assetType;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setAssetType(item.id);
                  setResult(null);
                  setError(null);
                  setCopied(false);
                  setInputContext("");
                }}
                className={`rounded-xl border p-4 text-left transition ${
                  selected
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-white hover:bg-muted hover:shadow-sm"
                }`}
              >
                <p className="font-medium">{item.title}</p>
                <p
                  className={`mt-1 text-sm ${
                    selected ? "text-background/70" : "text-muted-foreground"
                  }`}
                >
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6">
        <div className="premium-panel">
          <p className="section-kicker">Remote Jobs</p>
          <h2 className="mt-2 text-2xl font-semibold">{config.title}</h2>
          <p className="mt-3 text-muted-foreground">{config.prompt}</p>
          <textarea
            value={inputContext}
            onChange={(event) => setInputContext(event.target.value)}
            placeholder={config.placeholder}
            className="mt-5 min-h-40 w-full resize-y rounded-2xl border border-border bg-white p-4 text-sm leading-6 outline-none transition focus:border-foreground"
          />
          {error ? <p className="mt-3 text-sm text-black">{error}</p> : null}
          <Button
            type="button"
            onClick={generateAsset}
            disabled={loading || inputContext.trim().length < 10}
            className="mt-5"
          >
            {loading ? "Generating..." : config.cta}
            <Send />
          </Button>
        </div>

        {result ? (
          <section className="premium-panel">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-black">
                  Generated asset
                </p>
                <h2 className="mt-1 text-2xl font-semibold">{result.title}</h2>
              </div>
              <span className="rounded-full bg-[#d0f5e3] px-3 py-1 text-sm text-black">
                {result.source === "openai"
                  ? "AI generated"
                  : result.source === "direct"
                    ? "Saved exact version"
                    : "Practice generated"}
              </span>
            </div>
            <div className="mt-5 whitespace-pre-wrap rounded-2xl border border-border bg-muted/40 p-5 leading-7">
              {result.content}
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button type="button" variant="outline" onClick={copyAsset}>
                {copied ? "Copied" : "Copy"}
                {copied ? <Check /> : <Copy />}
              </Button>
              <div className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground">
                <Save className="size-4" />
                {result.message}
              </div>
            </div>
            <h3 className="mt-6 font-semibold">Why it works</h3>
            <p className="mt-2 text-muted-foreground">{result.rationale}</p>
            <h3 className="mt-6 font-semibold">Tips</h3>
            <ul className="mt-2 grid gap-2 text-sm text-muted-foreground">
              {result.tips.map((tip) => (
                <li key={tip}>• {tip}</li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="premium-panel">
            <h2 className="text-xl font-semibold">Saved assets</h2>
            {assets.length ? (
              <div className="mt-4 grid gap-3">
                {assets.slice(0, 6).map((asset) => (
                  <article key={asset.id} className="rounded-xl border border-border p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium">{asset.title}</p>
                        <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                          {asset.type.replaceAll("_", " ")}
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
                      {asset.content}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                No saved assets yet. Generate your first recruiter message or LinkedIn asset.
              </p>
            )}
          </div>

          <div className="premium-panel">
            <h2 className="text-xl font-semibold">Interview answer bank</h2>
            {answerBank.length ? (
              <div className="mt-4 grid gap-3">
                {answerBank.map((answer) => (
                  <article key={answer.id} className="rounded-xl border border-border p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium">{answer.scenario}</p>
                      <span className="text-sm text-muted-foreground">
                        {answer.overall_score ?? "-"} / 100
                      </span>
                    </div>
                    <p className="mt-3 line-clamp-4 text-sm text-muted-foreground">
                      {answer.improved_answer}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                Your strongest improved interview answers will appear here after practice.
              </p>
            )}
          </div>
        </section>
      </section>
    </div>
  );
}
