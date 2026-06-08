import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  FileText,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

import { CertificateProfileMockup } from "@/components/landing/product-mockups";
import { PublicFooter } from "@/components/shared/public-footer";
import { PublicNav } from "@/components/shared/public-nav";
import { Button } from "@/components/ui/button";

const pathFeatures = [
  "AI English Tutor",
  "Role-specific English practice",
  "Remote Setup Verification",
  "Role Tools Verification",
  "Verified Profile",
  "CV Builder",
  "Job CRM",
  "Access to Job Marketplace",
  "Access to Community",
  "Templates Library",
  "Progress Analytics",
] as const;

const freeFeatures = [
  "Community preview",
  "Intro career tools",
  "Basic role path preview",
  "Limited English practice",
] as const;

const installments = [
  ["Pay in full", "$245", "Best total price"],
  ["2 payments", "$129 x2", "Flexible"],
  ["3 payments", "$89 x3", "Lowest entry"],
] as const;

const fastTrackFeatures = [
  "Everything in Lifetime Verification Access",
  "Priority verification review",
  "CV and verified profile positioning review",
  "Mock interview review",
  "Application strategy checklist",
  "Best for candidates applying this month",
] as const;

const employerModels = [
  ["Pilot access", "Start with one role and a focused verified shortlist."],
  ["Recurring hiring", "Create a repeatable lane for LATAM remote roles."],
  ["Placement support", "Use verified profiles to reduce screening friction."],
  ["Custom workflows", "Build hiring access around your team volume."],
] as const;

const valueAnchors = [
  ["$245", "Full verification path"],
  ["$89", "Lowest payment to start"],
  ["$50K+", "Potential annual USD opportunity ceiling"],
] as const;

