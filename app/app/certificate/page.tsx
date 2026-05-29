import Link from "next/link";
import { Award, CheckCircle2, Circle, Lock, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getCertificateEligibility } from "@/lib/certificate";
import {
  getPracticeSessions,
  getSetupCheck,
  getViewer,
  getWritingAssessments,
} from "@/lib/data";

const verifiedAreas = [
  "General English Communication",
  "Role-Specific English",
  "Tool-Based Task Simulation",
  "Async Writing",
  "Interview Performance",
  "Remote Communication",
];

export default async function CertificatePage() {
  const [{ profile }, sessions, writingAssessments, setupCheck] =
    await Promise.all([
      getViewer(),
      getPracticeSessions(),
      getWritingAssessments(),
      getSetupCheck(),
    ]);
  const certificate = getCertificateEligibility({
    profile,
    sessions,
    writingAssessments,
    setupCheck,
  });

  return (
    <div className="mx-auto grid max-w-6xl gap-6">
      <section className="hero-panel">
        <p className="section-kicker">Certificate</p>
        <div className="mt-2 grid gap-4 lg:grid-cols-[1fr_340px] lg:items-end">
          <div>
            <h1 className="page-title">
              Verified English for your role
            </h1>
            <p className="page-copy mt-3">
              Show that you can communicate in English for the work you want to
              do remotely: role scenarios, async writing, interviews and basic
              tool-based tasks.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-muted-foreground">Status</p>
            <div className="mt-3 flex items-center gap-3">
              {certificate.unlocked ? (
                <CheckCircle2 className="size-8 text-black" />
              ) : (
                <Lock className="size-8 text-black" />
              )}
              <div>
                <p className="font-semibold">
                  {certificate.unlocked
                    ? "Certificate unlocked"
                    : "Not unlocked yet"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {certificate.unlocked
                    ? "You are Inglevo Verified for your role."
                    : "Complete your readiness path and reach a score of 75+ to unlock your certificate."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="premium-panel">
          <p className="section-kicker">Requirements</p>
          <h2 className="mt-1 text-2xl font-semibold">
            Eligibility checklist
          </h2>
          <div className="mt-5 grid gap-3">
            {certificate.requirements.map((requirement) => (
              <div
                key={requirement.label}
                className="flex items-start justify-between gap-4 rounded-xl border border-border bg-white p-4"
              >
                <div className="flex gap-3">
                  {requirement.met ? (
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-black" />
                  ) : (
                    <Circle className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                  )}
                  <div>
                    <p className="font-medium">{requirement.label}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {requirement.blocking
                        ? "Required for this private v1 certificate."
                        : "Role signal for stronger future certification."}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                  {requirement.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-foreground/10 bg-white p-4 shadow-sm">
          <div className="passport-panel rounded-[22px] border-dashed border-[#d0f5e3] p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="section-kicker">Certificate preview</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                  Inglevo Verified — Role English
                </h2>
              </div>
              <div className="certificate-seal size-16">
                <Award className="size-7" />
              </div>
            </div>

            <div className="mt-10">
              <p className="text-sm text-muted-foreground">Awarded to</p>
              <p className="mt-1 text-3xl font-semibold tracking-tight">
                {profile.full_name ?? "Inglevo learner"}
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <CertificateField
                label="Overall score"
                value={
                  certificate.averageScore === null
                    ? "Pending"
                    : `${certificate.averageScore}/100`
                }
              />
              <CertificateField
                label="Level"
                value={certificate.level.level}
                detail={certificate.level.label}
              />
              <CertificateField label="Issue date" value={certificate.issueDate} />
              <CertificateField
                label="Certificate ID"
                value={certificate.certificateId ?? "Pending"}
              />
            </div>

            <div className="mt-8">
              <p className="text-sm font-medium text-muted-foreground">
                Verified areas
              </p>
              <div className="mt-3 grid gap-2">
                {verifiedAreas.map((area) => (
                  <div key={area} className="flex items-center gap-2 text-sm">
                    <ShieldCheck className="size-4 text-black" />
                    {area}
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-8 rounded-xl border border-border bg-white p-4 text-xs leading-5 text-muted-foreground">
              This certificate reflects performance in Inglevo assessments and
              simulations. It does not guarantee employment, income, visas,
              sponsorship, or job placement.
            </p>
          </div>
        </div>
      </section>

      <section className="ink-panel">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-background/70">Next step</p>
            <h2 className="mt-2 text-2xl font-semibold">
              {certificate.unlocked
                ? "Keep improving your certificate signals."
                : "Unlock your certificate by reaching 3 practices and 75+ average score."}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-background/70">
              The certificate is private for now. No public share link, email,
              private answers or salary information are exposed.
            </p>
            <p className="mt-2 max-w-2xl text-sm text-background/70">
              Soon, you&apos;ll be able to share your Inglevo Certificate with
              selected opportunities and recruiters.
            </p>
          </div>
          <Button asChild variant="secondary">
            <Link href={certificate.unlocked ? "/app/readiness" : "/app/interview"}>
              {certificate.unlocked ? "View readiness" : "Continue practice"}
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function CertificateField({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-4">
      <p className="text-xs font-medium uppercase text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 font-semibold">{value}</p>
      {detail ? <p className="mt-1 text-sm text-muted-foreground">{detail}</p> : null}
    </div>
  );
}
