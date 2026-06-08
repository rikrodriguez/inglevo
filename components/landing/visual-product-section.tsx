import {
  AiTrainerMockup,
  CandidateDashboardMockup,
  CertificateProfileMockup,
  EmployerDashboardMockup,
  JobCrmMockup,
  ResumeBuilderMockup,
  RolePathCardsMockup,
} from "@/components/landing/product-mockups";

const stats = [
  ["8", "Role paths"],
  ["4", "Verified layers"],
  ["12", "CRM stages"],
  ["82", "Readiness score"],
] as const;

export function VisualProductSection() {
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
          <div>
            <p className="section-kicker">Product experience</p>
            <h2 className="brand-section-title mt-4 text-6xl sm:text-7xl">
              A complete system, not another English app.
            </h2>
          </div>
          <p className="max-w-2xl text-xl leading-8 text-neutral-600">
            Inglevo turns training into visible proof: English practice, role
            verification, certificate progress, CV assets and job applications
            in one career workspace.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <CandidateDashboardMockup />
          <div className="grid gap-5">
            <CertificateProfileMockup />
            <div className="grid grid-cols-2 gap-3">
              {stats.map(([value, label]) => (
                <div key={label} className="rounded-3xl border border-border bg-white p-5 shadow-sm">
                  <p className="mono-stat text-4xl font-semibold">{value}</p>
                  <p className="mt-1 text-xs font-semibold text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <AiTrainerMockup />
          <ResumeBuilderMockup />
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <JobCrmMockup />
          <EmployerDashboardMockup />
        </div>

        <div className="mt-5">
          <RolePathCardsMockup />
        </div>
      </div>
    </section>
  );
}
