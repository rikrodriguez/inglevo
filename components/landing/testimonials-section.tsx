import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "María G.",
    role: "Customer Support · Colombia",
    quote:
      "I stopped practicing generic English and started preparing the exact situations I face in support roles.",
    signal: "Customer empathy · Support follow-ups · Remote setup",
  },
  {
    name: "Carlos R.",
    role: "Sales / SDR · Mexico",
    quote:
      "The biggest change was learning how to sound clear and confident when handling objections in English.",
    signal: "Discovery calls · Pricing objections · CRM notes",
  },
  {
    name: "Ana P.",
    role: "Virtual Assistant · Peru",
    quote:
      "Inglevo helped me organize my job search and explain my work experience in a more professional way.",
    signal: "Client updates · Calendar coordination · Follow-ups",
  },
  {
    name: "Luis M.",
    role: "Software Engineer · Argentina",
    quote:
      "I could practice standups, blockers and technical explanations without feeling like I was in a school class.",
    signal: "Standups · Blockers · GitHub/Jira communication",
  },
  {
    name: "Valentina S.",
    role: "UX/UI Designer · Chile",
    quote:
      "The role-based practice made my English feel connected to design work, not random grammar exercises.",
    signal: "Design rationale · Client feedback · Figma presentation",
  },
  {
    name: "Diego T.",
    role: "Project Coordinator · Ecuador",
    quote:
      "The certificate path gave me a clearer way to show communication, tools and remote work habits.",
    signal: "Meeting summaries · Risks · Stakeholder updates",
  },
] as const;

export function TestimonialsSection() {
  return (
    <section className="px-4 py-28 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="section-kicker">Candidate stories</p>
          <h2 className="brand-section-title mt-4 text-6xl sm:text-7xl">
            Built for LATAM professionals preparing for the next role.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-neutral-600">
            Stories of how Inglevo supports stronger communication,
            clearer profiles and better preparation for US remote opportunities.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article key={testimonial.name} className="landing-card">
              <Quote className="size-7 text-black" />
              <p className="mt-6 text-lg leading-8 text-neutral-800">
                “{testimonial.quote}”
              </p>
              <div className="mt-8 border-t border-black/5 pt-5">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
                <p className="mt-4 rounded-2xl bg-[#d0f5e3] px-4 py-3 text-xs font-semibold text-black">
                  {testimonial.signal}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-5 text-muted-foreground">
          These examples are illustrative and do not guarantee employment,
          interviews, income, visas, sponsorship or job placement.
        </p>
      </div>
    </section>
  );
}
