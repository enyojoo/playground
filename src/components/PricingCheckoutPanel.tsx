"use client";

import { CheckoutInline } from "@/components/CheckoutInline";

type PricingCheckoutPanelProps = {
  itemId: string;
};

export function PricingCheckoutPanel({ itemId }: PricingCheckoutPanelProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-6">
      <CheckoutInline
        itemType="subscription"
        itemId={itemId}
        autoStart
        className="h-full min-h-[320px]"
      />
    </div>
  );
}
