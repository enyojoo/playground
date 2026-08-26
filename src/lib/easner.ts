import "server-only";

import { createHmac, timingSafeEqual } from "crypto";

export type CheckoutMode = "payment" | "subscription";

export type CreateCheckoutSessionInput = {
  mode: CheckoutMode;
  amount: number;
  currency: string;
  interval?: "month" | "year";
  metadata: Record<string, string>;
};

export type CheckoutSession = {
  id: string;
  client_secret: string;
};

import { getPublicSiteUrl } from "@/lib/site";

export function getAppUrl(): string {
  return getPublicSiteUrl();
}

export async function createCheckoutSession(
  input: CreateCheckoutSessionInput,
): Promise<CheckoutSession> {
  const secretKey = process.env.EASNER_SECRET_KEY;

  if (!secretKey) {
    throw new Error("EASNER_SECRET_KEY is not configured");
  }

  const baseUrl = getAppUrl();

  const body: Record<string, unknown> = {
    mode: input.mode,
    amount: input.amount,
    currency: input.currency,
    success_url: `${baseUrl}/thanks?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/cancel`,
    metadata: input.metadata,
  };

  if (input.mode === "subscription" && input.interval) {
    body.interval = input.interval;
  }

  const response = await fetch("https://api.easner.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const payload = await response.json();

  if (!response.ok) {
    const message =
      typeof payload?.error?.message === "string"
        ? payload.error.message
        : "Failed to create checkout session";
    throw new Error(message);
  }

  return payload as CheckoutSession;
}

export function verifyWebhookSignature(
  rawBody: string,
  signatureHeader: string | null,
): boolean {
  const secret = process.env.EASNER_WEBHOOK_SECRET;

  if (!secret || !signatureHeader) {
    return false;
  }

  const [timestampPart, signaturePart] = signatureHeader.split(",");
  const timestamp = timestampPart?.replace("t=", "");
  const signature = signaturePart?.replace("v1=", "");

  if (!timestamp || !signature) {
    return false;
  }

  const expected = createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody}`)
    .digest("hex");

  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  } catch {
    return false;
  }
}
