import { NextResponse } from "next/server";
import { getProduct } from "@/lib/catalog";
import { getSiteUrl, getStripe } from "@/lib/stripe";

type BodyItem = { productId: string; quantity: number };

export async function POST(req: Request) {
  let body: {
    items?: BodyItem[];
    customerEmail?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const items = (body.items || []).filter(
    (i) => i.quantity > 0 && getProduct(i.productId),
  );

  if (items.length === 0) {
    return NextResponse.json({ error: "Carrito vacío" }, { status: 400 });
  }

  const stripe = getStripe();
  const siteUrl = getSiteUrl();

  if (!stripe) {
    return NextResponse.json(
      {
        error:
          "Stripe no está configurado. Añade STRIPE_SECRET_KEY en .env.local / Vercel.",
        demo: true,
      },
      { status: 503 },
    );
  }

  try {
    const line_items = items.map((i) => {
      const product = getProduct(i.productId)!;
      if (product.stripePriceId) {
        return {
          price: product.stripePriceId,
          quantity: i.quantity,
        };
      }
      return {
        quantity: i.quantity,
        price_data: {
          currency: "eur" as const,
          unit_amount: product.priceCents,
          product_data: {
            name: product.name,
            description: product.description.slice(0, 200),
          },
        },
      };
    });

    const productIds = items
      .map((i) => `${i.productId}:${i.quantity}`)
      .join(",");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "es",
      line_items,
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout`,
      customer_email: body.customerEmail || undefined,
      billing_address_collection: "auto",
      phone_number_collection: { enabled: true },
      metadata: {
        productIds,
        source: "skyemotions-web",
        booking_complete: "false",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout]", err);
    return NextResponse.json(
      { error: "Error al crear la sesión de Stripe." },
      { status: 500 },
    );
  }
}
