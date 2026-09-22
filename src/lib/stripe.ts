import Stripe from "stripe";

import type { PaidSessionView } from "@/lib/booking-types";

export function getStripe(): Stripe | null {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) return null;
  return new Stripe(secret);
}

export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://127.0.0.1:3000"
  );
}

/** Only returns a session when payment_status is paid. */
export async function getPaidCheckoutSession(
  sessionId: string,
): Promise<PaidSessionView | null> {
  if (!sessionId.startsWith("cs_")) return null;

  const stripe = getStripe();
  if (!stripe) return null;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    if (session.payment_status !== "paid") return null;

    const lineItems = session.line_items?.data ?? [];
    const productSummary =
      lineItems
        .map((li) => `${li.quantity ?? 1}× ${li.description || "Pack"}`)
        .join(", ") ||
      session.metadata?.productIds ||
      "Reserva Sky Emotions";

    return {
      id: session.id,
      email:
        session.customer_details?.email ||
        session.customer_email ||
        null,
      name: session.customer_details?.name || session.metadata?.customerName || null,
      amountTotal: session.amount_total,
      currency: session.currency,
      productSummary,
      bookingComplete: session.metadata?.booking_complete === "true",
    };
  } catch {
    return null;
  }
}
