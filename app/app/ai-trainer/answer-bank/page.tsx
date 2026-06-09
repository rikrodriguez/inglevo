import { AnswerBankList } from "@/components/ai-english/answer-bank-list";
import { getViewer } from "@/lib/data";

export default async function AITrainerAnswerBankPage() {
  const { user } = await getViewer();

  return <AnswerBankList userId={user?.id ?? "demo-user"} />;
}
