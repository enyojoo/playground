import { NextResponse } from "next/server";

import { verifyWebhookSignature } from "@/lib/easner";

type WebhookEvent = {
  type?: string;
  data?: {
    metadata?: Record<string, string>;
    subscription_id?: string;
    checkout_session_id?: string;
  };
};

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("easner-signature");

  if (!verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event: WebhookEvent;

  try {
    event = JSON.parse(rawBody) as WebhookEvent;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.completed":
      console.log("[webhook] checkout.completed", event.data?.metadata);
      break;
    case "checkout.async_succeeded":
      console.log("[webhook] checkout.async_succeeded (informational)");
      break;
    case "checkout.failed":
      console.log("[webhook] checkout.failed", event.data?.metadata);
      break;
    case "refund.created":
      console.log("[webhook] refund.created");
      break;
    case "subscription.created":
      console.log("[webhook] subscription.created", event.data?.subscription_id);
      break;
    case "subscription.updated":
      console.log("[webhook] subscription.updated", event.data?.metadata);
      break;
    case "subscription.canceled":
      console.log("[webhook] subscription.canceled", event.data?.metadata);
      break;
    case "subscription.trial_ending":
      console.log("[webhook] subscription.trial_ending", event.data?.subscription_id);
      break;
    case "subscription.payment_failed":
      console.log("[webhook] subscription.payment_failed", event.data?.subscription_id);
      break;
    default:
      console.log("[webhook] unhandled event", event.type);
  }

  return NextResponse.json({ received: true });
}
