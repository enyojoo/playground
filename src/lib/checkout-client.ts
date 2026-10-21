import type { CheckoutItemType } from "@/lib/checkout-items";

export async function fetchCheckoutClientSecret(
  itemType: CheckoutItemType,
  itemId: string,
): Promise<string> {
  const response = await fetch("/api/checkout/client", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemType, itemId }),
  });

  const data = (await response.json()) as {
    client_secret?: string;
    error?: string;
  };

  if (!response.ok || !data.client_secret) {
    throw new Error(data.error ?? "Failed to start checkout");
  }

  return data.client_secret;
}

export const publishableKey =
  process.env.NEXT_PUBLIC_EASNER_PUBLISHABLE_KEY ?? "";
