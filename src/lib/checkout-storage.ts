export type CheckoutPayload = {
  clientSecret: string;
  summary: string;
  amount: number;
  currency: string;
};

const STORAGE_KEY = "playground_checkout";

export function saveCheckout(payload: CheckoutPayload): void {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function loadCheckout(): CheckoutPayload | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = sessionStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as CheckoutPayload;
  } catch {
    return null;
  }
}

export function clearCheckout(): void {
  sessionStorage.removeItem(STORAGE_KEY);
}
