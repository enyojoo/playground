import { ProductCard } from "@/components/CatalogCards";
import { shopProducts } from "@/lib/catalog";

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-stone-500">One-time payments</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
          Shop
        </h1>
        <p className="mt-3 text-stone-600">
          Click Buy now to create a server-side checkout session and open the
          Easner overlay. Fulfil the order when you receive a{" "}
          <code className="rounded bg-stone-200 px-1.5 py-0.5 text-sm">
            checkout.completed
          </code>{" "}
          webhook with{" "}
          <code className="rounded bg-stone-200 px-1.5 py-0.5 text-sm">
            order_id
          </code>{" "}
          in metadata.
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
