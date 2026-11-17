import { NextResponse } from "next/server";

import { EasnerApiError } from "@/lib/easner-connect";

export function connectErrorResponse(error: unknown): NextResponse {
  if (error instanceof EasnerApiError) {
    return NextResponse.json(
      { error: { type: error.type, code: error.code, message: error.message } },
      { status: error.status >= 400 && error.status < 600 ? error.status : 500 },
    );
  }

  const message = error instanceof Error ? error.message : "Connect request failed";

  return NextResponse.json(
    { error: { type: "api_error", code: "playground_error", message } },
    { status: 500 },
  );
}
