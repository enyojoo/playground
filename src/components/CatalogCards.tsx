import { formatMoney, type BookableItem, type ShopProduct } from "@/lib/catalog";
import { CheckoutForm } from "@/components/CheckoutForm";
import { CheckoutOverlay } from "@/components/CheckoutOverlay";

type ProductCardProps = {
  product: ShopProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex flex-col rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex h-28 items-center justify-center rounded-xl bg-background text-4xl sm:h-32 sm:text-5xl">
        {product.image}
      </div>

      <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
      <p className="mt-1 flex-1 text-sm leading-relaxed text-muted">
        {product.description}
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p className="text-xl font-semibold text-foreground">
          {formatMoney(product.amount, product.currency)}
        </p>

        <CheckoutForm
          itemType="shop"
          itemId={product.id}
          label="Check out"
          fullWidth="mobile"
        />
      </div>
    </article>
  );
}

type BookingCardProps = {
  item: BookableItem;
};

export function BookingCard({ item }: BookingCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
            {item.duration ? (
              <span className="rounded-full bg-background px-2.5 py-0.5 text-xs font-medium text-muted">
                {item.duration}
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-sm leading-relaxed text-muted">{item.description}</p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:items-end lg:shrink-0">
          <p className="text-xl font-semibold text-foreground">
            {formatMoney(item.amount, item.currency)}
          </p>

          <CheckoutOverlay
            itemType="booking"
            itemId={item.id}
            label="Check out"
            fullWidth="mobile"
          />
        </div>
      </div>
    </article>
  );
}
