import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Search } from "lucide-react";

import { LandingNav } from "@/components/landing/landing-nav";
import { PublicFooter } from "@/components/shared/public-footer";
import { Button } from "@/components/ui/button";
import { blogPosts, getBlogPost, getRelatedPosts } from "@/data/blog-posts";
import { getSiteUrl } from "@/lib/site-url";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const siteUrl = getSiteUrl();

function headingId(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {};
  }

  const imagePath = `/blog/${post.slug}/opengraph-image`;
  const twitterImagePath = `/blog/${post.slug}/twitter-image`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    keywords: [post.primaryKeyword, ...post.secondaryKeywords],
    openGraph: {
      title: `${post.title} | Inglevo`,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: ["Inglevo"],
      images: [
        {
          url: imagePath,
          width: 1200,
          height: 630,
          alt: `${post.title} - Inglevo blog guide`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [twitterImagePath],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post);
  const articleUrl = `${siteUrl}/blog/${post.slug}`;
  const articleImageUrl = `${siteUrl}/blog/${post.slug}/opengraph-image`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: "Inglevo",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Inglevo",
      url: siteUrl,
    },
    image: articleImageUrl,
    mainEntityOfPage: articleUrl,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords].join(", "),
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <LandingNav />
      <main className="landing-canvas px-4 py-24 sm:px-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([articleSchema, faqSchema]),
          }}
        />

        <article className="mx-auto max-w-7xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 transition hover:text-neutral-950">
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>

          <header className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#f0edff] px-4 py-2 text-sm font-semibold text-[#6f45dd]">
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </span>
              </div>
              <h1 className="brand-section-title mt-6 max-w-5xl text-5xl sm:text-7xl">
                {post.title}
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-600 sm:text-xl">
                {post.description}
              </p>
            </div>

            <aside className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-[0_24px_90px_rgba(18,53,91,0.08)]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#effaf5] text-[#12824c]">
                  <Search className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-950">Search intent</p>
                  <p className="text-sm text-neutral-500">{post.intent}</p>
                </div>
              </div>
              <div className="mt-6 rounded-2xl bg-[#f8f8f7] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400">
                  Primary keyword
                </p>
                <p className="mt-2 text-sm font-semibold text-neutral-900">
                  {post.primaryKeyword}
                </p>
              </div>
              <Button asChild className="brand-button mt-6 w-full rounded-full bg-[var(--brand-black)] hover:bg-black">
                <Link href={post.cta.href}>
                  {post.cta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </aside>
          </header>

          <div className="mt-14 grid gap-10 lg:grid-cols-[260px_1fr] lg:items-start">
            <aside className="hidden rounded-[1.5rem] border border-black/5 bg-white/80 p-5 shadow-sm lg:sticky lg:top-24 lg:block">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400">
                In this guide
              </p>
              <nav className="mt-4 grid gap-3">
                {post.sections.map((section) => (
                  <a
                    key={section.heading}
                    href={`#${headingId(section.heading)}`}
                    className="text-sm font-medium leading-5 text-neutral-600 transition hover:text-neutral-950"
                  >
                    {section.heading}
                  </a>
                ))}
              </nav>
            </aside>

            <div className="grid gap-8">
              {post.sections.map((section) => (
                <section key={section.heading} id={headingId(section.heading)} className="rounded-[2rem] border border-black/5 bg-white p-7 shadow-[0_18px_70px_rgba(18,53,91,0.055)] sm:p-9">
                  <h2 className="text-3xl font-semibold tracking-[-0.04em] text-neutral-950 sm:text-4xl">
                    {section.heading}
                  </h2>
                  <div className="mt-5 grid gap-4 text-base leading-8 text-neutral-600">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  {section.bullets ? (
                    <ul className="mt-6 grid gap-3">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 text-base leading-7 text-neutral-700">
                          <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-[#12824c]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {section.example ? (
                    <div className="mt-7 rounded-[1.5rem] border border-[#6f45dd]/15 bg-[#f7f3ff] p-5">
                      <p className="text-sm font-semibold text-[#6f45dd]">
                        {section.example.label}
                      </p>
                      <div className="mt-4 grid gap-3 text-sm leading-7 text-neutral-700">
                        {section.example.items.map((item) => (
                          <p key={item}>{item}</p>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </section>
              ))}

              <section className="rounded-[2rem] border border-black/5 bg-white p-7 shadow-[0_18px_70px_rgba(18,53,91,0.055)] sm:p-9">
                <p className="section-kicker">FAQ</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                  Common questions
                </h2>
                <div className="mt-7 grid gap-4">
                  {post.faqs.map((faq) => (
                    <div key={faq.question} className="rounded-[1.35rem] bg-[#f8f8f7] p-5">
                      <h3 className="text-lg font-semibold tracking-[-0.02em]">
                        {faq.question}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-neutral-600">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </article>

        <section className="mx-auto mt-16 max-w-7xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="section-kicker">Related guides</p>
              <h2 className="brand-section-title mt-3 text-4xl sm:text-5xl">
                Keep building your remote signal.
              </h2>
            </div>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="landing-card">
                <p className="text-sm font-semibold text-[#6f45dd]">{relatedPost.category}</p>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.035em]">
                  {relatedPost.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-neutral-600">
                  {relatedPost.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
