import { NextResponse } from "next/server";
import {
  isAfiflyConfigured,
  listAfiflyMrgls,
  listAfiflyOptions,
  listAfiflyPacks,
  listAfiflyPlannings,
  listAfiflyTarifs,
} from "@/lib/afifly";
import { syncPaidSessionToAfifly } from "@/lib/afifly-sync";
import { getPaidCheckoutSession } from "@/lib/stripe";

/**
 * GET — debug catalogue Afifly (packs / options / mrgls / tarifs / plannings)
 * POST — { sessionId } force sync of a paid Stripe session into Afifly
 */
export async function GET() {
  if (!isAfiflyConfigured()) {
    return NextResponse.json(
      { error: "Afifly no está configurado." },
      { status: 503 },
    );
  }

  const [packs, options, mrgls, tarifs, plannings] = await Promise.all([
    listAfiflyPacks(),
    listAfiflyOptions(),
    listAfiflyMrgls(),
    listAfiflyTarifs(),
    listAfiflyPlannings(),
  ]);

  return NextResponse.json({
    packs: packs.data,
    options: options.data,
    mrgls: mrgls.data,
    tarifs: tarifs.data,
    plannings: plannings.data,
    statuses: {
      packs: packs.status,
      options: options.status,
      mrgls: mrgls.status,
      tarifs: tarifs.status,
      plannings: plannings.status,
    },
  });
}

export async function POST(req: Request) {
  let body: { sessionId?: string };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const sessionId = body.sessionId;
  if (!sessionId || typeof sessionId !== "string") {
    return NextResponse.json({ error: "sessionId requerido" }, { status: 400 });
  }

  const paid = await getPaidCheckoutSession(sessionId);
  if (!paid) {
    return NextResponse.json(
      { error: "Pago no confirmado o sesión inválida." },
      { status: 403 },
    );
  }

  const result = await syncPaidSessionToAfifly(sessionId);
  return NextResponse.json(result, {
    status: result.synced || result.alreadySynced ? 200 : 502,
  });
}
