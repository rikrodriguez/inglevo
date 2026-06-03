import Link from "next/link";
import { ShieldAlert } from "lucide-react";

import { MetricCard } from "@/components/shared/metric-card";
import { Button } from "@/components/ui/button";
import { getAdminDashboardData } from "@/lib/admin";
import type { CoachFeedback } from "@/types";

function formatDate(value: string | null) {
  if (!value) {
    return "No activity";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function getFeedbackSummary(feedback: unknown) {
  if (
    feedback &&
    typeof feedback === "object" &&
    typeof (feedback as CoachFeedback).quickDiagnosis === "string"
  ) {
    return (feedback as CoachFeedback).quickDiagnosis;
  }

  return "No feedback summary available.";
}

export default async function AdminPage() {
  const { admin, data } = await getAdminDashboardData();

  if (!admin.isConfigured) {
    return (
      <AdminBlocked
        title="Admin is not configured"
        message="Set ADMIN_EMAILS in .env.local with the emails allowed to view internal data."
        currentEmail={admin.user?.email ?? null}
      />
    );
  }

  if (!admin.isAdmin || !data) {
    return (
      <AdminBlocked
        title="Restricted internal view"
        message="Your current account is not listed in ADMIN_EMAILS."
        currentEmail={admin.user?.email ?? null}
      />
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-6">
      <div>
        <p className="text-sm font-medium text-muted-foreground">Internal</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Admin visibility
        </h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Internal snapshot for users, sessions, average scores, generated
          feedback, job assets and OpenAI fallback/error visibility.
        </p>
      </div>

      {data.missingTables.internalEvents ? (
        <div className="rounded-2xl border border-[#dfdbd6] bg-[#dfdbd6] p-4 text-sm text-black">
          Apply `supabase/migrations/008_internal_events.sql` to store OpenAI
          errors and internal events.
        </div>
      ) : null}

      <section className="grid gap-4 md:grid-cols-4">
        <MetricCard
          label="Auth users"
          value={data.totals.authUsers}
          detail="Supabase Auth users"
        />
        <MetricCard
          label="Profiles"
          value={data.totals.profiles}
          detail="Onboarded or partially created profiles"
        />
        <MetricCard
          label="Practice sessions"
          value={data.totals.sessions}
          detail={`Average score: ${data.totals.averageScore ?? "Pending"}`}
        />
        <MetricCard
          label="Job assets"
          value={data.totals.assets}
          detail="Generated application materials"
        />
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <MetricCard
          label="Readiness assessments"
          value={data.totals.readinessAssessments}
          detail="Interview, writing and setup signals"
        />
        <MetricCard
          label="Writing assessments"
          value={data.totals.writingAssessments}
          detail="Async writing submissions"
        />
        <MetricCard
          label="Internal events"
          value={data.totals.internalEvents}
          detail="OpenAI errors and system warnings"
        />
      </section>

      <section id="marketing-analytics" className="grid gap-5">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Funnel</p>
            <h2 className="mt-1 text-xl font-semibold">Marketing analytics</h2>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
              First-party events from accepted analytics consent: page views,
              sessions, CTA clicks, conversion intent and traffic sources.
            </p>
          </div>
          <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
            Latest {data.analytics.eventCount} events
          </span>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-5">
          <MetricCard
            label="Page views"
            value={data.analytics.pageViews}
            detail="Accepted-consent visits"
          />
          <MetricCard
            label="Visitors"
            value={data.analytics.visitors}
            detail="Anonymous IDs"
          />
          <MetricCard
            label="Sessions"
            value={data.analytics.sessions}
            detail="30 min windows"
          />
          <MetricCard
            label="CTA clicks"
            value={data.analytics.ctaClicks}
            detail="Links, buttons, checkout"
          />
          <MetricCard
            label="Conversions"
            value={data.analytics.conversionEvents}
            detail="Signup, checkout, calls"
          />
        </div>

        <div className="mt-6 grid gap-5 xl:grid-cols-3">
          <AnalyticsList title="Top pages" items={data.analytics.topPages} />
          <AnalyticsList title="Top CTAs" items={data.analytics.topCtas} />
          <AnalyticsList title="Sources" items={data.analytics.topSources} />
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border bg-white p-6 shadow-sm">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="text-muted-foreground">
              <tr className="border-b border-border">
                <th className="py-3 pr-4 font-medium">Event</th>
                <th className="py-3 pr-4 font-medium">Path</th>
                <th className="py-3 pr-4 font-medium">Label</th>
                <th className="py-3 pr-4 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {data.analytics.recentEvents.length ? (
                data.analytics.recentEvents.map((event) => (
                  <tr key={event.id} className="border-b border-border/70">
                    <td className="py-3 pr-4 font-medium">{event.eventName}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{event.path}</td>
                    <td className="py-3 pr-4 text-muted-foreground">
                      {event.label || "-"}
                    </td>
                    <td className="py-3 pr-4 text-muted-foreground">
                      {formatDate(event.createdAt)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-5 pr-4 text-muted-foreground" colSpan={4}>
                    No analytics events yet. Accept cookies in production and
                    browse the site to start filling this panel.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Users</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="text-muted-foreground">
              <tr className="border-b border-border">
                <th className="py-3 pr-4 font-medium">User</th>
                <th className="py-3 pr-4 font-medium">Role</th>
                <th className="py-3 pr-4 font-medium">Goal</th>
                <th className="py-3 pr-4 font-medium">Practices</th>
                <th className="py-3 pr-4 font-medium">Avg score</th>
                <th className="py-3 pr-4 font-medium">Latest practice</th>
              </tr>
            </thead>
            <tbody>
              {data.usersOverview.map((item) => (
                <tr key={item.profile.id} className="border-b border-border/70">
                  <td className="py-3 pr-4">
                    <p className="font-medium">
                      {item.profile.full_name ?? "Unnamed user"}
                    </p>
                    <p className="text-muted-foreground">{item.profile.email}</p>
                  </td>
                  <td className="py-3 pr-4">{item.profile.role ?? "-"}</td>
                  <td className="py-3 pr-4">{item.profile.main_goal ?? "-"}</td>
                  <td className="py-3 pr-4">{item.sessionCount}</td>
                  <td className="py-3 pr-4">{item.averageScore ?? "-"}</td>
                  <td className="py-3 pr-4">
                    {formatDate(item.latestPracticeAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Latest practice sessions</h2>
          <div className="mt-4 grid gap-3">
            {data.sessions.slice(0, 8).map((session) => (
              <article key={session.id} className="rounded-xl border border-border p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{session.scenario}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatDate(session.created_at)}
                    </p>
                  </div>
                  <span className="rounded-full bg-muted px-3 py-1 text-sm">
                    {session.overall_score ?? "-"} / 100
                  </span>
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                  {getFeedbackSummary(session.feedback_json)}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">OpenAI / internal events</h2>
          <div className="mt-4 grid gap-3">
            {data.internalEvents.length ? (
              data.internalEvents.map((event) => (
                <article key={event.id} className="rounded-xl border border-border p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{event.event_type}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {event.route ?? "No route"} · {formatDate(event.created_at)}
                      </p>
                    </div>
                    <span className="rounded-full bg-muted px-3 py-1 text-xs">
                      {event.severity}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{event.message}</p>
                </article>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No internal events yet. OpenAI failures will appear here after
                applying migration 008.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function AnalyticsList({
  title,
  items,
}: {
  title: string;
  items: Array<{ label: string; value: number; detail?: string }>;
}) {
  return (
    <div className="rounded-2xl border border-border p-4">
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-4 grid gap-3">
        {items.length ? (
          items.map((item) => (
            <div key={`${item.label}-${item.detail}`} className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{item.label}</p>
                {item.detail ? (
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {item.detail}
                  </p>
                ) : null}
              </div>
              <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                {item.value}
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No data yet.</p>
        )}
      </div>
    </div>
  );
}

function AdminBlocked({
  title,
  message,
  currentEmail,
}: {
  title: string;
  message: string;
  currentEmail: string | null;
}) {
  return (
    <div className="mx-auto grid max-w-2xl gap-4 rounded-2xl border border-border bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <ShieldAlert className="size-6 text-black" />
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>
      <p className="text-muted-foreground">{message}</p>
      <div className="rounded-xl border border-border bg-muted/40 p-4 text-sm">
        <p className="font-medium">Email detectado por la app</p>
        <p className="mt-1 text-muted-foreground">
          {currentEmail ?? "No hay usuario logueado."}
        </p>
      </div>
      <Button asChild variant="outline" className="w-fit">
        <Link href="/app">Back to dashboard</Link>
      </Button>
    </div>
  );
}
