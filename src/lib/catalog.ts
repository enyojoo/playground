export type ShopProduct = {
  id: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  image: string;
};

export type SubscriptionPlan = {
  id: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  interval: "month" | "year";
  features: string[];
  highlighted?: boolean;
};

export type BookableItem = {
  id: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  metadataKey: string;
  duration?: string;
};

export const shopProducts: ShopProduct[] = [
  {
    id: "prod_tote",
    name: "Canvas Tote",
    description: "Heavy-duty cotton tote with embroidered logo.",
    amount: 2900,
    currency: "usd",
    image: "👜",
  },
  {
    id: "prod_mug",
    name: "Ceramic Mug",
    description: "12oz matte finish mug, dishwasher safe.",
    amount: 2400,
    currency: "usd",
    image: "☕",
  },
  {
    id: "prod_notebook",
    name: "Notebook Set",
    description: "Three ruled notebooks with lay-flat binding.",
    amount: 1800,
    currency: "usd",
    image: "📓",
  },
];

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "plan_starter",
    name: "Starter",
    description: "For individuals getting started.",
    amount: 1900,
    currency: "usd",
    interval: "month",
    features: ["1 workspace", "5 GB storage", "Email support"],
  },
  {
    id: "plan_pro",
    name: "Pro",
    description: "For growing teams that need more.",
    amount: 4900,
    currency: "usd",
    interval: "month",
    features: ["5 workspaces", "50 GB storage", "Priority support", "API access"],
    highlighted: true,
  },
  {
    id: "plan_business",
    name: "Business",
    description: "For companies with advanced needs.",
    amount: 9900,
    currency: "usd",
    interval: "month",
    features: ["Unlimited workspaces", "500 GB storage", "Dedicated support", "SSO"],
  },
];

export const bookableItems: BookableItem[] = [
  {
    id: "bk_photo",
    name: "Portrait Session",
    description: "One-hour studio session with edited digital gallery.",
    amount: 12000,
    currency: "usd",
    metadataKey: "booking_id",
    duration: "60 min",
  },
  {
    id: "bk_workshop",
    name: "Workshop Seat",
    description: "Reserve a spot in our next product design workshop.",
    amount: 7500,
    currency: "usd",
    metadataKey: "booking_id",
    duration: "Half day",
  },
  {
    id: "dl_templates",
    name: "Template Pack",
    description: "Instant download – 40 presentation templates.",
    amount: 3500,
    currency: "usd",
    metadataKey: "download_id",
  },
];

export function formatMoney(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}
