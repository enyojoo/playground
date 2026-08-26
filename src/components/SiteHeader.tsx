import Link from "next/link";

import { BrandLogo } from "@/components/BrandLogo";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-5xl items-center justify-center px-4 py-3.5 sm:px-6 sm:py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5">
          <BrandLogo height={22} />
          <span className="font-heading text-base font-semibold text-foreground sm:text-lg">
            Playground
          </span>
        </Link>
      </div>
    </header>
  );
}
