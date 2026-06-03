import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";

import { blogPosts, getBlogPost } from "@/data/blog-posts";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type BlogImageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const categoryColors: Record<string, { accent: string; soft: string }> = {
  "Async Writing": { accent: "#0f766e", soft: "#e9fbf7" },
  "CV and Applications": { accent: "#2563eb", soft: "#edf4ff" },
  "English Level": { accent: "#7c3aed", soft: "#f2edff" },
  "Interview English": { accent: "#6f45dd", soft: "#f0edff" },
  "Job Search Safety": { accent: "#b45309", soft: "#fff4df" },
  "Remote Careers": { accent: "#12824c", soft: "#effaf5" },
  "Role Interviews": { accent: "#c026d3", soft: "#fbebff" },
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

function getCategoryColor(category: string) {
  return categoryColors[category] ?? categoryColors["Interview English"];
}

export default async function Image({ params }: BlogImageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const colors = getCategoryColor(post.category);

  return new ImageResponse(
    (
      <div
        style={{
          background:
            "radial-gradient(circle at 12% 8%, rgba(123,63,242,0.16), transparent 28%), radial-gradient(circle at 88% 12%, rgba(56,189,248,0.18), transparent 30%), linear-gradient(135deg, #ffffff 0%, #fbfbfd 56%, #f4f1eb 100%)",
          color: "#07090c",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Arial, Helvetica, sans-serif",
          height: "100%",
          justifyContent: "space-between",
          padding: 64,
          width: "100%",
        }}
      >
        <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}>
          <div style={{ alignItems: "center", display: "flex", gap: 16 }}>
            <div
              style={{
                alignItems: "center",
                background: "linear-gradient(135deg,#7459f6,#5fb7f7,#de61bf)",
                borderRadius: 18,
                color: "white",
                display: "flex",
                fontSize: 28,
                fontWeight: 900,
                height: 52,
                justifyContent: "center",
                width: 52,
              }}
            >
              IV
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: 32, fontWeight: 900, letterSpacing: -1.6 }}>
                inglevo
              </div>
              <div style={{ color: "#626773", display: "flex", fontSize: 18, fontWeight: 700 }}>
                Remote English for LATAM talent
              </div>
            </div>
          </div>

          <div
            style={{
              background: colors.soft,
              border: "1px solid rgba(7,9,12,0.07)",
              borderRadius: 999,
              color: colors.accent,
              display: "flex",
              fontSize: 22,
              fontWeight: 900,
              padding: "14px 22px",
            }}
          >
            {post.category}
          </div>
        </div>

        <div style={{ display: "flex", gap: 44 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 26, width: 765 }}>
            <div
              style={{
                color: colors.accent,
                display: "flex",
                fontSize: 22,
                fontWeight: 900,
                letterSpacing: 1.6,
                textTransform: "uppercase",
              }}
            >
              {post.cluster}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 62,
                fontWeight: 900,
                letterSpacing: -3.4,
                lineHeight: 0.98,
              }}
            >
              {post.title}
            </div>
            <div
              style={{
                color: "#555b66",
                display: "flex",
                fontSize: 27,
                lineHeight: 1.35,
                maxWidth: 720,
              }}
            >
              {post.excerpt}
            </div>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.92)",
              border: "1px solid rgba(7,9,12,0.08)",
              borderRadius: 34,
              boxShadow: "0 28px 90px rgba(40,31,89,0.14)",
              display: "flex",
              flexDirection: "column",
              gap: 24,
              padding: 30,
              width: 310,
            }}
          >
            <div style={{ color: "#7a808b", display: "flex", fontSize: 18, fontWeight: 800 }}>
              Search intent
            </div>
            <div style={{ display: "flex", fontSize: 28, fontWeight: 900, lineHeight: 1.12 }}>
              {post.intent}
            </div>
            <div
              style={{
                background: "#f8f8f7",
                borderRadius: 24,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                padding: 22,
              }}
            >
              <div style={{ color: "#7a808b", display: "flex", fontSize: 16, fontWeight: 900 }}>
                Primary keyword
              </div>
              <div style={{ color: colors.accent, display: "flex", fontSize: 23, fontWeight: 900, lineHeight: 1.15 }}>
                {post.primaryKeyword}
              </div>
            </div>
            <div style={{ alignItems: "center", display: "flex", gap: 10 }}>
              <div style={{ background: colors.accent, borderRadius: 999, display: "flex", height: 12, width: 12 }} />
              <div style={{ color: "#5f646d", display: "flex", fontSize: 18, fontWeight: 800 }}>
                {post.readTime}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
