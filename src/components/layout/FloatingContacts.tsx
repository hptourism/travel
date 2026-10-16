import { IconPhone, IconWhatsApp } from "@/components/ui/Icons";
import { phoneLink, whatsappLink } from "@/lib/site";

const iconButton =
  "inline-flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_10px_28px_rgba(8,61,41,0.32)] transition hover:-translate-y-0.5";

export function FloatingContacts() {
  const whatsapp = whatsappLink(
    "Hello, I would like to plan a Himachal Pradesh trip.",
  );
  const phone = phoneLink();

  if (!whatsapp && !phone) return null;

  return (
    <div className="fixed bottom-5 right-4 z-30 flex flex-col gap-3 sm:right-6">
      {phone ? (
        <a href={phone} aria-label="Call us" className={`${iconButton} bg-forest hover:bg-pine`}>
          <IconPhone className="h-6 w-6" strokeWidth={2} />
        </a>
      ) : null}
      {whatsapp ? (
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className={`${iconButton} bg-[#25D366] hover:bg-[#1ebe5d]`}
        >
          <IconWhatsApp className="h-7 w-7" />
        </a>
      ) : null}
    </div>
  );
}
