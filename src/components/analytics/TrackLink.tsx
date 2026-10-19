"use client";

import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import { gtmEvents, trackGtmEvent } from "@/lib/gtm";

type TrackEvent = "whatsapp_click" | "call_click";

type TrackLinkProps = ComponentPropsWithoutRef<"a"> & {
  trackEvent: TrackEvent;
  trackLocation?: string;
};

export function TrackLink({
  trackEvent,
  trackLocation,
  onClick,
  ...props
}: TrackLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    trackGtmEvent(
      trackEvent === "whatsapp_click"
        ? gtmEvents.whatsappClick
        : gtmEvents.callClick,
      trackLocation ? { location: trackLocation } : undefined,
    );
    onClick?.(event);
  }

  return <a {...props} onClick={handleClick} />;
}
