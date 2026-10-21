import { NextResponse } from "next/server";

import type { CheckoutItemType } from "@/lib/checkout-items";
import { getEasnerPublishableKey } from "@/lib/publishable-key";
import { startCheckoutSessionForItem } from "@/lib/start-checkout-session";

type ClientCheckoutBody = {
  itemType?: CheckoutItemType;
  itemId?: string;
};

function isValidBody(body: unknown): body is Required<ClientCheckoutBody> {
  if (!body || typeof body !== "object") return false;

  const value = body as ClientCheckoutBody;

  return (
    (value.itemType === "shop" ||
      value.itemType === "subscription" ||
      value.itemType === "booking") &&
    typeof value.itemId === "string" &&
    value.itemId.trim().length > 0
  );
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (!isValidBody(body)) {
      return NextResponse.json({ error: "Invalid checkout request" }, { status: 400 });
    }

    const session = await startCheckoutSessionForItem(
      body.itemType,
      body.itemId.trim(),
    );

    if (!session) {
      return NextResponse.json({ error: "Unknown item" }, { status: 404 });
    }

    if (!session.client_secret) {
      return NextResponse.json(
        { error: "Checkout session did not return a client secret" },
        { status: 500 },
      );
    }

    const publishableKey = getEasnerPublishableKey();

    if (!publishableKey) {
      return NextResponse.json(
        {
          error:
            "Publishable key is not configured on the server (set EASNER_PUBLISHABLE_KEY or NEXT_PUBLIC_EASNER_PUBLISHABLE_KEY).",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      client_secret: session.client_secret,
      publishable_key: publishableKey,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to start checkout";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
