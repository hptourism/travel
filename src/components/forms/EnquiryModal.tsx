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
import { site } from "@/lib/site";

type OpenOptions = {
  packageSlug?: string;
  source?: string;
};

type EnquiryModalContextValue = {
  openEnquiry: (options?: OpenOptions) => void;
  closeEnquiry: () => void;
};

const EnquiryModalContext = createContext<EnquiryModalContextValue | null>(null);

const AUTO_POPUP_SESSION_KEY = "enquiry-auto-popup-shown";
const EXIT_MS = 320;

function lockBodyScroll() {
  // Measure before overflow:hidden so the gap matches the disappearing scrollbar.
  const scrollbar = Math.max(0, window.innerWidth - document.documentElement.clientWidth);
  document.documentElement.style.setProperty("--scrollbar-compensation", `${scrollbar}px`);
  document.documentElement.classList.add("enquiry-scroll-lock");
}

function unlockBodyScroll() {
  document.documentElement.classList.remove("enquiry-scroll-lock");
  document.documentElement.style.setProperty("--scrollbar-compensation", "0px");
}

export function EnquiryModalProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);
  const [packageSlug, setPackageSlug] = useState<string | undefined>();
  const [source, setSource] = useState("Floating enquiry button");
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openRef = useRef(false);
  const openEnquiryRef = useRef<(options?: OpenOptions) => void>(() => {});

  const clearExitTimer = useCallback(() => {
    if (exitTimerRef.current) {
      clearTimeout(exitTimerRef.current);
      exitTimerRef.current = null;
    }
  }, []);

  const closeEnquiry = useCallback(() => {
    setEntered(false);
    clearExitTimer();
    exitTimerRef.current = setTimeout(() => {
      setMounted(false);
      openRef.current = false;
      unlockBodyScroll();
      exitTimerRef.current = null;
    }, EXIT_MS);
  }, [clearExitTimer]);

  const openEnquiry = useCallback(
    (options?: OpenOptions) => {
      clearExitTimer();
      setPackageSlug(options?.packageSlug);
      setSource(options?.source || "Floating enquiry button");
      // Lock synchronously before paint so the page does not jump when the modal mounts.
      lockBodyScroll();
      setMounted(true);
      openRef.current = true;
      // Double rAF so the browser paints the closed state before entering.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setEntered(true));
      });
    },
    [clearExitTimer],
  );

  openEnquiryRef.current = openEnquiry;

  useEffect(() => {
    return () => {
      clearExitTimer();
      unlockBodyScroll();
    };
  }, [clearExitTimer]);

  useEffect(() => {
    if (!mounted) return;

    if (entered) closeRef.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeEnquiry();
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mounted, entered, closeEnquiry]);

  useEffect(() => {
    if (!site.enquiryAutoPopup) return;

    try {
      if (sessionStorage.getItem(AUTO_POPUP_SESSION_KEY) === "1") return;
    } catch {
      // sessionStorage may be blocked; still allow auto popup once this page load.
    }

    const delayMs = Math.round(site.enquiryAutoPopupSeconds * 1000);
    const timer = window.setTimeout(() => {
      if (openRef.current) return;
      try {
        sessionStorage.setItem(AUTO_POPUP_SESSION_KEY, "1");
      } catch {
        // ignore
      }
      openEnquiryRef.current({ source: "Auto popup" });
    }, delayMs);

    return () => window.clearTimeout(timer);
    // Run once on mount so the delay is not reset by callback identity changes.
  }, []);

  const value = useMemo(
    () => ({ openEnquiry, closeEnquiry }),
    [openEnquiry, closeEnquiry],
  );

  return (
    <EnquiryModalContext.Provider value={value}>
      {children}
      {mounted ? (
        <div
          className={`enquiry-modal fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4 ${
            entered ? "enquiry-modal--open" : ""
          }`}
        >
          <button
            type="button"
            aria-label="Close enquiry form"
            className="enquiry-modal__backdrop absolute inset-0 bg-pine-deep/55 backdrop-blur-[2px]"
            onClick={closeEnquiry}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="enquiry-modal__panel relative z-10 flex max-h-[min(92vh,720px)] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl border border-line bg-paper shadow-[0_24px_80px_rgba(0,20,12,0.35)] sm:rounded-3xl"
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
