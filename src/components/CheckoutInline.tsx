"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

import type { CheckoutItemType } from "@/lib/checkout-items";
import { fetchClientCheckoutSession } from "@/lib/checkout-client";

type CheckoutInlineProps = {
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

export function CheckoutInline({
  itemType,
  itemId,
  label,
  variant = "primary",
  className = "",
  fullWidth = false,
}: CheckoutInlineProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<{ destroy: () => void } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [session, setSession] = useState<{
    clientSecret: string;
    publishableKey: string;
  } | null>(null);

  const baseStyles =
    "inline-flex min-h-11 items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

  const variantStyles =
    variant === "primary"
      ? "bg-primary text-white hover:bg-primary-hover"
      : "border border-border bg-surface text-foreground hover:bg-background";

  useEffect(() => {
    if (
      !session ||
      !scriptReady ||
      !mountRef.current ||
      !window.EasnerCheckout
    ) {
      return;
    }

    let cancelled = false;

    void window.EasnerCheckout.mount(mountRef.current, {
      publishableKey: session.publishableKey,
      clientSecret: session.clientSecret,
      onSuccess: () => {
        window.location.href = "/thanks";
      },
      onError: (err) => {
        setError(err.message);
      },
    })
      .then((instance) => {
        if (cancelled) {
          instance.destroy();
          return;
        }

        instanceRef.current = instance;
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Unable to load checkout");
      });

    return () => {
      cancelled = true;
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
  }, [session, scriptReady]);

  const handleCheckout = useCallback(async () => {
    if (!scriptReady) {
      setError("Checkout script is still loading. Try again in a moment.");
      return;
    }

    setLoading(true);
    setError(null);
    instanceRef.current?.destroy();
    instanceRef.current = null;
    setSession(null);

    try {
      const next = await fetchClientCheckoutSession(itemType, itemId);
      setSession(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setLoading(false);
    }
  }, [itemType, itemId, scriptReady]);

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
          className={`${baseStyles} ${variantStyles} ${widthClass(fullWidth)}`}
        >
          {loading ? "Loading checkout…" : label}
        </button>

        {error ? (
          <p className="mt-2 text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}

        {session ? (
          <div
            ref={mountRef}
            className="checkout-mount mt-4 min-h-[280px] rounded-xl border border-border bg-surface p-4"
          />
        ) : null}
      </div>
    </>
  );
}
