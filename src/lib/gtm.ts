"use client";

import { sendGTMEvent } from "@next/third-parties/google";

const gtmId = (process.env.NEXT_PUBLIC_GTM_ID ?? "").trim();

export const gtmEvents = {
  whatsappClick: "whatsapp_click",
  callClick: "call_click",
  formSubmit: "form_submit",
} as const;

type GtmEventName = (typeof gtmEvents)[keyof typeof gtmEvents];

type GtmParamValue =
  | string
  | number
  | boolean
  | undefined
  | { [key: string]: GtmParamValue };

export function trackGtmEvent(
  event: GtmEventName,
  params?: Record<string, GtmParamValue>,
) {
  if (!gtmId) return;

  sendGTMEvent({
    event,
    ...params,
  });
}
