import { NextResponse } from "next/server";

import { connectErrorResponse } from "@/lib/connect-http";
import { resetDemoCreator } from "@/lib/connect-payee";
import { connectSnapshot } from "@/lib/connect-snapshot";

export async function POST() {
  try {
    const payee = await resetDemoCreator();
    const snapshot = await connectSnapshot(payee.id);

    return NextResponse.json({
      payee: snapshot.payee,
      balance: snapshot.balance,
      payouts: snapshot.payouts,
      link: snapshot.link ? { url: snapshot.link.url } : null,
    });
  } catch (error) {
    return connectErrorResponse(error);
  }
}