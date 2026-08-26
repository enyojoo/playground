import { NextResponse } from "next/server";

import { verifyWebhookSignature } from "@/lib/easner";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("easner-signature");

  if (!verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event: {
    type?: string;
    data?: { metadata?: Record<string, string> };
  };

  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.completed":
      console.log("[webhook] checkout.completed", event.data?.metadata);
      break;
    case "subscription.updated":
      console.log("[webhook] subscription.updated", event.data?.metadata);
      break;
    case "subscription.canceled":
      console.log("[webhook] subscription.canceled", event.data?.metadata);
      break;
    default:
      console.log("[webhook] unhandled event", event.type);
  }

  return NextResponse.json({ received: true });
}
