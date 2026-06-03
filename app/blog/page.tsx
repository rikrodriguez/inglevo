import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Search, Sparkles } from "lucide-react";

import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingNav } from "@/components/landing/landing-nav";
import { Button } from "@/components/ui/button";
import { blogClusters, blogPosts, featuredBlogPosts } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "Remote English Blog for LATAM Talent",
  description:
    "SEO-focused guides for LATAM professionals preparing for remote job interviews, English communication, CVs, async writing and role-specific applications.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Remote English Blog for LATAM Talent | Inglevo",
    description:
      "Practical guides for remote job interviews, CVs, async communication and professional English for LATAM talent.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <>
      <LandingNav />
      <main className="landing-canvas px-4 py-24 sm:px-6">
        <section className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-semibold text-neutral-700 shadow-sm">
              <Search className="h-4 w-4 text-[#6f45dd]" />
              SEO resources for remote careers
            </div>
            <h1 className="brand-section-title mt-6 max-w-4xl text-5xl sm:text-7xl">
              Remote English guides built for high-intent job searches.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-600 sm:text-xl">
              Practical articles for LATAM talent preparing for remote job
              interviews, async communication, CVs, English level expectations
              and role-specific hiring conversations.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="brand-button rounded-full bg-[var(--brand-black)] hover:bg-black">
                <Link href="/ai-english-trainer">
                  Practice with Inglevo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-black/10 bg-white/80">
                <Link href="/remote-english-guide">Read the main guide</Link>
              </Button>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-[0_24px_90px_rgba(18,53,91,0.08)]">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f0edff] text-[#6f45dd]">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900">SEO clusters</p>
                <p className="text-sm text-neutral-500">Built around search intent</p>
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              {blogClusters.map((cluster) => (
                <div key={cluster} className="flex items-center justify-between rounded-2xl bg-[#f8f8f7] px-4 py-3">
                  <span className="text-sm font-medium text-neutral-800">{cluster}</span>
                  <span className="text-xs font-semibold text-neutral-500">
                    {blogPosts.filter((post) => post.cluster === cluster).length} guides
                  </span>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="mx-auto mt-16 max-w-7xl">
          <div className="grid gap-5 lg:grid-cols-3">
            {featuredBlogPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`landing-card group ${index === 0 ? "lg:col-span-2" : ""}`}
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-[#6f45dd]">
                  <BookOpen className="h-4 w-4" />
                  {post.category}
                </div>
                <h2 className={`${index === 0 ? "text-4xl sm:text-5xl" : "text-3xl"} mt-5 font-semibold tracking-[-0.045em]`}>
                  {post.title}
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-600">
                  {post.excerpt}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-neutral-500">
                  <span>{post.readTime}</span>
                  <span className="h-1 w-1 rounded-full bg-neutral-300" />
                  <span>{post.primaryKeyword}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-7xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="section-kicker">All guides</p>
              <h2 className="brand-section-title mt-3 text-4xl sm:text-5xl">
                Build search traffic and candidate trust.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-neutral-600">
              Each guide targets a specific search intent and links back into
              the Inglevo product paths: trainer, CV builder, templates,
              role paths and verified profile.
            </p>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="landing-card group flex min-h-[310px] flex-col">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[#f0edff] px-3 py-1 text-xs font-semibold text-[#6f45dd]">
                    {post.category}
                  </span>
                  <span className="text-xs font-medium text-neutral-500">{post.readTime}</span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.035em]">
                  {post.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-neutral-600">
                  {post.description}
                </p>
                <div className="mt-auto pt-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400">
                    Primary keyword
                  </p>
                  <p className="mt-2 text-sm font-medium text-neutral-800">
                    {post.primaryKeyword}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <LandingFooter />
    </>
  );
}
