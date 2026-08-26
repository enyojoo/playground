import Link from "next/link";

import { PageShell } from "@/components/PageShell";

export default function ThanksPage() {
  return (
    <PageShell className="flex min-h-[60vh] items-center justify-center py-12 sm:py-24">
      <div className="flex w-full max-w-lg flex-col items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl text-primary sm:h-16 sm:w-16">
          ✓
        </div>

        <h1 className="font-heading mt-5 text-2xl font-semibold text-foreground sm:mt-6 sm:text-3xl">
          Thank you
        </h1>

        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted sm:text-base">
          Your payment went through. We will send a confirmation email shortly.
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:justify-center">
          <Link
            href="/shop"
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            Back to shop
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-background"
          >
            Home
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
