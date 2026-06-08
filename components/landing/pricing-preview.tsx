import Link from "next/link";

import { Button } from "@/components/ui/button";

export function PricingPreview() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            Start free. Build your readiness path before applying.
          </h2>
          <p className="mt-2 text-muted-foreground">
            Free lets you test Interview English, templates and your first
            score. Pro will be for continuous practice, unlimited assets and
            deeper reports. Career Sprint stays as a manual review path.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/pricing">View plans</Link>
        </Button>
      </div>
    </section>
  );
}
