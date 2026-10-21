import { NextResponse } from "next/server";

import type { CheckoutItemType } from "@/lib/checkout-items";
import { startCheckoutSessionForItem } from "@/lib/start-checkout-session";

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

    const session = await startCheckoutSessionForItem(itemType, itemId.trim());

    if (!session) {
      return NextResponse.json({ error: "Unknown item" }, { status: 404 });
    }

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
