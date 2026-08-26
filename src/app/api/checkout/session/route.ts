import { NextResponse } from "next/server";

import {
  createCheckoutSession,
  type CheckoutMode,
  type CreateCheckoutSessionInput,
} from "@/lib/easner";

type SessionRequestBody = {
  mode: CheckoutMode;
  amount: number;
  currency?: string;
  interval?: "month" | "year";
  metadata: Record<string, string>;
};

function isValidBody(body: unknown): body is SessionRequestBody {
  if (!body || typeof body !== "object") return false;

  const value = body as SessionRequestBody;

  return (
    (value.mode === "payment" || value.mode === "subscription") &&
    typeof value.amount === "number" &&
    value.amount > 0 &&
    !!value.metadata &&
    typeof value.metadata === "object"
  );
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (!isValidBody(body)) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 },
      );
    }

    const input: CreateCheckoutSessionInput = {
      mode: body.mode,
      amount: body.amount,
      currency: body.currency ?? "usd",
      metadata: body.metadata,
    };

    if (body.mode === "subscription") {
      if (!body.interval) {
        return NextResponse.json(
          { error: "Subscription sessions require an interval" },
          { status: 400 },
        );
      }

      input.interval = body.interval;
    }

    const session = await createCheckoutSession(input);

    return NextResponse.json({ client_secret: session.client_secret });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to create session";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
