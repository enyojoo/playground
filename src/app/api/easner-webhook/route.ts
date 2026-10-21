import { handleEasnerWebhook } from "@/lib/easner-webhook-handler";

export async function POST(request: Request) {
  return handleEasnerWebhook(request);
}
