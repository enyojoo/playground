import { BookingCard } from "@/components/CatalogCards";
import { BackLink } from "@/components/BackLink";
import { PageShell } from "@/components/PageShell";
import { SurfaceBadge } from "@/components/SurfaceBadge";
import { bookableItems } from "@/lib/catalog";

export default function BookPage() {
  return (
    <PageShell>
      <BackLink />

      <div className="mt-2 max-w-2xl">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-medium text-primary">Pay for access</p>
          <SurfaceBadge label="Overlay" />
        </div>
        <h1 className="font-heading mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Book & Download
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          Your server returns a client secret; checkout.js opens Easner Checkout
          in a panel over this page.
        </p>
      </div>

      <div className="mt-8 space-y-4 sm:mt-12">
        {bookableItems.map((item) => (
          <BookingCard key={item.id} item={item} />
        ))}
      </div>
    </PageShell>
  );
}
