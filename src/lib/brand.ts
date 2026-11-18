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
    "Your buyers stay on your brand. Choose how checkout appears: Easner’s own page, a form inside your site, or a panel over your content. The examples below are one store shown three ways. Try each as a customer would.",
  hostedTitle: "Shop",
  hostedBadge: "Hosted page",
  hosted:
    "Best when you want the simplest path: customers go to Easner’s secure checkout page, pay, then return to your site.",
  inlineTitle: "Pricing",
  inlineBadge: "Inline",
  inline:
    "Best when checkout should feel like part of your site, including subscriptions and seat counts.",
  overlayTitle: "Book & Download",
  overlayBadge: "Overlay",
  overlay:
    "Best when the customer should stay on the page: a payment panel opens on top for a booking or a one-off purchase.",
} as const;

export const CONNECT = {
  headline: "Pay people on your platform",
  card: "You pay creators, sellers, and freelancers. See the earnings page they use to link Easner and withdraw.",
  pageLead:
    "If you run a marketplace, course site, or gig platform, Connect is how you pay the people who earn on your site. You track sales and lessons on your side; Easner links each person’s account and sends them their money. Below is the kind of page you show someone after they earn from a lesson or a sale.",
  linkTitle: "Link an Easner account",
  linkBody:
    "They enter the email on their Easner account, tap Get paid with Easner, and confirm in the Easner app or on Easner’s screen. Once they approve, their account shows as linked and they can withdraw.",
  balanceLabel: "Available to withdraw",
  balanceHint:
    "In your product you add this balance when someone earns. This demo starts with one lesson credit. Withdraw opens Easner’s payout flow.",
  connected: "Easner account linked. They can withdraw to this account.",
  notConnected: "Not linked yet. They need to complete Get paid with Easner first.",
  scriptLoading: "Loading Easner Connect…",
  scriptError:
    "Easner Connect did not load, so the link and withdraw screens cannot open yet. Try again in a moment.",
  appCodeLabel: "Code for the Easner app",
  errorTitle: "Something went wrong",
  resetCta: "Start over",
  resetHint:
    "Starts a fresh demo in this browser: unlinks the last test connection, opens a new demo earner, and adds the $250 lesson balance again so you can walk through link and withdraw.",
} as const;