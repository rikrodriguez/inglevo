import { logInternalEvent } from "@/lib/internal-events";
import { renderProductEmail, type ProductEmailType } from "@/lib/email/templates";

type SendProductEmailInput = {
  to?: string | null;
  type: ProductEmailType;
  userId?: string | null;
  name?: string | null;
  improvedAnswer?: string | null;
  scenario?: string | null;
  score?: number | null;
  readinessScore?: number | null;
  nextStep?: string | null;
};

export async function sendProductEmail(input: SendProductEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FROM_EMAIL;
  const replyTo = process.env.REPLY_TO_EMAIL;

  if (!apiKey || !from || !input.to) {
    return {
      sent: false,
      reason: "not_configured",
    };
  }

  const email = renderProductEmail(input);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: input.to,
        reply_to: replyTo || undefined,
        subject: email.subject,
        html: email.html,
        text: email.text,
      }),
    });

    if (!response.ok) {
      await logInternalEvent({
        eventType: "email_error",
        severity: "warning",
        route: "resend",
        message: "Resend rejected a product email.",
        metadata: {
          status: response.status,
          type: input.type,
        },
        userId: input.userId,
      });

      return {
        sent: false,
        reason: "resend_error",
      };
    }

    return {
      sent: true,
      reason: null,
    };
  } catch {
    await logInternalEvent({
      eventType: "email_error",
      severity: "warning",
      route: "resend",
      message: "Product email failed safely.",
      metadata: {
        type: input.type,
      },
      userId: input.userId,
    });

    return {
      sent: false,
      reason: "send_failed",
    };
  }
}
