import "server-only";

import {
  resolveCheckoutItem,
  type CheckoutItemType,
} from "@/lib/checkout-items";
import { createCheckoutSession, type CheckoutSession } from "@/lib/easner";

export async function startCheckoutSessionForItem(
  itemType: CheckoutItemType,
  itemId: string,
): Promise<CheckoutSession | null> {
  const resolved = resolveCheckoutItem(itemType, itemId.trim());

  if (!resolved) {
    return null;
  }

  return createCheckoutSession({
    mode: resolved.mode,
    currency: resolved.currency,
    line_items: [resolved.lineItem],
    recurring: resolved.recurring,
    metadata: resolved.metadata,
    idempotencyKey: `checkout-${resolved.idempotencyReference}`,
  });
}
