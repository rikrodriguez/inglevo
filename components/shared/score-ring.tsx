export function ScoreRing({
  score,
  label,
  size = "md",
}: {
  score: number | null;
  label: string;
  size?: "sm" | "md" | "lg";
}) {
  const value = score ?? 0;
  const dimensions = {
    sm: "size-24",
    md: "size-32",
    lg: "size-40",
  }[size];

  return (
    <div
      className={`${dimensions} grid place-items-center rounded-full`}
      style={{
        background: `conic-gradient(var(--signal-emerald) ${value * 3.6}deg, rgba(7,9,12,0.08) 0deg)`,
      }}
      aria-label={`${label}: ${score ?? "pending"}`}
    >
      <div className="grid size-[78%] place-items-center rounded-full bg-white shadow-inner">
        <div className="text-center">
          <p className="mono-stat text-3xl font-semibold">
            {score === null ? "--" : score}
          </p>
          <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}
