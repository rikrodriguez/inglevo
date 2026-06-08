import { PublicFooter } from "@/components/shared/public-footer";
import { SiteHeader } from "@/components/shared/site-header";

const sections = [
  {
    title: "What Inglevo Collects",
    copy:
      "Inglevo may store your email, profile preferences, English level, work goals, practice answers, transcripts, feedback, scores, readiness data and job application assets you create.",
  },
  {
    title: "How We Use Your Data",
    copy:
      "We use this information to personalize practice, generate AI feedback, calculate readiness signals, save your history and help you prepare professional English materials.",
  },
  {
    title: "Voice Practice",
    copy:
      "In the current version, voice practice sends audio for transcription but does not store the audio file in Supabase. Inglevo stores the transcript, feedback and scores when you are signed in.",
  },
  {
    title: "AI Processing",
    copy:
      "Some answers and transcripts may be processed by AI providers to generate feedback. Do not include sensitive personal, financial, medical or legal information in practice answers.",
  },
  {
    title: "Analytics and Advertising Pixels",
    copy:
      "Inglevo may use optional analytics and advertising pixels such as PostHog, Plausible, Meta, TikTok or Google to understand product usage and campaign performance. These scripts should only load after you accept analytics cookies.",
  },
  {
    title: "Product Emails",
    copy:
      "Inglevo may send product emails such as welcome messages, onboarding completion, improved answers and readiness summaries. Authentication emails can remain handled by Supabase.",
  },
  {
    title: "Lead Magnets and Blog Resources",
    copy:
      "If you request a free blog resource, Inglevo may store your email, selected resource, target role and source page so we can measure demand and follow up with relevant remote job English resources.",
  },
  {
    title: "No Public Profiles by Default",
    copy:
      "Your email, private answers, salary expectations and readiness details are not made public by default. Future shareable reports should require your consent.",
  },
  {
    title: "Your Controls",
    copy:
      "You can edit basic profile information in Settings. Account deletion and full data export/delete controls should be added before a production launch.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="landing-canvas">
        <section className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6">
          <p className="section-kicker">Privacy</p>
          <h1 className="brand-section-title mt-4 text-6xl sm:text-7xl">
            Privacy Policy
          </h1>
          <p className="mt-6 text-xl leading-8 text-neutral-600">
            This page explains the basic privacy principles for the Inglevo product.
            It is not legal advice and should be reviewed before production.
          </p>
          <div className="mt-10 grid gap-4">
            {sections.map((section) => (
              <article key={section.title} className="premium-card p-6">
                <h2 className="text-lg font-semibold">{section.title}</h2>
                <p className="mt-2 text-muted-foreground">{section.copy}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
