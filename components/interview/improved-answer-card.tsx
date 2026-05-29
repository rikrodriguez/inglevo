export function ImprovedAnswerCard({
  answer,
  label = "Improved answer",
}: {
  answer: string;
  label?: string;
}) {
  return (
    <div className="rounded-2xl border border-[#d0f5e3] bg-[#d0f5e3] p-5 text-black">
      <p className="text-sm font-medium text-black">{label}</p>
      <p className="mt-2 text-lg leading-8">{answer}</p>
    </div>
  );
}
