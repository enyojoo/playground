"use client";

import { formatMoney, type BookableItem, type ShopProduct, type SubscriptionPlan } from "@/lib/catalog";
import { CheckoutButton } from "@/components/CheckoutButton";

type ProductCardProps = {
  product: ShopProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <div className="mb-4 flex h-32 items-center justify-center rounded-xl bg-background text-5xl">
        {product.image}
      </div>

      <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
      <p className="mt-1 flex-1 text-sm text-muted">{product.description}</p>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-xl font-semibold text-foreground">
          {formatMoney(product.amount, product.currency)}
        </p>

        <CheckoutButton
          mode="payment"
          amount={product.amount}
          currency={product.currency}
          summary={product.name}
          metadata={() => ({
            order_id: `ord_${product.id}_${Date.now()}`,
            product_id: product.id,
          })}
          label="Buy now"
          className="w-auto shrink-0"
        />
      </div>
    </article>
  );
}

type PlanCardProps = {
  plan: SubscriptionPlan;
};

export function PlanCard({ plan }: PlanCardProps) {
  return (
    <article
      className={`flex flex-col rounded-2xl border p-6 shadow-sm ${
        plan.highlighted
          ? "border-primary bg-primary text-white"
          : "border-border bg-surface"
      }`}
    >
      {plan.highlighted ? (
        <span className="mb-4 inline-flex w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white">
          Most popular
        </span>
      ) : null}

      <h3 className="font-heading text-xl font-semibold">{plan.name}</h3>
      <p
        className={`mt-1 text-sm ${plan.highlighted ? "text-white/80" : "text-muted"}`}
      >
        {plan.description}
      </p>

      <p className="mt-6 text-3xl font-semibold">
        {formatMoney(plan.amount, plan.currency)}
        <span
          className={`text-base font-normal ${plan.highlighted ? "text-white/70" : "text-muted"}`}
        >
          /{plan.interval}
        </span>
      </p>

      <ul className="mt-6 flex-1 space-y-2 text-sm">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <span className={plan.highlighted ? "text-white/70" : "text-muted"}>
              ✓
            </span>
            <span className={plan.highlighted ? "text-white" : "text-foreground"}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <CheckoutButton
        mode="subscription"
        amount={plan.amount}
        currency={plan.currency}
        interval={plan.interval}
        summary={`${plan.name} plan`}
        metadata={() => ({
          user_id: `user_${Date.now()}`,
          plan: plan.id,
        })}
        label="Subscribe"
        variant={plan.highlighted ? "secondary" : "primary"}
        className="mt-8"
      />
    </article>
  );
}

type BookingCardProps = {
  item: BookableItem;
};

export function BookingCard({ item }: BookingCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
            {item.duration ? (
              <span className="rounded-full bg-background px-2.5 py-0.5 text-xs font-medium text-muted">
                {item.duration}
              </span>
            ) : null}
          </div>
          <p className="mt-1 max-w-xl text-sm text-muted">{item.description}</p>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
          <p className="text-xl font-semibold text-foreground">
            {formatMoney(item.amount, item.currency)}
          </p>

          <CheckoutButton
            mode="payment"
            amount={item.amount}
            currency={item.currency}
            summary={item.name}
            metadata={() => ({
              [item.metadataKey]: `${item.id}_${Date.now()}`,
            })}
            label="Pay now"
            className="w-auto"
          />
        </div>
      </div>
    </article>
  );
}
