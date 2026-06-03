import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  FileText,
  Globe2,
  GraduationCap,
  Laptop,
  MessageSquareText,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  UserPlus,
  UsersRound,
  Video,
  Wrench,
} from "lucide-react";
import type { ReactNode } from "react";

import { InvestmentCalculator } from "@/components/landing/investment-calculator";
import { PublicFooter } from "@/components/shared/public-footer";
import { PublicNav } from "@/components/shared/public-nav";
import { Button } from "@/components/ui/button";
import { OldNewWayToggle } from "@/components/landing/old-new-way-toggle";

const logos = [
  "Role English",
  "Remote Setup",
  "Tool Signals",
  "Verified Profile",
  "Job CRM",
  "Application Assets",
  "Readiness Score",
] as const;

const processSteps = [
  ["1", "Improve & verify your English", "AI-powered app to improve and verify your English for real work situations.", "See details"],
  ["2", "Verify your remote setup", "We check your equipment, internet, workspace and availability.", "See details"],
  ["3", "Verify your role tools", "We verify the tools you use for your role and daily responsibilities.", "See details"],
  ["4", "Get your verified profile", "Receive your Inglevo profile and legally show it in your CV, LinkedIn and applications.", "See details"],
  ["5", "APPLY STRONGER", "Use stronger trust signals when US companies review LATAM candidates.", "Start path"],
] as const;

const customerJourney = [
  ["01", "Sign up and choose your role path", "Start with the US remote role you want, so every practice and verification step has a clear direction.", UserPlus],
  ["02", "Improve and verify your English", "Practice role-specific interviews, writing, meetings and professional responses until your communication is easier to trust.", GraduationCap],
  ["03", "Verify your remote setup", "Show that your internet, laptop, camera, microphone, workspace and availability can support serious remote work.", Laptop],
  ["04", "Verify your role tools", "Build signals around the tools your role actually uses, from Slack and Zendesk to HubSpot, Figma, GitHub or Notion.", Wrench],
  ["05", "Apply and track your jobs", "Use your verified profile, CV, templates and Job CRM to apply with more structure and follow up professionally.", Send],
  ["06", "Move toward better USD opportunities", "Use stronger proof to compete for US remote roles with more confidence, clarity and hiring credibility.", Trophy],
] as const;

const toolCards = [
  ["AI English Tutor", "Practice role-specific English for interviews, meetings and real remote work.", GraduationCap],
  ["Remote Setup Verification", "Show your internet, workspace, camera, microphone and availability are ready.", ShieldCheck],
  ["Role Tools Verification", "Verify familiarity with tools your target role actually uses every day.", BadgeCheck],
  ["Job Marketplace", "Access curated US remote opportunities and apply with your verified profile.", Globe2],
  ["CV Builder", "Create a professional CV that highlights your verified skills and experience.", FileText],
  ["Job CRM", "Manage your job search pipeline and follow up like a pro.", BriefcaseBusiness],
  ["Templates", "Use proven templates for cover letters, follow-ups and messages.", MessageSquareText],
  ["Analytics", "Track your progress and see how you are improving over time.", BarChart3],
] as const;

const valueStack = [
  ["AI English Tutor", "Practice the English your target role actually uses.", GraduationCap],
  ["Verified Profile", "Share one active link with English, setup and tools verified.", ShieldCheck],
  ["Remote Setup Check", "Show internet, laptop, camera, microphone and workspace signals.", Laptop],
  ["Role Tools Verification", "Build proof around tools like Slack, Zendesk, HubSpot, Figma or GitHub.", Wrench],
  ["CV Builder", "Turn your experience into a stronger US remote candidate profile.", FileText],
  ["Job CRM", "Track applications, follow-ups, interviews and opportunities in one place.", BriefcaseBusiness],
  ["Marketplace Access", "See curated US remote opportunities and apply with your verified profile.", Globe2],
  ["Community Access", "Join role-based live calls and stay consistent while applying.", UsersRound],
] as const;

const stats = [
  ["Timezone alignment", "Overlap with US working hours"],
  ["USD opportunity gap", "Earn 2x-6x more with US remote jobs"],
  ["Remote work growth", "+35% growth in remote roles since 2020"],
  ["Verified candidates stand out", "Higher response rates from US companies"],
] as const;

const rolePaths = [
  "Customer Support",
  "Sales / SDR",
  "Project Manager",
  "Software Engineer",
  "Product Designer",
  "Virtual Assistant",
  "Marketing",
  "Operations",
  "AI Support Specialist",
  "AI Operations Assistant",
  "AI Sales Assistant",
] as const;

const rolePathCards = [
  {
    role: "Customer Support",
    status: "Open path",
    tools: ["Zendesk", "Intercom", "Slack"],
    scenarios: ["angry customer", "refund policy", "ticket update"],
    score: "92%",
  },
  {
    role: "Sales / SDR",
    status: "Preview",
    tools: ["HubSpot", "GHL", "Zoom"],
    scenarios: ["pricing objection", "follow-up", "CRM note"],
    score: "86%",
  },
  {
    role: "Virtual Assistant",
    status: "Preview",
    tools: ["G-Suite", "Calendly", "ClickUp"],
    scenarios: ["calendar change", "client update", "priorities"],
    score: "84%",
  },
  {
    role: "Project Manager",
    status: "Preview",
    tools: ["Asana", "Notion", "Slack"],
    scenarios: ["deadline risk", "meeting summary", "stakeholders"],
    score: "81%",
  },
] as const;

const testimonials = [
  {
    quote: "Inglevo helped me understand what US companies actually expect. My answers sound clearer and my profile finally shows proof.",
    name: "Camila R.",
    role: "Customer Support · Colombia",
    tag: "Talent",
    highlight: "Verified profile",
  },
  {
    quote: "The verified profile makes screening easier. We can see English, setup and role signals before spending time in interviews.",
    name: "David M.",
    role: "Hiring Manager · US SaaS",
    tag: "Employer",
    highlight: "Faster screening",
  },
  {
    quote: "Before Inglevo I was translating in my head. Now I can explain my sales experience with more confidence.",
    name: "Andres P.",
    role: "Sales Specialist · Peru",
    tag: "Talent",
    highlight: "Speaking confidence",
  },
  {
    quote: "The strongest part is not just English. It is the full signal: communication, setup, tools and professionalism.",
    name: "Jessica L.",
    role: "Head of Talent · Remote Team",
    tag: "Employer",
    highlight: "Better signals",
  },
  {
    quote: "My CV looked generic. Adding the verified profile link made my application feel much more serious.",
    name: "Mariana Castillo",
    role: "Virtual Assistant · Mexico",
    tag: "Talent",
    highlight: "Stronger CV",
  },
  {
    quote: "I used the mock interviews to practice support scenarios. It felt closer to real work than a normal English class.",
    name: "Ana Torres",
    role: "Support Specialist · Ecuador",
    tag: "Talent",
    highlight: "Role practice",
  },
  {
    quote: "For LATAM hiring, proof matters. Inglevo gives us a clearer way to understand who is ready for remote collaboration.",
    name: "Mateo Ruiz",
    role: "Operations Lead · US Agency",
    tag: "Employer",
    highlight: "Hiring confidence",
  },
  {
    quote: "The Job CRM helped me stop applying randomly. I started tracking follow-ups and preparing each application better.",
    name: "Ricardo Rodriguez",
    role: "Marketing · LATAM",
    tag: "Talent",
    highlight: "Application system",
  },
  {
    quote: "I finally saw the difference between knowing English and sounding ready for the job I want.",
    name: "Sofia Herrera",
    role: "Project Coordinator · Chile",
    tag: "Talent",
    highlight: "Role English",
  },
  {
    quote: "The setup and tools signals make the candidate feel more complete before the first call.",
    name: "Michael Brown",
    role: "Founder · US Agency",
    tag: "Employer",
    highlight: "Candidate context",
  },
  {
    quote: "Practicing follow-ups and Slack updates helped me sound less translated and more professional.",
    name: "Valeria Gomez",
    role: "Virtual Assistant · Argentina",
    tag: "Talent",
    highlight: "Async writing",
  },
  {
    quote: "Instead of asking every candidate the same basics, we can focus the interview on fit and experience.",
    name: "Laura Chen",
    role: "Recruiting Lead · Remote Team",
    tag: "Employer",
    highlight: "Interview focus",
  },
  {
    quote: "The verification profile gives me something concrete to send with my applications, not just a CV.",
    name: "Daniel Perez",
    role: "Customer Support · Colombia",
    tag: "Talent",
    highlight: "Profile link",
  },
  {
    quote: "For support roles, seeing English, tools and setup in one place makes shortlisting much easier.",
    name: "Rachel Adams",
    role: "Ops Manager · E-commerce",
    tag: "Employer",
    highlight: "Shortlist quality",
  },
] as const;

