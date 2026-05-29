import { AsyncWritingAssessment } from "@/components/improve/async-writing-assessment";
import { getViewer } from "@/lib/data";

export default async function AsyncWritingPage() {
  const { profile } = await getViewer();

  return (
    <div className="mx-auto grid max-w-6xl gap-6">
      <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-muted-foreground">Improve English</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Async Writing Assessment
        </h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          Practice the written communication that remote teams actually use:
          Slack updates, blocker explanations and meeting follow-ups.
        </p>
      </section>

      <AsyncWritingAssessment profile={profile} />
    </div>
  );
}
