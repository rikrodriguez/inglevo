import type {
  PracticeSession,
  Profile,
  RemoteSetupCheck,
  WritingAssessment,
} from "@/types";

export type CertificateLevel =
  | "Not Ready Yet"
  | "Emerging Remote Communicator"
  | "Interview Ready"
  | "Remote Work Ready"
  | "Global Professional";

export function getCertificateLevel(score: number | null): {
  level: CertificateLevel;
  label: string;
} {
  if (score === null || score < 50) {
    return { level: "Not Ready Yet", label: "Aun no listo" };
  }

  if (score < 65) {
    return {
      level: "Emerging Remote Communicator",
      label: "Emerging Remote Communicator",
    };
  }

  if (score < 75) {
    return { level: "Interview Ready", label: "Listo para entrevistas" };
  }

  if (score < 85) {
    return { level: "Remote Work Ready", label: "Remote Work Ready" };
  }

  return { level: "Global Professional", label: "Profesional global" };
}

export function getPracticeAverage(sessions: PracticeSession[]) {
  const scores = sessions
    .map((session) => session.overall_score)
    .filter((score): score is number => typeof score === "number");

  if (!scores.length) {
    return null;
  }

  return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
}

export function getCertificateId(userId: string, year: number) {
  return `ING-${userId.slice(0, 8).toUpperCase()}-${year}`;
}

export function getCertificateEligibility({
  profile,
  sessions,
  writingAssessments,
  setupCheck,
}: {
  profile: Profile;
  sessions: PracticeSession[];
  writingAssessments: WritingAssessment[];
  setupCheck: RemoteSetupCheck | null;
}) {
  const averageScore = getPracticeAverage(sessions);
  const interviewPractice = sessions.length > 0;
  const unlocked =
    profile.onboarding_completed && sessions.length >= 3 && (averageScore ?? 0) >= 75;
  const level = getCertificateLevel(averageScore);
  const year = new Date().getFullYear();

  const requirements = [
    {
      label: "Complete onboarding",
      met: profile.onboarding_completed,
      status: profile.onboarding_completed ? "Completed" : "Required",
      blocking: true,
    },
    {
      label: "Complete at least 3 English practices",
      met: sessions.length >= 3,
      status: `${Math.min(sessions.length, 3)}/3 completed`,
      blocking: true,
    },
    {
      label: "Reach Remote Readiness Score 75+",
      met: (averageScore ?? 0) >= 75,
      status: averageScore === null ? "Not assessed yet" : `${averageScore}/100`,
      blocking: true,
    },
    {
      label: "Complete Interview Readiness practice",
      met: interviewPractice,
      status: interviewPractice ? "Completed" : "Not assessed yet",
      blocking: false,
    },
    {
      label: "Complete Async Writing assessment",
      met: writingAssessments.length > 0,
      status: writingAssessments.length ? "Completed" : "Not assessed yet",
      blocking: false,
    },
    {
      label: "Complete Setup Check",
      met: Boolean(setupCheck),
      status: setupCheck ? "Completed" : "Not assessed yet",
      blocking: false,
    },
  ];

  return {
    unlocked,
    averageScore,
    level,
    certificateId: unlocked ? getCertificateId(profile.id, year) : null,
    issueDate: unlocked
      ? new Intl.DateTimeFormat("en", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).format(new Date())
      : "Pending",
    requirements,
  };
}
