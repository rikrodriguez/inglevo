import Link from "next/link";
import { ArrowRight, BadgeCheck, Star } from "lucide-react";

import { PublicFooter } from "@/components/shared/public-footer";
import { PublicNav } from "@/components/shared/public-nav";
import { Button } from "@/components/ui/button";

const stories = [
  ["Camila R.", "Customer Support · Colombia", "I stopped applying with only a generic CV. My profile finally shows what I can do in English."],
  ["Andres P.", "Sales Specialist · Peru", "Practicing objections and follow-ups helped me sound more confident with US prospects."],
  ["Valeria G.", "Virtual Assistant · Argentina", "The templates and role English practice made my messages sound less translated."],
  ["David M.", "Hiring Manager · US SaaS", "The verified profile gives our team better screening context before scheduling calls."],
  ["Jessica L.", "Head of Talent · Remote Team", "Inglevo makes communication, setup and role signals easier to review."],
  ["Daniel P.", "Support Specialist · Colombia", "Adding the verified profile link made my application feel more serious."],
] as const;

const scenarioStories = [
  ["Camila R.", "How her profile became easier to trust", "Talent story"],
  ["Andres P.", "Practicing sales English for remote roles", "Talent story"],
  ["David M.", "Why verified profiles reduce screening noise", "Employer story"],
] as const;

export default function SuccessStoriesPage() {
  return (
    <>
      <PublicNav />
      <main className="overflow-hidden bg-white text-black">
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <div className="brand-chip mb-6">Success Stories</div>
              <h1 className="text-6xl font-extrabold leading-[0.95] tracking-[-0.045em] sm:text-7xl lg:text-[5.4rem]">
                Success stories for stronger remote candidates.
              </h1>
            </div>
            <p className="max-w-2xl text-xl leading-8 text-neutral-600">
              These illustrative scenarios show the outcomes Inglevo is designed
              to support: clearer English, stronger profiles, better application
              habits and more useful screening context for employers.
            </p>
          </div>
        </section>

        <section className="px-4 pb-8 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-3">
            {scenarioStories.map(([name, title, status], index) => (
              <article key={name} className="overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-[0_24px_90px_rgba(7,9,12,0.08)]">
                <div className={`min-h-[260px] p-6 text-white ${index === 1 ? "bg-[linear-gradient(135deg,#111,#2b1b62,#5fb7f7)]" : "bg-[linear-gradient(135deg,#7459f6,#5fb7f7_52%,#de61bf)]"}`}>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-black uppercase tracking-[0.12em]">
                      Candidate story
                    </span>
                    <span className="rounded-full bg-black/20 px-3 py-1.5 text-xs font-bold">{status}</span>
                  </div>
                  <div className="mt-20 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-white/75">{name}</p>
                      <h2 className="mt-3 text-3xl font-extrabold leading-[1] tracking-[-0.05em]">{title}</h2>
                    </div>
                    <span className="grid size-14 place-items-center rounded-full bg-white text-black shadow-xl">
                      <BadgeCheck className="size-5" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stories.map(([name, role, quote], index) => (
              <article key={name} className={`landing-card ${index === 0 ? "lg:row-span-2" : ""}`}>
                <div className="flex items-center gap-1 text-[#6f45dd]">
                  <Star className="size-4 fill-current" />
                  <span className="text-xs font-black uppercase tracking-[0.1em]">
                    Story
                  </span>
                </div>
                <p className="mt-7 text-lg leading-8 text-neutral-800">“{quote}”</p>
                <div className="mt-8 rounded-2xl bg-[#f8f8f7] p-4">
                  <p className="font-extrabold">{name}</p>
                  <p className="mt-1 text-sm text-neutral-500">{role}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-5 text-neutral-500">
            These stories are illustrative. Inglevo does not guarantee
            employment, interviews, income, visas, sponsorship or job placement.
          </p>
        </section>

        <section className="px-4 py-20 sm:px-6">
          <div className="click-feature-card mx-auto max-w-6xl rounded-[2.4rem] p-8 text-white sm:p-12">
            <h2 className="max-w-3xl text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl">
              Build a profile worth sharing.
            </h2>
            <Button asChild variant="secondary" className="mt-8 rounded-full px-7">
              <Link href="/signup">
                Start free
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
