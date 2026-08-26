export {};

declare global {
  interface EasnerCheckoutOpenOptions {
    publishableKey: string;
    clientSecret: string;
    onSuccess?: (result: { sessionId?: string }) => void;
    onCancel?: () => void;
  }

  interface EasnerCheckoutGlobal {
    openOverlay: (options: EasnerCheckoutOpenOptions) => void;
  }

  interface Window {
    EasnerCheckout?: EasnerCheckoutGlobal;
  }
}
