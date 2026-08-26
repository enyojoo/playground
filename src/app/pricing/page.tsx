import { PlanCard } from "@/components/CatalogCards";
import { subscriptionPlans } from "@/lib/catalog";

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-primary">Subscriptions</p>
        <h1 className="font-heading mt-2 text-3xl font-semibold tracking-tight text-foreground">
          Pricing
        </h1>
        <p className="mt-3 text-muted">
          Example plans for testing recurring subscription checkout.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {subscriptionPlans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}
