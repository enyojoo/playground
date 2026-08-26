"use client";

import Script from "next/script";
import { useCallback, useState } from "react";

type CheckoutButtonProps = {
  mode: "payment" | "subscription";
  amount: number;
  currency?: string;
  interval?: "month" | "year";
  metadata: Record<string, string> | (() => Record<string, string>);
  label: string;
  variant?: "primary" | "secondary";
  className?: string;
};

const publishableKey = process.env.NEXT_PUBLIC_EASNER_PUBLISHABLE_KEY ?? "";

export function CheckoutButton({
  mode,
  amount,
  currency = "usd",
  interval,
  metadata,
  label,
  variant = "primary",
  className = "",
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);

  const handleCheckout = useCallback(async () => {
    if (!publishableKey) {
      setError("Checkout is unavailable right now. Please try again later.");
      return;
    }

    if (!window.EasnerCheckout) {
      setError("Checkout script is still loading. Try again in a moment.");
      return;
    }

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
        throw new Error(data.error ?? "Failed to create checkout session");
      }

      window.EasnerCheckout.openOverlay({
        publishableKey,
        clientSecret: data.client_secret,
        onSuccess: () => {
          window.location.href = "/thanks";
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setLoading(false);
    }
  }, [mode, amount, currency, interval, metadata]);

  const baseStyles =
    "inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

  const variantStyles =
    variant === "primary"
      ? "bg-stone-900 text-white hover:bg-stone-800"
      : "border border-stone-300 bg-white text-stone-900 hover:bg-stone-50";

  return (
    <>
      <Script
        src="https://js.easner.com/v1/checkout.js"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />

      <div className={className}>
        <button
          type="button"
          onClick={handleCheckout}
          disabled={loading || !scriptReady}
          className={`${baseStyles} ${variantStyles} w-full ${className}`}
        >
          {loading ? "Opening checkout…" : label}
        </button>

        {error ? (
          <p className="mt-2 text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </>
  );
}
