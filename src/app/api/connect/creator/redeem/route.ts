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
            message: "Start Get paid with Easner again. The link session expired.",
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
            message: "The connect sheet did not return an approval code.",
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
            message: "This approval does not match the link session on this browser.",
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