const videoTestimonials = [
  {
    name: "Camila R.",
    role: "Customer Support · Colombia",
    title: "How my profile started feeling more serious",
    quote: "I stopped applying with only a generic CV.",
    duration: "0:48",
    gradient: "from-[#7459f6] via-[#5fb7f7] to-[#de61bf]",
  },
  {
    name: "Andres P.",
    role: "Sales Specialist · Peru",
    title: "Practicing sales English under pressure",
    quote: "Objections and follow-ups finally felt natural.",
    duration: "0:36",
    gradient: "from-[#101010] via-[#2b1b62] to-[#5fb7f7]",
  },
  {
    name: "David M.",
    role: "Hiring Manager · US SaaS",
    title: "Why verified profiles save screening time",
    quote: "The first interview starts with better context.",
    duration: "0:52",
    gradient: "from-[#0b0b0d] via-[#4430a8] to-[#d0f5e3]",
  },
] as const;

const marketplaceJobs = [
  ["Customer Support Specialist", "$1.6k-$2.4k/mo", "Zendesk · Slack", "92%"],
  ["Sales Development Representative", "$1.8k-$3.2k/mo", "HubSpot · Zoom", "84%"],
  ["Virtual Assistant", "$1.2k-$2.0k/mo", "Calendar · GHL", "88%"],
] as const;

const communityEvents = [
  ["English for Product Designers", "Tuesday 8pm"],
  ["English for Customer Service", "Saturday 4pm"],
  ["English for SDRs", "Wednesday 7pm"],
  ["Mock Interview Fridays", "Friday 6pm"],
  ["US Hiring Q&A", "Sunday 5pm"],
] as const;

const targetCompanies = [
  "Google",
  "Amazon",
  "Microsoft",
  "Apple",
  "Meta",
  "Salesforce",
  "HubSpot",
  "Shopify",
  "Slack",
  "Zoom",
] as const;

export default function Home() {
  return (
    <>
      <PublicNav />
      <main className="bg-white text-black">
        <HeroSection />
        <TrustLogos />
        <AudienceCards />
        <ValueStackSection />
        <PricingSection />
        <CareerInvestmentSection />
        <InvestmentCalculator />
        <InglevoProfileSection />
        <ProcessSection />
        <CustomerJourneySection />
        <ToolsSection />
        <MarketOpportunity />
        <ComparisonAndRoles />
        <OldNewWayToggle />
        <MarketplaceSection />
        <CommunitySection />
        <CompaniesSection />
        <TestimonialsSection />
        <FinalCta />
      </main>
      <PublicFooter />
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-12 pt-14 sm:px-6 lg:pb-16 lg:pt-20">
      <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(circle_at_18%_12%,rgba(123,63,242,0.12),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(56,189,248,0.14),transparent_30%)]" />
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div className="motion-rise">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#f6f2ff] px-3.5 py-2 text-sm font-semibold text-[#6f45dd]">
            <Sparkles className="size-4" />
            Built for LATAM talent pursuing US remote jobs paid in USD
          </div>
          <h1 className="mt-8 max-w-2xl text-6xl font-semibold leading-[0.95] tracking-[-0.07em] text-black sm:text-7xl lg:text-[5.8rem]">
            Become a stronger candidate for US remote jobs.
          </h1>
          <p className="mt-7 max-w-xl text-xl leading-8 text-neutral-700">
            Inglevo helps LATAM professionals adjust their role English, prove
            remote setup and tools, and build a verified profile for stronger
            USD opportunities.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-12 rounded-full bg-black px-7 text-white shadow-[0_16px_34px_rgba(0,0,0,0.18)] hover:bg-black/90">
              <Link href="/signup">Start my verification path</Link>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-full border-black/10 bg-white px-7 shadow-sm hover:bg-[#f8f8f7]">
              <Link href="/employers">I&apos;m hiring LATAM talent</Link>
            </Button>
          </div>
          <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
            <MiniStat icon={<ShieldCheck />} value="Role-first" label="English practice" />
            <MiniStat icon={<BriefcaseBusiness />} value="Setup" label="Readiness checks" />
            <MiniStat icon={<UsersRound />} value="Tools" label="Signal layer" />
          </div>
        </div>
        <VerifiedProfileMockup />
      </div>
    </section>
  );
}

