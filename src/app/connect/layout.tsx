import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";

import { EASNER_CONNECT_JS_URL } from "@/lib/easner-connect-js";

export const metadata: Metadata = {
  title: "Connect",
  description:
    "Preview Connect: the page you give earners on your platform to link Easner and withdraw. Test mode only.",
};

export default function ConnectLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://js.easner.com" />
      <Script src={EASNER_CONNECT_JS_URL} strategy="afterInteractive" />
      {children}
    </>
  );
}
