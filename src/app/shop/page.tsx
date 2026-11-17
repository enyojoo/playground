import { ProductCard } from "@/components/CatalogCards";
import { BackLink } from "@/components/BackLink";
import { PageShell } from "@/components/PageShell";
import { SurfaceBadge } from "@/components/SurfaceBadge";
import { CHECKOUT } from "@/lib/brand";
import { shopProducts } from "@/lib/catalog";

export default function ShopPage() {
  return (
    <PageShell>
      <BackLink href="/checkout" label="Checkout" />

      <div className="mt-2 max-w-2xl">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-medium text-primary">One-time payment</p>
          <SurfaceBadge label={CHECKOUT.hostedBadge} />
        </div>
        <h1 className="font-heading mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {CHECKOUT.hostedTitle}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          {CHECKOUT.hosted}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {shopProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </PageShell>
  );
}
