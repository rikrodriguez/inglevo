import { AIEnglishOverview } from "@/components/ai-english/ai-english-overview";
import { getViewer } from "@/lib/data";

export default async function AiTrainerPage() {
  const { user } = await getViewer();

  return <AIEnglishOverview userId={user?.id ?? "demo-user"} />;
}
