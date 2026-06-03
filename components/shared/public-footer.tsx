import Link from "next/link";
import { Mail } from "lucide-react";

import { BrandLogo } from "@/components/shared/brand-logo";

const footerColumns = [
  {
    title: "Product",
    links: [
      ["AI English Trainer", "/ai-english-trainer"],
      ["Verification Profile", "/verification-profile"],
      ["CV Builder", "/cv-builder"],
      ["Job CRM", "/job-crm"],
      ["Templates", "/templates"],
      ["Analytics", "/analytics"],
    ],
  },
  {
    title: "Talent",
    links: [
      ["Role Paths", "/role-paths"],
      ["Pricing", "/pricing"],
      ["Job Marketplace", "/job-marketplace"],
      ["Community", "/community"],
      ["Success Stories", "/success-stories"],
    ],
  },
  {
    title: "Employers",
    links: [
      ["Hire LATAM Talent", "/hire-latam-talent"],
      ["Candidate Verification", "/candidate-verification"],
      ["Hiring Access", "/hiring-access"],
      ["Book a Call", "/book-a-call"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About Us", "/about"],
      ["Careers", "/careers"],
      ["Blog", "/blog"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy Policy", "/privacy"],
      ["Terms of Service", "/terms"],
      ["Cookie Policy", "/cookie-policy"],
      ["Disclaimer", "/disclaimer"],
    ],
  },
] as const;

export function PublicFooter() {
  return (
    <footer className="border-t border-black/5 bg-white px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_3fr]">
          <div>
            <BrandLogo />
            <p className="mt-5 max-w-xs text-sm leading-6 text-neutral-600">
              We help LATAM talent get verified and connect with US companies
              for remote opportunities.
            </p>
            <Link
              href="mailto:hello@inglevo.com"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 transition hover:text-black"
            >
              <Mail className="size-4" />
              hello@inglevo.com
            </Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {footerColumns.map(({ title, links }) => (
              <div key={title}>
                <p className="text-sm font-semibold">{title}</p>
                <div className="mt-4 grid gap-3">
                  {links.map(([label, href]) => (
                    <Link key={href} href={href} className="text-sm text-neutral-500 transition hover:text-black">
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 border-t border-black/5 pt-5 text-xs leading-5 text-neutral-500">
          <p>© 2026 Inglevo. All rights reserved.</p>
          <p className="mt-2">
            Inglevo helps users improve professional English and build verification signals for remote opportunities. It does not guarantee employment, income, interviews, visas, sponsorship or job placement.
          </p>
        </div>
      </div>
    </footer>
  );
}
