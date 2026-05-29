import type {
  PracticeSession,
  ReadinessAssessment,
  RemoteJobAsset,
  RemoteSetupCheck,
  WritingAssessment,
} from "@/types";

export type ReadinessLevel =
  | "Not Ready Yet"
  | "Building Foundation"
  | "Interview Emerging"
  | "Remote Work Ready"
  | "Global Professional";

export type ReadinessAreaId =
  | "englishCommunication"
  | "speakingConfidence"
  | "interviewReadiness"
  | "asyncWriting"
  | "remoteJobAssets"
  | "setupReadiness"
  | "professionalConfidence";

export type ReadinessAreaScore = {
  id: ReadinessAreaId;
  name: string;
  description: string;
  score: number | null;
  confidence: "real" | "partial" | "not_assessed";
  evidence: string;
  recommendation: string;
};

export type ReadinessSummary = {
  overallScore: number | null;
  status: ReturnType<typeof getReadinessStatus>;
  areas: ReadinessAreaScore[];
  strongAreas: ReadinessAreaScore[];
  needsWorkAreas: ReadinessAreaScore[];
  recommendedNextStep: {
    label: string;
    href: string;
    description: string;
  };
  history: Array<{
    label: string;
    score: number;
    scenario: string;
  }>;
  assessmentHistory: Array<{
    label: string;
    score: number;
    type: string;
    status: string;
  }>;
  trend: {
    label: string;
    value: number | null;
  };
  dataNote: string;
};

const interviewScenarioLabels = [
  "Tell me about yourself",
  "Why should we hire you?",
  "What are your salary expectations?",
  "Tell me about a challenge you solved",
  "Why do you want to work remotely?",
  "Describe your experience working with teams",
  "What are your strengths?",
  "Why are you leaving your current job?",
];

const salaryScenarioLabels = ["What are your salary expectations?"];
const remoteCommunicationLabels = [
  "Why do you want to work remotely?",
  "Describe your experience working with teams",
  "Tell me about a challenge you solved",
];

function average(values: Array<number | null | undefined>) {
  const valid = values.filter((value): value is number => typeof value === "number");

  if (!valid.length) {
    return null;
  }

  return Math.round(valid.reduce((sum, value) => sum + value, 0) / valid.length);
}

function weightedAverage(items: Array<[number | null, number]>) {
  const valid = items.filter((item): item is [number, number] => item[0] !== null);

  if (!valid.length) {
    return null;
  }

  const totalWeight = valid.reduce((sum, [, weight]) => sum + weight, 0);
  const total = valid.reduce((sum, [score, weight]) => sum + score * weight, 0);

  return Math.round(total / totalWeight);
}

function confidenceFor(score: number | null, sessionsCount: number, minimum = 2) {
  if (score === null) {
    return "not_assessed" as const;
  }

  return sessionsCount >= minimum ? ("real" as const) : ("partial" as const);
}

function scenarioIncludes(session: PracticeSession, labels: string[]) {
  return labels.some((label) => session.scenario.includes(label));
}

function scoreLabel(score: number | null) {
  return score === null ? "Not assessed yet" : `${score}/100`;
}

function areaAssessmentScore(
  readinessAssessments: ReadinessAssessment[],
  areaId: ReadinessAreaId
) {
  return average(
    readinessAssessments.map((assessment) => {
      const value = assessment.area_scores?.[areaId];
      return typeof value === "number" ? value : null;
    })
  );
}

function areaAssessmentCount(
  readinessAssessments: ReadinessAssessment[],
  areaId: ReadinessAreaId
) {
  return readinessAssessments.filter(
    (assessment) => typeof assessment.area_scores?.[areaId] === "number"
  ).length;
}

