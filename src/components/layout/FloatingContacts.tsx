import { TrackLink } from "@/components/analytics/TrackLink";
import { FloatingEnquiry } from "@/components/layout/FloatingEnquiry";
import { IconPhone, IconWhatsApp } from "@/components/ui/Icons";
import { phoneLink, whatsappLink } from "@/lib/site";

const iconButton =
  "inline-flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_10px_28px_rgba(8,61,41,0.32)] transition hover:-translate-y-0.5";

export function FloatingContacts() {
  const whatsapp = whatsappLink(
    "Hello, I would like to plan a Himachal Pradesh trip.",
  );
  const phone = phoneLink();

  return (
    <div className="fixed bottom-5 right-[calc(1rem+var(--scrollbar-compensation,0px))] z-30 flex flex-col items-end gap-3 sm:right-[calc(1.5rem+var(--scrollbar-compensation,0px))]">
      <FloatingEnquiry />
      {phone ? (
        <TrackLink
          href={phone}
          aria-label="Call us"
          className={`${iconButton} bg-forest hover:bg-pine`}
          trackEvent="call_click"
          trackLocation="floating"
        >
          <IconPhone className="h-6 w-6" strokeWidth={2} />
        </TrackLink>
      ) : null}
      {whatsapp ? (
        <TrackLink
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className={`${iconButton} bg-[#25D366] hover:bg-[#1ebe5d]`}
          trackEvent="whatsapp_click"
          trackLocation="floating"
        >
          <IconWhatsApp className="h-7 w-7" />
        </TrackLink>
      ) : null}
    </div>
  );
}
