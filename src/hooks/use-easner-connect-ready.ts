"use client";

import { useEffect, useState } from "react";

import { EASNER_CONNECT_JS_URL } from "@/lib/easner-connect-js";

export type EasnerConnectScriptState = "loading" | "ready" | "error";

export function useEasnerConnectReady(): EasnerConnectScriptState {
  const [state, setState] = useState<EasnerConnectScriptState>("loading");

  useEffect(() => {
    const mark = () => {
      if (window.EasnerConnect) {
        setState("ready");
      }
    };

    const markError = () => {
      if (!window.EasnerConnect) {
        setState("error");
      }
    };

    const script = document.querySelector(
      `script[src="${EASNER_CONNECT_JS_URL}"]`,
    );

    const kick = window.setTimeout(mark, 0);
    script?.addEventListener("load", mark);
    script?.addEventListener("error", markError);

    const interval = window.setInterval(mark, 200);
    const giveUp = window.setTimeout(markError, 8000);

    return () => {
      window.clearTimeout(kick);
      window.clearTimeout(giveUp);
      window.clearInterval(interval);
      script?.removeEventListener("load", mark);
      script?.removeEventListener("error", markError);
    };
  }, []);

  return state;
}
