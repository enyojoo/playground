"use client";

import { useCallback, useState } from "react";

import { useEasnerCheckoutReady } from "@/hooks/use-easner-checkout-ready";
import type { CheckoutItemType } from "@/lib/checkout-items";
import { fetchClientCheckoutSession } from "@/lib/checkout-client";

type CheckoutOverlayProps = {
  itemType: CheckoutItemType;
  itemId: string;
  label: string;
  variant?: "primary" | "secondary";
  className?: string;
  fullWidth?: boolean | "mobile";
};

function widthClass(fullWidth?: boolean | "mobile"): string {
  if (fullWidth === true) return "w-full";
  if (fullWidth === "mobile") return "w-full sm:w-auto";
  return "w-auto";
}

export function CheckoutOverlay({
  itemType,
  itemId,
  label,
  variant = "primary",
  className = "",
  fullWidth = false,
}: CheckoutOverlayProps) {
  const scriptReady = useEasnerCheckoutReady();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const baseStyles =
    "inline-flex min-h-11 items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

  const variantStyles =
    variant === "primary"
      ? "bg-primary text-white hover:bg-primary-hover"
      : "border border-border bg-surface text-foreground hover:bg-background";

  const handleCheckout = useCallback(async () => {
    if (!window.EasnerCheckout) {
      setError("Checkout script is still loading. Try again in a moment.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { clientSecret, publishableKey } = await fetchClientCheckoutSession(
        itemType,
        itemId,
      );

      await window.EasnerCheckout.openOverlay({
        publishableKey,
        clientSecret,
        onSuccess: () => {
          window.location.href = "/thanks";
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setLoading(false);
    }
  }, [itemType, itemId]);

  return (
    <div className={className}>
        <button
          type="button"
          onClick={handleCheckout}
          disabled={loading || !scriptReady}
          className={`${baseStyles} ${variantStyles} ${widthClass(fullWidth)}`}
        >
          {loading ? "Opening checkout…" : label}
        </button>

        {error ? (
          <p className="mt-2 text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}
    </div>
  );
}
