import "server-only";

import { getAppUrl } from "@/lib/easner";
import type {
  LinkSession,
  Payee,
  PayeeBalance,
  PayoutList,
  PayoutSession,
} from "@/lib/connect-types";
import { createPkcePair } from "@/lib/pkce";

export type {
  LinkSession,
  Payee,
  PayeeBalance,
  Payout,
  PayoutList,
  PayoutSession,
} from "@/lib/connect-types";

export class EasnerApiError extends Error {
  readonly status: number;
  readonly type: string;
  readonly code: string;

  constructor(status: number, type: string, code: string, message: string) {
    super(message);
    this.name = "EasnerApiError";
    this.status = status;
    this.type = type;
    this.code = code;
  }

  static fromPayload(status: number, payload: unknown): EasnerApiError {
    const error =
      payload &&
      typeof payload === "object" &&
      "error" in payload &&
      payload.error &&
      typeof payload.error === "object"
        ? (payload.error as { type?: unknown; code?: unknown; message?: unknown })
        : null;

    const type = typeof error?.type === "string" ? error.type : "api_error";
    const code = typeof error?.code === "string" ? error.code : "api_error";
    const message =
      typeof error?.message === "string" ? error.message : "Easner request failed";

    return new EasnerApiError(status, type, code, message);
  }
}

function apiBase(): string {
  return (process.env.EASNER_API_BASE?.trim() || "https://api.easner.com").replace(
    /\/$/,
    "",
  );
}

function testSecretKey(): string {
  const secretKey = process.env.EASNER_SECRET_KEY?.trim();

  if (!secretKey) {
    throw new EasnerApiError(
      500,
      "api_error",
      "missing_secret_key",
      "EASNER_SECRET_KEY is not configured",
    );
  }

  if (!secretKey.startsWith("easner_sk_test_")) {
    throw new EasnerApiError(
      403,
      "permission",
      "test_mode_only",
      "This playground accepts an Easner test secret key only",
    );
  }

  return secretKey;
}

export async function easnerConnect<T>(
  path: string,
  init: {
    method?: "GET" | "POST";
    body?: unknown;
    idempotencyKey?: string;
  } = {},
): Promise<T> {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${testSecretKey()}`,
    Accept: "application/json",
  };

  if (init.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (init.idempotencyKey) {
    headers["Idempotency-Key"] = init.idempotencyKey;
  }

  const response = await fetch(`${apiBase()}${path}`, {
    method: init.method ?? (init.body !== undefined ? "POST" : "GET"),
    headers,
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  });

  const text = await response.text();
  let payload: unknown = null;

  if (text) {
    try {
      payload = JSON.parse(text) as unknown;
    } catch {
      throw new EasnerApiError(
        response.status,
        "api_error",
        "invalid_response",
        "Easner returned a non-JSON response",
      );
    }
  }

  if (!response.ok) {
    throw EasnerApiError.fromPayload(response.status, payload);
  }

  return payload as T;
}

export function connectRedirectUri(): string {
  return `${getAppUrl()}/connect`;
}

export async function createLinkSession(payeeId: string): Promise<{
  session: LinkSession;
  codeVerifier: string;
  state: string;
}> {
  const { codeVerifier, codeChallenge, state } = createPkcePair();
  const session = await easnerConnect<LinkSession>("/v1/link_sessions", {
    method: "POST",
    body: {
      payee: payeeId,
      code_challenge: codeChallenge,
      state,
      redirect_uri: connectRedirectUri(),
    },
  });

  return { session, codeVerifier, state };
}

export async function redeemLinkSession(
  sessionId: string,
  codeVerifier: string,
  code: string,
): Promise<unknown> {
  return easnerConnect(`/v1/link_sessions/${encodeURIComponent(sessionId)}/redeem`, {
    method: "POST",
    body: { code_verifier: codeVerifier, code },
  });
}

export async function createPayoutSession(payeeId: string): Promise<PayoutSession> {
  return easnerConnect<PayoutSession>("/v1/payout_sessions", {
    method: "POST",
    body: { payee: payeeId, source: "payee_balance" },
  });
}

export async function getPayee(payeeId: string): Promise<Payee> {
  return easnerConnect<Payee>(`/v1/payees/${encodeURIComponent(payeeId)}`);
}

export async function getPayeeBalance(payeeId: string): Promise<PayeeBalance> {
  return easnerConnect<PayeeBalance>(
    `/v1/payees/${encodeURIComponent(payeeId)}/balance`,
  );
}

export async function listPayouts(payeeId: string): Promise<PayoutList> {
  const params = new URLSearchParams({ payee: payeeId, limit: "20" });
  return easnerConnect<PayoutList>(`/v1/payouts?${params.toString()}`);
}
