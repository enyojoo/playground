import Link from "next/link";

import { PageShell } from "@/components/PageShell";
import { formatMoney } from "@/lib/catalog";
import { retrieveCheckoutSession } from "@/lib/easner";

type ThanksPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

function isSuccessfulSession(
  status?: string,
  paymentStatus?: string | null,
): boolean {
  if (status === "complete") {
    return (
      paymentStatus === "paid" ||
      paymentStatus === "no_payment_required" ||
      paymentStatus === null
    );
  }

  return false;
}

export default async function ThanksPage({ searchParams }: ThanksPageProps) {
  const { session_id: sessionId } = await searchParams;

  let title = "Thank you";
  let message =
    "Your payment went through. We will send a confirmation email shortly.";
  let showSuccessIcon = true;

  if (sessionId) {
    try {
      const session = await retrieveCheckoutSession(sessionId);

      if (!session) {
        title = "Session not found";
        message = "We could not find that checkout session.";
        showSuccessIcon = false;
      } else if (session.status === "processing" || session.payment_status === "processing") {
        title = "Payment processing";
        message =
          "Your bank payment is processing. We will confirm by email when it completes.";
        showSuccessIcon = false;
      } else if (session.status === "failed" || session.payment_status === "failed") {
        title = "Payment failed";
        message = "This checkout did not complete. You can try again from the playground.";
        showSuccessIcon = false;
      } else if (session.status === "expired") {
        title = "Checkout expired";
        message = "This checkout session expired before payment completed.";
        showSuccessIcon = false;
      } else if (!isSuccessfulSession(session.status, session.payment_status)) {
        title = "Checkout incomplete";
        message = "This session is not paid yet. Return to the playground to try again.";
        showSuccessIcon = false;
      } else if (session.amount_total && session.currency) {
        message = `Payment confirmed for ${formatMoney(session.amount_total, session.currency.toLowerCase())}. We will send a confirmation email shortly.`;
      }
    } catch {
      title = "Unable to verify payment";
      message =
        "We could not confirm this checkout session right now. If you were charged, we will email you shortly.";
      showSuccessIcon = false;
    }
  }

  return (
    <PageShell className="flex min-h-[60vh] items-center justify-center py-12 sm:py-24">
      <div className="flex w-full max-w-lg flex-col items-center text-center">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full text-2xl sm:h-16 sm:w-16 ${
            showSuccessIcon
              ? "bg-primary/10 text-primary"
              : "bg-background text-muted"
          }`}
        >
          {showSuccessIcon ? "✓" : "!"}
        </div>

        <h1 className="font-heading mt-5 text-2xl font-semibold text-foreground sm:mt-6 sm:text-3xl">
          {title}
        </h1>

        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted sm:text-base">
          {message}
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
