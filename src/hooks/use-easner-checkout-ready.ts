"use client";

import { useEffect, useState } from "react";

import { EASNER_CHECKOUT_JS_URL } from "@/lib/easner-checkout";

export function useEasnerCheckoutReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.EasnerCheckout) {
      setReady(true);
      return;
    }

    const script = document.querySelector(
      `script[src="${EASNER_CHECKOUT_JS_URL}"]`,
    );

    const markReady = () => {
      if (window.EasnerCheckout) {
        setReady(true);
      }
    };

    script?.addEventListener("load", markReady);

    const interval = window.setInterval(() => {
      if (window.EasnerCheckout) {
        window.clearInterval(interval);
        setReady(true);
      }
    }, 20);

    return () => {
      script?.removeEventListener("load", markReady);
      window.clearInterval(interval);
    };
  }, []);

  return ready;
}
