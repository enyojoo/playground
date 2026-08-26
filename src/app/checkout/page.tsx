"use client";

import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { formatMoney } from "@/lib/catalog";
import {
  clearCheckout,
  loadCheckout,
  type CheckoutPayload,
} from "@/lib/checkout-storage";

const publishableKey = process.env.NEXT_PUBLIC_EASNER_PUBLISHABLE_KEY ?? "";

export default function CheckoutPage() {
  const router = useRouter();
  const mountRef = useRef<HTMLDivElement>(null);
  const checkoutRef = useRef<{ destroy: () => void } | null>(null);
  const [payload, setPayload] = useState<CheckoutPayload | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = loadCheckout();

    if (!stored) {
      router.replace("/");
      return;
    }

    setPayload(stored);
  }, [router]);

  useEffect(() => {
    if (!payload || !scriptReady || !mountRef.current || !window.EasnerCheckout) {
      return;
    }

    if (!publishableKey) {
      setError("Checkout is unavailable right now. Please try again later.");
      return;
    }

    let cancelled = false;

    void window.EasnerCheckout.mount(mountRef.current, {
      publishableKey,
      clientSecret: payload.clientSecret,
      onSuccess: () => {
        clearCheckout();
        router.push("/thanks");
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

        checkoutRef.current = instance;
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Unable to load checkout");
      });

    return () => {
      cancelled = true;
      checkoutRef.current?.destroy();
      checkoutRef.current = null;
    };
  }, [payload, scriptReady, router]);

  if (!payload) {
    return null;
  }

  return (
    <>
      <Script
        src="https://js.easner.com/v1/checkout.js"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />

      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <Link
              href="/cancel"
              className="text-sm font-medium text-muted hover:text-foreground"
            >
              ← Cancel and go back
            </Link>

            <h1 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-foreground">
              Checkout
            </h1>

            {error ? (
              <p className="mt-4 text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}

            <div ref={mountRef} className="mt-8 min-h-[320px]" />
          </div>

          <aside className="h-fit rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <h2 className="text-sm font-medium uppercase tracking-wide text-muted">
              Order summary
            </h2>
            <p className="mt-4 text-lg font-semibold text-foreground">
              {payload.summary}
            </p>
            <p className="mt-6 text-2xl font-semibold text-foreground">
              {formatMoney(payload.amount, payload.currency)}
            </p>
          </aside>
        </div>
      </div>
    </>
  );
}
