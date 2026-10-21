import type { CheckoutItemType } from "@/lib/checkout-items";

export type ClientCheckoutSession = {
  clientSecret: string;
  publishableKey: string;
};

export async function fetchClientCheckoutSession(
  itemType: CheckoutItemType,
  itemId: string,
): Promise<ClientCheckoutSession> {
  const response = await fetch("/api/checkout/client", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemType, itemId }),
  });

  const data = (await response.json()) as {
    client_secret?: string;
    publishable_key?: string;
    error?: string;
  };

  const publishableKey =
    data.publishable_key?.trim() ||
    process.env.NEXT_PUBLIC_EASNER_PUBLISHABLE_KEY?.trim() ||
    "";

  if (!response.ok || !data.client_secret) {
    throw new Error(data.error ?? "Failed to start checkout");
  }

  if (!publishableKey) {
    throw new Error(
      "Checkout is unavailable right now. Please try again later.",
    );
  }

  return { clientSecret: data.client_secret, publishableKey };
}
