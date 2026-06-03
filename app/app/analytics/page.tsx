import Link from "next/link";
import { AlertTriangle, Database, ShieldAlert } from "lucide-react";

import { MetricCard } from "@/components/shared/metric-card";
import { Button } from "@/components/ui/button";
import {
  getMarketingAnalyticsData,
  type AnalyticsSummary,
} from "@/lib/admin";

type AnalyticsStatus = Awaited<ReturnType<typeof getMarketingAnalyticsData>>["status"];

function formatDate(value: string | null) {
  if (!value) {
    return "No activity";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function getStatusCopy(status: AnalyticsStatus, currentEmail: string | null) {
  if (status === "ready") {
    return null;
  }

  if (status === "supabase_not_configured") {
    return {
      icon: Database,
      title: "Supabase is not connected",
      message:
        "Production is in demo mode, so visits are being accepted by the endpoint but cannot be stored yet.",
      detail:
        "Add the Supabase URL, anon key, service role key and ADMIN_EMAILS in Vercel to store real analytics.",
    };
  }

  if (status === "admin_not_configured") {
    return {
      icon: ShieldAlert,
      title: "Admin access is not configured",
      message:
        "Set ADMIN_EMAILS in Vercel so the analytics panel knows which accounts can view internal data.",
      detail: `Current account: ${currentEmail ?? "not detected"}`,
    };
  }

  if (status === "events_table_missing") {
    return {
      icon: Database,
      title: "Analytics table is missing",
      message:
        "The internal_events table is not available yet, so analytics cannot be read.",
      detail: "Apply the 008_internal_events Supabase migration.",
    };
  }

  return {
    icon: AlertTriangle,
    title: "Restricted analytics view",
    message: "Your current account is not listed in ADMIN_EMAILS.",
    detail: `Current account: ${currentEmail ?? "not detected"}`,
  };
}

export default async function AppAnalyticsPage() {
  const { admin, analytics, status } = await getMarketingAnalyticsData();
  const statusCopy = getStatusCopy(status, admin.user?.email ?? null);

  return (
    <div className="mx-auto grid max-w-7xl gap-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Funnel</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Marketing analytics
          </h1>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            First-party traffic and conversion signals from accepted analytics
            consent.
          </p>
        </div>
        <span className="w-fit rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
          Latest {analytics.eventCount} events
        </span>
      </div>

      {statusCopy ? <AnalyticsStatusNotice {...statusCopy} /> : null}

      <section className="grid gap-4 md:grid-cols-5">
        <MetricCard
          label="Page views"
          value={analytics.pageViews}
          detail="Accepted-consent visits"
        />
        <MetricCard
          label="Visitors"
          value={analytics.visitors}
          detail="Anonymous IDs"
        />
        <MetricCard
          label="Sessions"
          value={analytics.sessions}
          detail="Browser sessions"
        />
        <MetricCard
          label="CTA clicks"
          value={analytics.ctaClicks}
          detail="Buttons and links"
        />
        <MetricCard
          label="Conversions"
          value={analytics.conversionEvents}
          detail="Signup, checkout, calls"
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        <AnalyticsList title="Top pages" items={analytics.topPages} />
        <AnalyticsList title="Top CTAs" items={analytics.topCtas} />
        <AnalyticsList title="Sources" items={analytics.topSources} />
      </section>

      <section className="overflow-x-auto rounded-2xl border border-border bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <h2 className="text-xl font-semibold">Recent events</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Sanitized event log with no email, phone, CV, prompt or message
              content.
            </p>
          </div>
          <Button asChild variant="outline" className="w-fit">
            <Link href="/app/admin">Internal admin</Link>
          </Button>
        </div>

        <table className="mt-5 w-full min-w-[760px] text-left text-sm">
          <thead className="text-muted-foreground">
            <tr className="border-b border-border">
              <th className="py-3 pr-4 font-medium">Event</th>
              <th className="py-3 pr-4 font-medium">Path</th>
              <th className="py-3 pr-4 font-medium">Label</th>
              <th className="py-3 pr-4 font-medium">Time</th>
            </tr>
          </thead>
          <tbody>
            {analytics.recentEvents.length ? (
              analytics.recentEvents.map((event) => (
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
                  No analytics events yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

function AnalyticsStatusNotice({
  icon: Icon,
  title,
  message,
  detail,
}: {
  icon: typeof Database;
  title: string;
  message: string;
  detail: string;
}) {
  return (
    <section className="rounded-2xl border border-[#dfdbd6] bg-[#dfdbd6] p-5 text-black">
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 size-5 shrink-0" />
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="mt-1 text-sm leading-6">{message}</p>
          <p className="mt-2 text-xs leading-5 text-black/70">{detail}</p>
        </div>
      </div>
    </section>
  );
}

function AnalyticsList({
  title,
  items,
}: {
  title: string;
  items: AnalyticsSummary["topPages"];
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
      <h2 className="font-semibold">{title}</h2>
      <div className="mt-4 grid gap-3">
        {items.length ? (
          items.map((item) => (
            <div
              key={`${item.label}-${item.detail}`}
              className="flex items-start justify-between gap-3"
            >
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
