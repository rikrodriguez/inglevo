import { RoleSetupForm } from "@/components/ai-english/role-setup-form";
import { getViewer } from "@/lib/data";

export default async function AITrainerSetupPage() {
  const { user } = await getViewer();

  return (
    <div className="mx-auto grid max-w-6xl gap-6">
      <RoleSetupForm userId={user?.id ?? "demo-user"} />
    </div>
  );
}
