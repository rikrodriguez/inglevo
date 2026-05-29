import { NextResponse } from "next/server";

import { requireApiUser } from "@/lib/api-auth";
import { getStripe } from "@/lib/stripe";

export async function POST() {
  const stripe = getStripe();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const priceId = process.env.STRIPE_PRO_PRICE_ID;

  const { response: authResponse } = await requireApiUser();
  if (authResponse && stripe && priceId) {
    return authResponse;
  }

  if (!stripe || !priceId) {
    return NextResponse.json({
      checkoutUrl: null,
      mode: "placeholder",
      message: "Checkout is not configured yet.",
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/app?checkout=success`,
      cancel_url: `${appUrl}/pricing?checkout=cancelled`,
    });

    return NextResponse.json({
      checkoutUrl: session.url,
      mode: "stripe",
    });
  } catch {
    return NextResponse.json(
      {
        checkoutUrl: null,
        mode: "placeholder",
        message: "Checkout is not configured yet.",
      },
      { status: 200 }
    );
  }
}
