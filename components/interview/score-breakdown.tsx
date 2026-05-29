export function ScoreBreakdown({
  scores,
}: {
  scores: Array<[string, number]>;
}) {
  return (
    <div className="mt-4 grid gap-3">
      {scores.map(([label, value]) => (
        <div key={label} className="grid gap-1">
          <div className="flex justify-between text-sm">
            <span>{label}</span>
            <span className="font-medium">{value}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-foreground" style={{ width: `${value}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
