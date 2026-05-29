import { InterviewTrainer } from "@/components/interview/interview-trainer";
import type { Profile } from "@/types";

export function Interview({ profile }: { profile: Profile }) {
  return <InterviewTrainer profile={profile} />;
}
