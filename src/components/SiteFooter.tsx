import Link from "next/link";

import { BRAND } from "@/lib/brand";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} {BRAND.legalName}</p>
        <div className="flex flex-wrap gap-4">
          <Link
            href={BRAND.url}
            className="hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            easner.com
          </Link>
          <Link
            href={BRAND.businessUrl}
            className="hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            Easner Business
          </Link>
        </div>
      </div>
    </footer>
  );
}
