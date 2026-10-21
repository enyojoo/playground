import "server-only";

import { createHmac, timingSafeEqual } from "crypto";

import { getPublicSiteUrl } from "@/lib/site";

export type CheckoutLineItem = {
  name: string;
  amount: number;
  quantity?: number;
  description?: string;
  adjustable_quantity?: {
    enabled: true;
    minimum: number;
    maximum?: number;
  };
};

export type CreateCheckoutSessionInput = {
  mode: "payment" | "subscription";
  currency: string;
  line_items: CheckoutLineItem[];
  recurring?: {
    interval: "day" | "week" | "month" | "year";
    interval_count: number;
  };
  trial_days?: number;
  metadata: Record<string, string>;
  idempotencyKey: string;
};

export type CheckoutSession = {
  id: string;
  url: string;
  client_secret?: string;
  status?: string;
  payment_status?: string | null;
  mode?: string;
  amount_total?: number;
  currency?: string;
  metadata?: Record<string, string>;
  subscription_id?: string | null;
};

function getSecretKey(): string {
  const secretKey = process.env.EASNER_SECRET_KEY;

  if (!secretKey) {
    throw new Error("EASNER_SECRET_KEY is not configured");
  }

  return secretKey;
}

export function getAppUrl(): string {
  return getPublicSiteUrl();
}

export async function createCheckoutSession(
  input: CreateCheckoutSessionInput,
): Promise<CheckoutSession> {
  const secretKey = getSecretKey();
  const baseUrl = getAppUrl();

  const body: Record<string, unknown> = {
    mode: input.mode,
    currency: input.currency,
    line_items: input.line_items,
    success_url: `${baseUrl}/thanks?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/cancel`,
    metadata: input.metadata,
  };

  if (input.mode === "subscription" && input.recurring) {
    body.recurring = input.recurring;
  }

  if (input.trial_days !== undefined) {
    body.trial_days = input.trial_days;
  }

  const response = await fetch("https://api.easner.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": input.idempotencyKey,
    },
    body: JSON.stringify(body),
  });

  const payload = await response.json();

  if (!response.ok) {
    const message =
      typeof payload?.error?.message === "string"
        ? payload.error.message
        : typeof payload?.error?.code === "string"
          ? payload.error.code
          : "Failed to create checkout session";
    throw new Error(message);
  }

  return payload as CheckoutSession;
}

export async function retrieveCheckoutSession(
  sessionId: string,
): Promise<CheckoutSession | null> {
  const secretKey = getSecretKey();

  const response = await fetch(
    `https://api.easner.com/v1/checkout/sessions?id=${encodeURIComponent(sessionId)}`,
    {
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
      cache: "no-store",
    },
  );

  if (response.status === 404) {
    return null;
  }

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(
      typeof payload?.error?.message === "string"
        ? payload.error.message
        : "Failed to retrieve checkout session",
    );
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

  const parts = signatureHeader.split(",").map((part) => part.trim());
  let timestamp: string | undefined;
  let signature: string | undefined;

  for (const part of parts) {
    if (part.startsWith("t=")) {
      timestamp = part.slice(2);
    }
    if (part.startsWith("v1=")) {
      signature = part.slice(3);
    }
  }

  if (!timestamp || !signature) {
    return false;
  }

  const timestampSeconds = Number(timestamp);

  if (!Number.isFinite(timestampSeconds)) {
    return false;
  }

  if (Math.abs(Date.now() / 1000 - timestampSeconds) > 5 * 60) {
    return false;
  }

  const expected = createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody}`)
    .digest("hex");

  if (signature.length !== expected.length) {
    return false;
  }

  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  } catch {
    return false;
  }
}
