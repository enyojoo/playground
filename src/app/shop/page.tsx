import { ProductCard } from "@/components/CatalogCards";
import { BackLink } from "@/components/BackLink";
import { PageShell } from "@/components/PageShell";
import { SurfaceBadge } from "@/components/SurfaceBadge";
import { shopProducts } from "@/lib/catalog";

export default function ShopPage() {
  return (
    <PageShell>
      <BackLink />

      <div className="mt-2 max-w-2xl">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-medium text-primary">One-time payments</p>
          <SurfaceBadge label="Hosted page" />
        </div>
        <h1 className="font-heading mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Shop
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          Check out posts to your server, which creates a session and redirects
          the browser to Easner’s hosted payment page. No checkout.js on this
          page.
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
