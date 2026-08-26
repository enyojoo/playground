import Link from "next/link";

export default function ThanksPage() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-6 py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl text-primary">
        ✓
      </div>

      <h1 className="font-heading mt-6 text-3xl font-semibold text-foreground">
        Thank you
      </h1>

      <p className="mt-3 text-muted">
        Your payment went through. We will send a confirmation email shortly.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link
          href="/shop"
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
        >
          Back to shop
        </Link>
        <Link
          href="/"
          className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-background"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
