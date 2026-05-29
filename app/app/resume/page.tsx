import { BadgeCheck, FileText, Mail, UserRoundCheck } from "lucide-react";

const resumeAssets = [
  "ATS optimized resume",
  "Role-specific wording",
  "Better achievement bullets",
  "LinkedIn summary",
  "Cover letter",
  "Inglevo Verified badge",
] as const;

export default function ResumeBuilderPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-6">
      <section className="hero-panel">
        <p className="section-kicker">Resume Builder</p>
        <h1 className="page-title mt-2">Build a CV built for the job you want</h1>
        <p className="page-copy mt-3">
          Prepare resume bullets, LinkedIn copy and job application materials
          that turn your experience into clear English outcomes.
        </p>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="premium-card p-6">
          <div className="grid size-12 place-items-center rounded-2xl bg-[#d0f5e3]">
            <FileText className="size-6" />
          </div>
          <h2 className="mt-6 text-3xl font-semibold tracking-[-0.04em]">
            Career asset builder
          </h2>
          <div className="mt-6 grid gap-3">
            {resumeAssets.map((asset) => (
              <div key={asset} className="flex items-center gap-3 rounded-2xl border border-border bg-white p-4 text-sm font-medium">
                <BadgeCheck className="size-4" />
                {asset}
              </div>
            ))}
          </div>
        </div>

        <div className="mockup-screen">
          <p className="section-kicker">Preview</p>
          <div className="mt-5 rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-muted-foreground">Customer Support Specialist</p>
            <h2 className="mt-2 text-3xl font-semibold">Remote Support CV</h2>
            <div className="mt-6 grid gap-3">
              <div className="rounded-2xl bg-[#dfdbd6]/55 p-4 text-sm">
                Improved ticket resolution clarity and customer follow-up
                quality across remote support workflows.
              </div>
              <div className="rounded-2xl bg-[#d0f5e3] p-4 text-sm font-medium">
                Includes Inglevo Verified - Customer Service English
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <UserRoundCheck className="size-5" />
              <Mail className="size-5" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
