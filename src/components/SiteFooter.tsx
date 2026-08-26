import Link from "next/link";

import { BRAND } from "@/lib/brand";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-8 lg:px-8">
        <p className="text-center sm:text-left">
          © {year} {BRAND.legalName}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:justify-end">
          <Link
            href={BRAND.url}
            className="inline-flex items-center gap-1.5 hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={BRAND.favicon}
              alt=""
              aria-hidden="true"
              className="h-4 w-4 shrink-0"
            />
            easner.com
          </Link>
          <Link
            href={BRAND.businessUrl}
            className="inline-flex items-center gap-1.5 hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={BRAND.favicon}
              alt=""
              aria-hidden="true"
              className="h-4 w-4 shrink-0"
            />
            easner.com/business
          </Link>
        </div>
      </div>
    </footer>
  );
}
