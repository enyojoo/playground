import { PlanCard } from "@/components/CatalogCards";
import { subscriptionPlans } from "@/lib/catalog";

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-stone-500">Subscription payments</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
          Pricing
        </h1>
        <p className="mt-3 text-stone-600">
          Subscribe to unlock a plan. The server creates a recurring session with{" "}
          <code className="rounded bg-stone-200 px-1.5 py-0.5 text-sm">
            user_id
          </code>{" "}
          and{" "}
          <code className="rounded bg-stone-200 px-1.5 py-0.5 text-sm">
            plan
          </code>{" "}
          metadata. Also listen for{" "}
          <code className="rounded bg-stone-200 px-1.5 py-0.5 text-sm">
            subscription.updated
          </code>{" "}
          and{" "}
          <code className="rounded bg-stone-200 px-1.5 py-0.5 text-sm">
            subscription.canceled
          </code>
          .
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
