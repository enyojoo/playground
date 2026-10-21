import { PlanCard } from "@/components/CatalogCards";
import { BackLink } from "@/components/BackLink";
import { PageShell } from "@/components/PageShell";
import { SurfaceBadge } from "@/components/SurfaceBadge";
import { subscriptionPlans } from "@/lib/catalog";

export default function PricingPage() {
  return (
    <PageShell>
      <BackLink />

      <div className="mt-2 max-w-2xl">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-medium text-primary">Subscriptions</p>
          <SurfaceBadge label="Inline" />
        </div>
        <h1 className="font-heading mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Pricing
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          Subscribe to Pro below. Choose how many seats you need on the checkout
          form.
        </p>
      </div>

      <div className="mt-8 max-w-lg sm:mt-12">
        <PlanCard plan={subscriptionPlans[0]!} />
      </div>
    </PageShell>
  );
}
