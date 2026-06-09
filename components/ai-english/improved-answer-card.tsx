import { Sparkles } from "lucide-react";

export function ImprovedAnswerCard({ answer }: { answer: string }) {
  return (
    <section className="rounded-2xl border border-black/10 bg-[#d0f5e3] p-5 shadow-[0_16px_45px_rgba(7,9,12,0.08)]">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex size-8 items-center justify-center rounded-full bg-black text-white">
          <Sparkles className="size-4" />
        </span>
        <h3 className="text-lg font-semibold">A stronger version you could use</h3>
      </div>
      <p className="mt-4 whitespace-pre-wrap text-base leading-7 text-foreground">
        {answer}
      </p>
      <p className="mt-4 text-xs leading-5 text-muted-foreground">
        Keep the facts accurate to your real experience before reusing this answer.
      </p>
    </section>
  );
}