export function calculateAreaScores(
  sessions: PracticeSession[],
  setupCheck?: RemoteSetupCheck | null,
  writingAssessments: WritingAssessment[] = [],
  remoteJobAssets: RemoteJobAsset[] = [],
  readinessAssessments: ReadinessAssessment[] = []
): ReadinessAreaScore[] {
  const recent = sessions.slice(0, 12);
  const interviewSessions = recent.filter((session) =>
    scenarioIncludes(session, interviewScenarioLabels)
  );
  const salarySessions = recent.filter((session) =>
    scenarioIncludes(session, salaryScenarioLabels)
  );
  const remoteCommunicationSessions = recent.filter((session) =>
    scenarioIncludes(session, remoteCommunicationLabels)
  );

  const englishCommunicationFromAssessments = areaAssessmentScore(
    readinessAssessments,
    "englishCommunication"
  );
  const speakingConfidenceFromAssessments = areaAssessmentScore(
    readinessAssessments,
    "speakingConfidence"
  );
  const interviewReadinessFromAssessments = areaAssessmentScore(
    readinessAssessments,
    "interviewReadiness"
  );
  const asyncWritingFromAssessments = areaAssessmentScore(
    readinessAssessments,
    "asyncWriting"
  );
  const remoteJobAssetsFromAssessments = areaAssessmentScore(
    readinessAssessments,
    "remoteJobAssets"
  );
  const setupReadinessFromAssessments = areaAssessmentScore(
    readinessAssessments,
    "setupReadiness"
  );
  const professionalConfidenceFromAssessments = areaAssessmentScore(
    readinessAssessments,
    "professionalConfidence"
  );

  const englishCommunicationFallback = average([
    average(recent.map((session) => session.clarity)),
    average(recent.map((session) => session.grammar)),
    average(recent.map((session) => session.structure)),
  ]);
  const englishCommunication =
    englishCommunicationFromAssessments ?? englishCommunicationFallback;
  const speakingConfidenceFallback = average([
    average(recent.map((session) => session.clarity)),
    average(recent.map((session) => session.professional_tone)),
    average(recent.map((session) => session.structure)),
  ]);
  const speakingConfidence =
    speakingConfidenceFromAssessments ?? speakingConfidenceFallback;
  const interviewReadinessFallback = average([
    average(interviewSessions.map((session) => session.overall_score)),
    average(interviewSessions.map((session) => session.opportunity_readiness)),
    average(interviewSessions.map((session) => session.structure)),
    average(interviewSessions.map((session) => session.professional_tone)),
  ]);
  const interviewReadiness =
    interviewReadinessFromAssessments ?? interviewReadinessFallback;
  const recentWriting = writingAssessments.slice(0, 12);
  const asyncWritingFallback = recentWriting.length
    ? average([
        average(recentWriting.map((assessment) => assessment.clarity)),
        average(recentWriting.map((assessment) => assessment.tone)),
        average(recentWriting.map((assessment) => assessment.concision)),
        average(recentWriting.map((assessment) => assessment.ownership)),
        average(recentWriting.map((assessment) => assessment.actionability)),
      ])
    : average([
        average(recent.map((session) => session.clarity)),
        average(recent.map((session) => session.professional_tone)),
        average(recent.map((session) => session.structure)),
      ]);
  const asyncWriting = asyncWritingFromAssessments ?? asyncWritingFallback;
  const assetCoverage = remoteJobAssets.length
    ? Math.min(60 + remoteJobAssets.length * 8, 100)
    : null;
  const remoteJobAssetsFallback = average([
    assetCoverage,
    interviewReadiness,
    asyncWriting,
    average(salarySessions.map((session) => session.opportunity_readiness)),
    average(recent.map((session) => session.professional_tone)),
  ]);
  const remoteJobAssetsScore =
    remoteJobAssetsFromAssessments ?? remoteJobAssetsFallback;
  const setupReadiness = setupReadinessFromAssessments ?? setupCheck?.score ?? null;
  const professionalConfidenceFallback = average([
    average(recent.map((session) => session.professional_tone)),
    average(remoteCommunicationSessions.map((session) => session.opportunity_readiness)),
    average(recent.map((session) => session.overall_score)),
  ]);
  const professionalConfidence =
    professionalConfidenceFromAssessments ?? professionalConfidenceFallback;

  return [
    {
      id: "englishCommunication",
      name: "English Communication",
      description: "Clarity, grammar and structure across your saved practice sessions.",
      score: englishCommunication,
      confidence: englishCommunicationFromAssessments
        ? "real"
        : confidenceFor(englishCommunication, recent.length),
      evidence:
        englishCommunication === null
          ? "No saved practice data yet."
          : englishCommunicationFromAssessments
            ? `Based on ${areaAssessmentCount(
                readinessAssessments,
                "englishCommunication"
              )} readiness assessments.`
          : `Based on ${recent.length} recent saved practice ${recent.length === 1 ? "session" : "sessions"}.`,
      recommendation: "Practice short answers with clear structure: context, action and result.",
    },
    {
      id: "speakingConfidence",
      name: "Speaking Confidence",
      description: "How clear, structured and professional your spoken answers sound.",
      score: speakingConfidence,
      confidence: speakingConfidenceFromAssessments
        ? "real"
        : confidenceFor(speakingConfidence, recent.length),
      evidence:
        speakingConfidence === null
          ? "No spoken/session transcript data yet."
          : speakingConfidenceFromAssessments
            ? `Based on ${areaAssessmentCount(
                readinessAssessments,
                "speakingConfidence"
              )} readiness assessments.`
          : "Estimated from clarity, structure and professional tone in your answers.",
      recommendation: "Practice your spoken self-introduction again and aim for 45-60 seconds.",
    },
    {
      id: "interviewReadiness",
      name: "Interview Readiness",
      description: "Structure, relevance, tone and opportunity readiness in interview answers.",
      score: interviewReadiness,
      confidence: interviewReadinessFromAssessments
        ? "real"
        : confidenceFor(interviewReadiness, interviewSessions.length),
      evidence:
        interviewReadiness === null
          ? "No interview practice saved yet."
          : interviewReadinessFromAssessments
            ? `Based on ${areaAssessmentCount(
                readinessAssessments,
                "interviewReadiness"
              )} readiness assessments.`
          : `Based on ${interviewSessions.length} interview ${interviewSessions.length === 1 ? "answer" : "answers"}.`,
      recommendation: "Use stronger examples and connect your answer to business impact.",
    },
    {
      id: "asyncWriting",
      name: "Async Writing",
      description: "Estimated ability to write clear updates, emails and follow-ups.",
      score: asyncWriting,
      confidence:
        asyncWriting === null
          ? "not_assessed"
          : asyncWritingFromAssessments
            ? "real"
          : recentWriting.length
            ? confidenceFor(asyncWriting, recentWriting.length)
            : "partial",
      evidence:
        asyncWriting === null
          ? "No writing-specific assessment yet."
          : asyncWritingFromAssessments
            ? `Based on ${areaAssessmentCount(
                readinessAssessments,
                "asyncWriting"
              )} readiness assessments.`
          : recentWriting.length
            ? `Based on ${recentWriting.length} async writing ${
                recentWriting.length === 1 ? "assessment" : "assessments"
              }.`
            : "Partial estimate from interview clarity, structure and tone until writing assessments exist.",
      recommendation: "Use templates to practice concise updates, follow-ups and blocker explanations.",
    },
    {
      id: "remoteJobAssets",
      name: "Remote Job Assets",
      description: "How ready your English answers are for recruiters, interviews and applications.",
      score: remoteJobAssetsScore,
      confidence:
        remoteJobAssetsScore === null
          ? "not_assessed"
          : remoteJobAssetsFromAssessments
            ? "real"
          : remoteJobAssets.length
            ? "real"
            : "partial",
      evidence:
        remoteJobAssetsScore === null
          ? "Practice interview and salary/application scenarios to assess this."
          : remoteJobAssetsFromAssessments
            ? `Based on ${areaAssessmentCount(
                readinessAssessments,
                "remoteJobAssets"
              )} readiness assessments.`
          : remoteJobAssets.length
            ? `Based on ${remoteJobAssets.length} saved job ${
                remoteJobAssets.length === 1 ? "asset" : "assets"
              } plus practice scores.`
            : "Partial estimate from interview readiness, salary answers and professional tone.",
      recommendation: "Prepare recruiter messages and save stronger versions of common answers.",
    },
    {
      id: "setupReadiness",
      name: "Setup Readiness",
      description: "Internet, microphone, camera and environment readiness for remote work.",
      score: setupReadiness,
      confidence: setupReadiness === null ? "not_assessed" : "real",
      evidence:
        setupReadiness === null
          ? "Complete and save the remote setup check to include this in your score."
          : setupReadinessFromAssessments
            ? `Based on ${areaAssessmentCount(
                readinessAssessments,
                "setupReadiness"
              )} readiness assessments.`
          : `Saved setup check: ${setupCheck?.timezone ?? "timezone not provided"}.`,
      recommendation: "Complete the setup checklist before mock interviews or real calls.",
    },
    {
      id: "professionalConfidence",
      name: "Professional Confidence",
      description: "Tone, ownership and confidence for international remote work conversations.",
      score: professionalConfidence,
      confidence: professionalConfidenceFromAssessments
        ? "real"
        : confidenceFor(professionalConfidence, recent.length),
      evidence:
        professionalConfidence === null
          ? "No saved practice data yet."
          : professionalConfidenceFromAssessments
            ? `Based on ${areaAssessmentCount(
                readinessAssessments,
                "professionalConfidence"
              )} readiness assessments.`
          : "Based on professional tone, overall score and remote communication readiness.",
      recommendation: "Sound specific and calm: state what you did, why it mattered and what improved.",
    },
  ];
}

