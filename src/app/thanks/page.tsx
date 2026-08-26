import Link from "next/link";

type ThanksPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function ThanksPage({ searchParams }: ThanksPageProps) {
  const { session_id: sessionId } = await searchParams;

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-6 py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl">
        ✓
      </div>

      <h1 className="mt-6 text-3xl font-semibold text-stone-900">
        Payment successful
      </h1>

      <p className="mt-3 text-stone-600">
        Thanks for your purchase. In a real integration, you would fulfil the
        order when your server receives the{" "}
        <code className="rounded bg-stone-200 px-1.5 py-0.5 text-sm">
          checkout.completed
        </code>{" "}
        webhook — not from this page alone.
      </p>

      {sessionId ? (
        <p className="mt-6 rounded-xl border border-stone-200 bg-white px-4 py-3 font-mono text-sm text-stone-600">
          session_id: {sessionId}
        </p>
      ) : null}

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
