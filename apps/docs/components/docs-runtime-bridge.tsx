"use client";

import "@cortexui/runtime";

import { useEffect } from "react";

declare global {
  interface Window {
    __CORTEX_UI__?: Window["CORTEX_UI"];
  }
}

export function DocsRuntimeBridge(): null {
  useEffect(() => {
    if (window.CORTEX_UI) {
      window.__CORTEX_UI__ = window.CORTEX_UI;
    }
  }, []);

  return null;
}
