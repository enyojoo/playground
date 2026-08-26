export {};

declare global {
  interface EasnerCheckoutOptions {
    publishableKey: string;
    clientSecret: string;
    customerEmail?: string;
    customerName?: string;
    onSuccess?: (result?: unknown) => void;
    onError?: (error: Error) => void;
  }

  interface EasnerCheckoutInstance {
    destroy: () => void;
  }

  interface EasnerCheckoutGlobal {
    mount: (
      target: string | HTMLElement,
      options: EasnerCheckoutOptions,
    ) => Promise<EasnerCheckoutInstance>;
    openOverlay: (options: EasnerCheckoutOptions & { title?: string }) => Promise<EasnerCheckoutInstance>;
    destroy: (target?: string | HTMLElement | EasnerCheckoutInstance) => void;
  }

  interface Window {
    EasnerCheckout?: EasnerCheckoutGlobal;
  }
}
