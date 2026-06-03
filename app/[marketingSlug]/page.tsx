import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Check,
  FileText,
  Globe2,
  GraduationCap,
  Laptop,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

import { BrandLogo } from "@/components/shared/brand-logo";
import { PublicFooter } from "@/components/shared/public-footer";
import { PublicNav } from "@/components/shared/public-nav";
import { Button } from "@/components/ui/button";

type MarketingPage = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta?: string;
  bullets: string[];
  sections: Array<{
    title: string;
    copy: string;
  }>;
  metric?: {
    label: string;
    value: string;
    copy: string;
  };
};

const marketingPages = {
  "ai-english-trainer": {
    eyebrow: "Product",
    title: "AI English Tutor for real remote work.",
    description:
      "Practice the English your target role actually requires: interviews, meetings, async updates, salary conversations and role-specific scenarios.",
    primaryCta: "Start practicing",
    secondaryCta: "See pricing",
    bullets: [
      "Role-specific interview practice",
      "Professional tone feedback",
      "Async writing and Slack-style updates",
      "Clearer answers for US remote roles",
    ],
    sections: [
      {
        title: "Not generic English lessons",
        copy: "Inglevo focuses on the communication moments that affect remote hiring: answering clearly, explaining blockers, writing updates and sounding professional.",
      },
      {
        title: "Built around role paths",
        copy: "Customer support, sales, project management, design, engineering and VA paths can each train different vocabulary, tools and work situations.",
      },
      {
        title: "Turns practice into proof",
        copy: "Your practice supports a verified profile that helps hiring teams understand your communication signals faster.",
      },
    ],
    metric: {
      label: "Core outcome",
      value: "Role English",
      copy: "Train English for the job you want, not for a classroom.",
    },
  },
  "verification-profile": {
    eyebrow: "Product",
    title: "Your Inglevo Verified Profile.",
    description:
      "An active profile that shows role English, remote setup and role tools signals in one link you can share with recruiters and applications.",
    primaryCta: "Create my profile",
    secondaryCta: "View pricing",
    bullets: [
      "Public verification link",
      "Role English score",
      "Remote setup status",
      "Role tools verification",
    ],
    sections: [
      {
        title: "From claims to proof",
        copy: "Instead of only saying advanced English, you can show a structured profile with the signals remote hiring teams care about.",
      },
      {
        title: "Designed for applications",
        copy: "Use your Inglevo link in your CV, LinkedIn, recruiter messages and job applications.",
      },
      {
        title: "Active status matters",
        copy: "The profile is designed to communicate whether your verification is active, current and easier to trust.",
      },
    ],
    metric: {
      label: "Recruiter phrase",
      value: "Send me your Inglevo",
      copy: "The long-term goal is to make Inglevo a familiar trust signal.",
    },
  },
  "cv-builder": {
    eyebrow: "Product",
    title: "Build a CV for US remote opportunities.",
    description:
      "Turn your experience into clearer role-specific bullets and add your Inglevo Verified profile link as a stronger hiring signal.",
    primaryCta: "Build my CV",
    secondaryCta: "Start free",
    bullets: [
      "Role-specific wording",
      "Verified profile link",
      "Clear outcome bullets",
      "Remote-friendly positioning",
    ],
    sections: [
      {
        title: "Make your value easier to understand",
        copy: "A strong CV does not just list tasks. It shows outcomes, tools, communication and fit for the role.",
      },
      {
        title: "Position for remote work",
        copy: "Highlight async communication, ownership, tools and reliability signals that matter to US hiring teams.",
      },
      {
        title: "Connect CV to verification",
        copy: "Your CV should point to a profile that supports the claims you make.",
      },
    ],
  },
  "job-crm": {
    eyebrow: "Product",
    title: "Manage your job search like a serious candidate.",
    description:
      "Track saved roles, applications, interviews, follow-ups, salary ranges and next actions in one organized workspace.",
    primaryCta: "Organize my search",
    secondaryCta: "See marketplace",
    bullets: [
      "Saved roles",
      "Application stages",
      "Follow-up reminders",
      "Salary and notes tracking",
    ],
    sections: [
      {
        title: "Stop applying randomly",
        copy: "A CRM helps you apply with more structure, remember follow-ups and see where opportunities are moving.",
      },
      {
        title: "Track the right signals",
        copy: "Keep role, company, tools, salary and verification match visible while you apply.",
      },
      {
        title: "Improve consistency",
        copy: "Better candidates follow up, prepare and keep momentum.",
      },
    ],
  },
  templates: {
    eyebrow: "Product",
    title: "Templates for remote job applications.",
    description:
      "Use recruiter messages, follow-ups, salary scripts and professional communication templates built for US remote job search.",
    primaryCta: "Use templates",
    secondaryCta: "Start free",
    bullets: [
      "Recruiter messages",
      "Follow-up emails",
      "Salary expectation scripts",
      "Slack and async updates",
    ],
    sections: [
      {
        title: "Sound professional faster",
        copy: "Templates help you avoid translated-sounding messages and communicate with more confidence.",
      },
      {
        title: "Built for job search",
        copy: "These are not generic phrases. They support applications, interviews, follow-ups and remote communication.",
      },
      {
        title: "Pair templates with practice",
        copy: "The strongest candidates do not only copy templates. They train the English behind them.",
      },
    ],
  },
  analytics: {
    eyebrow: "Product",
    title: "Track your progress toward stronger applications.",
    description:
      "See your practice, profile status, role path progress, application activity and verification signals in one place.",
    primaryCta: "Track my progress",
    secondaryCta: "View pricing",
    bullets: [
      "Verification status",
      "Practice progress",
      "Application activity",
      "Profile views and signals",
    ],
    sections: [
      {
        title: "Know what to improve next",
        copy: "Analytics should make the next action obvious: practice English, complete setup, improve tools, or apply stronger.",
      },
      {
        title: "Make progress visible",
        copy: "A serious candidate needs a system, not scattered notes.",
      },
      {
        title: "Support your verified profile",
        copy: "Progress data helps your profile feel active and current.",
      },
    ],
  },
  "role-paths": {
    eyebrow: "Talent",
    title: "Verify for the role you actually want.",
    description:
      "Start with Customer Support and expand into Sales, Project Management, Design, Engineering, VA, Marketing and Operations paths.",
    primaryCta: "Choose my role path",
    secondaryCta: "See pricing",
    bullets: [
      "Customer Support open now",
      "Sales / SDR preview",
      "Project Manager preview",
      "More role paths coming",
    ],
    sections: [
      {
        title: "Different roles need different English",
        copy: "A support agent, SDR and project manager do not communicate the same way. Inglevo verifies role-specific situations.",
      },
      {
        title: "Role tools matter",
        copy: "Each path can include tools and workflows connected to that role, from Zendesk and Slack to HubSpot, Figma or GitHub.",
      },
      {
        title: "Proof becomes stronger by role",
        copy: "The more specific the verification, the more useful it is for hiring.",
      },
    ],
  },
  opportunities: {
    eyebrow: "Talent",
    title: "Apply to opportunities with a verified profile.",
    description:
      "Access curated US remote job opportunities and understand where your verified profile can help you apply stronger.",
    primaryCta: "See opportunities",
    secondaryCta: "Get verified first",
    bullets: [
      "Curated remote roles",
      "Required tools and English signals",
      "Verification match indicators",
      "Application prep workflow",
    ],
    sections: [
      {
        title: "Not a generic job board",
        copy: "Inglevo is designed to help you become a stronger candidate before applying.",
      },
      {
        title: "Apply with stronger signals",
        copy: "Use English, setup and tools verification to support your applications.",
      },
      {
        title: "No guarantees",
        copy: "Opportunities must be verified before applying. Inglevo does not guarantee jobs, interviews, income or placement.",
      },
    ],
  },
  community: {
    eyebrow: "Talent",
    title: "Weekly live calls for role-specific English.",
    description:
      "Stay consistent with live sessions for customer support, SDRs, product designers, mock interviews and US hiring Q&A.",
    primaryCta: "Join the community",
    secondaryCta: "Start verification",
    bullets: [
      "Role English sessions",
      "Mock Interview Fridays",
      "US Hiring Q&A",
      "Consistency and support",
    ],
    sections: [
      {
        title: "English improves with repetition",
        copy: "The community gives candidates a reason to practice consistently while building their verified profile.",
      },
      {
        title: "Role-based sessions",
        copy: "Practice the conversations and vocabulary connected to the work you want.",
      },
      {
        title: "Career momentum",
        copy: "Live calls keep the path active beyond one practice session.",
      },
    ],
  },
  "success-stories": {
    eyebrow: "Talent",
    title: "Candidate momentum and hiring signal stories.",
    description:
      "Examples of how LATAM talent can improve profile quality, communication confidence and application structure with Inglevo.",
    primaryCta: "Start my path",
    secondaryCta: "See pricing",
    bullets: [
      "Stronger CV positioning",
      "Clearer English practice",
      "More organized applications",
      "Better verified profile signals",
    ],
    sections: [
      {
        title: "Beta proof scenarios",
        copy: "Use these examples to explain what Inglevo is designed to improve while public outcomes are still being collected.",
      },
      {
        title: "Show progress, not fake guarantees",
        copy: "Good proof should focus on stronger preparation, clearer signals and better application behavior.",
      },
      {
        title: "Publish real outcomes when available",
        copy: "The strongest future proof will be real profiles, CV improvements and interview confidence wins from users who opt in.",
      },
    ],
  },
  "hire-latam-talent": {
    eyebrow: "Employers",
    title: "Hire LATAM talent with stronger proof.",
    description:
      "Review candidates with communication, setup, tools and professionalism signals before spending time in interviews.",
    primaryCta: "Book a hiring call",
    secondaryCta: "See candidate verification",
    bullets: [
      "Pre-checked communication",
      "Remote setup signals",
      "Role tools verification",
      "Less wasted screening time",
    ],
    sections: [
      {
        title: "Fewer weak interviews",
        copy: "Inglevo helps hiring teams review stronger signals before committing interview time.",
      },
      {
        title: "LATAM advantage",
        copy: "Timezone overlap, strong talent supply and USD-aligned opportunity can create better hiring outcomes.",
      },
      {
        title: "Custom access first",
        copy: "Employer pricing is handled through calls while we refine hiring access and candidate supply.",
      },
    ],
  },
  "candidate-verification": {
    eyebrow: "Employers",
    title: "Candidate verification for remote hiring.",
    description:
      "Go beyond generic CVs and advanced English claims with role English, setup, role tools and profile status signals.",
    primaryCta: "Review verified candidates",
    secondaryCta: "Book a call",
    bullets: [
      "Role English signals",
      "Remote setup signals",
      "Role tools familiarity",
      "Active verification profile",
    ],
    sections: [
      {
        title: "Proof over claims",
        copy: "Inglevo Verified is designed to make candidate signals clearer before the first interview.",
      },
      {
        title: "Better filtering",
        copy: "Hiring teams can prioritize candidates whose profile better matches the role.",
      },
      {
        title: "No replacement for interviews",
        copy: "Verification supports screening. It does not replace employer interviews or final hiring decisions.",
      },
    ],
  },
  "hiring-access": {
    eyebrow: "Employers",
    title: "Custom access for hiring teams.",
    description:
      "Use Inglevo as a candidate trust layer for teams hiring LATAM talent into US remote roles.",
    primaryCta: "Request access",
    secondaryCta: "Book a call",
    bullets: [
      "Candidate filters",
      "Verified profile review",
      "Role-based candidate pools",
      "Custom hiring workflows",
    ],
    sections: [
      {
        title: "Designed for controlled rollout",
        copy: "Employer access should start curated, so candidate quality and company needs stay aligned.",
      },
      {
        title: "Flexible models later",
        copy: "Subscription, placement and hybrid models can be introduced after early employer pilots.",
      },
      {
        title: "Quality first",
        copy: "Inglevo should not become a generic job board. The trust layer is the value.",
      },
    ],
  },
  "book-a-call": {
    eyebrow: "Employers",
    title: "Book a hiring conversation.",
    description:
      "Talk with Inglevo about hiring LATAM candidates, verification signals, pilot access and role-specific candidate needs.",
    primaryCta: "Contact Inglevo",
    secondaryCta: "See employers page",
    bullets: [
      "Hiring needs",
      "Role profiles",
      "Candidate verification",
      "Pilot access",
    ],
    sections: [
      {
        title: "For hiring teams",
        copy: "Use this path if you are exploring LATAM hiring and want stronger filtering before interviews.",
      },
      {
        title: "For agencies",
        copy: "Inglevo can support teams that need communication and setup signals for remote candidates.",
      },
      {
        title: "Next step",
        copy: "Send hiring context through the contact page and Inglevo will follow up with the right access path.",
      },
    ],
  },
  careers: {
    eyebrow: "Company",
    title: "Build the trust layer for LATAM remote careers.",
    description:
      "Inglevo is building a verification standard for role English, remote setup and role tools for LATAM talent.",
    primaryCta: "Contact us",
    secondaryCta: "About Inglevo",
    bullets: [
      "Product",
      "Growth",
      "Education",
      "Employer partnerships",
    ],
    sections: [
      {
        title: "Public hiring roadmap",
        copy: "This page is ready for future hiring. For now, reach out if you want to help build Inglevo.",
      },
      {
        title: "Mission",
        copy: "Help LATAM talent become stronger candidates for global remote work.",
      },
      {
        title: "Standard",
        copy: "Make Inglevo Verified a trusted signal for serious remote hiring.",
      },
    ],
  },
  "cookie-policy": {
    eyebrow: "Legal",
    title: "Cookie Policy.",
    description:
      "Inglevo may use cookies and analytics tools to understand site usage, improve product experience and measure marketing performance.",
    primaryCta: "Back to home",
    secondaryCta: "Privacy Policy",
    bullets: [
      "Essential cookies",
      "Product analytics",
      "Marketing measurement",
      "Consent controls",
    ],
    sections: [
      {
        title: "Essential cookies",
        copy: "Some cookies may be required for authentication, security and basic product functionality.",
      },
      {
        title: "Analytics cookies",
        copy: "Analytics may help us understand page views, conversion events and product usage without sending sensitive answers to ad pixels.",
      },
      {
        title: "Your choice",
        copy: "The cookie banner lets visitors accept or decline optional tracking where configured.",
      },
    ],
  },
} satisfies Record<string, MarketingPage>;

