import Link from "next/link";

import { BRAND } from "@/lib/brand";

type BrandLogoProps = {
  href?: string;
  className?: string;
  height?: number;
};

export function BrandLogo({
  href,
  className = "",
  height = 24,
}: BrandLogoProps) {
  const logo = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={BRAND.logo}
      alt={`${BRAND.name} logo`}
      height={height}
      className={`w-auto object-contain ${className}`}
      style={{ height }}
    />
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex shrink-0 items-center">
        {logo}
      </Link>
    );
  }

  return logo;
}
