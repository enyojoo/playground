export type ConnectErrorBody = {
  error?: {
    type?: string;
    code?: string;
    message?: string;
  };
};

export async function postConnect<T>(path: string, body?: unknown): Promise<T> {
  const response = await fetch(path, {
    method: "POST",
    headers: body === undefined ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const payload = (await response.json()) as T & ConnectErrorBody;

  if (!response.ok) {
    const error = new Error(payload.error?.message || "Request failed") as Error & {
      code?: string;
    };
    error.code = payload.error?.code;
    throw error;
  }

  return payload;
}

export async function getConnect<T>(path: string): Promise<T> {
  const response = await fetch(path, { cache: "no-store" });
  const payload = (await response.json()) as T & ConnectErrorBody;

  if (!response.ok) {
    const error = new Error(payload.error?.message || "Request failed") as Error & {
      code?: string;
    };
    error.code = payload.error?.code;
    throw error;
  }

  return payload;
}

export function formatUsd(cents: number | undefined): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((cents ?? 0) / 100);
}

export function payoutBadge(status: string): "Completed" | "Pending" | "Failed" {
  if (status === "completed") {
    return "Completed";
  }

  if (status === "failed" || status === "cancelled" || status === "declined") {
    return "Failed";
  }

  return "Pending";
}
