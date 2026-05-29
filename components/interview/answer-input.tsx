export function AnswerInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="mt-6 grid gap-2 text-sm font-medium">
      Your answer in English
      <span className="text-sm font-normal text-muted-foreground">
        Do not try to sound perfect. Write a real answer and we will improve it.
      </span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={8}
        className="resize-none rounded-xl border border-border bg-white p-4 text-base outline-none focus:ring-2 focus:ring-foreground/15"
        placeholder="Example: I’m a marketer with experience in content and campaigns. I’m looking for a remote role where I can..."
      />
    </label>
  );
}