export function calculateReadinessScore(areas: ReadinessAreaScore[]) {
  return weightedAverage([
    [areas.find((area) => area.id === "englishCommunication")?.score ?? null, 20],
    [areas.find((area) => area.id === "speakingConfidence")?.score ?? null, 15],
    [areas.find((area) => area.id === "interviewReadiness")?.score ?? null, 25],
    [areas.find((area) => area.id === "asyncWriting")?.score ?? null, 10],
    [areas.find((area) => area.id === "remoteJobAssets")?.score ?? null, 10],
    [areas.find((area) => area.id === "setupReadiness")?.score ?? null, 5],
    [areas.find((area) => area.id === "professionalConfidence")?.score ?? null, 15],
  ]);
}

export function getReadinessLevel(score: number | null): ReadinessLevel {
  if (score === null || score <= 39) {
    return "Not Ready Yet";
  }

  if (score <= 59) {
    return "Building Foundation";
  }

  if (score <= 74) {
    return "Interview Emerging";
  }

  if (score <= 84) {
    return "Remote Work Ready";
  }

  return "Global Professional";
}

export function getReadinessStatus(score: number | null) {
  const level = getReadinessLevel(score);

  const labels: Record<ReadinessLevel, string> = {
    "Not Ready Yet": "Not Ready Yet",
    "Building Foundation": "Construyendo base",
    "Interview Emerging": "En camino a entrevistas",
    "Remote Work Ready": "Remote Work Ready",
    "Global Professional": "Profesional global",
  };

  return {
    level,
    label: labels[level],
  };
}

