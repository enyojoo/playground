import type { ReactNode } from "react";

export default function PricingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://js.easner.com" />
      <link
        rel="preconnect"
        href="https://checkout.easner.com"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="https://js.easner.com/v1/checkout.js"
        as="script"
      />
      {children}
    </>
  );
}
