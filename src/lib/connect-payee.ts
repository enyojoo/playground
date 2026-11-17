import "server-only";

import { randomUUID } from "crypto";

import { DEMO_CREATOR } from "@/lib/connect-demo";
import { readStoredPayee, writeStoredPayee, type StoredPayee } from "@/lib/connect-cookies";
import {
  easnerConnect,
  getPayee,
  getPayeeBalance,
  type Payee,
} from "@/lib/easner-connect";

async function createDemoPayee(): Promise<Payee> {
  return easnerConnect<Payee>("/v1/payees", {
    method: "POST",
    body: {
      reference: DEMO_CREATOR.reference,
      name: DEMO_CREATOR.name,
      email: DEMO_CREATOR.email,
      income_type: DEMO_CREATOR.incomeType,
    },
  });
}

/** The customer page always has one test creator. Same reference returns the same payee. */
export async function ensureDemoCreator(): Promise<StoredPayee> {
  const stored = await readStoredPayee();
  let payee: Payee;

  if (stored) {
    try {
      payee = await getPayee(stored.id);
    } catch {
      payee = await createDemoPayee();
    }
  } else {
    payee = await createDemoPayee();
  }

  let seeded = stored?.seeded === true && stored.id === payee.id;

  if (!seeded) {
    const balance = await getPayeeBalance(payee.id);
    const empty =
      (balance.available ?? 0) === 0 &&
      (balance.withdrawable ?? 0) === 0 &&
      (balance.on_hold ?? 0) === 0;

    if (empty) {
      const reference = `lesson-${randomUUID()}`;
      await easnerConnect(`/v1/payees/${encodeURIComponent(payee.id)}/credits`, {
        method: "POST",
        idempotencyKey: reference,
        body: {
          amount: DEMO_CREATOR.lessonAmountCents,
          reference,
          description: "Lesson completed",
          income_type: DEMO_CREATOR.incomeType,
        },
      });
    }

    seeded = true;
  }

  const next: StoredPayee = {
    id: payee.id,
    reference: payee.reference,
    name: payee.name,
    email: payee.email,
    seeded,
  };
  await writeStoredPayee(next);
  return next;
}

export async function updateDemoEmail(email: string): Promise<Payee> {
  const stored = await ensureDemoCreator();

  if (stored.email === email) {
    return getPayee(stored.id);
  }

  const payee = await easnerConnect<Payee>(`/v1/payees/${encodeURIComponent(stored.id)}`, {
    method: "POST",
    body: { email },
  });

  await writeStoredPayee({
    id: payee.id,
    reference: payee.reference,
    name: payee.name,
    email: payee.email,
    seeded: true,
  });

  return payee;
}
