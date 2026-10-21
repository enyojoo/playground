import "server-only";

/** Publishable key for inline/overlay checkout (safe to send to the browser). */
export function getEasnerPublishableKey(): string {
  const fromServer = process.env.EASNER_PUBLISHABLE_KEY?.trim();
  if (fromServer) {
    return fromServer;
  }

  return process.env.NEXT_PUBLIC_EASNER_PUBLISHABLE_KEY?.trim() ?? "";
}
