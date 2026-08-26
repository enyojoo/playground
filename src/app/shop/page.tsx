import { ProductCard } from "@/components/CatalogCards";
import { PageShell } from "@/components/PageShell";
import { shopProducts } from "@/lib/catalog";

export default function ShopPage() {
  return (
    <PageShell>
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-primary">One-time payments</p>
        <h1 className="font-heading mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Shop
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          Example products for testing a single checkout payment.
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
