import "server-only";

import { createHmac, timingSafeEqual } from "crypto";

import { cookies } from "next/headers";

import type { LinkSession } from "@/lib/easner-connect";

const PAYEE_COOKIE = "easner_connect_payee";
const PKCE_COOKIE = "easner_connect_pkce";
const MAX_AGE_SECONDS = 60 * 60;

export type StoredPayee = {
  id: string;
  reference: string;
  name: string | null;
  email: string | null;
  /** A lesson credit was already recorded for this browser. */
  seeded?: boolean;
};

export type StoredLink = {
  state: string;
  codeVerifier: string;
  sessionId: string;
  clientSecret: string;
  code: string;
  url: string;
  expiresAt: number;
};

function stateSecret(): string {
  const secret = process.env.PLAYGROUND_STATE_SECRET?.trim();

  if (!secret || secret.length < 16) {
    throw new Error("PLAYGROUND_STATE_SECRET must be a long random string");
  }

  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", stateSecret()).update(payload).digest("base64url");
}

function seal(value: unknown): string {
  const payload = Buffer.from(JSON.stringify(value), "utf8").toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function open<T>(token: string | undefined): T | null {
  if (!token) {
    return null;
  }

  const [payload, signature] = token.split(".");

  if (!payload || !signature) {
    return null;
  }

  const expected = sign(payload);
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);

  if (left.length !== right.length || !timingSafeEqual(left, right)) {
    return null;
  }

  try {
    return JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as T;
  } catch {
    return null;
  }
}

function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  };
}

export async function readStoredPayee(): Promise<StoredPayee | null> {
  const store = await cookies();
  return open<StoredPayee>(store.get(PAYEE_COOKIE)?.value);
}

export async function writeStoredPayee(payee: StoredPayee): Promise<void> {
  const store = await cookies();
  store.set(PAYEE_COOKIE, seal(payee), cookieOptions(60 * 60 * 24 * 7));
}

export async function writeStoredLink(
  session: LinkSession,
  codeVerifier: string,
  state: string,
): Promise<StoredLink> {
  const expiresAt = session.expires_at
    ? Date.parse(session.expires_at)
    : Date.now() + MAX_AGE_SECONDS * 1000;
  const stored: StoredLink = {
    state,
    codeVerifier,
    sessionId: session.id,
    clientSecret: session.client_secret,
    code: session.code,
    url: session.url,
    expiresAt: Number.isFinite(expiresAt) ? expiresAt : Date.now() + MAX_AGE_SECONDS * 1000,
  };
  const store = await cookies();
  store.set(PKCE_COOKIE, seal(stored), cookieOptions(MAX_AGE_SECONDS));
  return stored;
}

export async function readStoredLink(): Promise<StoredLink | null> {
  const store = await cookies();
  const stored = open<StoredLink>(store.get(PKCE_COOKIE)?.value);

  if (!stored || stored.expiresAt < Date.now()) {
    return null;
  }

  return stored;
}

export async function clearStoredLink(): Promise<void> {
  const store = await cookies();
  store.delete(PKCE_COOKIE);
}

/** Facilitator view: code and URL only. Never the verifier or client secret. */
export function publicLink(stored: StoredLink | null): {
  code: string;
  url: string;
  session_id: string;
  expires_at: string;
} | null {
  if (!stored) {
    return null;
  }

  return {
    code: stored.code,
    url: stored.url,
    session_id: stored.sessionId,
    expires_at: new Date(stored.expiresAt).toISOString(),
  };
}
