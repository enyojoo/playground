import { NextResponse } from "next/server";

import { connectErrorResponse } from "@/lib/connect-http";
import { updateDemoEmail } from "@/lib/connect-payee";

type EmailBody = {
  email?: unknown;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as EmailBody;
    const email = typeof body.email === "string" ? body.email.trim() : "";

    if (!email) {
      return NextResponse.json(
        {
          error: {
            type: "invalid_request",
            code: "invalid_request",
            message: "Enter the email on your Easner account.",
          },
        },
        { status: 400 },
      );
    }

    const payee = await updateDemoEmail(email);
    return NextResponse.json(payee);
  } catch (error) {
    return connectErrorResponse(error);
  }
}
