import { BookingCard } from "@/components/CatalogCards";
import { bookableItems } from "@/lib/catalog";

export default function BookPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-primary">Pay for access</p>
        <h1 className="font-heading mt-2 text-3xl font-semibold tracking-tight text-foreground">
          Book & Download
        </h1>
        <p className="mt-3 text-muted">
          Example bookings and downloads for testing custom payment flows.
        </p>
      </div>

      <div className="mt-12 space-y-4">
        {bookableItems.map((item) => (
          <BookingCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
