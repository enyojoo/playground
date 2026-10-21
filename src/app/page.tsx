import Link from "next/link";

import { PageShell } from "@/components/PageShell";
import { SurfaceBadge } from "@/components/SurfaceBadge";
import { PLAYGROUND } from "@/lib/brand";

const useCases = [
  {
    href: "/shop",
    title: "One-time payments",
    description:
      "Hosted checkout: your server redirects to Easner’s payment page, then back to your site.",
    example: "Shop",
    surface: "Hosted page",
  },
  {
    href: "/pricing",
    title: "Subscriptions",
    description:
      "Inline checkout: the pay form mounts inside your page with checkout.js.",
    example: "Pricing",
    surface: "Inline",
  },
  {
    href: "/book",
    title: "Pay for access",
    description:
      "Overlay checkout: a panel opens over your page while the customer pays.",
    example: "Book & Download",
    surface: "Overlay",
  },
];

export default function HomePage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {PLAYGROUND.headline}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {PLAYGROUND.description}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {useCases.map((useCase) => (
          <Link
            key={useCase.href}
            href={useCase.href}
            className="group rounded-2xl border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex rounded-full bg-background px-2.5 py-1 text-xs font-medium text-muted">
                {useCase.example}
              </span>
              <SurfaceBadge label={useCase.surface} />
            </div>
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
