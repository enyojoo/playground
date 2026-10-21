import { NextResponse } from "next/server";

import {
  resolveCheckoutItem,
  type CheckoutItemType,
} from "@/lib/checkout-items";
import { createCheckoutSession } from "@/lib/easner";

function parseItemType(value: FormDataEntryValue | null): CheckoutItemType | null {
  if (value === "shop" || value === "subscription" || value === "booking") {
    return value;
  }

  return null;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const itemType = parseItemType(formData.get("itemType"));
    const itemId = formData.get("itemId");

    if (!itemType || typeof itemId !== "string" || !itemId.trim()) {
      return NextResponse.json({ error: "Invalid checkout request" }, { status: 400 });
    }

    const resolved = resolveCheckoutItem(itemType, itemId.trim());

    if (!resolved) {
      return NextResponse.json({ error: "Unknown item" }, { status: 404 });
    }

    const session = await createCheckoutSession({
      mode: resolved.mode,
      currency: resolved.currency,
      line_items: [resolved.lineItem],
      recurring: resolved.recurring,
      metadata: resolved.metadata,
      idempotencyKey: `checkout-${resolved.idempotencyReference}`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Checkout session did not return a hosted URL" },
        { status: 500 },
      );
    }

    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to start checkout";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
