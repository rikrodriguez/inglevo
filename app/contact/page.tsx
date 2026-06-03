import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Mail, MessageSquareText, UserPlus } from "lucide-react";

import { PublicFooter } from "@/components/shared/public-footer";
import { PublicNav } from "@/components/shared/public-nav";
import { Button } from "@/components/ui/button";

const contactPaths = [
  {
    title: "Talent beta access",
    copy: "For LATAM professionals who want to practice role English and build an Inglevo profile.",
    href: "mailto:hello@inglevo.com?subject=Inglevo%20talent%20beta%20access",
    icon: UserPlus,
    cta: "Request beta access",
  },
  {
    title: "Employer pilots",
    copy: "For founders, recruiters and operators hiring LATAM talent for US remote roles.",
    href: "mailto:hello@inglevo.com?subject=Inglevo%20employer%20pilot",
    icon: BriefcaseBusiness,
    cta: "Discuss hiring access",
  },
  {
    title: "Partnerships",
    copy: "For communities, bootcamps and career programs that support LATAM remote talent.",
    href: "mailto:hello@inglevo.com?subject=Inglevo%20partnership",
    icon: MessageSquareText,
    cta: "Start partnership thread",
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <PublicNav />
      <main className="overflow-hidden bg-white text-black">
        <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="brand-chip mb-6">Contact</div>
            <h1 className="max-w-4xl text-6xl font-extrabold leading-[0.95] tracking-[-0.045em] sm:text-7xl lg:text-[5.4rem]">
              Talk to Inglevo about access, hiring or partnerships.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-neutral-600 sm:text-2xl sm:leading-9">
              Send the right context and we will route the conversation toward
              talent access, employer pilots or partnership opportunities.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="click-gradient-button h-12 rounded-full px-7">
                <Link href="mailto:hello@inglevo.com?subject=Inglevo%20inquiry">
                  Email Inglevo
                  <Mail />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full bg-white px-7">
                <Link href="/book-a-call">
                  Hiring call
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-[0_24px_90px_rgba(7,9,12,0.1)]">
            <p className="section-kicker">Direct email</p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.045em]">
              hello@inglevo.com
            </h2>
            <p className="mt-4 text-sm leading-6 text-neutral-600">
              Include your role, country, hiring need or partnership context so
              the first reply can be specific.
            </p>
            <div className="mt-6 grid gap-3">
              {["Talent access", "Employer pilot", "Partnership"].map((item) => (
                <div key={item} className="rounded-2xl bg-[#f8f8f7] px-4 py-3 text-sm font-bold">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
            {contactPaths.map((path) => (
              <article key={path.title} className="landing-card">
                <path.icon className="size-5" />
                <h2 className="mt-7 text-2xl font-extrabold tracking-[-0.04em]">
                  {path.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  {path.copy}
                </p>
                <Link
                  href={path.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#6f45dd]"
                >
                  {path.cta}
                  <ArrowRight className="size-4" />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
