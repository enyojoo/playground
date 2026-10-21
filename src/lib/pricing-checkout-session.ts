import "server-only";

import type { ClientCheckoutSession } from "@/lib/checkout-client";
import { getEasnerPublishableKey } from "@/lib/publishable-key";
import { startCheckoutSessionForItem } from "@/lib/start-checkout-session";
import { subscriptionPlan } from "@/lib/catalog";

export async function createPricingCheckoutSession(): Promise<ClientCheckoutSession | null> {
  try {
    const session = await startCheckoutSessionForItem(
      "subscription",
      subscriptionPlan.id,
    );
    const publishableKey = getEasnerPublishableKey();

    if (!session?.client_secret || !publishableKey) {
      return null;
    }

    return {
      clientSecret: session.client_secret,
      publishableKey,
    };
  } catch {
    return null;
  }
}
