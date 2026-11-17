import { NextResponse } from "next/server";

import { connectErrorResponse } from "@/lib/connect-http";
import { createPayoutSession } from "@/lib/easner-connect";
import { ensureDemoCreator } from "@/lib/connect-payee";

export async function POST() {
  try {
    const payee = await ensureDemoCreator();

    const session = await createPayoutSession(payee.id);

    return NextResponse.json({
      id: session.id,
      client_secret: session.client_secret,
    });
  } catch (error) {
    return connectErrorResponse(error);
  }
}
