import { logInternalEvent } from "@/lib/internal-events";
import { sendProductEmail } from "@/lib/email/resend";

export type ProductEventName =
  | "signup_completed"
  | "onboarding_completed"
  | "practice_saved"
  | "feedback_generated"
  | "readiness_viewed"
  | "remote_jobs_viewed"
  | "asset_created"
  | "upgrade_clicked";

type ProductEventInput = {
  eventName: ProductEventName;
  userId?: string | null;
  email?: string | null;
  name?: string | null;
  metadata?: Record<string, unknown>;
};

function asNumber(value: unknown) {
  return typeof value === "number" ? value : null;
}

function asString(value: unknown) {
  return typeof value === "string" ? value : null;
}

function asBoolean(value: unknown) {
  return typeof value === "boolean" ? value : false;
}

export async function trackProductEvent(input: ProductEventInput) {
  await logInternalEvent({
    eventType: input.eventName,
    severity: "info",
    route: "product",
    message: `Product event: ${input.eventName}`,
    metadata: input.metadata,
    userId: input.userId,
  });

  if (input.eventName === "signup_completed") {
    return sendProductEmail({
      to: input.email,
      type: "welcome",
      userId: input.userId,
      name: input.name,
    });
  }

  if (input.eventName === "onboarding_completed") {
    return sendProductEmail({
      to: input.email,
      type: "onboarding_completed",
      userId: input.userId,
      name: input.name,
    });
  }

  if (input.eventName === "practice_saved") {
    if (asBoolean(input.metadata?.isFirstPractice)) {
      await sendProductEmail({
        to: input.email,
        type: "first_practice_completed",
        userId: input.userId,
        name: input.name,
        scenario: asString(input.metadata?.scenario),
        score: asNumber(input.metadata?.score),
      });
    }

    return sendProductEmail({
      to: input.email,
      type: "improved_answer",
      userId: input.userId,
      name: input.name,
      scenario: asString(input.metadata?.scenario),
      score: asNumber(input.metadata?.score),
      improvedAnswer: asString(input.metadata?.improvedAnswer),
    });
  }

  return {
    sent: false,
    reason: "no_email_for_event",
  };
}
