import { BookingCard } from "@/components/CatalogCards";
import { bookableItems } from "@/lib/catalog";

export default function BookPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
          Book & Download
        </h1>
        <p className="mt-3 text-stone-600">
          Reserve a session, join a workshop, or get instant access to digital
          products.
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
