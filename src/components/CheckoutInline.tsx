"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useEasnerCheckoutReady } from "@/hooks/use-easner-checkout-ready";
import type { CheckoutItemType } from "@/lib/checkout-items";
import {
  fetchClientCheckoutSession,
  type ClientCheckoutSession,
} from "@/lib/checkout-client";

type CheckoutInlineProps = {
  itemType: CheckoutItemType;
  itemId: string;
  label?: string;
  variant?: "primary" | "secondary";
  className?: string;
  fullWidth?: boolean | "mobile";
  /** Create a session and mount checkout as soon as checkout.js is ready (no button). */
  autoStart?: boolean;
  /** Session created on the server so the client can mount immediately. */
  initialSession?: ClientCheckoutSession | null;
};

function widthClass(fullWidth?: boolean | "mobile"): string {
  if (fullWidth === true) return "w-full";
  if (fullWidth === "mobile") return "w-full sm:w-auto";
  return "w-auto";
}

function CheckoutSpinner() {
  return (
    <div
      className="size-9 animate-spin rounded-full border-2 border-border border-t-primary"
      role="status"
      aria-label="Loading checkout"
    />
  );
}

export function CheckoutInline({
  itemType,
  itemId,
  label = "Check out",
  variant = "primary",
  className = "",
  fullWidth = false,
  autoStart = false,
  initialSession = null,
}: CheckoutInlineProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<{ destroy: () => void } | null>(null);
  const sessionFetchStarted = useRef(false);
  const scriptReady = useEasnerCheckoutReady();
  const [loading, setLoading] = useState(autoStart && !initialSession);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<ClientCheckoutSession | null>(
    initialSession,
  );

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
        setLoading(false);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Unable to load checkout");
        setLoading(false);
      });

    return () => {
      cancelled = true;
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
  }, [session, scriptReady]);

  const loadSession = useCallback(async () => {
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
      setLoading(false);
    }
  }, [itemType, itemId]);

  useEffect(() => {
    if (!autoStart || initialSession || sessionFetchStarted.current) {
      return;
    }

    sessionFetchStarted.current = true;
    void loadSession();
  }, [autoStart, initialSession, loadSession]);

  const showMount = autoStart || Boolean(session);
  const showSpinner =
    autoStart && !error && showMount && (!session || !scriptReady);

  return (
    <div className={className}>
      {!autoStart ? (
        <button
          type="button"
          onClick={() => void loadSession()}
          disabled={loading}
          className={`${baseStyles} ${variantStyles} ${widthClass(fullWidth)}`}
        >
          {loading ? "Loading checkout…" : label}
        </button>
      ) : null}

      {error ? (
        <p className={`text-sm text-red-600 ${autoStart ? "" : "mt-2"}`} role="alert">
          {error}
        </p>
      ) : null}

      {showMount ? (
        <div
          className={`relative min-h-[280px] ${autoStart ? "h-full w-full" : "mt-4 rounded-xl border border-border bg-surface p-4"}`}
        >
          {showSpinner ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-surface/80">
              <CheckoutSpinner />
            </div>
          ) : null}
          <div ref={mountRef} className="checkout-mount h-full min-h-[280px]" />
        </div>
      ) : null}
    </div>
  );
}
