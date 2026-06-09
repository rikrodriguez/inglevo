"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Copy, RotateCcw, Sparkles, Trash2 } from "lucide-react";

import { AIEnglishSubnav } from "@/components/ai-english/ai-english-subnav";
import { EmptyState } from "@/components/shared/empty-state";
import { LoadingState } from "@/components/shared/loading-state";
import { Button } from "@/components/ui/button";
import { getRoleById } from "@/lib/ai-english/role-library";
import {
  createLocalAIEnglishStorage,
  type AIEnglishStorage,
} from "@/lib/ai-english/storage";
import type {
  AnswerBankItem,
  EnglishTrainingProfile,
} from "@/lib/ai-english/types";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export function AnswerBankList({ userId }: { userId: string }) {
  const storageRef = useRef<AIEnglishStorage | null>(null);
  const [profile, setProfile] = useState<EnglishTrainingProfile | null>(null);
  const [items, setItems] = useState<AnswerBankItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const nextStorage = createLocalAIEnglishStorage();
    storageRef.current = nextStorage;

    async function load() {
      const [savedProfile, savedItems] = await Promise.all([
        nextStorage.getTrainingProfile(userId),
        nextStorage.getAnswerBankItems(userId),
      ]);

      if (!active) return;

      setProfile(savedProfile);
      setItems(savedItems);
      setLoading(false);
    }

    void load();

    return () => {
      active = false;
    };
  }, [userId]);

  async function copyAnswer(item: AnswerBankItem) {
    try {
      await navigator.clipboard.writeText(item.improved_answer);
      setCopiedId(item.id);
      window.setTimeout(() => setCopiedId(null), 1600);
    } catch {
      setMessage("Copy is not available in this browser.");
    }
  }

  async function toggleReady(item: AnswerBankItem) {
    const storage = storageRef.current;
    if (!storage) return;

    const updated = await storage.markAnswerBankItemReady(
      userId,
      item.id,
      !item.is_ready
    );

    if (updated) {
      setItems((current) =>
        current.map((entry) => (entry.id === updated.id ? updated : entry))
      );
    }
  }

  async function deleteItem(item: AnswerBankItem) {
    const storage = storageRef.current;
    if (!storage) return;

    await storage.deleteAnswerBankItem(userId, item.id);
    setItems((current) => current.filter((entry) => entry.id !== item.id));
  }

  if (loading) {
    return <LoadingState label="Loading Answer Bank..." />;
  }

  if (!profile) {
    return (
      <div className="mx-auto grid max-w-5xl gap-6">
        <AIEnglishSubnav />
        <EmptyState
          title="Choose your target role to start your English readiness path."
          description="Saved English assets will appear here after your first practice."
        />
        <div>
          <Button asChild>
            <Link href="/app/ai-trainer/setup">Choose role</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-6">
      <AIEnglishSubnav />
      <section className="hero-panel">
        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-end">
          <div>
            <p className="section-kicker">Your Job-Ready English Assets</p>
            <h1 className="page-title mt-2">Answer Bank</h1>
            <p className="page-copy mt-3">
              Save your strongest answers so you can reuse them in interviews,
              LinkedIn, CVs and applications.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-4">
            <p className="text-sm text-muted-foreground">Saved assets</p>
            <p className="mt-1 font-mono text-3xl font-semibold">{items.length}</p>
          </div>
        </div>
      </section>

      {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}

      {items.length ? (
        <section className="grid gap-4">
          {items.map((item) => {
            const role = getRoleById(item.role_id);

            return (
              <article key={item.id} className="premium-panel">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span className="badge-ready">{item.score_band}</span>
                      {item.is_ready ? (
                        <span className="badge-progress">Ready asset</span>
                      ) : (
                        <span className="badge-pending">Practicing</span>
                      )}
                    </div>
                    <h2 className="mt-3 text-2xl font-semibold">{item.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {role.title} · {item.asset_type} · {item.score}/100 ·{" "}
                      {formatDate(item.created_at)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row lg:flex-wrap lg:justify-end">
                    <Button type="button" onClick={() => copyAnswer(item)} className="justify-between">
                      {copiedId === item.id ? "Copied" : "Copy improved answer"}
                      {copiedId === item.id ? <Check /> : <Copy />}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => toggleReady(item)}>
                      {item.is_ready ? "Mark practicing" : "Mark as ready"}
                      <Check />
                    </Button>
                    <Button type="button" variant="outline" asChild>
                      <Link href="/app/ai-trainer/practice">
                        Practice similar task
                        <RotateCcw />
                      </Link>
                    </Button>
                    <Button type="button" variant="destructive" onClick={() => deleteItem(item)}>
                      Delete
                      <Trash2 />
                    </Button>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
                  <div className="rounded-2xl border border-black/10 bg-[#d0f5e3] p-5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="size-4" />
                      <p className="text-sm font-semibold">Job-ready version</p>
                    </div>
                    <p className="mt-3 whitespace-pre-wrap text-base leading-7">
                      {item.improved_answer}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border bg-muted/30 p-4">
                    <p className="text-sm font-semibold">Original answer</p>
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                      {item.original_answer}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-muted px-3 py-1 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

              </article>
            );
          })}
        </section>
      ) : (
        <div className="grid justify-items-center gap-4">
          <EmptyState
            title="Save your strongest answers so you can reuse them in interviews, LinkedIn, CVs and applications."
            description="Complete a text practice session, then save the improved version to build your Answer Bank."
          />
          <Button asChild>
            <Link href="/app/ai-trainer/practice">
              Start a practice
              <ArrowRight />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
