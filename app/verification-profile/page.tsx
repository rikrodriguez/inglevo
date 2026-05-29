import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Copy,
  Eye,
  Link2,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

import { CertificateProfileMockup } from "@/components/landing/product-mockups";
import { PublicFooter } from "@/components/shared/public-footer";
import { PublicNav } from "@/components/shared/public-nav";
import { Button } from "@/components/ui/button";

const profileSignals = [
  ["Role English", "Shows communication signals for the job context.", BadgeCheck],
  ["Remote setup", "Shows work-from-home basics like internet, mic, camera and workspace.", ShieldCheck],
  ["Role tools", "Shows familiarity with tools used in the target role.", Wrench],
  ["Application profile", "Gives candidates one link to add to CV, LinkedIn and job applications.", Link2],
] as const;

const sharePlaces = [
  "CV header",
  "LinkedIn featured section",
  "Recruiter messages",
  "Job applications",
  "Portfolio pages",
  "Email signature",
] as const;

function VerifiedProfileMockup() {
  return (
    <div className="rounded-[2rem] border border-black/5 bg-white p-5 shadow-[0_24px_90px_rgba(7,9,12,0.1)] sm:p-7">
      <div className="rounded-[1.5rem] border border-black/10 bg-[#fbfbfd] p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="section-kicker">Inglevo Verified Profile</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-[-0.055em]">
              Ricardo Rodriguez
            </h2>
            <p className="mt-2 text-sm font-semibold text-neutral-500">
              Customer Support English · LATAM
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#d0f5e3] px-4 py-2 text-sm font-extrabold text-emerald-900">
            <Check className="size-4" />
            Active
          </span>
        </div>

        <div className="mt-6 grid gap-3">
          {[
            ["English verified", "84/100"],
            ["Remote setup verified", "Passed"],
            ["Role tools verified", "Zendesk · Slack"],
            ["Profile status", "Active badge"],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm">
              <span className="text-sm font-bold">{label}</span>
              <span className="rounded-full bg-[#f3efff] px-3 py-1.5 text-xs font-black text-[#6f45dd]">
                {value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-3 rounded-[1.3rem] bg-black p-4 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
              Public profile link
            </p>
            <p className="mt-1 text-sm font-extrabold sm:text-base">
              inglevo.com/ricardorodriguez
            </p>
          </div>
          <Button variant="secondary" className="h-10 rounded-full px-4">
            Copy link
            <Copy className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function VerificationProfilePage() {
  return (
    <>
      <PublicNav />
      <main className="overflow-hidden bg-white text-black">
        <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <div className="brand-chip mb-6">Verification Profile</div>
            <h1 className="max-w-4xl text-6xl font-extrabold leading-[0.95] tracking-[-0.045em] sm:text-7xl lg:text-[5.6rem]">
              One active profile that shows proof, not just claims.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-neutral-600 sm:text-2xl sm:leading-9">
              Your Inglevo Verified Profile is designed to show role English,
              remote setup, role tools and professional signals in one link you
              can share with US hiring teams.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="brand-button click-gradient-button h-12 rounded-full px-7">
                <Link href="/signup">
                  Create my profile
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full bg-white px-7">
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
            <p className="mt-5 text-sm font-semibold text-neutral-500">
              The goal: “Send me your Inglevo.”
            </p>
          </div>

          <VerifiedProfileMockup />
        </section>

        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-4">
            {profileSignals.map(([title, copy, Icon]) => (
              <article key={title} className="landing-card">
                <div className="click-icon-tile">
                  <Icon className="size-5" />
                </div>
                <h2 className="mt-7 text-2xl font-extrabold tracking-[-0.04em]">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#f4f2ef] px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="section-kicker">Why it matters</p>
              <h2 className="mt-4 text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                Generic CVs make hiring teams guess.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
                A verified profile gives your application a clearer trust
                signal. It does not replace interviews, but it can make your
                profile easier to understand before the first call.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                ["Generic applicant", "advanced English claim · no setup proof · no tool signal"],
                ["Inglevo Verified", "role English · setup checked · tools checked · active profile"],
              ].map(([label, detail], index) => (
                <article
                  key={label}
                  className={`rounded-[1.7rem] p-6 ${
                    index === 1
                      ? "bg-[linear-gradient(135deg,#7459f6,#5fb7f7_52%,#de61bf)] text-white"
                      : "border border-black/5 bg-white"
                  }`}
                >
                  <p className={`section-kicker ${index === 1 ? "text-white/65" : ""}`}>{label}</p>
                  <p className="mt-4 text-2xl font-extrabold tracking-[-0.04em]">{detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="section-kicker">Where to use it</p>
              <h2 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                Put your Inglevo link where hiring decisions start.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
                The profile is meant to travel with your application assets:
                CV, LinkedIn, messages and job applications.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {sharePlaces.map((place) => (
                <div key={place} className="flex items-center gap-3 rounded-2xl border border-black/5 bg-[#f8f8f7] p-4 text-sm font-bold">
                  <Link2 className="size-4 text-[#6f45dd]" />
                  {place}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2 lg:items-center">
            <CertificateProfileMockup />
            <div className="rounded-[2rem] border border-black/5 bg-white p-7 shadow-[0_22px_80px_rgba(30,27,75,0.06)]">
              <p className="section-kicker">Profile status</p>
              <h2 className="mt-4 text-4xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-5xl">
                Active means current. Inactive means it should not be trusted as current.
              </h2>
              <p className="mt-6 text-lg leading-8 text-neutral-600">
                We avoid vague certificates. The long-term goal is a profile
                status that hiring teams can understand quickly.
              </p>
              <div className="mt-6 grid gap-3">
                {[
                  ["Active", "Profile is currently verified."],
                  ["Inactive", "This profile is not currently active or verified."],
                  ["Private by default", "No public sharing without user action."],
                ].map(([label, copy]) => (
                  <div key={label} className="flex items-start gap-3 rounded-2xl bg-[#f8f8f7] p-4">
                    <Eye className="mt-0.5 size-4 text-[#6f45dd]" />
                    <div>
                      <p className="font-bold">{label}</p>
                      <p className="mt-1 text-sm text-neutral-600">{copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6">
          <div className="click-feature-card mx-auto max-w-6xl rounded-[2.4rem] p-8 text-white shadow-[0_24px_90px_rgba(90,70,255,0.18)] sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="section-kicker text-white/70">Build your signal</p>
                <h2 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl">
                  Make your application easier to trust.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
                  Start building the profile you can share when someone asks:
                  “Can you send me your Inglevo?”
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
