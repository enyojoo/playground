import { PlanCard } from "@/components/CatalogCards";
import { subscriptionPlans } from "@/lib/catalog";

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
          Pricing
        </h1>
        <p className="mt-3 text-stone-600">
          Simple monthly plans. Upgrade or cancel anytime.
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
