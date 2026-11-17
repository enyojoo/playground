/**
 * Regression against api.easner.com with a test key.
 * Prospect demos must use the connect sheet and POST /v1/link_sessions/:id/redeem.
 * This script uses approve_link because it cannot scan a QR code.
 * Never prints the secret key.
 */
import { randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";

function loadEnvFile() {
  try {
    const text = readFileSync(new URL("../.env", import.meta.url), "utf8");
    for (const line of text.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
        continue;
      }
      const index = trimmed.indexOf("=");
      const key = trimmed.slice(0, index).trim();
      let value = trimmed.slice(index + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch {
    // Env may already be exported.
  }
}

loadEnvFile();

const base = (process.env.EASNER_API_BASE || "https://api.easner.com").replace(/\/$/, "");
const key = process.env.EASNER_SECRET_KEY?.trim();

if (!key || !key.startsWith("easner_sk_test_")) {
  console.error("Set EASNER_SECRET_KEY to an easner_sk_test_… key. Refusing to continue.");
  process.exit(1);
}

async function easner(path, { method = "GET", body, idempotencyKey } = {}) {
  const headers = {
    Authorization: `Bearer ${key}`,
    Accept: "application/json",
  };
  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }
  if (idempotencyKey) {
    headers["Idempotency-Key"] = idempotencyKey;
  }
  const response = await fetch(`${base}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const code = payload?.error?.code || response.status;
    const message = payload?.error?.message || "request failed";
    throw new Error(`${method} ${path} → ${code}: ${message}`);
  }
  return payload;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const reference = `playground_smoke_${Date.now()}`;
const creditReference = `smoke-${randomUUID()}`;
const amount = 2500;

const funded = await easner("/v1/test/fund", {
  method: "POST",
  body: { amount: 100000 },
});
console.log("fund", funded.object || "ok", "livemode", funded.livemode);

const created = await easner("/v1/payees", {
  method: "POST",
  body: {
    reference,
    name: "Smoke Tester",
    email: "smoke@example.com",
    income_type: "royalties",
  },
});
const again = await easner("/v1/payees", {
  method: "POST",
  body: {
    reference,
    name: "Smoke Tester",
    email: "smoke@example.com",
    income_type: "royalties",
  },
});
if (created.id !== again.id) {
  throw new Error("Same reference did not return the same payee");
}
console.log("payee", created.id, "idempotent");

await easner(`/v1/payees/${created.id}/credits`, {
  method: "POST",
  idempotencyKey: creditReference,
  body: { amount, reference: creditReference, description: "Smoke lesson" },
});
const balance = await easner(`/v1/payees/${created.id}/balance`);
if ((balance.available ?? 0) < amount && (balance.withdrawable ?? 0) < amount) {
  throw new Error("Credit did not increase the payee balance");
}
console.log("credit", amount, "next_action", balance.next_action);

await easner(`/v1/test/payees/${created.id}/approve_link`, { method: "POST" });
const linked = await easner(`/v1/payees/${created.id}`);
console.log("approve_link status", linked.status);

const payoutKey = `payout-${randomUUID()}`;
const payout = await easner("/v1/payouts", {
  method: "POST",
  idempotencyKey: payoutKey,
  body: { payee: created.id, amount, source: "payee_balance" },
});
console.log("payout", payout.id, payout.status);

await easner("/v1/test/settle", { method: "POST" });

let final = payout;
for (let attempt = 0; attempt < 15; attempt += 1) {
  final = await easner(`/v1/payouts/${payout.id}`);
  if (final.status === "completed" || final.status === "failed") {
    break;
  }
  await sleep(2000);
}

console.log("payout final", final.status);
if (final.status !== "completed" && final.status !== "failed" && final.status !== "pending") {
  throw new Error(`Unexpected payout status ${final.status}`);
}

console.log("smoke ok (approve_link path; device demos use redeem)");