function PricingValueMockup() {
  return (
    <div className="rounded-[2rem] border border-black/5 bg-white p-5 shadow-[0_24px_90px_rgba(7,9,12,0.1)] sm:p-7">
      <p className="section-kicker">Career positioning</p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.045em] sm:text-4xl">
        Build signals that make your profile easier to believe.
      </h2>
      <div className="mt-7 grid gap-3">
        {[
          ["English for your role", BadgeCheck],
          ["Remote setup checked", ShieldCheck],
          ["Role tools verified", Wrench],
          ["CV + verified profile link", FileText],
        ].map(([label, Icon]) => (
          <div key={label as string} className="flex items-center gap-3 rounded-[1.35rem] border border-border bg-[#f8f8f7] p-4">
            <div className="grid size-10 place-items-center rounded-full bg-white">
              <Icon className="size-4" />
            </div>
            <p className="font-extrabold">{label as string}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-[1.5rem] bg-[linear-gradient(135deg,#7459f6,#5fb7f7_52%,#de61bf)] p-5 text-white">
        <p className="text-sm font-semibold text-white/70">Positioning math</p>
        <p className="mt-2 text-3xl font-extrabold tracking-[-0.055em]">
          $245 to compete for roles that can reach $50,000+ per year.
        </p>
        <p className="mt-3 text-xs leading-5 text-white/70">
          Reference only. Inglevo does not guarantee employment, income, interviews or salary.
        </p>
      </div>
    </div>
  );
}

function PlanCard({
  eyebrow,
  title,
  price,
  subtitle,
  features,
  button,
  href,
  popular = false,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  price: string;
  subtitle: string;
  features: readonly string[];
  button: string;
  href: string;
  popular?: boolean;
  dark?: boolean;
}) {
  return (
    <article
      className={`relative rounded-[2.3rem] border p-7 shadow-sm ${
        dark
          ? "border-[#6f45dd]/25 bg-[#111111] text-white shadow-[0_24px_90px_rgba(17,17,17,0.16)]"
          : popular
            ? "border-[#6f45dd]/30 bg-white shadow-[0_24px_90px_rgba(123,63,242,0.14)]"
            : "border-border bg-white"
      }`}
    >
      {popular ? (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,var(--click-purple),var(--click-blue),var(--click-pink))] px-4 py-2 text-xs font-bold text-white shadow-sm">
          Most popular
        </div>
      ) : null}
      <p className={`section-kicker ${dark ? "text-white/55" : ""}`}>{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.05em]">{title}</h2>
      <p className="mt-7 text-6xl font-extrabold tracking-[-0.07em]">{price}</p>
      <p className={`mt-3 text-sm leading-6 ${dark ? "text-white/65" : "text-neutral-600"}`}>
        {subtitle}
      </p>
      <Button
        asChild
        variant={dark ? "secondary" : "default"}
        className={`mt-7 h-12 w-full rounded-full ${
          popular
            ? "click-gradient-button"
            : dark
              ? "bg-white text-black hover:bg-white/90"
              : "bg-black text-white hover:bg-black/90"
        }`}
      >
        <Link href={href}>
          {button}
          <ArrowRight />
        </Link>
      </Button>
      <div className="mt-7 grid gap-3">
        {features.map((feature) => (
          <div key={feature} className={`flex items-center gap-2 text-sm ${dark ? "text-white/82" : "text-neutral-700"}`}>
            <Check className={`size-4 ${dark ? "text-[#d0f5e3]" : "text-[#6f45dd]"}`} />
            {feature}
          </div>
        ))}
      </div>
    </article>
  );
}

export default function PricingPage() {
  return (
    <>
      <PublicNav />
      <main className="overflow-hidden bg-white text-black">
        <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <div className="brand-chip mb-6">Pricing</div>
            <h1 className="max-w-4xl text-6xl font-extrabold leading-[0.95] tracking-[-0.045em] sm:text-7xl lg:text-[5.6rem]">
              Choose your verification path.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-neutral-600 sm:text-2xl sm:leading-9">
              Improve your role English, verify your setup and tools, build a
              stronger CV, and use an active Inglevo profile when applying to
              US remote opportunities.
            </p>
            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              {valueAnchors.map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-black/5 bg-[#f8f8f7] p-4">
                  <p className="text-3xl font-extrabold tracking-[-0.055em]">{value}</p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-neutral-500">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <PricingValueMockup />
        </section>

        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.88fr_1.12fr_0.88fr]">
            <PlanCard
              eyebrow="Basic"
              title="Start free"
              price="$0"
              subtitle="Explore the community, intro tools and basic role path before committing."
              features={freeFeatures}
              button="Start free"
              href="/signup"
            />

            <article className="relative rounded-[2.3rem] border border-[#6f45dd]/30 bg-white p-7 shadow-[0_24px_90px_rgba(123,63,242,0.14)]">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,var(--click-purple),var(--click-blue),var(--click-pink))] px-4 py-2 text-xs font-bold text-white shadow-sm">
                Most popular
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="section-kicker">Talent</p>
                  <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.05em]">
                    Lifetime Verification Access
                  </h2>
                </div>
                <span className="rounded-full bg-[#d0f5e3] px-3 py-1.5 text-xs font-black uppercase tracking-[0.1em] text-emerald-900">
                  Core
                </span>
              </div>
              <p className="mt-7 text-7xl font-extrabold tracking-[-0.07em]">$245</p>
              <p className="mt-2 text-sm font-semibold text-neutral-500">
                One-time total · Best total price
              </p>
              <p className="mt-5 text-lg leading-8 text-neutral-600">
                The main path for LATAM talent who wants to build stronger
                verification signals for US remote opportunities paid in USD.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {installments.map(([label, price, note]) => (
                  <div key={label} className="rounded-2xl border border-border bg-[#f8f8f7] px-4 py-3 text-sm">
                    <span className="block font-bold">{label}</span>
                    <span className="mt-1 block text-xl font-extrabold tracking-[-0.045em]">{price}</span>
                    <span className="text-xs text-neutral-500">{note}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-neutral-500">
                Installment plans may include financing fees. Profile stays active while paying $19/month if on maintenance after plan period.
              </p>

              <Button asChild className="brand-button click-gradient-button mt-7 h-12 w-full rounded-full">
                <Link href="/signup">
                  Get lifetime access
                  <ArrowRight />
                </Link>
              </Button>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {pathFeatures.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-neutral-700">
                    <Check className="size-4 text-[#6f45dd]" />
                    {feature}
                  </div>
                ))}
              </div>
            </article>

            <PlanCard
              eyebrow="Fast Track"
              title="Priority path"
              price="$445"
              subtitle="For candidates applying now who want priority review, CV optimization and mock interview feedback."
              features={fastTrackFeatures}
              button="Request Fast Track"
              href="/contact"
              dark
            />
          </div>
        </section>

        <section className="bg-[#f4f2ef] px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            <div>
              <p className="section-kicker">Employer access</p>
              <h2 className="mt-4 text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                Custom access for teams hiring LATAM talent.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
                Employer pricing is not public. Access depends on hiring
                volume, role type and support needed.
              </p>
              <Button asChild className="click-gradient-button mt-8 rounded-full px-7">
                <Link href="/book-a-call">
                  Book a hiring call
                  <ArrowRight />
                </Link>
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {employerModels.map(([title, copy]) => (
                <article key={title} className="rounded-[1.5rem] border border-black/5 bg-white p-5 shadow-sm">
                  <BriefcaseBusiness className="size-5" />
                  <h3 className="mt-5 text-xl font-extrabold tracking-[-0.035em]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="section-kicker">What you receive</p>
              <h2 className="mt-4 text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                The output is an active profile, not a generic certificate.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
                Your Inglevo profile is designed to show proof across English,
                remote setup, role tools and professional signals.
              </p>
            </div>
            <CertificateProfileMockup />
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6">
          <div className="click-feature-card mx-auto max-w-6xl rounded-[2.4rem] p-8 text-white shadow-[0_24px_90px_rgba(90,70,255,0.18)] sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="section-kicker text-white/70">Important note</p>
                <h2 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl">
                  Better opportunities reward stronger proof.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
                  Inglevo helps users practice professional English and build
                  verification signals. It does not guarantee employment,
                  income, interviews, visas, sponsorship or job placement.
                </p>
              </div>
              <Button asChild variant="secondary" className="h-12 rounded-full px-7">
                <Link href="/signup">
                  Start free
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
