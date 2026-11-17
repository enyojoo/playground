import Link from "next/link";

import { PageShell } from "@/components/PageShell";
import { CHECKOUT, CONNECT, PLAYGROUND } from "@/lib/brand";

function CheckoutIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none">
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M7 15h4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ConnectIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none">
      <circle cx="8" cy="7.5" r="2.6" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M3.5 18.75c.65-2.45 2.35-3.75 4.5-3.75 1.15 0 2.15.35 2.95.95"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <rect
        x="13"
        y="11.25"
        width="8"
        height="6.25"
        rx="1.25"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M15 14.4h4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

const products = [
  {
    href: "/checkout",
    title: "Checkout",
    description: CHECKOUT.card,
    icon: CheckoutIcon,
  },
  {
    href: "/connect",
    title: "Connect",
    description: CONNECT.card,
    icon: ConnectIcon,
  },
];

export default function HomePage() {
  return (
    <PageShell>
      <div className="max-w-3xl">
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {PLAYGROUND.headline}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          {PLAYGROUND.description}
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6">
        {products.map((product) => {
          const Icon = product.icon;

          return (
            <Link
              key={product.href}
              href={product.href}
              className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md sm:p-8"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                <Icon />
              </span>
              <h2 className="font-heading mt-6 text-2xl font-semibold tracking-tight text-foreground">
                {product.title}
              </h2>
              <p className="mt-3 max-w-sm flex-1 text-sm leading-relaxed text-muted sm:text-base">
                {product.description}
              </p>
              <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Preview
                <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          );
        })}
      </div>
    </PageShell>
  );
}
