"use client";

import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { PageShell } from "@/components/PageShell";
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

      <PageShell className="py-6 sm:py-12 lg:py-16">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:gap-10">
          <aside className="order-1 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6 lg:order-2 lg:sticky lg:top-6 lg:self-start">
            <h2 className="text-sm font-medium uppercase tracking-wide text-muted">
              Order summary
            </h2>
            <p className="mt-4 text-base font-semibold text-foreground sm:text-lg">
              {payload.summary}
            </p>
            <p className="mt-4 text-xl font-semibold text-foreground sm:mt-6 sm:text-2xl">
              {formatMoney(payload.amount, payload.currency)}
            </p>
          </aside>

          <div className="order-2 min-w-0 lg:order-1">
            <Link
              href="/cancel"
              className="inline-flex min-h-11 items-center text-sm font-medium text-muted hover:text-foreground"
            >
              ← Cancel and go back
            </Link>

            <h1 className="font-heading mt-3 text-2xl font-semibold tracking-tight text-foreground sm:mt-4 sm:text-3xl">
              Checkout
            </h1>

            {error ? (
              <p className="mt-4 text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}

            <div
              ref={mountRef}
              className="checkout-mount mt-6 min-h-[280px] sm:mt-8 sm:min-h-[320px]"
            />
          </div>
        </div>
      </PageShell>
    </>
  );
}
