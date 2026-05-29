import Link from "next/link";

import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingNav } from "@/components/landing/landing-nav";

const posts = [
  "How to introduce yourself in a remote job interview",
  "How to write clearer Slack updates in English",
  "Why remote readiness matters more than generic fluency",
];

export default function BlogPage() {
  return (
    <>
      <LandingNav />
      <main className="landing-canvas px-4 py-24 sm:px-6">
        <section className="mx-auto max-w-5xl">
          <p className="section-kicker">Resources</p>
          <h1 className="brand-section-title mt-4 text-6xl sm:text-7xl">
            Remote English insights for LATAM talent.
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-8 text-neutral-600">
            Practical guides for interviews, async writing, professional tone and
            remote job readiness.
          </p>
          <div className="mt-12 grid gap-4">
            {posts.map((post) => (
              <Link key={post} href="/remote-english-guide" className="landing-card">
                <p className="section-kicker">Guide</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em]">
                  {post}
                </h2>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <LandingFooter />
    </>
  );
}
