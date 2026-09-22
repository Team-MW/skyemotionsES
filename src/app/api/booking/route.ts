import { NextResponse } from "next/server";
import { getPaidCheckoutSession, getStripe } from "@/lib/stripe";

export type BookingPayload = {
  sessionId: string;
  fullName: string;
  email: string;
  phone: string;
  birthDate: string;
  weightKg: string;
  preferredDate: string;
  alternateDate?: string;
  emergencyContact?: string;
  notes?: string;
  acceptTerms: boolean;
};

function isNonEmpty(v: unknown, max = 200) {
  return typeof v === "string" && v.trim().length > 0 && v.trim().length <= max;
}

async function notifyBooking(summary: string, html: string) {
  const to = process.env.BOOKING_NOTIFY_EMAIL;
  const key = process.env.RESEND_API_KEY;
  const from =
    process.env.BOOKING_FROM_EMAIL || "Sky Emotions <onboarding@resend.dev>";

  if (!to || !key) {
    console.info("[booking] Formulario recibido (sin email configurado):\n", summary);
    return { emailed: false };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: "Nueva reserva pagada — Sky Emotions",
      text: summary,
      html,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("[booking] Resend error:", errText);
    return { emailed: false };
  }

  return { emailed: true };
}

export async function POST(req: Request) {
  let body: Partial<BookingPayload>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const sessionId = body.sessionId;
  if (!sessionId || typeof sessionId !== "string") {
    return NextResponse.json({ error: "Sesión no válida" }, { status: 401 });
  }

  const paid = await getPaidCheckoutSession(sessionId);
  if (!paid) {
    return NextResponse.json(
      { error: "Acceso denegado. El pago no está confirmado." },
      { status: 403 },
    );
  }

  if (paid.bookingComplete) {
    return NextResponse.json(
      { error: "Este formulario ya fue enviado para este pago." },
      { status: 409 },
    );
  }

  if (
    !isNonEmpty(body.fullName, 120) ||
    !isNonEmpty(body.email, 160) ||
    !isNonEmpty(body.phone, 40) ||
    !isNonEmpty(body.birthDate, 20) ||
    !isNonEmpty(body.weightKg, 10) ||
    !isNonEmpty(body.preferredDate, 40) ||
    body.acceptTerms !== true
  ) {
    return NextResponse.json(
      { error: "Faltan campos obligatorios." },
      { status: 400 },
    );
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe no está configurado." },
      { status: 503 },
    );
  }

  const booking = {
    fullName: body.fullName!.trim(),
    email: body.email!.trim(),
    phone: body.phone!.trim(),
    birthDate: body.birthDate!.trim(),
    weightKg: body.weightKg!.trim(),
    preferredDate: body.preferredDate!.trim(),
    alternateDate: (body.alternateDate || "").trim(),
    emergencyContact: (body.emergencyContact || "").trim(),
    notes: (body.notes || "").trim().slice(0, 1000),
    productSummary: paid.productSummary,
    amountTotal: paid.amountTotal,
    paidAt: new Date().toISOString(),
  };

  const summary = [
    `Sesión: ${sessionId}`,
    `Pack: ${paid.productSummary}`,
    `Importe: ${paid.amountTotal != null ? (paid.amountTotal / 100).toFixed(2) : "?"} ${paid.currency?.toUpperCase() || "EUR"}`,
    `Nombre: ${booking.fullName}`,
    `Email: ${booking.email}`,
    `Teléfono: ${booking.phone}`,
    `Nacimiento: ${booking.birthDate}`,
    `Peso: ${booking.weightKg} kg`,
    `Fecha preferida: ${booking.preferredDate}`,
    `Fecha alternativa: ${booking.alternateDate || "—"}`,
    `Contacto emergencia: ${booking.emergencyContact || "—"}`,
    `Notas: ${booking.notes || "—"}`,
  ].join("\n");

  const html = `<pre style="font-family:sans-serif;white-space:pre-wrap">${summary
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")}</pre>`;

  try {
    const payload = JSON.stringify(booking);
    await stripe.checkout.sessions.update(sessionId, {
      metadata: {
        booking_complete: "true",
        booking_name: booking.fullName.slice(0, 450),
        booking_phone: booking.phone.slice(0, 100),
        booking_date: booking.preferredDate.slice(0, 100),
        booking_json: payload.slice(0, 500),
      },
    });
  } catch (err) {
    console.error("[booking] metadata update failed", err);
    return NextResponse.json(
      { error: "No se pudo guardar la reserva. Inténtalo de nuevo." },
      { status: 500 },
    );
  }

  const { emailed } = await notifyBooking(summary, html);

  return NextResponse.json({ ok: true, emailed });
}
