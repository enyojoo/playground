import { BookingCard, ProductCard } from "@/components/CatalogCards";
import { BackLink } from "@/components/BackLink";
import { PageShell } from "@/components/PageShell";
import { PlanDetails } from "@/components/PlanDetails";
import { PricingCheckoutPanel } from "@/components/PricingCheckoutPanel";
import { SurfaceBadge } from "@/components/SurfaceBadge";
import { CHECKOUT } from "@/lib/brand";
import { bookableItems, shopProducts, subscriptionPlan } from "@/lib/catalog";
import { createPricingCheckoutSession } from "@/lib/pricing-checkout-session";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const initialSession = await createPricingCheckoutSession();

  return (
    <PageShell>
      <BackLink />
      <div className="mt-2 max-w-3xl">
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {CHECKOUT.title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          {CHECKOUT.summary}
        </p>
      </div>

      <section className="mt-10">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-heading text-xl font-semibold">{CHECKOUT.hostedTitle}</h2>
          <SurfaceBadge label={CHECKOUT.hostedBadge} />
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          {CHECKOUT.hosted}
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {shopProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-heading text-xl font-semibold">{CHECKOUT.inlineTitle}</h2>
          <SurfaceBadge label={CHECKOUT.inlineBadge} />
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          {CHECKOUT.inline}
        </p>
        <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-10">
          <PlanDetails plan={subscriptionPlan} />
          <PricingCheckoutPanel
            itemId={subscriptionPlan.id}
            initialSession={initialSession}
          />
        </div>
      </section>

      <section className="mt-14">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-heading text-xl font-semibold">{CHECKOUT.overlayTitle}</h2>
          <SurfaceBadge label={CHECKOUT.overlayBadge} />
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          {CHECKOUT.overlay}
        </p>
        <div className="mt-6 space-y-4">
          {bookableItems.map((item) => (
            <BookingCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
