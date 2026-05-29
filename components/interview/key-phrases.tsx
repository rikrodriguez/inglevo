export function KeyPhrases({ phrases }: { phrases: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {phrases.map((phrase) => (
        <span
          key={phrase}
          className="rounded-full border border-border bg-white px-3 py-1 text-sm"
        >
          {phrase}
        </span>
      ))}
    </div>
  );
}
