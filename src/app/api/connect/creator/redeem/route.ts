import { NextResponse } from "next/server";

import { clearStoredLink, readStoredLink } from "@/lib/connect-cookies";
import { connectErrorResponse } from "@/lib/connect-http";
import { redeemLinkSession } from "@/lib/easner-connect";

type RedeemBody = {
  code?: unknown;
  state?: unknown;
};

export async function POST(request: Request) {
  try {
    const stored = await readStoredLink();

    if (!stored) {
      return NextResponse.json(
        {
          error: {
            type: "invalid_request",
            code: "link_session_expired",
            message: "That link timed out. Tap Get paid with Easner and try again.",
          },
        },
        { status: 400 },
      );
    }

    const body = (await request.json()) as RedeemBody;
    const code = typeof body.code === "string" ? body.code.trim() : "";
    const state = typeof body.state === "string" ? body.state : "";

    if (!code) {
      return NextResponse.json(
        {
          error: {
            type: "invalid_request",
            code: "invalid_request",
            message: "Easner did not confirm the link. Close the screen and try again.",
          },
        },
        { status: 400 },
      );
    }

    if (state && state !== stored.state) {
      return NextResponse.json(
        {
          error: {
            type: "invalid_request",
            code: "state_mismatch",
            message:
              "This approval was started in a different browser or tab. Tap Get paid with Easner on this page and try again.",
          },
        },
        { status: 400 },
      );
    }

    const redeemed = await redeemLinkSession(stored.sessionId, stored.codeVerifier, code);
    await clearStoredLink();

    return NextResponse.json(redeemed ?? { object: "link_session", id: stored.sessionId });
  } catch (error) {
    return connectErrorResponse(error);
  }
}
