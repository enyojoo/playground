import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import { GeistSans } from "geist/font/sans";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { BRAND, PLAYGROUND } from "@/lib/brand";

import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-unbounded",
});

export const metadata: Metadata = {
  title: {
    default: BRAND.playgroundName,
    template: `%s – ${BRAND.playgroundName}`,
  },
  description: PLAYGROUND.description,
  applicationName: BRAND.playgroundName,
  metadataBase: new URL(`https://${BRAND.playgroundDomain}`),
  icons: {
    icon: BRAND.favicon,
    shortcut: BRAND.favicon,
    apple: BRAND.favicon,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${unbounded.variable} h-full`}
    >
      <body className="flex min-h-full min-w-0 flex-col overflow-x-hidden bg-background text-foreground antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