export function getRecommendedNextStep(
  areas: ReadinessAreaScore[],
  sessionsCount: number
) {
  if (!sessionsCount) {
    return {
      label: "Start with Interview English: Tell me about yourself.",
      href: "/app/interview",
      description:
        "Complete your first interview practice to start calculating readiness from real data.",
    };
  }

  const weakestAssessedArea = [...areas]
    .filter((area) => area.score !== null)
    .sort((a, b) => (a.score ?? 0) - (b.score ?? 0))[0];

  if (!weakestAssessedArea) {
    return {
      label: "Complete your first scored practice.",
      href: "/app/interview",
      description: "Readiness needs at least one saved session to become useful.",
    };
  }

  if ((weakestAssessedArea.score ?? 0) < 75) {
    return {
      label: weakestAssessedArea.recommendation,
      href:
        weakestAssessedArea.id === "asyncWriting" ||
        weakestAssessedArea.id === "remoteJobAssets"
          ? "/app/remote-jobs"
          : "/app/interview",
      description: `Priority area: ${weakestAssessedArea.name} (${scoreLabel(
        weakestAssessedArea.score
      )}).`,
    };
  }

  return {
    label: "Prepare your recruiter messages and remote job assets.",
    href: "/app/remote-jobs",
    description:
      "Your practice scores are strong enough to turn improved English into application materials.",
  };
}

