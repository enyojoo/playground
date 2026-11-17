export const BRAND = {
  name: "Easner",
  playgroundName: "Easner Playground",
  legalName: "Easner Group, Inc.",
  logo: "/easner-logo.svg",
  favicon: "/easner-favicon.svg",
  url: "https://www.easner.com",
  businessUrl: "https://www.easner.com/business",
  domain: "easner.com",
  playgroundDomain: "playground.easner.com",
  primary: "#007ACC",
  primaryHover: "#0062A3",
  background: "#F6F3EB",
  foreground: "#0F1110",
  muted: "#6F756F",
  border: "#E4DED1",
  surface: "#FFFFFF",
} as const;

export const PLAYGROUND = {
  headline: "Preview Checkout and Connect",
  description:
    "You are evaluating Easner for your business. Checkout is how customers pay you on your site. Connect is how you pay creators, sellers, and freelancers into their own Easner accounts.",
} as const;

export const CHECKOUT = {
  title: "Checkout",
  card: "Customers pay you on your site. See hosted, inline, and overlay checkout in one place.",
  summary:
    "Your buyers never leave your brand. You choose where the payment form lives: Easner’s hosted page, embedded in your layout, or in a panel over the content. The examples below are one site with three placements. Check out as a customer would.",
  hostedTitle: "Shop",
  hostedBadge: "Hosted page",
  hosted:
    "Best when you want the simplest path: your backend creates a session, the browser opens Easner’s page, payment completes, redirect back.",
  inlineTitle: "Pricing",
  inlineBadge: "Inline",
  inline:
    "Best when checkout should feel native: checkout.js mounts the form in your page, including subscriptions and seat counts.",
  overlayTitle: "Book & Download",
  overlayBadge: "Overlay",
  overlay:
    "Best when the customer stays in context: checkout.js opens a sheet over your page for a booking or a one-off purchase.",
} as const;

export const CONNECT = {
  headline: "Connect on your site",
  card: "You pay people on your platform. See the earnings page they use to link Easner and withdraw.",
  pageLead:
    "If you run a marketplace, course site, or gig platform, Connect is the other side of your ledger. You keep your books; Easner holds linked accounts and pays out from your balance. Below is the page you give an earner after you credit a lesson or a sale.",
  linkTitle: "Link an Easner account",
  linkBody:
    "Your creator enters the email on their Easner account, opens Get paid with Easner, and approves in the app or on the Easner sheet. Your server completes the link with PKCE, the same pattern you ship in production.",
  balanceLabel: "Available to withdraw",
  balanceHint: "You credited this on your server. Withdraw opens Easner’s payout sheet.",
  connected: "Easner account linked. Payouts can go to this person.",
  notConnected: "Not linked yet. Get paid with Easner runs first.",
} as const;