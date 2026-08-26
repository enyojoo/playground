import { BookingCard } from "@/components/CatalogCards";
import { bookableItems } from "@/lib/catalog";

export default function BookPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-stone-500">Custom payments</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
          Book & Download
        </h1>
        <p className="mt-3 text-stone-600">
          Pay-for-access flows keyed by your own ids — bookings, workshop seats,
          or digital downloads. Fulfil using{" "}
          <code className="rounded bg-stone-200 px-1.5 py-0.5 text-sm">
            booking_id
          </code>{" "}
          or{" "}
          <code className="rounded bg-stone-200 px-1.5 py-0.5 text-sm">
            download_id
          </code>{" "}
          from webhook metadata.
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
