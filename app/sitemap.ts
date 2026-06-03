import type { MetadataRoute } from "next";

import { blogPosts } from "@/data/blog-posts";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

const publicRoutes = [
  "",
  "/talent",
  "/employers",
  "/features",
  "/pricing",
  "/ai-english-trainer",
  "/verification-profile",
  "/cv-builder",
  "/job-crm",
  "/job-marketplace",
  "/role-paths",
  "/templates",
  "/analytics",
  "/community",
  "/blog",
  "/success-stories",
  "/hire-latam-talent",
  "/candidate-verification",
  "/hiring-access",
  "/book-a-call",
  "/about",
  "/contact",
  "/remote-english-guide",
  "/privacy",
  "/terms",
  "/cookie-policy",
  "/disclaimer",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = publicRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" || route === "/blog" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : route === "/blog"
          ? 0.9
          : route === "/pricing"
            ? 0.9
            : 0.7,
  })) satisfies MetadataRoute.Sitemap;

  const blogRoutes = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  })) satisfies MetadataRoute.Sitemap;

  return [...staticRoutes, ...blogRoutes];
}
