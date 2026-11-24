import { NextResponse } from "next/server";

import { writeStoredLink } from "@/lib/connect-cookies";
import { connectErrorResponse } from "@/lib/connect-http";
import { ensureDemoCreator } from "@/lib/connect-payee";
import { createLinkSession } from "@/lib/easner-connect";

export async function POST() {
  try {
    const payee = await ensureDemoCreator();
    const { session, codeVerifier, state } = await createLinkSession(payee.id);
    await writeStoredLink(session, codeVerifier, state);

    return NextResponse.json({
      id: session.id,
      client_secret: session.client_secret,
    });
  } catch (error) {
    return connectErrorResponse(error);
  }
}
