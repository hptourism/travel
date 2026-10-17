"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { IconClose, IconMessage } from "@/components/ui/Icons";
import { packages } from "@/data/packages";

export function FloatingEnquiry() {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const packageSlug = packages.find((item) => pathname === `/packages/${item.slug}`)?.slug;

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-3.5 text-sm font-semibold text-ink shadow-[0_10px_28px_rgba(8,61,41,0.28)] transition hover:-translate-y-0.5 hover:bg-gold-deep"
      >
        <IconMessage className="h-5 w-5" strokeWidth={2} />
        <span>Enquiry</span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
          <button
            type="button"
            aria-label="Close enquiry form"
            className="absolute inset-0 bg-pine-deep/55 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 flex max-h-[min(92vh,720px)] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl border border-line bg-paper shadow-[0_24px_80px_rgba(0,20,12,0.35)] sm:rounded-3xl"
          >
            <div className="flex items-start justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-forest">
                  Quick enquiry
                </p>
                <h2 id={titleId} className="mt-1 font-serif text-2xl text-pine">
                  Tell us about your trip
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-white text-pine transition hover:bg-mint"
              >
                <IconClose className="h-5 w-5" />
              </button>
            </div>
            <div className="overflow-y-auto px-5 py-4 sm:px-6 sm:py-5">
              <EnquiryForm
                key={packageSlug || "general"}
                surface="plain"
                variant="compact"
                defaultPackage={packageSlug}
                title="Send an enquiry"
                subtitle="Share your dates and group size. We will reply with availability and a quote."
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
