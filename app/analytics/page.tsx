import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Check,
  Eye,
  LineChart,
  MousePointerClick,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

import { PublicFooter } from "@/components/shared/public-footer";
import { PublicNav } from "@/components/shared/public-nav";
import { Button } from "@/components/ui/button";

const scoreRows = [
  ["Role English", 84],
  ["Remote setup", 92],
  ["Role tools", 78],
  ["Professional profile", 86],
] as const;

const activityMetrics = [
  ["Applications", "34", TrendingUp],
  ["Profile views", "128", Eye],
  ["Template copies", "19", MousePointerClick],
  ["Verification", "Active", BadgeCheck],
] as const;

const weeklyActivity = [42, 58, 48, 74, 64, 86, 78, 92];

const nextActions = [
  "Practice your customer support conflict answer",
  "Improve role tools verification for Zendesk",
  "Follow up with 3 saved applications",
  "Add verified profile link to your CV",
] as const;

function AnalyticsDashboardMockup() {
  return (
    <div className="rounded-[2rem] border border-black/5 bg-white p-4 shadow-[0_24px_90px_rgba(7,9,12,0.1)] sm:p-6">
      <div className="flex flex-col gap-4 border-b border-black/5 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="section-kicker">Analytics dashboard</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.045em]">
            Profile and application insights
          </h2>
        </div>
        <span className="rounded-full bg-[#d0f5e3] px-3 py-2 text-xs font-black text-emerald-900">
          Active profile
        </span>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {activityMetrics.map(([label, value, Icon]) => (
          <div key={label} className="rounded-[1.3rem] border border-black/5 bg-[#f8f8f7] p-4">
            <Icon className="size-5 text-neutral-500" />
            <p className="mt-4 text-sm font-semibold text-neutral-500">{label}</p>
            <p className="mt-2 text-3xl font-extrabold tracking-[-0.055em]">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.4rem] border border-black/5 bg-white p-5 shadow-sm">
          <p className="font-extrabold">Verification score</p>
          <div className="mt-5 flex items-end justify-between">
            <div>
              <p className="text-6xl font-extrabold tracking-[-0.07em]">82</p>
              <p className="text-sm font-semibold text-neutral-500">overall signal strength</p>
            </div>
            <span className="rounded-full bg-[#f3efff] px-3 py-2 text-xs font-black text-[#6f45dd]">
              Remote-ready signal
            </span>
          </div>
          <div className="mt-6 grid gap-4">
            {scoreRows.map(([label, value]) => (
              <div key={label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold">{label}</span>
                  <span className="font-extrabold">{value}/100</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-[#f4f2ef]">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#7459f6,#5fb7f7,#de61bf)]"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.4rem] border border-black/5 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="font-extrabold">Weekly activity</p>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-neutral-400">
              Last 8 weeks
            </p>
          </div>
          <div className="mt-5 flex h-48 items-end gap-3">
            {weeklyActivity.map((height, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <span
                  className="w-full rounded-t-2xl bg-[linear-gradient(180deg,#7459f6,#5fb7f7,#de61bf)]"
                  style={{ height: `${height}%` }}
                />
                <span className="text-[10px] font-bold text-neutral-400">W{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NextActionPanel() {
  return (
    <div className="rounded-[2rem] border border-black/5 bg-white p-5 shadow-[0_22px_80px_rgba(30,27,75,0.06)]">
      <p className="section-kicker">Next best action</p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.045em]">
        Know what to improve next.
      </h2>
      <div className="mt-6 grid gap-3">
        {nextActions.map((action, index) => (
          <div
            key={action}
            className={`flex gap-3 rounded-2xl p-4 ${
              index === 0
                ? "bg-[linear-gradient(135deg,#f3efff,#ffffff)]"
                : "bg-[#f8f8f7]"
            }`}
          >
            <div className="grid size-9 shrink-0 place-items-center rounded-full bg-white">
              <Check className="size-4 text-[#6f45dd]" />
            </div>
            <p className="text-sm font-bold leading-6">{action}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-[1.5rem] bg-black p-5 text-white">
        <p className="text-sm font-semibold text-white/60">Profile momentum</p>
        <p className="mt-2 text-3xl font-extrabold tracking-[-0.055em]">
          +18% activity this month
        </p>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <>
      <PublicNav />
      <main className="overflow-hidden bg-white text-black">
        <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="brand-chip mb-6">Analytics</div>
            <h1 className="max-w-4xl text-6xl font-extrabold leading-[0.95] tracking-[-0.045em] sm:text-7xl lg:text-[5.4rem]">
              Track the signals that make your profile stronger.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-neutral-600 sm:text-2xl sm:leading-9">
              See your verification score, profile views, application activity
              and next steps in one dashboard.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="brand-button click-gradient-button h-12 rounded-full px-7">
                <Link href="/signup">
                  Track my progress
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full bg-white px-7">
                <Link href="/verification-profile">See verified profile</Link>
              </Button>
            </div>
          </div>

          <NextActionPanel />
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <AnalyticsDashboardMockup />
          </div>
        </section>

        <section className="bg-[#f4f2ef] px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="section-kicker">Why it matters</p>
              <h2 className="mt-4 text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                Serious candidates need visibility, not scattered guesses.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
                Analytics should make the next action obvious: practice English,
                complete setup, improve tools, follow up or apply stronger.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Profile views", "See if your verification link is getting attention.", Eye],
                ["Application activity", "Track how consistently you are applying.", BarChart3],
                ["Signal progress", "Understand which verification area needs work.", Target],
                ["Momentum", "Stay consistent with weekly improvements.", LineChart],
              ].map(([title, copy, Icon]) => (
                <article key={title as string} className="rounded-[1.5rem] border border-black/5 bg-white p-5 shadow-sm">
                  <Icon className="size-5 text-[#6f45dd]" />
                  <h3 className="mt-5 text-xl font-extrabold tracking-[-0.035em]">{title as string}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{copy as string}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6">
          <div className="click-feature-card mx-auto max-w-6xl rounded-[2.4rem] p-8 text-white shadow-[0_24px_90px_rgba(90,70,255,0.18)] sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="section-kicker text-white/70">Make progress visible</p>
                <h2 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl">
                  Improve what hiring teams can actually see.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
                  Track the work behind your verified profile and keep momentum.
                </p>
              </div>
              <Button asChild variant="secondary" className="h-12 rounded-full px-7">
                <Link href="/signup">
                  Start for free
                  <Sparkles />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