const pageIcons = [
  GraduationCap,
  ShieldCheck,
  Laptop,
  Wrench,
  FileText,
  BriefcaseBusiness,
  Globe2,
  BarChart3,
] as const;

type MarketingSlug = keyof typeof marketingPages;

function getMarketingPage(slug: string): MarketingPage | undefined {
  return marketingPages[slug as MarketingSlug];
}

type PageProps = {
  params: Promise<{ marketingSlug: string }>;
};

export function generateStaticParams() {
  return Object.keys(marketingPages).map((marketingSlug) => ({
    marketingSlug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { marketingSlug } = await params;
  const page = getMarketingPage(marketingSlug);

  if (!page) {
    return {};
  }

  return {
    title: `${page.title} | Inglevo`,
    description: page.description,
  };
}

export default async function MarketingDetailPage({ params }: PageProps) {
  const { marketingSlug } = await params;
  const page = getMarketingPage(marketingSlug);

  if (!page) {
    notFound();
  }

  const isEmployerPage = page.eyebrow === "Employers";
  const primaryHref = isEmployerPage ? "/employers" : "/signup";
  const secondaryHref = resolveSecondaryHref(page.secondaryCta, page.eyebrow);
  const processSteps = buildProcessSteps(page.eyebrow);

  return (
    <>
      <PublicNav />
      <main className="bg-white text-black">
        <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:py-24">
          <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_18%_12%,rgba(123,63,242,0.12),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(56,189,248,0.14),transparent_30%)]" />
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="motion-rise">
              <p className="inline-flex rounded-full bg-[#f6f2ff] px-3.5 py-2 text-sm font-bold text-[#6f45dd]">
                {page.eyebrow}
              </p>
              <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[0.95] tracking-[-0.07em] sm:text-7xl">
                {page.title}
              </h1>
              <p className="mt-7 max-w-2xl text-xl leading-8 text-neutral-700">
                {page.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-12 rounded-full bg-black px-7 text-white hover:bg-black/90">
                  <Link href={primaryHref}>
                    {page.primaryCta}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                {page.secondaryCta ? (
                  <Button asChild variant="outline" className="h-12 rounded-full border-black/10 bg-white px-7">
                    <Link href={secondaryHref}>
                      {page.secondaryCta}
                    </Link>
                  </Button>
                ) : null}
              </div>
            </div>

            <div className="mockup-float rounded-[2rem] border border-black/5 bg-white p-4 shadow-[0_30px_90px_rgba(30,27,75,0.12)] sm:p-5">
              <div className="rounded-[1.5rem] bg-[#fbfbfd] p-5">
                <div className="flex items-center justify-between">
                  <BrandLogo />
                  <span className="rounded-full bg-[#d0f5e3] px-3 py-1 text-xs font-black uppercase tracking-[0.1em] text-emerald-800">
                    {isEmployerPage ? "Pilot" : "Active"}
                  </span>
                </div>
                <div className="mt-7 grid gap-3">
                  {page.bullets.map((bullet, index) => {
                    const Icon = pageIcons[index % pageIcons.length];

                    return (
                      <div key={bullet} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
                        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#f3efff] text-[#6f45dd]">
                          <Icon className="size-4" />
                        </span>
                        <span className="text-sm font-semibold">{bullet}</span>
                      </div>
                    );
                  })}
                </div>
                {page.metric ? (
                  <div className="mt-5 rounded-3xl bg-[linear-gradient(135deg,#7459f6,#5fb7f7_52%,#de61bf)] p-5 text-white">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/65">
                      {page.metric.label}
                    </p>
                    <p className="mt-3 text-3xl font-semibold tracking-[-0.055em]">
                      {page.metric.value}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-white/75">
                      {page.metric.copy}
                    </p>
                  </div>
                ) : null}
                <div className="mt-5 grid gap-3 rounded-3xl border border-black/5 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-neutral-400">
                      {isEmployerPage ? "Candidate signal" : "Verification profile"}
                    </p>
                    <span className="rounded-full bg-[#f3efff] px-2.5 py-1 text-[0.62rem] font-black text-[#6f45dd]">
                      82/100
                    </span>
                  </div>
                  {["English", "Setup", "Tools"].map((label, index) => (
                    <div key={label} className="grid grid-cols-[72px_1fr] items-center gap-3">
                      <span className="text-xs font-semibold text-neutral-500">{label}</span>
                      <span className="h-2 rounded-full bg-[#f4f2ef]">
                        <span
                          className="block h-full rounded-full bg-[linear-gradient(90deg,#7459f6,#5fb7f7,#de61bf)]"
                          style={{ width: `${88 - index * 7}%` }}
                        />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
                  What this gives you
                </p>
                <h2 className="mt-3 text-4xl font-semibold tracking-[-0.06em]">
                  Clearer value, stronger signals.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-neutral-500">
                Every page supports the same Inglevo promise: help LATAM talent
                or hiring teams move from claims to proof.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
            {page.sections.map((section, index) => (
              <article key={section.title} className="group rounded-[1.7rem] border border-black/5 bg-white p-6 shadow-[0_22px_80px_rgba(30,27,75,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(30,27,75,0.10)]">
                <span className="grid size-10 place-items-center rounded-full bg-[#f3efff] text-sm font-black text-[#6f45dd]">
                  {index + 1}
                </span>
                <h2 className="mt-6 text-2xl font-semibold tracking-[-0.045em]">
                  {section.title}
                </h2>
                <p className="mt-4 text-sm leading-6 text-neutral-600">
                  {section.copy}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.86fr_1.14fr]">
            <article className="rounded-[2rem] border border-black/5 bg-[#f8f8f7] p-7 shadow-[0_22px_80px_rgba(30,27,75,0.055)] sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Before Inglevo
              </p>
              <div className="mt-6 grid gap-3">
                {(isEmployerPage
                  ? ["Too many applicants", "Weak screening signals", "More wasted interviews", "Manual verification"]
                  : ["Generic CV", "Advanced English claim", "No setup proof", "No verified profile"]
                ).map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-neutral-600">
                    <span className="size-2 rounded-full bg-neutral-300" />
                    {item}
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[2rem] bg-[linear-gradient(135deg,#7459f6,#5fb7f7_52%,#de61bf)] p-7 text-white shadow-[0_26px_90px_rgba(111,69,221,0.22)] sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/65">
                With Inglevo
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {(isEmployerPage
                  ? ["Verified communication", "Setup signals", "Role tools context", "Faster filtering"]
                  : ["Role English verified", "Setup checked", "Tools checked", "Active profile link"]
                ).map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/15 px-4 py-3 text-sm font-bold backdrop-blur">
                    <Check className="size-4" />
                    {item}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-black/5 bg-white p-7 shadow-[0_22px_80px_rgba(30,27,75,0.06)] sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
                  How it works
                </p>
                <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-[-0.06em]">
                  A simple path from interest to proof.
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {processSteps.map(([title, copy], index) => (
                  <article key={title} className="rounded-3xl border border-black/5 bg-[#fbfbfd] p-5">
                    <span className="grid size-9 place-items-center rounded-full bg-[#f3efff] text-xs font-black text-[#6f45dd]">
                      {index + 1}
                    </span>
                    <h3 className="mt-5 text-lg font-semibold tracking-[-0.04em]">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-neutral-500">
                      {copy}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
            {[
              ["Talent path", "Improve your English, verify your profile and compete for stronger USD opportunities.", "/signup", "Start free"],
              ["Pricing", "See the $245 verification path and flexible ways to start.", "/pricing", "View pricing"],
              ["Employers", "Review how Inglevo can help hiring teams filter LATAM candidates faster.", "/employers", "For employers"],
            ].map(([title, copy, href, cta]) => (
              <article key={title} className="rounded-[1.7rem] border border-black/5 bg-white p-6 shadow-[0_22px_80px_rgba(30,27,75,0.055)]">
                <Sparkles className="size-5 text-[#6f45dd]" />
                <h2 className="mt-5 text-2xl font-semibold tracking-[-0.045em]">
                  {title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  {copy}
                </p>
                <Link href={href} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#6f45dd]">
                  {cta}
                  <ArrowRight className="size-4" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-[2rem] bg-[#f4f2ef] p-7 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Next step
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.055em]">
                Build stronger signals for US remote opportunities.
              </h2>
            </div>
            <Button asChild className="h-12 rounded-full bg-black px-7 text-white hover:bg-black/90">
              <Link href={primaryHref}>
                {isEmployerPage ? "Book a call" : "Start free"}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}

function resolveSecondaryHref(label: string | undefined, eyebrow: string) {
  if (!label) {
    return eyebrow === "Employers" ? "/employers" : "/pricing";
  }

  const normalized = label.toLowerCase();

  if (normalized.includes("marketplace")) {
    return "/job-marketplace";
  }

  if (normalized.includes("pricing") || normalized.includes("payment")) {
    return "/pricing";
  }

  if (normalized.includes("privacy")) {
    return "/privacy";
  }

  if (normalized.includes("about")) {
    return "/about";
  }

  if (normalized.includes("employer") || normalized.includes("call")) {
    return "/employers";
  }

  return eyebrow === "Employers" ? "/employers" : "/signup";
}

function buildProcessSteps(eyebrow: string) {
  if (eyebrow === "Employers") {
    return [
      ["Define the role", "Clarify the English, tools and setup signals needed for the job."],
      ["Review verified profiles", "Use Inglevo signals to prioritize stronger LATAM candidates."],
      ["Interview fewer people", "Spend time with candidates who already show relevant proof."],
      ["Hire with more confidence", "Use verification as a trust layer, not as a hiring guarantee."],
    ] as const;
  }

  return [
    ["Choose your role path", "Start from the kind of US remote job you want."],
    ["Improve role English", "Practice interviews, writing, meetings and job-specific communication."],
    ["Verify setup and tools", "Show the practical signals remote hiring teams care about."],
    ["Apply with your profile", "Use your Inglevo link, CV, CRM and templates to apply stronger."],
  ] as const;
}
