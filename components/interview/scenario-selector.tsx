import type { InterviewScenario } from "@/types";

export function ScenarioSelector({
  scenarios,
  selectedId,
  onSelect,
}: {
  scenarios: InterviewScenario[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <aside className="premium-card p-4">
      <h2 className="section-kicker">
        Escenarios
      </h2>
      <div className="mt-4 grid gap-2">
        {scenarios.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={`rounded-xl border p-3 text-left text-sm transition ${
              item.id === selectedId
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-white hover:bg-muted hover:shadow-sm"
            }`}
          >
            {item.scenario}
          </button>
        ))}
      </div>
    </aside>
  );
}
