import { ProductCard } from "@/components/CatalogCards";
import { shopProducts } from "@/lib/catalog";

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
          Shop
        </h1>
        <p className="mt-3 text-stone-600">
          Everyday essentials, shipped to your door.
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