export function buildReadinessSummary(
  sessions: PracticeSession[],
  setupCheck?: RemoteSetupCheck | null,
  writingAssessments: WritingAssessment[] = [],
  remoteJobAssets: RemoteJobAsset[] = [],
  readinessAssessments: ReadinessAssessment[] = []
): ReadinessSummary {
  const areas = calculateAreaScores(
    sessions,
    setupCheck,
    writingAssessments,
    remoteJobAssets,
    readinessAssessments
  );
  const overallScore = calculateReadinessScore(areas);
  const status = getReadinessStatus(overallScore);
  const assessedAreas = areas.filter((area) => area.score !== null);
  const strongAreas = assessedAreas
    .filter((area) => (area.score ?? 0) >= 75)
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, 3);
  const needsWorkAreas = assessedAreas
    .filter((area) => (area.score ?? 0) < 75)
    .sort((a, b) => (a.score ?? 0) - (b.score ?? 0))
    .slice(0, 3);
  const history = sessions
    .filter((session) => typeof session.overall_score === "number")
    .slice(0, 8)
    .reverse()
    .map((session) => ({
      label: new Intl.DateTimeFormat("es", {
        month: "short",
        day: "numeric",
      }).format(new Date(session.created_at)),
      score: session.overall_score ?? 0,
      scenario: session.scenario,
    }));
  const recentAverage = average(sessions.slice(0, 3).map((session) => session.overall_score));
  const previousAverage = average(
    sessions.slice(3, 6).map((session) => session.overall_score)
  );
  const trendValue =
    recentAverage !== null && previousAverage !== null
      ? recentAverage - previousAverage
      : null;
  const assessmentHistory = readinessAssessments
    .slice(0, 8)
    .map((assessment) => ({
      label: new Intl.DateTimeFormat("es", {
        month: "short",
        day: "numeric",
      }).format(new Date(assessment.created_at)),
      score: assessment.score,
      type: assessment.assessment_type,
      status: assessment.status,
    }));

  return {
    overallScore,
    status,
    areas,
    strongAreas,
    needsWorkAreas,
    recommendedNextStep: getRecommendedNextStep(areas, sessions.length),
    history,
    assessmentHistory,
    trend: {
      label:
        trendValue === null
          ? "Need more sessions"
          : trendValue >= 0
            ? `+${trendValue} vs previous practices`
            : `${trendValue} vs previous practices`,
      value: trendValue,
    },
    dataNote:
      sessions.length === 0
        ? "No readiness score yet. Complete one practice session to start."
        : `Score uses ${Math.min(sessions.length, 12)} recent saved practice ${
            Math.min(sessions.length, 12) === 1 ? "session" : "sessions"
          }${
            readinessAssessments.length
              ? `, ${Math.min(readinessAssessments.length, 12)} readiness ${
                  Math.min(readinessAssessments.length, 12) === 1
                    ? "assessment"
                    : "assessments"
                }`
              : ""
          }${writingAssessments.length ? `, ${Math.min(writingAssessments.length, 12)} writing ${
            Math.min(writingAssessments.length, 12) === 1 ? "assessment" : "assessments"
          }` : ""}${remoteJobAssets.length ? `, ${Math.min(remoteJobAssets.length, 12)} job ${
            Math.min(remoteJobAssets.length, 12) === 1 ? "asset" : "assets"
          }` : ""}${
            setupCheck ? " and your saved setup check" : ""
          }. Areas marked partial are estimates until dedicated assessments exist.`,
  };
}
