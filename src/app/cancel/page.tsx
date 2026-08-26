import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-6 py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background text-2xl text-muted">
        ×
      </div>

      <h1 className="font-heading mt-6 text-3xl font-semibold text-foreground">
        Checkout canceled
      </h1>

      <p className="mt-3 text-muted">
        No charge was made. You can return and try again whenever you are ready.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link
          href="/shop"
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
        >
          Continue shopping
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
