import { NextResponse } from "next/server";
import { getProduct } from "@/lib/catalog";

type BodyItem = { productId: string; quantity: number };

export async function POST(req: Request) {
  let body: {
    items?: BodyItem[];
    customerEmail?: string;
    customerName?: string;
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

  const secret = process.env.STRIPE_SECRET_KEY;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://127.0.0.1:3200";

  // Stripe pas encore branché : réponse claire pour le front
  if (!secret) {
    return NextResponse.json(
      {
        error:
          "Stripe no está configurado. Añade STRIPE_SECRET_KEY en .env.local para activar el pago.",
        demo: true,
      },
      { status: 503 },
    );
  }

  try {
    // Dynamic import so the app builds without stripe installed as hard fail
    // when key missing — we still install the package.
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(secret);

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
          currency: "eur",
          unit_amount: product.priceCents,
          product_data: {
            name: product.name,
            description: product.description.slice(0, 200),
            images: product.image.startsWith("http")
              ? [product.image]
              : undefined,
          },
        },
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout`,
      customer_email: body.customerEmail || undefined,
      metadata: {
        customerName: body.customerName || "",
        source: "skyemotions-web",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Error al crear la sesión de Stripe." },
      { status: 500 },
    );
  }
}
