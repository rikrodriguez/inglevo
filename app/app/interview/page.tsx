import { InterviewTrainer } from "@/components/interview/interview-trainer";
import { getPracticeSessions, getViewer } from "@/lib/data";
import { getFreePracticeLimit } from "@/lib/usage-limits";

type InterviewPageProps = {
  searchParams?: Promise<{
    mode?: string;
    simulation?: string;
  }>;
};

export default async function InterviewPage({ searchParams }: InterviewPageProps) {
  const [{ profile }, sessions] = await Promise.all([
    getViewer(),
    getPracticeSessions(),
  ]);
  const params = await searchParams;
  const initialInputMode = params?.mode === "speak" ? "speak" : "write";
  const initialVoicePracticeType =
    params?.simulation === "meeting" ? "meeting" : "speaking";

  return (
    <div className="mx-auto max-w-7xl">
      <div className="hero-panel mb-6">
        <p className="section-kicker">
          Improve English · Interview practice
        </p>
        <h1 className="page-title mt-2">
          Interview English Practice
        </h1>
        <p className="page-copy mt-3">
          Practice the answers you need for remote job interviews in English.
        </p>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          This practice feeds your Interview Readiness and Remote Readiness
          Score. The goal is not perfect English, but clear, professional and
          reliable communication.
        </p>
      </div>
      <InterviewTrainer
        profile={profile}
        initialInputMode={initialInputMode}
        initialVoicePracticeType={initialVoicePracticeType}
        previousSessions={sessions}
        freePracticeLimit={getFreePracticeLimit()}
      />
    </div>
  );
}
