import "server-only";

import { randomUUID } from "crypto";

import { DEMO_CREATOR, LEGACY_SHARED_CREATOR_REFERENCE } from "@/lib/connect-demo";
import {
  clearStoredLink,
  clearStoredPayee,
  readStoredPayee,
  writeStoredPayee,
  type StoredPayee,
} from "@/lib/connect-cookies";
import {
  easnerConnect,
  getPayee,
  getPayeeBalance,
  unlinkTestPayee,
  type Payee,
} from "@/lib/easner-connect";

function newDemoReference(): string {
  return `playground_creator_${randomUUID()}`;
}

async function createDemoPayee(reference: string): Promise<Payee> {
  return easnerConnect<Payee>("/v1/payees", {
    method: "POST",
    body: {
      reference,
      name: DEMO_CREATOR.name,
      email: DEMO_CREATOR.email,
      income_type: DEMO_CREATOR.incomeType,
    },
  });
}

async function seedLessonCreditIfEmpty(payeeId: string): Promise<void> {
  const balance = await getPayeeBalance(payeeId);
  const empty =
    (balance.available ?? 0) === 0 &&
    (balance.withdrawable ?? 0) === 0 &&
    (balance.on_hold ?? 0) === 0 &&
    (balance.pending ?? 0) === 0;

  if (!empty) {
    return;
  }

  const reference = `lesson-${randomUUID()}`;
  await easnerConnect(`/v1/payees/${encodeURIComponent(payeeId)}/credits`, {
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

/** One test earner per browser. Same reference returns the same payee on Easner. */
export async function ensureDemoCreator(): Promise<StoredPayee> {
  let stored = await readStoredPayee();

  if (stored?.reference === LEGACY_SHARED_CREATOR_REFERENCE) {
    await clearStoredPayee();
    await clearStoredLink();
    stored = null;
  }

  let payee: Payee;
  const reference = stored?.reference ?? newDemoReference();

  if (stored) {
    try {
      payee = await getPayee(stored.id);
    } catch {
      payee = await createDemoPayee(reference);
    }
  } else {
    payee = await createDemoPayee(reference);
  }

  let seeded = stored?.seeded === true && stored.id === payee.id;

  if (!seeded) {
    await seedLessonCreditIfEmpty(payee.id);
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

/** Clears the in-progress link in this browser and unlinks the test payee on Easner. */
export async function resetDemoCreator(): Promise<StoredPayee> {
  await clearStoredLink();

  const stored = await ensureDemoCreator();
  let payee: Payee;

  try {
    payee = await unlinkTestPayee(stored.id);
  } catch {
    payee = await getPayee(stored.id);
  }

  const next: StoredPayee = {
    id: payee.id,
    reference: payee.reference,
    name: payee.name,
    email: payee.email,
    seeded: true,
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