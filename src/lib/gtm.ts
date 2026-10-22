"use client";

const gtmId = (process.env.NEXT_PUBLIC_GTM_ID ?? "").trim();

export const gtmEvents = {
  whatsappClick: "whatsapp_click",
  callClick: "call_click",
  formSubmit: "Successful",
} as const;

type GtmEventName = (typeof gtmEvents)[keyof typeof gtmEvents];

type GtmParamValue =
  | string
  | number
  | boolean
  | undefined
  | { [key: string]: GtmParamValue };

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackGtmEvent(
  event: GtmEventName,
  params?: Record<string, GtmParamValue>,
) {
  if (typeof window === "undefined" || !gtmId) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...params,
  });
}