function MiniStat({ icon, value, label }: { icon: ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-9 place-items-center rounded-full bg-[#f3efff] text-[#6f45dd] [&_svg]:size-4">
        {icon}
      </span>
      <div>
        <p className="text-base font-semibold">{value}</p>
        <p className="text-xs text-neutral-500">{label}</p>
      </div>
    </div>
  );
}

function ProfilePhoto({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const dimensions = size === "lg" ? "size-14" : size === "sm" ? "size-8" : "size-10";
  const textSize = size === "lg" ? "text-lg" : size === "sm" ? "text-xs" : "text-sm";
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      aria-label={`${name} example avatar`}
      className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-[linear-gradient(135deg,#7459f6,#5fb7f7_52%,#de61bf)] font-black text-white shadow-sm ring-2 ring-white ${dimensions} ${textSize}`}
      role="img"
    >
      {initials || "IN"}
      <span className="absolute inset-0 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06),inset_0_-8px_18px_rgba(0,0,0,0.08)]" />
    </span>
  );
}

function VerifiedProfileMockup() {
  const rows = ["English", "Remote Setup", "Role Tools", "Verified Profile"];
  const tools = ["Zendesk", "Slack", "Intercom", "G-Suite", "Canva", "+6 more"];

  return (
    <div className="motion-rise mockup-float rounded-[2rem] border border-black/5 bg-white p-3 shadow-[0_30px_90px_rgba(30,27,75,0.13)]">
      <div className="rounded-[1.7rem] border border-black/5 bg-[#fbfbfd]">
        <div className="flex items-center justify-between border-b border-black/5 px-5 py-3">
          <div className="flex gap-1.5">
            <span className="size-2 rounded-full bg-neutral-300" />
            <span className="size-2 rounded-full bg-neutral-300" />
            <span className="size-2 rounded-full bg-neutral-300" />
          </div>
          <div className="max-w-[150px] truncate rounded-full bg-white px-3 py-1 text-xs font-semibold text-neutral-600 shadow-sm sm:max-w-none">
            inglevo.com/ricardorodriguez
          </div>
          <button className="hidden rounded-full bg-white px-3 py-1 text-xs font-semibold shadow-sm sm:block">
            Copy link
          </button>
        </div>
        <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[1fr_230px]">
          <div>
            <div className="flex items-start gap-4">
              <ProfilePhoto name="Ricardo Rodriguez" size="lg" />
              <div>
                <h2 className="text-xl font-semibold tracking-[-0.04em]">Ricardo Rodriguez</h2>
                <p className="text-sm text-neutral-600">Customer Support Specialist</p>
                <p className="mt-1 text-sm text-neutral-500">Bogotá, Colombia</p>
              </div>
              <span className="ml-auto rounded-full bg-[#d0f5e3] px-3 py-1 text-xs font-semibold text-emerald-700">
                Active
              </span>
            </div>
            <div className="mt-7 grid gap-3">
              {rows.map((row) => (
                <div key={row} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <BadgeCheck className="size-4 text-neutral-500" />
                    <span className="text-sm font-semibold">{row}</span>
                  </div>
                  <span className="rounded-full bg-[#d0f5e3] px-3 py-1 text-xs font-semibold text-emerald-700">
                    Verified
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between rounded-2xl border border-emerald-400/40 bg-[linear-gradient(135deg,#d0f5e3,#ffffff)] px-4 py-3 shadow-[0_14px_34px_rgba(16,185,129,0.18)]">
                <div className="flex items-center gap-3">
                  <BriefcaseBusiness className="size-4 text-emerald-700" />
                  <span className="text-sm font-semibold">Outcome Signal</span>
                </div>
                <span className="rounded-full bg-emerald-500 px-3.5 py-1 text-xs font-black tracking-[0.12em] text-white shadow-[0_8px_18px_rgba(16,185,129,0.28)]">
                  HIRED
                </span>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold">Inglevo Verified Profile</p>
            <p className="mt-4 flex items-center gap-2 text-2xl font-semibold tracking-[-0.05em] text-emerald-600">
              <Check className="size-5" />
              Active
            </p>
            <p className="mt-4 text-sm leading-6 text-neutral-500">
              This profile is active and verified by Inglevo.
            </p>
            <p className="mt-6 text-xs font-semibold text-neutral-500">Verified on</p>
            <p className="text-sm font-semibold">Apr 28, 2026</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 border-t border-black/5 px-6 py-4">
          {tools.map((tool) => (
            <span key={tool} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-neutral-600 shadow-sm">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function TrustLogos() {
  return (
    <section className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-sm font-semibold text-neutral-500">
          Signals Inglevo helps candidates build
        </p>
        <div className="brand-marquee mt-8 overflow-hidden">
          <div className="marquee-track flex w-max items-center gap-6">
            {[...logos, ...logos, ...logos].map((logo, index) => (
              <LogoWordmark key={`${logo}-${index}`} logo={logo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoWordmark({ logo }: { logo: (typeof logos)[number] }) {
  return (
    <span className="min-w-fit rounded-full border border-black/5 bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-neutral-500 shadow-sm">
      {logo}
    </span>
  );
}

function AudienceCards() {
  return (
    <section className="px-4 py-10 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.18fr_0.82fr]">
        <AudienceCard
          href="/talent"
          icon={<GraduationCap className="size-5" />}
          title="Your path to stronger US remote jobs."
          kicker="For talent"
          copy="Adjust your role English, verify your setup and tools, build your CV, and apply with a profile US companies can understand faster."
          variant="purple"
        >
          <ProfileStrengthMini />
        </AudienceCard>
        <AudienceCard
          href="/employers"
          icon={<UsersRound className="size-5" />}
          title="A stronger signal for hiring teams."
          kicker="For companies"
          copy="Inglevo gives employers a faster way to review communication, setup and role signals before interviews."
          variant="mint"
        >
          <CandidateMatchMini />
        </AudienceCard>
      </div>
    </section>
  );
}

function ValueStackSection() {
  return (
    <section className="px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-black/5 bg-[#fbfbfd] shadow-[0_24px_90px_rgba(30,27,75,0.07)]">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.82fr_1.18fr] lg:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
              What your $245 path includes
            </p>
            <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-5xl">
              Not just English lessons. A stronger remote candidate system.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-neutral-600">
              The goal is simple: improve your role English, verify the signals
              US hiring teams care about, and apply with a profile that feels
              more credible than a generic CV.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {valueStack.map(([title, copy, Icon]) => (
              <article key={title} className="rounded-3xl border border-black/5 bg-white p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-[#f3efff] text-[#6f45dd]">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold tracking-[-0.02em]">
                      {title}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-neutral-500">
                      {copy}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function InglevoProfileSection() {
  const profileSignals = [
    ["English", "Verified for Customer Support"],
    ["Remote setup", "Internet, camera, mic, workspace"],
    ["Role tools", "Zendesk, Slack, Intercom, G-Suite"],
    ["Verified profile", "Active profile + hiring status"],
  ] as const;

  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 overflow-hidden rounded-[2rem] border border-black/5 bg-white p-7 shadow-[0_24px_90px_rgba(30,27,75,0.07)] sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Inglevo Verified Profile
          </p>
          <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-[0.98] tracking-[-0.065em] sm:text-6xl">
            “Send me your Inglevo.”
          </h2>
          <p className="mt-6 max-w-xl text-xl leading-8 text-neutral-600">
            Your Inglevo is an active verification profile you can share in
            your CV, LinkedIn, applications or recruiter messages. It turns
            “I speak English” into visible proof of role English, setup and
            tools.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {profileSignals.map(([label, value]) => (
              <div key={label} className="rounded-3xl border border-black/5 bg-[#fbfbfa] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
                  {label}
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-neutral-800">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(circle_at_20%_20%,rgba(111,69,221,0.16),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(95,183,247,0.18),transparent_32%)]" />
          <div className="relative rounded-[2rem] border border-black/5 bg-[#fbfbfd] p-3 shadow-[0_30px_100px_rgba(30,27,75,0.13)] sm:p-4">
            <div className="flex items-center justify-between rounded-t-[1.6rem] border-b border-black/5 bg-white px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-neutral-300" />
                <span className="size-2 rounded-full bg-neutral-300" />
                <span className="size-2 rounded-full bg-neutral-300" />
              </div>
              <span className="rounded-full bg-[#d0f5e3] px-3 py-1 text-xs font-black tracking-[0.1em] text-emerald-800">
                ACTIVE
              </span>
            </div>

            <div className="grid gap-5 rounded-b-[1.6rem] bg-white p-4 sm:p-5 lg:grid-cols-[1fr_230px]">
              <div>
                <div className="flex items-start gap-4">
                  <ProfilePhoto name="Ricardo Rodriguez" size="lg" />
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-0.045em]">
                      Ricardo Rodriguez
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-neutral-600">
                      Customer Support Specialist
                    </p>
                    <p className="mt-1 text-sm text-neutral-500">
                      inglevo.com/ricardorodriguez
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  {[
                    ["Role English", "82/100"],
                    ["Remote Setup", "Passed"],
                    ["Role Tools", "Verified"],
                    ["Profile Status", "Active"],
                  ].map(([label, value], index) => (
                    <div key={label} className="flex items-center justify-between rounded-2xl bg-[#f8f8f7] px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className={`grid size-8 place-items-center rounded-full ${index === 0 ? "bg-[#f3efff] text-[#6f45dd]" : "bg-[#d0f5e3] text-emerald-700"}`}>
                          <Check className="size-4" />
                        </span>
                        <span className="text-sm font-semibold">{label}</span>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-neutral-700 shadow-sm">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-[linear-gradient(135deg,#7459f6,#5fb7f7_52%,#de61bf)] p-5 text-white shadow-[0_20px_70px_rgba(111,69,221,0.22)]">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/65">
                  Recruiter view
                </p>
                <p className="mt-5 text-3xl font-semibold tracking-[-0.055em]">
                  Inglevo Verified
                </p>
                <p className="mt-3 text-sm leading-6 text-white/75">
                  Active public profile with verified hiring signals.
                </p>
                <div className="mt-6 rounded-2xl bg-white/15 p-4 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
                    Suggested message
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6">
                    “Can you send me your Inglevo profile?”
                  </p>
                </div>
                <span className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-xs font-black tracking-[0.12em] text-[#6f45dd]">
                  SHAREABLE LINK
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AudienceCard({
  icon,
  kicker,
  title,
  copy,
  href,
  children,
  variant,
}: {
  icon: ReactNode;
  kicker: string;
  title: string;
  copy: string;
  href: string;
  children: ReactNode;
  variant: "purple" | "mint";
}) {
  return (
    <article className={`grid gap-6 rounded-[2rem] border border-black/5 p-7 shadow-[0_22px_70px_rgba(30,27,75,0.07)] transition hover:-translate-y-1 lg:grid-cols-[1fr_190px] ${variant === "purple" ? "bg-[#f7f3ff]" : "bg-[#f1fff8]"}`}>
      <div>
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span className={`grid size-9 place-items-center rounded-full ${variant === "purple" ? "bg-white text-[#7b3ff2]" : "bg-white text-emerald-600"}`}>
            {icon}
          </span>
          {kicker}
        </div>
        <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-[-0.055em]">{title}</h2>
        <p className="mt-4 max-w-sm text-sm leading-6 text-neutral-700">{copy}</p>
        <Link href={href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#4f46e5]">
          Learn more
          <ArrowRight className="size-4" />
        </Link>
      </div>
      {children}
    </article>
  );
}

function ProfileStrengthMini() {
  return (
    <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_18px_45px_rgba(30,27,75,0.08)]">
      <div className="flex items-center justify-between border-b border-black/5 bg-[#fbfbfd] px-4 py-3">
        <div className="flex gap-1">
          <span className="size-1.5 rounded-full bg-neutral-300" />
          <span className="size-1.5 rounded-full bg-neutral-300" />
          <span className="size-1.5 rounded-full bg-neutral-300" />
        </div>
        <span className="rounded-full bg-[#d0f5e3] px-2.5 py-1 text-[0.62rem] font-black text-emerald-800">
          Active
        </span>
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold text-neutral-400">Profile strength</p>
        <div className="mt-3 flex items-end justify-between gap-4">
          <p className="text-4xl font-semibold tracking-[-0.06em] text-emerald-600">92</p>
          <div className="relative grid size-14 place-items-center rounded-full bg-[conic-gradient(#10b981_0_92%,#edf2f7_92%)]">
            <span className="grid size-10 place-items-center rounded-full bg-white text-[0.65rem] font-black">92</span>
          </div>
        </div>
        <div className="mt-4 grid gap-2">
        {["English", "Remote Setup", "Role Tools", "Verified Profile"].map((item, index) => (
          <div key={item} className="grid grid-cols-[80px_1fr] items-center gap-3">
            <span className="text-xs text-neutral-500">{item}</span>
            <span className="h-1.5 rounded-full bg-[#d0f5e3]">
              <span className="block h-full rounded-full bg-emerald-500" style={{ width: `${92 - index * 8}%` }} />
            </span>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

function CandidateMatchMini() {
  return (
    <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_18px_45px_rgba(30,27,75,0.08)]">
      <div className="border-b border-black/5 bg-[#fbfbfd] px-5 py-3">
        <p className="text-xs font-semibold text-neutral-400">Top verified matches</p>
      </div>
      <div className="p-5">
      {["Ricardo Rodriguez", "Mariana Castillo", "Andres Morales"].map((name, index) => (
        <div key={name} className="mt-4 flex items-center gap-3">
          <ProfilePhoto name={name} size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold">{name}</p>
            <p className="text-[11px] text-neutral-500">English · Setup · Tools</p>
          </div>
          <span className="rounded-full bg-[#d0f5e3] px-2 py-1 text-[11px] font-bold text-emerald-700">{92 - index * 7}%</span>
        </div>
      ))}
      </div>
    </div>
  );
}

function ProcessSection() {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="mx-auto max-w-2xl text-center text-4xl font-semibold leading-tight tracking-[-0.055em]">
          The verification process to access <span className="text-[#6f45dd]">stronger USD opportunities</span>
        </h2>
        <div className="relative mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-[#dfdbd6] to-transparent lg:block" />
          {processSteps.map(([number, title, copy, cta], index) => (
            <article key={title} className="relative">
              <span className={`grid size-12 place-items-center rounded-full text-sm font-semibold text-white shadow-lg ${index === 0 ? "bg-[#6f45dd]" : index === 1 ? "bg-[#5f8ef7]" : index === 2 ? "bg-emerald-500" : index === 3 ? "bg-[#58b98f]" : "bg-[linear-gradient(135deg,#7459f6,#5fb7f7,#de61bf)]"}`}>
                {number}
              </span>
              <h3 className={`mt-8 font-semibold leading-tight tracking-[-0.04em] ${title === "APPLY STRONGER" ? "text-xl text-[#6f45dd]" : "text-base"}`}>{title}</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">{copy}</p>
              <Link href="/signup" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#4f46e5]">
                {cta}
                <ArrowRight className="size-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CustomerJourneySection() {
  return (
    <section className="bg-[#f4f2ef] px-4 py-20 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Candidate journey
          </p>
          <h2 className="mt-6 max-w-xl text-4xl font-semibold leading-[0.98] tracking-[-0.065em] sm:text-6xl">
            From signup to stronger USD opportunities.
          </h2>
          <p className="mt-7 max-w-lg text-xl leading-8 text-neutral-600">
            A clear path for LATAM talent to improve role English, prove remote
            work signals and apply with a profile US companies can trust faster.
          </p>
          <div className="mt-8 rounded-3xl border border-black/5 bg-white p-5 shadow-[0_18px_60px_rgba(30,27,75,0.055)]">
            <p className="text-sm font-semibold text-neutral-900">
              The goal is not another certificate.
            </p>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              The goal is a verified candidate profile that helps you compete
              with more credibility for remote roles paid in USD.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute bottom-6 left-6 top-6 w-px bg-gradient-to-b from-[#6f45dd] via-[#5fb7f7] to-[#d0f5e3] sm:left-8" />
          <div className="grid gap-5">
            {customerJourney.map(([number, title, copy, Icon], index) => (
              <article
                key={title}
                className="journey-step relative grid gap-4 rounded-[1.6rem] border border-black/5 bg-white p-5 pl-16 shadow-[0_22px_70px_rgba(30,27,75,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(30,27,75,0.10)] sm:p-6 sm:pl-24"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <span className="absolute left-3 top-6 grid size-9 place-items-center rounded-full bg-[linear-gradient(135deg,#7459f6,#5fb7f7,#de61bf)] text-xs font-black text-white shadow-[0_14px_32px_rgba(111,69,221,0.24)] sm:left-4 sm:size-12 sm:text-sm">
                  {number}
                </span>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-0.045em]">
                      {title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600">
                      {copy}
                    </p>
                  </div>
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#f6f2ff] text-[#6f45dd]">
                    <Icon className="size-5" />
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(index === 0
                    ? ["Role path", "Profile", "Goal"]
                    : index === 1
                      ? ["Speaking", "Writing", "Interview"]
                      : index === 2
                        ? ["Internet", "Camera", "Workspace"]
                        : index === 3
                          ? ["Slack", "CRM", "Role tools"]
                          : index === 4
                            ? ["CV", "Job CRM", "Follow-up"]
                            : ["Verified profile", "USD roles", "Trust signal"]
                  ).map((tag) => (
                    <span key={tag} className="rounded-full bg-[#f8f8f7] px-3 py-1.5 text-xs font-bold text-neutral-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ToolsSection() {
  return (
    <section id="features" className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-black/5 bg-[#fbfbfd] p-6 shadow-[0_22px_80px_rgba(30,27,75,0.055)] sm:p-8">
        <h2 className="text-center text-3xl font-semibold tracking-[-0.055em]">Access our Inglevo tools</h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-4">
          {toolCards.map(([title, copy, Icon]) => (
            <article key={title} className="rounded-[1.4rem] border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(30,27,75,0.10)]">
              <ToolMockup title={title} icon={<Icon className="size-4" />} />
              <h3 className="mt-5 text-base font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">{copy}</p>
              <Link href="/signup" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#4f46e5]">
                Learn more
                <ArrowRight className="size-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolMockup({ title, icon }: { title: string; icon: ReactNode }) {
  const shellClass =
    "relative h-40 overflow-hidden rounded-2xl border border-black/5 bg-[linear-gradient(135deg,#f8f5ff,#ffffff_48%,#eefcff)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]";
  const pillClass = "rounded-full bg-white/80 px-3 py-1.5 text-[0.65rem] font-bold text-neutral-700 shadow-sm";

  if (title === "AI English Tutor") {
    return (
      <div className={shellClass}>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-neutral-800">
            {icon}
            AI Tutor
          </span>
          <span className="rounded-full bg-[#d0f5e3] px-2.5 py-1 text-[0.65rem] font-bold">84/100</span>
        </div>
        <div className="mt-4 rounded-2xl bg-white p-3 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-full bg-black text-[0.6rem] font-bold text-white">AI</span>
            <div>
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.12em] text-neutral-400">Interview prompt</p>
              <p className="text-[0.78rem] font-bold leading-tight text-neutral-900">Tell me about yourself.</p>
            </div>
          </div>
          <div className="mt-3 rounded-xl bg-[#f4f2ef] px-3 py-2">
            <p className="text-[0.68rem] font-semibold leading-snug text-neutral-600">
              Clear answer. Add one outcome and a stronger closing.
            </p>
          </div>
        </div>
        <div className="absolute bottom-3 left-4 right-4 grid grid-cols-3 gap-2">
          {[
            ["Clarity", "88%"],
            ["Tone", "82%"],
            ["Structure", "79%"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl bg-white/85 px-2.5 py-2 shadow-sm">
              <p className="text-[0.55rem] font-bold uppercase tracking-[0.08em] text-neutral-400">{label}</p>
              <p className="mt-1 text-[0.72rem] font-bold text-neutral-900">{value}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (title === "Remote Setup Verification") {
    return (
      <div className={shellClass}>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-neutral-800">{icon} Setup check</span>
          <span className="rounded-full bg-[#d0f5e3] px-2.5 py-1 text-[0.65rem] font-bold">Passed</span>
        </div>
        <div className="mt-4 grid grid-cols-[0.9fr_1.1fr] gap-3">
          <div className="rounded-2xl bg-white p-3 shadow-sm">
            <div className="mx-auto h-12 w-16 rounded-xl border-4 border-neutral-900 bg-[linear-gradient(180deg,#d0f5e3,#ffffff)]" />
            <div className="mx-auto mt-1 h-1.5 w-10 rounded-full bg-neutral-900" />
            <p className="mt-2 text-center text-[0.65rem] font-bold text-neutral-500">Device ready</p>
          </div>
          <div className="grid gap-2">
            {["Internet 92 Mbps", "Camera ready", "Quiet space"].map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-xl bg-white px-2.5 py-2 shadow-sm">
                <Check className="size-3.5 text-emerald-500" />
                <span className="text-[0.65rem] font-bold text-neutral-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (title === "Role Tools Verification") {
    return (
      <div className={shellClass}>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-neutral-800">{icon} Tools</span>
          <span className="text-[0.65rem] font-bold text-[#6f45dd]">6 verified</span>
        </div>
        <div className="mt-4 rounded-2xl bg-white p-3 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-[0.62rem] font-black uppercase tracking-[0.12em] text-neutral-400">Support path</p>
            <span className="h-1.5 w-16 rounded-full bg-[#d0f5e3]">
              <span className="block h-full w-[84%] rounded-full bg-emerald-500" />
            </span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {["Slack", "Zendesk", "GHL", "HubSpot", "Figma", "Notion"].map((tool) => (
              <span key={tool} className={pillClass}>{tool}</span>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 h-1.5 w-[84%] rounded-r-full bg-[linear-gradient(90deg,#7459f6,#5fb7f7,#de61bf)]" />
      </div>
    );
  }

  if (title === "Job Marketplace") {
    return (
      <div className={shellClass}>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-neutral-800">{icon} Matches</span>
          <span className="rounded-full bg-[#d0f5e3] px-2.5 py-1 text-[0.65rem] font-bold">92%</span>
        </div>
        <div className="mt-4 rounded-2xl bg-white p-3 shadow-sm">
          <div className="mb-3 h-7 rounded-full bg-[#f4f2ef] px-3 py-2 text-[0.6rem] font-bold text-neutral-400">
            Search US remote roles
          </div>
          {["Support Specialist", "SDR Remote", "Virtual Assistant"].map((role, index) => (
            <div key={role} className="mt-2 flex items-center justify-between rounded-xl border border-black/5 bg-white px-2.5 py-2">
              <span className="text-[0.68rem] font-bold text-neutral-800">{role}</span>
              <span className="text-[0.62rem] font-black text-emerald-600">{index === 0 ? "92%" : index === 1 ? "86%" : "85%"}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (title === "CV Builder") {
    return (
      <div className={shellClass}>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-neutral-800">{icon} CV Builder</span>
          <span className="rounded-full bg-white px-2.5 py-1 text-[0.65rem] font-bold text-[#6f45dd]">ATS 91%</span>
        </div>
        <div className="mt-4 grid grid-cols-[1fr_0.55fr] gap-3">
          <div className="rounded-2xl bg-white p-3 shadow-sm">
            <div className="flex items-center gap-2">
              <ProfilePhoto name="Ricardo Rodriguez" size="sm" />
              <div className="min-w-0">
                <div className="h-2 w-16 rounded-full bg-neutral-900" />
                <div className="mt-1.5 h-1.5 w-12 rounded-full bg-neutral-200" />
              </div>
            </div>
            <div className="mt-3 h-1.5 w-full rounded-full bg-neutral-200" />
            <div className="mt-2 h-1.5 w-4/5 rounded-full bg-neutral-200" />
            <div className="mt-3 rounded-lg bg-[#d0f5e3] px-2 py-1 text-[0.58rem] font-black text-emerald-800">Verified link embedded</div>
          </div>
          <div className="rounded-2xl bg-white p-3 shadow-sm">
            <p className="text-[0.6rem] font-black uppercase tracking-[0.08em] text-neutral-400">Export</p>
            <div className="mt-3 grid h-14 place-items-center rounded-xl bg-[linear-gradient(180deg,#d0f5e3,#fff)] text-[0.62rem] font-black text-neutral-700">PDF</div>
          </div>
        </div>
      </div>
    );
  }

  if (title === "Job CRM") {
    return (
      <div className={shellClass}>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-neutral-800">{icon} Pipeline</span>
          <span className="text-[0.65rem] font-bold text-neutral-400">8 active</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            ["Saved", "3", "bg-[#d0f5e3]"],
            ["Applied", "4", "bg-[#dfdbd6]"],
            ["Interview", "1", "bg-[linear-gradient(135deg,#7459f6,#5fb7f7)]"],
          ].map(([stage, count, color]) => (
            <div key={stage} className="rounded-2xl bg-white p-2 shadow-sm">
              <p className="text-[0.55rem] font-bold uppercase tracking-[0.08em] text-neutral-400">{stage}</p>
              <div className={`mt-2 grid h-14 place-items-center rounded-xl ${color}`}>
                <span className="rounded-full bg-white/80 px-2 py-1 text-[0.65rem] font-black text-neutral-800">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (title === "Templates") {
    return (
      <div className={shellClass}>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-neutral-800">{icon} Templates</span>
          <span className="rounded-full bg-white px-2.5 py-1 text-[0.65rem] font-bold">Copy</span>
        </div>
        <div className="mt-4 rounded-2xl bg-white p-3 shadow-sm">
          <div className="rounded-2xl bg-[#f8f8f7] px-3 py-2">
            <p className="text-[0.62rem] font-black uppercase tracking-[0.1em] text-neutral-400">Recruiter message</p>
            <p className="mt-1 text-[0.68rem] font-semibold leading-snug text-neutral-700">Hi Sarah, I saw your support role...</p>
          </div>
          <div className="mt-2 flex gap-2">
            {["Salary script", "Follow-up"].map((template) => (
              <span key={template} className="flex-1 rounded-xl bg-[#d0f5e3] px-2 py-2 text-center text-[0.6rem] font-black text-emerald-800">{template}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={shellClass}>
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-xs font-bold text-neutral-800">{icon} Analytics</span>
        <span className="rounded-full bg-[#d0f5e3] px-2.5 py-1 text-[0.65rem] font-bold">+24%</span>
      </div>
      <div className="mt-4 grid grid-cols-[1fr_0.55fr] gap-3">
        <div className="rounded-2xl bg-white p-3 shadow-sm">
          <div className="flex h-20 items-end gap-2">
            {[24, 44, 36, 62, 52, 78].map((height, index) => (
              <span key={index} className="flex-1 rounded-t-xl bg-[linear-gradient(180deg,#5fb7f7,#7459f6)]" style={{ height }} />
            ))}
          </div>
          <p className="mt-2 text-[0.62rem] font-black uppercase tracking-[0.1em] text-neutral-400">Profile views</p>
        </div>
        <div className="rounded-2xl bg-white p-3 shadow-sm">
          <div className="relative grid size-16 place-items-center rounded-full bg-[conic-gradient(#6f45dd_0_76%,#d0f5e3_76%)]">
            <span className="grid size-11 place-items-center rounded-full bg-white text-[0.68rem] font-black">76%</span>
          </div>
          <p className="mt-2 text-[0.62rem] font-black text-neutral-400">Progress</p>
        </div>
      </div>
    </div>
  );
}

function MarketOpportunity() {
  return (
    <section className="px-4 py-14 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
        <div>
          <h2 className="text-4xl font-semibold leading-tight tracking-[-0.055em]">
            LATAM talent. <br /> Global opportunity.
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-neutral-600">
            The numbers show the opportunity. Inglevo helps you get ready for it.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map(([title, copy], index) => (
            <article key={title} className="rounded-3xl border border-black/5 bg-white p-6 shadow-[0_18px_60px_rgba(30,27,75,0.055)]">
              <p className="text-3xl font-semibold tracking-[-0.06em] text-[#6f45dd]">
                {index === 0 ? "85%" : index === 1 ? "USD $50K+" : index === 2 ? "+35%" : "48%"}
              </p>
              <h3 className="mt-5 text-sm font-semibold">{title}</h3>
              <p className="mt-2 text-xs leading-5 text-neutral-500">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonAndRoles() {
  const comparisonRows = [
    ["Generic CV", "CV with verified profile link"],
    ["“Advanced English” claim", "Role English verified"],
    ["No setup proof", "Remote setup checked"],
    ["No tool proof", "Role tools checked"],
    ["No active profile", "Public active verification profile"],
  ] as const;

  return (
    <section className="px-4 py-14 sm:px-6">
      <div className="mx-auto grid max-w-7xl items-stretch gap-5 lg:grid-cols-2">
        <article className="flex h-full flex-col rounded-[2rem] border border-black/5 bg-white p-7 shadow-[0_22px_80px_rgba(30,27,75,0.06)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
            The difference
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.055em]">
            Generic applicants vs Inglevo Verified.
          </h2>
          <div className="mt-7 overflow-hidden rounded-3xl border border-black/10">
            <div className="grid grid-cols-2 bg-[#f8f8f7] text-xs font-black uppercase tracking-[0.12em] text-neutral-500">
              <div className="border-r border-black/10 px-4 py-3">Traditional</div>
              <div className="px-4 py-3">Inglevo Verified</div>
            </div>
            <div className="grid gap-px bg-black/10">
              {comparisonRows.map(([oldWay, newWay]) => (
                <div key={oldWay} className="grid grid-cols-2 bg-white">
                  <div className="flex min-h-16 items-center gap-3 border-r border-black/10 px-4 py-4 text-sm font-semibold text-neutral-600">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#f4f2ef]">
                      <Check className="size-4 text-neutral-400" />
                    </span>
                    {oldWay}
                  </div>
                  <div className="flex min-h-16 items-center gap-3 bg-[linear-gradient(135deg,#f3efff,#ffffff)] px-4 py-4 text-sm font-bold text-neutral-900">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#d0f5e3]">
                      <Check className="size-4 text-emerald-700" />
                    </span>
                    {newWay}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              ["Profile", "Active link", "Share one verified profile instead of scattered claims."],
              ["Signal", "Proof", "Show English, setup and role tools in one place."],
              ["Outcome", "USD roles", "Compete for stronger US remote opportunities."],
            ].map(([label, value, copy]) => (
              <div key={label} className="rounded-3xl border border-black/5 bg-[#fbfbfd] p-4">
                <p className="text-[0.62rem] font-black uppercase tracking-[0.14em] text-neutral-400">
                  {label}
                </p>
                <p className="mt-2 text-xl font-semibold tracking-[-0.05em] text-[#6f45dd]">
                  {value}
                </p>
                <p className="mt-2 text-xs leading-5 text-neutral-500">
                  {copy}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-3xl bg-[linear-gradient(135deg,#f3efff,#ffffff)] p-5">
            <p className="text-sm font-semibold tracking-[-0.02em]">
              Inglevo turns your profile into a hiring signal.
            </p>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              The goal is simple: make it easier for US companies to understand
              why you are ready before the first interview.
            </p>
          </div>
        </article>
        <article className="flex h-full flex-col rounded-[2rem] border border-black/5 bg-[#fbfbfd] p-7 shadow-[0_22px_80px_rgba(30,27,75,0.06)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Role paths
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.055em]">
                Verify for more than one kind of remote role.
              </h2>
            </div>
            <span className="w-fit rounded-full bg-[#d0f5e3] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-emerald-800">
              Customer Support open now
            </span>
          </div>

          <div className="mt-7 grid gap-3">
            {rolePathCards.map((path, index) => (
              <div
                key={path.role}
                className={`group rounded-3xl border p-4 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(30,27,75,0.10)] ${
                  index === 0
                    ? "border-[#6f45dd]/25 bg-[linear-gradient(135deg,#f3efff,#ffffff)]"
                    : "border-black/5 bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-semibold tracking-[-0.045em]">
                        {path.role}
                      </h3>
                      <span className={`rounded-full px-2.5 py-1 text-[0.62rem] font-black uppercase tracking-[0.1em] ${
                        index === 0 ? "bg-[#6f45dd] text-white" : "bg-[#f4f2ef] text-neutral-500"
                      }`}>
                        {path.status}
                      </span>
                    </div>
                    <p className="mt-2 text-xs font-semibold text-neutral-500">
                      Tools: {path.tools.join(" · ")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-semibold tracking-[-0.055em] text-[#6f45dd]">
                      {path.score}
                    </p>
                    <p className="text-[0.62rem] font-bold uppercase tracking-[0.1em] text-neutral-400">
                      match
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {path.scenarios.map((scenario) => (
                    <span key={scenario} className="rounded-full bg-[#f8f8f7] px-3 py-1.5 text-xs font-semibold text-neutral-600">
                      {scenario}
                    </span>
                  ))}
                </div>
                <div className="mt-4 h-1.5 rounded-full bg-[#f4f2ef]">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#7459f6,#5fb7f7,#de61bf)] transition-all duration-500 group-hover:w-full"
                    style={{ width: path.score }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2 border-t border-black/5 pt-5">
            {rolePaths.slice(4).map((role) => (
              <span key={role} className="rounded-full border border-black/5 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-600">
                {role}
              </span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

function MarketplaceSection() {
  return (
    <section className="bg-[#f4f2ef] px-4 py-20 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Exclusive Job Marketplace
          </p>
          <h2 className="mt-6 max-w-xl text-4xl font-semibold leading-[0.98] tracking-[-0.065em] sm:text-6xl">
            Apply with your verified profile.
          </h2>
          <p className="mt-7 max-w-xl text-xl leading-8 text-neutral-600">
            Access a curated marketplace of US remote job opportunities and
            apply with stronger verification signals.
          </p>
          <Link href="/job-marketplace" className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white">
            See all jobs
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-[0_24px_90px_rgba(30,27,75,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Marketplace preview
          </p>
          <div className="mt-7 grid gap-4">
            {marketplaceJobs.map(([title, salary, tools, match]) => (
              <div key={title} className="grid gap-4 rounded-3xl border border-black/10 bg-white p-5 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <p className="text-xl font-semibold tracking-[-0.04em]">{title}</p>
                  <p className="mt-2 text-base text-neutral-600">{salary} · {tools}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#6f45dd]">
                    Preferred: Inglevo Verified
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-[#d0f5e3] px-4 py-2 text-sm font-semibold">
                    {match} match
                  </span>
                  <Button className="h-10 rounded-full bg-black px-5 text-white hover:bg-black/90">
                    Apply
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CommunitySection() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Community
          </p>
          <h2 className="mt-6 max-w-xl text-4xl font-semibold leading-[0.98] tracking-[-0.065em] sm:text-6xl">
            Weekly live calls for specific roles.
          </h2>
          <p className="mt-7 max-w-xl text-xl leading-8 text-neutral-600">
            Stay consistent with role-based English sessions, mock interviews
            and US hiring Q&A.
          </p>
        </div>
        <LiveCallMockup />
      </div>
    </section>
  );
}

function LiveCallMockup() {
  const attendees = [
    ["CR", "Customer Support", "Speaking practice", "bg-[#d0f5e3] text-emerald-900"],
    ["SD", "Sales / SDR", "Objection practice", "bg-[#f3efff] text-[#6f45dd]"],
    ["UX", "Product Design", "Design review", "bg-[#dfdbd6] text-neutral-900"],
    ["PM", "Project Mgmt", "Status update", "bg-[#eaf6ff] text-sky-900"],
  ] as const;

  return (
    <div className="rounded-[2rem] border border-black/10 bg-white p-4 shadow-[0_24px_90px_rgba(30,27,75,0.08)] sm:p-5">
      <div className="overflow-hidden rounded-[1.6rem] bg-[#111111] p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
              Live role call
            </p>
            <p className="mt-1 text-lg font-semibold tracking-[-0.04em]">
              English for Customer Service
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-1.5 text-xs font-bold text-emerald-200">
            <span className="size-2 rounded-full bg-emerald-300" />
            Live
          </span>
        </div>

        <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
          {attendees.map(([initials, role, activity, color], index) => (
            <div
              key={initials}
              className={`relative min-h-20 overflow-hidden rounded-2xl border border-white/10 ${index === 0 ? "bg-[linear-gradient(135deg,#7459f6,#5fb7f7_55%,#de61bf)]" : "bg-white/8"}`}
            >
              <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/45 to-transparent" />
              <div className="absolute inset-4 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className={`grid size-7 shrink-0 place-items-center rounded-full text-[0.62rem] font-black ring-2 ring-white/10 ${color}`}>
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">{role}</p>
                    <p className="truncate text-xs text-white/55">{activity}</p>
                  </div>
                </div>
                <Video className="size-3.5 shrink-0 text-white/60" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-white/8 p-3">
          {["Mock answer", "Role vocabulary", "Live feedback", "US hiring Q&A"].map((item) => (
            <span key={item} className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/80">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-[1.4rem] border border-black/5 bg-[#fbfbfd] p-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Upcoming calls
          </p>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#d0f5e3] px-3 py-1.5 text-xs font-bold text-emerald-800">
            <UsersRound className="size-3.5" />
            Weekly
          </span>
        </div>
        <div className="mt-4 grid gap-3">
          {communityEvents.slice(0, 3).map(([title, time]) => (
            <div key={title} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
              <CalendarDays className="size-5 text-neutral-700" />
              <div>
                <p className="text-sm font-bold tracking-[-0.03em]">{title}</p>
                <p className="mt-1 text-xs font-medium text-neutral-500">{time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CareerInvestmentSection() {
  return (
    <section className="bg-[#f4f2ef] px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-[linear-gradient(135deg,#7459f6,#5fb7f7_48%,#de61bf)] px-8 py-14 text-center text-white shadow-[0_30px_100px_rgba(111,69,221,0.25)] sm:px-14">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
          Career investment
        </p>
        <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.065em] sm:text-6xl">
          Invest $245 to compete for remote roles that can reach USD $50,000+ per year.
        </h2>
        <p className="mx-auto mt-7 max-w-3xl text-base leading-7 text-white/75">
          This is not a guarantee of employment, income, interviews or salary.
          It is a career-positioning investment designed to help you improve
          your role English, verify your profile and compete for higher-value
          USD opportunities.
        </p>
      </div>
    </section>
  );
}

function CompaniesSection() {
  const filters = ["English 80+", "Setup verified", "Role match", "EST overlap"];
  const candidates = [
    ["Ana Torres", "Customer Support", "84/100"],
    ["Mateo Ruiz", "Project Manager", "81/100"],
    ["Camila Vega", "Sales Rep", "78/100"],
  ] as const;

  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 rounded-[2rem] border border-black/5 bg-white p-7 shadow-[0_24px_90px_rgba(30,27,75,0.07)] sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
              For companies
            </p>
            <h2 className="mt-6 max-w-xl text-4xl font-semibold leading-[0.98] tracking-[-0.065em] sm:text-6xl">
              Need verified LATAM candidates?
            </h2>
            <div className="mt-8 grid gap-4">
              {[
                "pre-checked English",
                "remote setup signals",
                "role tools verification",
                "public verification profiles",
                "less wasted interviews",
                "better filtering",
              ].map((item) => (
                <div key={item} className="flex items-center gap-4 text-lg font-semibold">
                  <Check className="size-5" />
                  {item}
                </div>
              ))}
            </div>
            <Button asChild className="mt-9 h-12 rounded-full bg-[linear-gradient(135deg,#6f45dd,#5fb7f7,#d95dbc)] px-7 text-white">
              <Link href="/employers">
                More Info
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="rounded-[2rem] bg-[linear-gradient(135deg,#f6f2ff,#ffffff)] p-3 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)] sm:p-6">
            <div className="rounded-[1.7rem] bg-white p-4 shadow-[0_22px_70px_rgba(30,27,75,0.08)] sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    Employer Dashboard
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">
                    Verified candidate pipeline
                  </h3>
                </div>
                <Search className="hidden size-10 sm:block" />
              </div>
              <div className="mt-8 grid gap-5 lg:grid-cols-[230px_1fr]">
                <div className="rounded-3xl bg-[#f8f8f7] p-5">
                  <p className="font-semibold">Filters</p>
                  <div className="mt-5 grid gap-3">
                    {filters.map((filter) => (
                      <span key={filter} className="rounded-full bg-white px-4 py-3 text-sm font-semibold">
                        {filter}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4">
                  {candidates.map(([name, role, score]) => (
                    <div key={name} className="flex items-center gap-3 rounded-3xl border border-black/10 bg-white p-4 sm:gap-4 sm:p-5">
                      <ProfilePhoto name={name} />
                      <div className="flex-1">
                        <p className="text-base font-semibold tracking-[-0.04em] sm:text-xl">{name}</p>
                        <p className="text-sm text-neutral-500">{role} · LATAM</p>
                      </div>
                      <span className="rounded-full bg-[#d0f5e3] px-3 py-2 text-xs font-semibold sm:px-4 sm:text-sm">
                        {score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <CompanyLogoCollage />
      </div>
    </section>
  );
}

function CompanyLogoCollage() {
  return (
    <div className="mt-8 rounded-[2rem] border border-black/5 bg-white/85 p-6 shadow-[0_24px_90px_rgba(30,27,75,0.055)]">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Target US companies
          </p>
          <h3 className="mt-2 text-3xl font-semibold tracking-[-0.045em]">
            Prepare for the companies LATAM talent wants to reach.
          </h3>
        </div>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {targetCompanies.map((company) => (
          <div
            key={company}
            className="grid min-h-28 place-items-center rounded-3xl border border-black/10 bg-[#fbfbfa] p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(30,27,75,0.08)]"
          >
            <CompanyWordmark company={company} />
          </div>
        ))}
      </div>
    </div>
  );
}

function CompanyWordmark({ company }: { company: (typeof targetCompanies)[number] }) {
  if (company === "Google") {
    const letters = [
      ["G", "#4285F4"],
      ["o", "#DB4437"],
      ["o", "#F4B400"],
      ["g", "#4285F4"],
      ["l", "#0F9D58"],
      ["e", "#DB4437"],
    ] as const;

    return (
      <span className="text-3xl font-bold tracking-[-0.08em]">
        {letters.map(([letter, color], index) => (
          <span key={`${letter}-${index}`} style={{ color }}>
            {letter}
          </span>
        ))}
      </span>
    );
  }

  if (company === "Amazon") {
    return (
      <span className="relative pb-3 text-3xl font-bold tracking-[-0.08em] text-[#111827]">
        amazon
        <span className="absolute bottom-0 left-7 h-3 w-16 rounded-[50%] border-b-[3px] border-[#ff9900]" />
      </span>
    );
  }

  if (company === "Microsoft") {
    return (
      <span className="flex items-center gap-3 text-2xl font-semibold tracking-[-0.04em] text-[#5e5e5e]">
        <span className="grid size-7 grid-cols-2 gap-1">
          <span className="bg-[#f25022]" />
          <span className="bg-[#7fba00]" />
          <span className="bg-[#00a4ef]" />
          <span className="bg-[#ffb900]" />
        </span>
        Microsoft
      </span>
    );
  }

  if (company === "Apple") {
    return (
      <span className="text-3xl font-semibold tracking-[-0.06em] text-black">
        Apple
      </span>
    );
  }

  if (company === "Meta") {
    return (
      <span className="flex items-center gap-2 text-3xl font-semibold tracking-[-0.06em] text-[#0467df]">
        <span className="text-4xl leading-none">∞</span>
        Meta
      </span>
    );
  }

  if (company === "Salesforce") {
    return (
      <span className="rounded-full bg-[#00a1e0] px-5 py-3 text-2xl font-bold tracking-[-0.08em] text-white">
        salesforce
      </span>
    );
  }

  if (company === "HubSpot") {
    return (
      <span className="flex items-center gap-2 text-2xl font-bold tracking-[-0.05em] text-[#ff5c35]">
        <span className="relative grid size-7 place-items-center rounded-full border-4 border-current">
          <span className="absolute -right-2 -top-2 size-3 rounded-full bg-current" />
        </span>
        HubSpot
      </span>
    );
  }

  if (company === "Shopify") {
    return (
      <span className="text-3xl font-extrabold tracking-[-0.06em] text-[#95bf47]">
        Shopify
      </span>
    );
  }

  if (company === "Slack") {
    return (
      <span className="flex items-center gap-3 text-3xl font-bold tracking-[-0.07em] text-[#1d1c1d]">
        <span className="grid size-7 grid-cols-2 gap-1">
          <span className="rounded-full bg-[#36c5f0]" />
          <span className="rounded-full bg-[#2eb67d]" />
          <span className="rounded-full bg-[#ecb22e]" />
          <span className="rounded-full bg-[#e01e5a]" />
        </span>
        Slack
      </span>
    );
  }

  return (
    <span className="rounded-2xl bg-[#2d8cff] px-5 py-3 text-3xl font-bold tracking-[-0.08em] text-white">
      Zoom
    </span>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-4xl font-semibold tracking-[-0.055em]">
          Choose how you want to get verified
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-7 text-neutral-600">
          Build stronger proof for US remote roles that can reach{" "}
          <span className="font-bold text-black">USD $50,000+ per year</span>.
          No income, interviews or job placement are guaranteed.
        </p>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <PricingCard
            button="Get lifetime access"
            kicker="Pay in full"
            price="$245"
            subtitle="one-time"
            title="Full Inglevo Verified Path"
            popular
            items={[
              "Total Access",
              "Role English Trainer",
              "Remote Setup Verification",
              "Role Tools Verification",
              "CV Builder",
              "Job CRM",
              "Access to Job Marketplace",
              "Access to Community",
              "Templates",
              "Analytics",
              "Lifetime Inglevo Profile Active",
              "Public verification link",
            ]}
          />
          <PricingCard
            button="Choose payment plan"
            kicker="Pay in parts"
            price="from $89"
            subtitle="/month"
            title="Flexible payments"
            items={[
              "2 payments of $129",
              "3 payments of $89",
              "All tools included",
              "Profile stays active while paying",
              "$19/month profile maintenance",
            ]}
          />
          <PricingCard
            button="Apply for Fast Track"
            kicker="Fast track"
            price="$445"
            subtitle="one-time"
            title="Priority path for candidates applying now"
            items={[
              "Everything in Lifetime Access",
              "Priority verification review window",
              "CV + verified profile positioning review",
              "Mock interview feedback",
              "Application strategy checklist",
              "Best for candidates applying this month",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  kicker,
  price,
  subtitle,
  title,
  items,
  button,
  popular = false,
}: {
  kicker: string;
  price: string;
  subtitle: string;
  title: string;
  items: string[];
  button: string;
  popular?: boolean;
}) {
  return (
    <article className={`relative rounded-[1.7rem] border bg-white p-7 shadow-[0_22px_80px_rgba(30,27,75,0.06)] transition hover:-translate-y-1 ${popular ? "border-[#6f45dd] shadow-[0_24px_90px_rgba(111,69,221,0.16)]" : "border-black/5"}`}>
      {popular ? (
        <span className="absolute right-5 top-5 rounded-full bg-[#6f45dd] px-3 py-1 text-xs font-semibold text-white">
          Most popular
        </span>
      ) : null}
      <p className="text-sm font-semibold">{kicker}</p>
      <div className="mt-6 flex items-end gap-2">
        <p className="text-4xl font-semibold tracking-[-0.065em] sm:text-5xl">{price}</p>
        <p className="pb-2 text-sm text-neutral-500">{subtitle}</p>
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <div className="mt-6 grid gap-3">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm text-neutral-700">
            <Check className="size-4 text-[#6f45dd]" />
            {item}
          </div>
        ))}
      </div>
      <Button asChild className={`mt-8 h-11 w-full rounded-full ${popular ? "bg-[#6f45dd] text-white hover:bg-[#5d36c4]" : "bg-black text-white hover:bg-black/90"}`}>
        <Link href="/signup">{button}</Link>
      </Button>
    </article>
  );
}

function TestimonialsSection() {
  return (
    <section id="success-stories" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Beta proof scenarios
            </p>
            <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-[0.98] tracking-[-0.065em] sm:text-6xl">
              The proof we are building with early candidates.
            </h2>
          </div>
          <div className="lg:justify-self-end">
            <p className="max-w-xl text-lg leading-8 text-neutral-600">
              These are illustrative beta scenarios that show the outcomes
              Inglevo is designed to support: clearer communication, stronger
              profiles and better hiring context.
            </p>
            <Link href="/success-stories" className="mt-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(30,27,75,0.08)]">
              View all stories
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {videoTestimonials.map((story) => (
            <article
              key={story.title}
              className="group overflow-hidden rounded-[1.8rem] border border-black/5 bg-white shadow-[0_22px_70px_rgba(30,27,75,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(30,27,75,0.13)]"
            >
              <div className={`relative min-h-[260px] bg-gradient-to-br ${story.gradient} p-5 text-white`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(255,255,255,0.28),transparent_28%),radial-gradient(circle_at_82%_72%,rgba(255,255,255,0.18),transparent_32%)]" />
                <div className="relative flex items-center justify-between">
                  <span className="rounded-full bg-white/16 px-3 py-1.5 text-xs font-black uppercase tracking-[0.12em] backdrop-blur">
                    Beta scenario
                  </span>
                  <span className="rounded-full bg-black/18 px-3 py-1.5 text-xs font-bold backdrop-blur">
                    {story.role}
                  </span>
                </div>
                <div className="relative mt-14 flex items-end justify-between gap-4">
                  <div>
                    <ProfilePhoto name={story.name} size="lg" />
                    <h3 className="mt-5 max-w-[15rem] text-3xl font-extrabold leading-[1] tracking-[-0.05em]">
                      {story.title}
                    </h3>
                  </div>
                  <span className="grid size-14 shrink-0 place-items-center rounded-full bg-white text-black shadow-[0_16px_45px_rgba(0,0,0,0.22)]">
                    <BadgeCheck className="size-5" />
                  </span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-base font-bold leading-7 text-neutral-800">
                  “{story.quote}”
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <ProfilePhoto name={story.name} size="sm" />
                  <div>
                    <p className="text-sm font-semibold">{story.name}</p>
                    <p className="text-xs leading-5 text-neutral-500">{story.role}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((story, index) => (
            <article
              key={story.name}
              className={`group rounded-[1.7rem] border border-black/5 bg-white p-5 shadow-[0_18px_60px_rgba(30,27,75,0.055)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(30,27,75,0.1)] ${
                index === 0 || index === 3 ? "md:row-span-2" : ""
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className={`rounded-full px-3 py-1.5 text-xs font-black uppercase tracking-[0.1em] ${
                  story.tag === "Employer"
                    ? "bg-black text-white"
                    : "bg-[#d0f5e3] text-emerald-900"
                }`}>
                  {story.tag}
                </span>
                <div className="flex items-center gap-1 text-[#6f45dd]">
                  <Star className="size-3 fill-current" />
                  <span className="text-xs font-black uppercase tracking-[0.1em]">
                    Example
                  </span>
                </div>
              </div>

              <p className={`mt-6 leading-7 text-neutral-800 ${index === 0 || index === 3 ? "text-lg" : "text-sm"}`}>
                “{story.quote}”
              </p>

              <div className="mt-7 rounded-2xl bg-[#f8f8f7] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
                  {story.highlight}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <ProfilePhoto name={story.name} size="sm" />
                  <div>
                    <p className="text-sm font-semibold">{story.name}</p>
                    <p className="text-xs leading-5 text-neutral-500">{story.role}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="brand-marquee mt-10 overflow-hidden rounded-[1.6rem] border border-black/5 bg-[#fbfbfd] py-4">
          <div className="marquee-track-slow flex w-max gap-4">
            {[...testimonials, ...testimonials].map((story, index) => (
              <article key={`${story.name}-marquee-${index}`} className="flex min-w-[280px] items-center gap-3 rounded-full border border-black/5 bg-white px-4 py-3 shadow-sm">
                <ProfilePhoto name={story.name} size="sm" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{story.highlight}</p>
                  <p className="truncate text-xs text-neutral-500">{story.name} · {story.tag}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-5 text-neutral-500">
          Examples are illustrative until public beta outcomes are published.
          Inglevo does not guarantee jobs, interviews, visas, sponsorship or income.
        </p>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="px-4 py-12 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-[1.7rem] bg-[radial-gradient(circle_at_86%_26%,rgba(123,63,242,0.55),transparent_34%),linear-gradient(135deg,#070313,#24105f_55%,#06020d)] p-8 text-white shadow-[0_32px_100px_rgba(36,16,95,0.28)] lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <h2 className="max-w-xl text-4xl font-semibold leading-tight tracking-[-0.055em]">
            Ready to access better USD opportunities?
          </h2>
          <p className="mt-3 text-sm text-white/70">
            Adjust your English. Verify your profile. Compete for USD opportunities.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="secondary" className="h-11 rounded-full px-6">
            <Link href="/signup">Start my verification path</Link>
          </Button>
          <Button asChild variant="outline" className="h-11 rounded-full border-white/20 bg-white/10 px-6 text-white hover:bg-white/15">
            <Link href="/employers">I&apos;m hiring LATAM talent</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
