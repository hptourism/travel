"use client";

import { sendGTMEvent } from "@next/third-parties/google";

const gtmId = (process.env.NEXT_PUBLIC_GTM_ID ?? "").trim();

export const gtmEvents = {
  whatsappClick: "whatsapp_click",
  callClick: "call_click",
  formSubmit: "form_submit",
} as const;

type GtmEventName = (typeof gtmEvents)[keyof typeof gtmEvents];

export function trackGtmEvent(
  event: GtmEventName,
  params?: Record<string, string | number | boolean | undefined>,
) {
  if (!gtmId) return;

  sendGTMEvent({
    event,
    ...params,
  });
}
