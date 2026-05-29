import Link from "next/link";

import { BrandLogo } from "@/components/shared/brand-logo";

const columns = [
  {
    title: "Product",
    links: ["English Trainer", "Certificate", "Resume Builder", "Job CRM", "Opportunities"],
  },
  {
    title: "Company",
    links: ["About", "Pricing", "Contact", "Talent", "Employers"],
  },
  {
    title: "Resources",
    links: ["Blog", "Remote English Guide", "Interview Practice", "Templates"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Disclaimer"],
  },
] as const;

const hrefs: Record<string, string> = {
  About: "/about",
  Pricing: "/pricing",
  Contact: "/contact",
  Employers: "/employers",
  Talent: "/talent",
  Blog: "/blog",
  "Remote English Guide": "/remote-english-guide",
  Disclaimer: "/disclaimer",
  Privacy: "/privacy",
  Terms: "/terms",
  "English Trainer": "/app/ai-trainer",
  "Resume Builder": "/app/resume",
  "Job CRM": "/app/job-crm",
  "Remote Jobs": "/app/remote-jobs",
  "Role Score": "/app/readiness",
  Certificate: "/app/certificate",
  Opportunities: "/app/opportunities",
  "Interview Practice": "/app/interview",
  Templates: "/app/templates",
};

export function LandingFooter() {
  return (
    <footer className="border-t border-black/5 bg-white px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <BrandLogo />
            <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">
              Role-specific English verification for LATAM remote talent.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="font-semibold">{column.title}</p>
                <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
                  {column.links.map((link) => (
                    <Link key={link} href={hrefs[link] ?? "#"} className="transition hover:text-foreground">
                      {link}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 border-t border-black/5 pt-6">
          <p className="text-xs leading-5 text-muted-foreground">
            Inglevo helps users practice professional English and role-specific
            remote job communication. It does not guarantee employment, income,
            interviews, visas, sponsorship or job placement.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            © 2026 Inglevo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
