import { handleEasnerWebhook } from "@/lib/easner-webhook-handler";

/** Canonical Easner webhook URL for playground.easner.com */
export async function POST(request: Request) {
  return handleEasnerWebhook(request);
}
