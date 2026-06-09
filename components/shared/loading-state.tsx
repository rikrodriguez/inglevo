import { LoaderCircle } from "lucide-react";

export function LoadingState({ label = "Cargando..." }: { label?: string }) {
  return (
    <div className="premium-card flex items-center gap-3 p-6 text-sm text-muted-foreground">
      <LoaderCircle className="size-4 animate-spin text-foreground" />
      <span>{label}</span>
    </div>
  );
}
