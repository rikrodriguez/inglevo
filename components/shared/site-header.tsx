import Link from "next/link";
import { Sparkles } from "lucide-react";

import { PublicNav } from "@/components/shared/public-nav";

export function SiteHeader() {
  return <PublicNav />;
}

export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 font-medium text-foreground">
          <span className="click-icon-tile size-8 rounded-xl">
            <Sparkles className="size-4" />
          </span>
          Inglevo
        </div>
        <div className="max-w-3xl space-y-3">
          <p>
            Inglevo helps LATAM talent build trusted verification signals for
            remote hiring: role English, remote setup, tools and professional
            communication. It does not guarantee employment, income, job
            placement, sponsorship, visas or immigration outcomes.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
