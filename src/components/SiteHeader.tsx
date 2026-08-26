"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BrandLogo } from "@/components/BrandLogo";
import { BRAND, PLAYGROUND } from "@/lib/brand";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/pricing", label: "Pricing" },
  { href: "/book", label: "Book & Download" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <BrandLogo height={22} />
          <div className="hidden min-w-0 sm:block">
            <p className="font-heading text-sm font-semibold text-foreground">
              Playground
            </p>
            <p className="truncate text-xs text-muted">{PLAYGROUND.tagline}</p>
          </div>
        </Link>

        <nav className="flex items-center gap-1">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-background text-foreground"
                    : "text-muted hover:bg-background hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
