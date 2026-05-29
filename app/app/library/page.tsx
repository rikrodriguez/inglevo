import Link from "next/link";
import { ArrowRight, BookOpen, CheckSquare, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";

const library = [
  "Resume templates",
  "Salary scripts",
  "Recruiter message templates",
  "Follow-up templates",
  "Interview question banks",
  "Home office checklist",
  "Internet setup guide",
  "US company culture guide",
  "Timezone productivity guide",
] as const;

export default function LibraryPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-6">
      <section className="hero-panel">
        <p className="section-kicker">Library</p>
        <h1 className="page-title mt-2">Career tools library</h1>
        <p className="page-copy mt-3">
          Use practical templates, scripts and checklists to prepare stronger
          applications for US remote jobs.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {library.map((item) => (
          <article key={item} className="premium-card p-5">
            <div className="grid size-11 place-items-center rounded-xl bg-[#d0f5e3]">
              {item.includes("checklist") || item.includes("guide") ? (
                <CheckSquare className="size-5" />
              ) : item.includes("Resume") ? (
                <FileText className="size-5" />
              ) : (
                <BookOpen className="size-5" />
              )}
            </div>
            <h2 className="mt-5 text-xl font-semibold">{item}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Practical asset for remote job preparation.
            </p>
          </article>
        ))}
      </section>

      <div className="premium-card p-5">
        <Button asChild className="justify-between">
          <Link href="/app/templates">
            Open current templates
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}
