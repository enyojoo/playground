import { createHash, randomBytes } from "crypto";

/** PKCE S256 pair for `POST /v1/link_sessions`. https://docs.easner.com/payees */
export function createPkcePair(): {
  codeVerifier: string;
  codeChallenge: string;
  state: string;
} {
  const codeVerifier = randomBytes(32).toString("base64url");
  const codeChallenge = createHash("sha256")
    .update(codeVerifier)
    .digest("base64url");
  const state = randomBytes(16).toString("base64url");

  return { codeVerifier, codeChallenge, state };
}
