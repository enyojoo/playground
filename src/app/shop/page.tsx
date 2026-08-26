import { ProductCard } from "@/components/CatalogCards";
import { shopProducts } from "@/lib/catalog";

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-primary">One-time payments</p>
        <h1 className="font-heading mt-2 text-3xl font-semibold tracking-tight text-foreground">
          Shop
        </h1>
        <p className="mt-3 text-muted">
          Example products for testing a single checkout payment.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shopProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
