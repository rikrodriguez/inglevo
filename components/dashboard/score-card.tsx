export function ScoreCard({ label, score }: { label: string; score: number }) {
  return (
    <div className="rounded-xl border border-border bg-white p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-semibold">{score}</p>
    </div>
  );
}
