import { PlanCard } from "@/components/CatalogCards";
import { PageShell } from "@/components/PageShell";
import { subscriptionPlans } from "@/lib/catalog";

export default function PricingPage() {
  return (
    <PageShell>
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-primary">Subscriptions</p>
        <h1 className="font-heading mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Pricing
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          Example plans for testing recurring subscription checkout.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {subscriptionPlans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </PageShell>
  );
}
