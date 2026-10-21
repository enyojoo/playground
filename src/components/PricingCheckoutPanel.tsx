"use client";

import { CheckoutInline } from "@/components/CheckoutInline";
import type { ClientCheckoutSession } from "@/lib/checkout-client";

type PricingCheckoutPanelProps = {
  itemId: string;
  initialSession: ClientCheckoutSession | null;
};

export function PricingCheckoutPanel({
  itemId,
  initialSession,
}: PricingCheckoutPanelProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-6">
      <CheckoutInline
        itemType="subscription"
        itemId={itemId}
        autoStart
        initialSession={initialSession}
        className="h-full min-h-[320px]"
      />
    </div>
  );
}
