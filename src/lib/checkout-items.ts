import "server-only";

import {
  bookableItems,
  shopProducts,
  subscriptionPlans,
  type BookableItem,
  type ShopProduct,
  type SubscriptionPlan,
} from "@/lib/catalog";

export type CheckoutItemType = "shop" | "subscription" | "booking";

export type ResolvedCheckoutItem = {
  mode: "payment" | "subscription";
  currency: string;
  lineItem: {
    name: string;
    amount: number;
    quantity: number;
    adjustable_quantity?: {
      enabled: true;
      minimum: number;
      maximum?: number;
    };
  };
  recurring?: {
    interval: "day" | "week" | "month" | "year";
    interval_count: number;
  };
  metadata: Record<string, string>;
  idempotencyReference: string;
};

function findShopProduct(itemId: string): ShopProduct | undefined {
  return shopProducts.find((product) => product.id === itemId);
}

function findSubscriptionPlan(itemId: string): SubscriptionPlan | undefined {
  return subscriptionPlans.find((plan) => plan.id === itemId);
}

function findBookableItem(itemId: string): BookableItem | undefined {
  return bookableItems.find((item) => item.id === itemId);
}

export function resolveCheckoutItem(
  itemType: CheckoutItemType,
  itemId: string,
): ResolvedCheckoutItem | null {
  const timestamp = Date.now();

  if (itemType === "shop") {
    const product = findShopProduct(itemId);
    if (!product) return null;

    const orderId = `ord_${product.id}_${timestamp}`;

    return {
      mode: "payment",
      currency: product.currency,
      lineItem: {
        name: product.name,
        amount: product.amount,
        quantity: 1,
      },
      metadata: {
        order_id: orderId,
        product_id: product.id,
      },
      idempotencyReference: orderId,
    };
  }

  if (itemType === "subscription") {
    const plan = findSubscriptionPlan(itemId);
    if (!plan) return null;

    const userId = `user_${timestamp}`;

    return {
      mode: "subscription",
      currency: plan.currency,
      lineItem: {
        name: `${plan.name} plan`,
        amount: plan.amount,
        quantity: 1,
        ...(plan.id === "plan_pro"
          ? {
              adjustable_quantity: {
                enabled: true as const,
                minimum: 1,
                maximum: 99,
              },
            }
          : {}),
      },
      recurring: {
        interval: plan.interval,
        interval_count: 1,
      },
      metadata: {
        user_id: userId,
        plan: plan.id,
      },
      idempotencyReference: `sub_${plan.id}_${userId}`,
    };
  }

  const booking = findBookableItem(itemId);
  if (!booking) return null;

  const resourceId = `${booking.id}_${timestamp}`;

  return {
    mode: "payment",
    currency: booking.currency,
    lineItem: {
      name: booking.name,
      amount: booking.amount,
      quantity: 1,
    },
    metadata: {
      [booking.metadataKey]: resourceId,
    },
    idempotencyReference: resourceId,
  };
}
