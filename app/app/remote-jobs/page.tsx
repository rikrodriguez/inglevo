import { AssetGenerator } from "@/components/remote-jobs/asset-generator";
import { AnswerBank } from "@/components/remote-jobs/answer-bank";
import {
  getPracticeSessions,
  getRemoteJobAssets,
  getTemplates,
  getViewer,
} from "@/lib/data";
import { TemplateCard } from "@/components/templates/template-card";

const workspaceAssets = [
  "Recruiter message",
  "LinkedIn headline",
  "Interview answer bank",
  "Follow-up emails",
  "Salary script",
  "CV bullets",
];

export default async function RemoteJobsPage() {
  const [{ profile }, templates, assets, sessions] = await Promise.all([
    getViewer(),
    getTemplates(),
    getRemoteJobAssets(),
    getPracticeSessions(),
  ]);
  const jobTemplates = templates
    .filter((template) => template.category === "Job Search")
    .slice(0, 2);
  const answerBank = sessions
    .filter((session) => session.improved_answer)
    .sort((a, b) => (b.overall_score ?? 0) - (a.overall_score ?? 0))
    .map((session) => ({
      id: session.id,
      scenario: session.scenario,
      question: session.question,
      user_answer: session.user_answer,
      improved_answer: session.improved_answer,
      overall_score: session.overall_score,
    }));

  return (
    <div className="mx-auto grid max-w-6xl gap-6">
      <section className="hero-panel">
        <p className="section-kicker">
          Remote Jobs Applications
        </p>
        <h1 className="page-title mt-2">
          Prepare real job application assets
        </h1>
        <p className="page-copy mt-3">
          Turn your English into recruiter messages, LinkedIn profile copy, CV
          bullets, follow-ups, salary scripts and interview answers you can
          reuse.
        </p>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        {workspaceAssets.map((asset) => (
          <div key={asset} className="premium-card p-4">
            <p className="font-medium">{asset}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {assets.some((item) =>
                asset.toLowerCase().includes(item.type.replaceAll("_", " "))
              )
                ? "Saved in your workspace"
                : "Ready to create"}
            </p>
          </div>
        ))}
      </section>

      <AssetGenerator profile={profile} assets={assets} answerBank={answerBank} />

      <AnswerBank profile={profile} answers={answerBank} />

      <section id="templates-preview" className="grid gap-4">
        <div>
          <p className="section-kicker">
            Templates preview
          </p>
          <h2 className="mt-1 text-2xl font-semibold">
            Job application messages you can adapt
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {jobTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </section>
    </div>
  );
}
