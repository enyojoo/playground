import { formatMoney, type SubscriptionPlan } from "@/lib/catalog";

type PlanDetailsProps = {
  plan: SubscriptionPlan;
  className?: string;
};

export function PlanDetails({ plan, className = "" }: PlanDetailsProps) {
  return (
    <article
      className={`rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-8 ${className}`}
    >
      <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
        {plan.name}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
        {plan.description}
      </p>

      <p className="mt-8 text-3xl font-semibold text-foreground sm:text-4xl">
        {formatMoney(plan.amount, plan.currency)}
        <span className="text-base font-normal text-muted sm:text-lg">
          /{plan.interval}
        </span>
      </p>

      <ul className="mt-8 space-y-3 text-sm sm:text-base">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <span className="text-primary" aria-hidden>
              ✓
            </span>
            <span className="text-foreground">{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
