export function LoadingState({ label = "Cargando..." }: { label?: string }) {
  return (
    <div className="premium-card p-6 text-sm text-muted-foreground">
      {label}
    </div>
  );
}
