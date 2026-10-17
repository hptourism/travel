"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { IconClose } from "@/components/ui/Icons";

type OpenOptions = {
  packageSlug?: string;
  source?: string;
};

type EnquiryModalContextValue = {
  openEnquiry: (options?: OpenOptions) => void;
  closeEnquiry: () => void;
};

const EnquiryModalContext = createContext<EnquiryModalContextValue | null>(null);

function lockBodyScroll() {
  const scrollbar = Math.max(0, window.innerWidth - document.documentElement.clientWidth);
  document.documentElement.style.setProperty("--scrollbar-compensation", `${scrollbar}px`);
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${scrollbar}px`;
}

function unlockBodyScroll() {
  document.documentElement.style.removeProperty("--scrollbar-compensation");
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
}

export function EnquiryModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [packageSlug, setPackageSlug] = useState<string | undefined>();
  const [source, setSource] = useState("Floating enquiry button");
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  const closeEnquiry = useCallback(() => setOpen(false), []);

  const openEnquiry = useCallback((options?: OpenOptions) => {
    setPackageSlug(options?.packageSlug);
    setSource(options?.source || "Floating enquiry button");
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    lockBodyScroll();
    closeRef.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeEnquiry();
    }

    window.addEventListener("keydown", onKey);
    return () => {
      unlockBodyScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeEnquiry]);

  const value = useMemo(
    () => ({ openEnquiry, closeEnquiry }),
    [openEnquiry, closeEnquiry],
  );

  return (
    <EnquiryModalContext.Provider value={value}>
      {children}
      {open ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
          <button
            type="button"
            aria-label="Close enquiry form"
            className="absolute inset-0 bg-pine-deep/55 backdrop-blur-[2px]"
            onClick={closeEnquiry}
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
                onClick={closeEnquiry}
                aria-label="Close"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-white text-pine transition hover:bg-mint"
              >
                <IconClose className="h-5 w-5" />
              </button>
            </div>
            <div className="overflow-y-auto px-5 py-4 sm:px-6 sm:py-5">
              <EnquiryForm
                key={`${packageSlug || "general"}-${source}`}
                surface="plain"
                variant="compact"
                defaultPackage={packageSlug}
                source={source}
                title="Send an enquiry"
                subtitle="Share your dates and group size. We will reply with availability and a quote."
              />
            </div>
          </div>
        </div>
      ) : null}
    </EnquiryModalContext.Provider>
  );
}

export function useEnquiryModal() {
  const context = useContext(EnquiryModalContext);
  if (!context) {
    throw new Error("useEnquiryModal must be used within EnquiryModalProvider");
  }
  return context;
}
