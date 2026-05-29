export type ProductEmailType =
  | "welcome"
  | "onboarding_completed"
  | "first_practice_completed"
  | "improved_answer"
  | "come_back_repeat"
  | "weekly_readiness_summary"
  | "upgrade_prompt";

type ProductEmailInput = {
  type: ProductEmailType;
  name?: string | null;
  improvedAnswer?: string | null;
  scenario?: string | null;
  score?: number | null;
  readinessScore?: number | null;
  nextStep?: string | null;
};

function baseLayout({
  title,
  preview,
  body,
}: {
  title: string;
  preview: string;
  body: string;
}) {
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;background:#f7f6f2;padding:32px;color:#111827;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:18px;padding:28px;">
        <div style="font-weight:700;font-size:18px;margin-bottom:24px;">Inglevo</div>
        <h1 style="font-size:28px;line-height:1.15;margin:0 0 12px;">${title}</h1>
        <p style="font-size:15px;line-height:1.6;color:#4b5563;margin:0 0 24px;">${preview}</p>
        ${body}
        <p style="border-top:1px solid #e5e7eb;color:#6b7280;font-size:12px;line-height:1.5;margin-top:28px;padding-top:18px;">
          Inglevo helps you practice professional English and improve remote work readiness.
          It does not guarantee employment, income, job placement, sponsorship, visas or immigration outcomes.
        </p>
      </div>
    </div>
  `;

  return html;
}

export function renderProductEmail(input: ProductEmailInput) {
  const firstName = input.name?.split(" ")[0] ?? "there";

  if (input.type === "welcome") {
    return {
      subject: "Welcome to Inglevo",
      text:
        `Hi ${firstName}, welcome to Inglevo. Start with your onboarding and first interview practice to build your Remote Readiness baseline.`,
      html: baseLayout({
        title: `Welcome to Inglevo, ${firstName}.`,
        preview:
          "Start by completing onboarding and practicing your first remote interview answer.",
        body:
          '<p style="font-size:15px;line-height:1.6;color:#374151;">Inglevo helps you improve the English you need to communicate professionally, apply to remote jobs and access better opportunities.</p>',
      }),
    };
  }

  if (input.type === "onboarding_completed") {
    return {
      subject: "Your readiness path is ready",
      text:
        "Your Inglevo onboarding is complete. Your next step is to start your first Interview English practice.",
      html: baseLayout({
        title: "Your readiness path is ready.",
        preview:
          "Your next best step is to complete your first Interview English practice.",
        body:
          '<p style="font-size:15px;line-height:1.6;color:#374151;">You now have a starting profile for Improve English, Remote Jobs Applications and My Readiness.</p>',
      }),
    };
  }

  if (input.type === "first_practice_completed") {
    return {
      subject: "First practice completed",
      text:
        `You completed your first practice${input.score ? ` with a score of ${input.score}/100` : ""}. Repeat it once to improve structure and confidence.`,
      html: baseLayout({
        title: "First practice completed.",
        preview:
          "You now have a real signal for your Remote Readiness baseline.",
        body: `<p style="font-size:15px;line-height:1.6;color:#374151;">Scenario: ${input.scenario ?? "Interview practice"}</p>
          <p style="font-size:15px;line-height:1.6;color:#374151;">Score: ${input.score ?? "Saved"}/100</p>`,
      }),
    };
  }

  if (input.type === "improved_answer") {
    return {
      subject: "Your improved answer from Inglevo",
      text:
        `Here is your improved answer for ${input.scenario ?? "your practice"}:\n\n${input.improvedAnswer ?? ""}`,
      html: baseLayout({
        title: "Your improved answer is ready.",
        preview:
          "Use this version as a reference, then repeat it naturally in your own words.",
        body: `<p style="font-size:14px;color:#6b7280;margin:0 0 8px;">${input.scenario ?? "Interview practice"}</p>
          <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:14px;padding:18px;font-size:15px;line-height:1.7;color:#111827;">${input.improvedAnswer ?? "Open Inglevo to review your improved answer."}</div>`,
      }),
    };
  }

  if (input.type === "come_back_repeat") {
    return {
      subject: "Repeat once and improve your score",
      text:
        "Your next step is to repeat your answer using the improved structure, but keeping it natural.",
      html: baseLayout({
        title: "Repeat once. Improve faster.",
        preview:
          input.nextStep ?? "Practice your spoken self-introduction again.",
        body:
          '<p style="font-size:15px;line-height:1.6;color:#374151;">The fastest way to improve interview English is to repeat the same answer with better structure.</p>',
      }),
    };
  }

  if (input.type === "weekly_readiness_summary") {
    return {
      subject: "Your weekly readiness summary",
      text:
        `Your current readiness score is ${input.readinessScore ?? "pending"}. Next step: ${input.nextStep ?? "complete your next practice"}.`,
      html: baseLayout({
        title: "Your weekly readiness summary.",
        preview:
          `Current score: ${input.readinessScore ?? "Pending"}. Next step: ${input.nextStep ?? "Complete your next practice"}.`,
        body:
          '<p style="font-size:15px;line-height:1.6;color:#374151;">Keep building signals across English Communication, Interview Readiness, Async Writing and Remote Job Assets.</p>',
      }),
    };
  }

  return {
    subject: "Keep building your remote readiness",
    text:
      "Upgrade when you are ready for more practice, assets and readiness insights.",
    html: baseLayout({
      title: "Keep building your remote readiness.",
      preview:
        "Pro will unlock more practice, assets and readiness signals when checkout is configured.",
      body:
        '<p style="font-size:15px;line-height:1.6;color:#374151;">Free is enough to start. Pro is for continuous practice and a stronger application workspace.</p>',
    }),
  };
}
