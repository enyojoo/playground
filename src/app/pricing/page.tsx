import { BackLink } from "@/components/BackLink";
import { PageShell } from "@/components/PageShell";
import { PlanDetails } from "@/components/PlanDetails";
import { PricingCheckoutPanel } from "@/components/PricingCheckoutPanel";
import { SurfaceBadge } from "@/components/SurfaceBadge";
import { CHECKOUT } from "@/lib/brand";
import { subscriptionPlan } from "@/lib/catalog";
import { createPricingCheckoutSession } from "@/lib/pricing-checkout-session";

export const dynamic = "force-dynamic";

export default async function PricingPage() {
  const initialSession = await createPricingCheckoutSession();
  return (
    <PageShell>
      <BackLink href="/checkout" label="Checkout" />

      <div className="mt-2 max-w-2xl">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-medium text-primary">Subscription</p>
          <SurfaceBadge label={CHECKOUT.inlineBadge} />
        </div>
        <h1 className="font-heading mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {CHECKOUT.inlineTitle}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          {CHECKOUT.inline} Change the seat count on the form before you pay.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 items-start gap-6 sm:mt-12 lg:grid-cols-2 lg:gap-10">
        <PlanDetails plan={subscriptionPlan} />
        <PricingCheckoutPanel
          itemId={subscriptionPlan.id}
          initialSession={initialSession}
        />
      </div>
    </PageShell>
  );
}
