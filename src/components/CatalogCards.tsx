import { formatMoney, type BookableItem, type ShopProduct, type SubscriptionPlan } from "@/lib/catalog";
import { CheckoutButton } from "@/components/CheckoutButton";

type ProductCardProps = {
  product: ShopProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex h-32 items-center justify-center rounded-xl bg-stone-50 text-5xl">
        {product.image}
      </div>

      <h3 className="text-lg font-semibold text-stone-900">{product.name}</h3>
      <p className="mt-1 flex-1 text-sm text-stone-600">{product.description}</p>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-xl font-semibold text-stone-900">
          {formatMoney(product.amount, product.currency)}
        </p>

        <CheckoutButton
          mode="payment"
          amount={product.amount}
          currency={product.currency}
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
          ? "border-stone-900 bg-stone-900 text-white"
          : "border-stone-200 bg-white"
      }`}
    >
      {plan.highlighted ? (
        <span className="mb-4 inline-flex w-fit rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
          Most popular
        </span>
      ) : null}

      <h3 className="text-xl font-semibold">{plan.name}</h3>
      <p
        className={`mt-1 text-sm ${plan.highlighted ? "text-stone-300" : "text-stone-600"}`}
      >
        {plan.description}
      </p>

      <p className="mt-6 text-3xl font-semibold">
        {formatMoney(plan.amount, plan.currency)}
        <span
          className={`text-base font-normal ${plan.highlighted ? "text-stone-300" : "text-stone-500"}`}
        >
          /{plan.interval}
        </span>
      </p>

      <ul className="mt-6 flex-1 space-y-2 text-sm">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <span className={plan.highlighted ? "text-stone-300" : "text-stone-400"}>
              ✓
            </span>
            <span className={plan.highlighted ? "text-stone-100" : "text-stone-700"}>
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
    <article className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-stone-900">{item.name}</h3>
            {item.duration ? (
              <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-600">
                {item.duration}
              </span>
            ) : null}
          </div>
          <p className="mt-1 max-w-xl text-sm text-stone-600">{item.description}</p>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
          <p className="text-xl font-semibold text-stone-900">
            {formatMoney(item.amount, item.currency)}
          </p>

          <CheckoutButton
            mode="payment"
            amount={item.amount}
            currency={item.currency}
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
