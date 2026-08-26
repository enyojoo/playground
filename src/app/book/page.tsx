import { BookingCard } from "@/components/CatalogCards";
import { PageShell } from "@/components/PageShell";
import { bookableItems } from "@/lib/catalog";

export default function BookPage() {
  return (
    <PageShell>
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-primary">Pay for access</p>
        <h1 className="font-heading mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Book & Download
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          Example bookings and downloads for testing custom payment flows.
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
