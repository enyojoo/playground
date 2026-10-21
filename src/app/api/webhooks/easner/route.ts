import { handleEasnerWebhook } from "@/lib/easner-webhook-handler";

/** Legacy path — use /api/easner-webhook in the Easner dashboard. */
export async function POST(request: Request) {
  return handleEasnerWebhook(request);
}
