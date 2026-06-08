import Link from "next/link";
import { ArrowRight, Cookie, ShieldCheck } from "lucide-react";

import { PublicFooter } from "@/components/shared/public-footer";
import { PublicNav } from "@/components/shared/public-nav";
import { Button } from "@/components/ui/button";

const sections = [
  ["Essential cookies", "Used for core website and product functionality, such as keeping sessions and preferences working."],
  ["Analytics cookies", "Used to understand product usage, page performance and where users need a better experience."],
  ["Marketing pixels", "May be used later for ads measurement and retargeting, depending on consent settings."],
  ["Your choice", "Users should be able to accept, decline or update tracking preferences as the product matures."],
] as const;

export default function CookiePolicyPage() {
  return (
    <>
      <PublicNav />
      <main className="overflow-hidden bg-white text-black">
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="max-w-4xl">
            <div className="brand-chip mb-6">Cookie Policy</div>
            <h1 className="text-6xl font-extrabold leading-[0.95] tracking-[-0.045em] sm:text-7xl">
              How Inglevo uses cookies and tracking.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-neutral-600">
              This page explains the basic categories of cookies and tracking
              Inglevo may use to run, improve and measure the product.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {sections.map(([title, copy], index) => (
              <article key={title} className="landing-card">
                {index === 0 ? <Cookie className="size-5" /> : <ShieldCheck className="size-5" />}
                <h2 className="mt-7 text-2xl font-extrabold tracking-[-0.04em]">{title}</h2>
                <p className="mt-3 leading-7 text-neutral-600">{copy}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-[2rem] border border-black/5 bg-[#f8f8f7] p-8">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-neutral-500">Note</p>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-neutral-700">
              This is a practical policy page and should be reviewed by a
              legal professional before production launch.
            </p>
            <Button asChild className="mt-6 rounded-full bg-black px-7 text-white">
              <Link href="/privacy">
                Read privacy policy
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
