import { handleEasnerWebhook } from "@/lib/easner-webhook-handler";

/** Alias — canonical webhook URL is /api/webhooks/easner */
export async function POST(request: Request) {
  return handleEasnerWebhook(request);
}
