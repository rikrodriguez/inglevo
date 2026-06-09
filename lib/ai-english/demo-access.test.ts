import assert from "node:assert/strict";

import {
  canBypassAuthForAIEnglishDemo,
  isAIEnglishPhaseADemoRoute,
  isLocalDevelopmentHost,
} from "./demo-access.ts";

assert.equal(isAIEnglishPhaseADemoRoute("/app/ai-trainer"), true);
assert.equal(isAIEnglishPhaseADemoRoute("/app/ai-trainer/setup"), true);
assert.equal(isAIEnglishPhaseADemoRoute("/app/ai-trainer/practice"), true);
assert.equal(isAIEnglishPhaseADemoRoute("/app/ai-trainer/answer-bank"), true);
assert.equal(isAIEnglishPhaseADemoRoute("/app/ai-trainer/writing"), false);
assert.equal(isAIEnglishPhaseADemoRoute("/app/readiness"), false);
assert.equal(isAIEnglishPhaseADemoRoute("/app"), false);

assert.equal(isLocalDevelopmentHost("localhost"), true);
assert.equal(isLocalDevelopmentHost("127.0.0.1"), true);
assert.equal(isLocalDevelopmentHost("::1"), true);
assert.equal(isLocalDevelopmentHost("[::1]"), true);
assert.equal(isLocalDevelopmentHost("inglevo.com"), false);

assert.equal(
  canBypassAuthForAIEnglishDemo({
    pathname: "/app/ai-trainer/practice",
    hostname: "localhost",
    nodeEnv: "development",
    vercelEnv: undefined,
    demoFlag: "true",
  }),
  true
);
assert.equal(
  canBypassAuthForAIEnglishDemo({
    pathname: "/app/ai-trainer/practice",
    hostname: "localhost",
    nodeEnv: "production",
    vercelEnv: "production",
    demoFlag: "true",
  }),
  false
);
assert.equal(
  canBypassAuthForAIEnglishDemo({
    pathname: "/app/ai-trainer/practice",
    hostname: "inglevo.com",
    nodeEnv: "development",
    vercelEnv: undefined,
    demoFlag: "true",
  }),
  false
);
assert.equal(
  canBypassAuthForAIEnglishDemo({
    pathname: "/app/ai-trainer/practice",
    hostname: "preview-deployment.vercel.app",
    nodeEnv: "production",
    vercelEnv: "preview",
    demoFlag: "true",
  }),
  true
);
assert.equal(
  canBypassAuthForAIEnglishDemo({
    pathname: "/app/ai-trainer/practice",
    hostname: "www.inglevo.com",
    nodeEnv: "production",
    vercelEnv: "production",
    demoFlag: "true",
  }),
  false
);
assert.equal(
  canBypassAuthForAIEnglishDemo({
    pathname: "/app/ai-trainer/writing",
    hostname: "localhost",
    nodeEnv: "development",
    vercelEnv: undefined,
    demoFlag: "true",
  }),
  false
);
assert.equal(
  canBypassAuthForAIEnglishDemo({
    pathname: "/app/ai-trainer/practice",
    hostname: "localhost",
    nodeEnv: "development",
    vercelEnv: undefined,
    demoFlag: "false",
  }),
  false
);
