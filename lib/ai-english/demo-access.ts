export const AI_ENGLISH_DEMO_ACCESS_ENV = "NEXT_PUBLIC_ENABLE_AI_ENGLISH_DEMO";

export const aiEnglishPhaseADemoRoutes = [
  "/app/ai-trainer",
  "/app/ai-trainer/setup",
  "/app/ai-trainer/practice",
  "/app/ai-trainer/answer-bank",
] as const;

type DemoAccessInput = {
  pathname: string;
  hostname: string;
  nodeEnv?: string;
  vercelEnv?: string;
  demoFlag?: string;
};

export function isAIEnglishPhaseADemoRoute(pathname: string) {
  return aiEnglishPhaseADemoRoutes.some((route) => pathname === route);
}

export function isLocalDevelopmentHost(hostname: string) {
  const normalized = hostname.replace(/^\[|\]$/g, "");

  return (
    normalized === "localhost" ||
    normalized === "127.0.0.1" ||
    normalized === "::1"
  );
}

export function canBypassAuthForAIEnglishDemo({
  pathname,
  hostname,
  nodeEnv = process.env.NODE_ENV,
  vercelEnv = process.env.VERCEL_ENV,
  demoFlag = process.env.NEXT_PUBLIC_ENABLE_AI_ENGLISH_DEMO,
}: DemoAccessInput) {
  const isLocalDevelopment = nodeEnv === "development" && isLocalDevelopmentHost(hostname);
  const isVercelPreview = vercelEnv === "preview";

  return (
    demoFlag === "true" &&
    (isLocalDevelopment || isVercelPreview) &&
    isAIEnglishPhaseADemoRoute(pathname)
  );
}
