import Link from "next/link";

export default function ThanksPage() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-6 py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl">
        ✓
      </div>

      <h1 className="mt-6 text-3xl font-semibold text-stone-900">
        Thank you
      </h1>

      <p className="mt-3 text-stone-600">
        Your payment went through. We will send a confirmation email shortly.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link
          href="/shop"
          className="rounded-lg bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-stone-800"
        >
          Back to shop
        </Link>
        <Link
          href="/"
          className="rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-stone-900 hover:bg-stone-50"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
