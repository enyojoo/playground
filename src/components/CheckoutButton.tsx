"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { saveCheckout } from "@/lib/checkout-storage";

type CheckoutButtonProps = {
  mode: "payment" | "subscription";
  amount: number;
  currency?: string;
  interval?: "month" | "year";
  metadata: Record<string, string> | (() => Record<string, string>);
  summary: string;
  label: string;
  variant?: "primary" | "secondary";
  className?: string;
};

export function CheckoutButton({
  mode,
  amount,
  currency = "usd",
  interval,
  metadata,
  summary,
  label,
  variant = "primary",
  className = "",
}: CheckoutButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const sessionMetadata =
        typeof metadata === "function" ? metadata() : metadata;

      const response = await fetch("/api/checkout/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          amount,
          currency,
          interval,
          metadata: sessionMetadata,
        }),
      });

      const data = (await response.json()) as {
        client_secret?: string;
        error?: string;
      };

      if (!response.ok || !data.client_secret) {
        throw new Error(data.error ?? "Failed to start checkout");
      }

      saveCheckout({
        clientSecret: data.client_secret,
        summary,
        amount,
        currency,
      });

      router.push("/checkout");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setLoading(false);
    }
  }, [mode, amount, currency, interval, metadata, summary, router]);

  const baseStyles =
    "inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

  const variantStyles =
    variant === "primary"
      ? "bg-stone-900 text-white hover:bg-stone-800"
      : "border border-stone-300 bg-white text-stone-900 hover:bg-stone-50";

  return (
    <div className={className}>
      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className={`${baseStyles} ${variantStyles} w-full ${className}`}
      >
        {loading ? "Continuing to checkout…" : label}
      </button>

      {error ? (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
