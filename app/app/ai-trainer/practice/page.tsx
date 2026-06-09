import { PracticeSession } from "@/components/ai-english/practice-session";
import { getViewer } from "@/lib/data";

export default async function AITrainerPracticePage() {
  const { user } = await getViewer();

  return <PracticeSession userId={user?.id ?? "demo-user"} />;
}
