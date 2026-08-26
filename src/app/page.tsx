import Link from "next/link";

import { PageShell } from "@/components/PageShell";
import { PLAYGROUND } from "@/lib/brand";

const useCases = [
  {
    href: "/shop",
    title: "One-time payments",
    description:
      "Try checkout for products and single purchases — like an online store or invoice payment.",
    example: "Shop",
  },
  {
    href: "/pricing",
    title: "Subscriptions",
    description:
      "See how recurring billing works for SaaS plans and memberships billed monthly.",
    example: "Pricing",
  },
  {
    href: "/book",
    title: "Pay for access",
    description:
      "Test bookings, workshop seats, and instant digital downloads with a single checkout flow.",
    example: "Book & Download",
  },
];

export default function HomePage() {
  return (
    <PageShell>
      <div className="max-w-2xl">
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {PLAYGROUND.headline}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {PLAYGROUND.description} Pick a scenario below and walk through a live
          checkout experience.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {useCases.map((useCase) => (
          <Link
            key={useCase.href}
            href={useCase.href}
            className="group rounded-2xl border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
          >
            <span className="inline-flex rounded-full bg-background px-2.5 py-1 text-xs font-medium text-muted">
              {useCase.example}
            </span>
            <h2 className="font-heading mt-4 text-lg font-semibold text-foreground group-hover:text-primary">
              {useCase.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {useCase.description}
            </p>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
