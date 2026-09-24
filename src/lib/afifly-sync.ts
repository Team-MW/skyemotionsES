import {
  createAfiflyAdherent,
  countryFromCode,
  getAfiflyMrglId,
  isAfiflyConfigured,
  splitFullName,
  type AfiflyAdherentPayload,
} from "@/lib/afifly";
import { getProduct } from "@/lib/catalog";
import { getStripe } from "@/lib/stripe";

export type AfiflySyncResult = {
  synced: boolean;
  alreadySynced?: boolean;
  created: number;
  errors: string[];
  testMode?: boolean;
  skippedReason?: string;
};

function parseProductIds(meta: string | null | undefined) {
  if (!meta) return [] as { productId: string; quantity: number }[];
  return meta
    .split(",")
    .map((chunk) => {
      const [productId, qtyRaw] = chunk.split(":");
      const quantity = Math.max(1, Number(qtyRaw) || 1);
      return productId ? { productId, quantity } : null;
    })
    .filter((x): x is { productId: string; quantity: number } => Boolean(x));
}

/**
 * After a paid Stripe Checkout session, create Afifly adherent(s) + gift vouchers.
 * Idempotent via Stripe session metadata `afifly_synced`.
 */
export async function syncPaidSessionToAfifly(
  sessionId: string,
): Promise<AfiflySyncResult> {
  if (!isAfiflyConfigured()) {
    return {
      synced: false,
      created: 0,
      errors: [],
      skippedReason: "Afifly no configurado (falta AFIFLY_API_KEY).",
    };
  }

  const stripe = getStripe();
  if (!stripe) {
    return {
      synced: false,
      created: 0,
      errors: [],
      skippedReason: "Stripe no configurado.",
    };
  }

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });
  } catch (err) {
    console.error("[afifly-sync] retrieve session", err);
    return {
      synced: false,
      created: 0,
      errors: ["No se pudo recuperar la sesión de Stripe."],
    };
  }

  if (session.payment_status !== "paid") {
    return {
      synced: false,
      created: 0,
      errors: [],
      skippedReason: "Pago no confirmado.",
    };
  }

  if (session.metadata?.afifly_synced === "true") {
    return {
      synced: true,
      alreadySynced: true,
      created: Number(session.metadata.afifly_created || 0),
      errors: [],
    };
  }

  // Avoid duplicate gift vouchers if a previous attempt already created some
  const previouslyCreated = Number(session.metadata?.afifly_created || 0);
  if (previouslyCreated > 0) {
    return {
      synced: true,
      alreadySynced: true,
      created: previouslyCreated,
      errors: session.metadata?.afifly_error
        ? [session.metadata.afifly_error]
        : [],
    };
  }

  const items = parseProductIds(session.metadata?.productIds);
  if (items.length === 0) {
    return {
      synced: false,
      created: 0,
      errors: ["No hay productos en la sesión para sincronizar con Afifly."],
    };
  }

  const details = session.customer_details;
  const { firstname, lastname } = splitFullName(
    details?.name || session.metadata?.customerName || null,
  );
  const email =
    details?.email || session.customer_email || "noreply@skyemotions.es";
  const phone = details?.phone || undefined;
  const address = details?.address;

  const totalCents = session.amount_total ?? 0;
  const totalUnits = items.reduce((sum, i) => sum + i.quantity, 0) || 1;
  const unitShare = Math.round(totalCents / totalUnits);

  const mrglId = getAfiflyMrglId();
  const errors: string[] = [];
  let created = 0;
  let testMode = false;
  let unitIndex = 0;

  for (const item of items) {
    const product = getProduct(item.productId);
    if (!product?.afiflyPackId) {
      errors.push(
        `Producto ${item.productId} sin mapeo Afifly (afiflyPackId).`,
      );
      continue;
    }

    for (let q = 0; q < item.quantity; q++) {
      unitIndex += 1;
      const amountPaid =
        unitIndex === totalUnits
          ? totalCents - unitShare * (totalUnits - 1)
          : unitShare;

      const payload: AfiflyAdherentPayload = {
        sautant: {
          firstname,
          lastname,
          email,
          phone,
          city: address?.city || undefined,
          country: countryFromCode(address?.country),
          postcode: address?.postal_code || undefined,
          address: [address?.line1, address?.line2].filter(Boolean).join(", ") ||
            undefined,
          accept_mail: 1,
          force_adherent_creation: 0,
        },
        amount_paid: amountPaid,
        pack_id: product.afiflyPackId,
        mrgl_id: mrglId,
        options: product.afiflyOptionIds?.length
          ? product.afiflyOptionIds
          : undefined,
        comment_paiement: `Stripe ${sessionId} · ${product.name}`,
        comment_sautant: `Pedido web Sky Emotions ES · ${product.name}`,
        comment_bon: product.shortName,
      };

      const result = await createAfiflyAdherent(payload);
      testMode = result.testMode;

      if (result.ok) {
        created += 1;
      } else {
        errors.push(`${product.name}: ${result.message}`);
        console.error("[afifly-sync] create failed", result);
      }
    }
  }

  const synced = created > 0 && errors.length === 0;

  try {
    await stripe.checkout.sessions.update(sessionId, {
      metadata: {
        ...(session.metadata || {}),
        afifly_synced: synced ? "true" : "false",
        afifly_created: String(created),
        afifly_error: errors[0]?.slice(0, 450) || "",
        afifly_test: testMode ? "true" : "false",
      },
    });
  } catch (err) {
    console.error("[afifly-sync] metadata update failed", err);
  }

  return { synced, created, errors, testMode };
}
