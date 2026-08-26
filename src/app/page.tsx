import Link from "next/link";

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
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="max-w-2xl">
        <p className="font-heading text-sm font-medium uppercase tracking-wide text-primary">
          Easner Playground
        </p>
        <h1 className="font-heading mt-3 text-4xl font-semibold tracking-tight text-foreground">
          {PLAYGROUND.tagline}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {PLAYGROUND.description} Pick a scenario below and walk through a live
          checkout experience.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {useCases.map((useCase) => (
          <Link
            key={useCase.href}
            href={useCase.href}
            className="group rounded-2xl border border-border bg-surface p-6 shadow-sm transition-shadow hover:shadow-md"
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
    </div>
  );
}
