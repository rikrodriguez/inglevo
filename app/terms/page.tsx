import { PublicFooter } from "@/components/shared/public-footer";
import { SiteHeader } from "@/components/shared/site-header";

const sections = [
  {
    title: "Beta Product",
    copy:
      "Inglevo is currently a beta product for practicing professional English, remote work communication and job application readiness.",
  },
  {
    title: "No Employment Guarantee",
    copy:
      "Inglevo does not guarantee employment, income, job placement, sponsorship, visas, immigration outcomes, interviews or offers.",
  },
  {
    title: "User Responsibility",
    copy:
      "You are responsible for the information you enter, the applications you send and the professional decisions you make based on practice feedback.",
  },
  {
    title: "AI Feedback",
    copy:
      "AI feedback may be incomplete or incorrect. Use it as coaching guidance, not as legal, immigration, financial or employment advice.",
  },
  {
    title: "Acceptable Use",
    copy:
      "Do not use Inglevo to upload illegal, harmful, private third-party or highly sensitive information. Do not attempt to abuse API limits or access another user's data.",
  },
  {
    title: "Future Paid Plans",
    copy:
      "Pricing and checkout may change before production. Stripe checkout can remain disabled until payment keys and policies are configured.",
  },
];

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="landing-canvas">
        <section className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6">
          <p className="section-kicker">Terms</p>
          <h1 className="brand-section-title mt-4 text-6xl sm:text-7xl">
            Terms of Service
          </h1>
          <p className="mt-6 text-xl leading-8 text-neutral-600">
            Basic terms for the Inglevo beta. Review with counsel before a public
            production launch.
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
