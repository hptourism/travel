import { IconWhatsApp } from "@/components/ui/Icons";
import { whatsappLink } from "@/lib/site";

export function WhatsAppButton() {
  const href = whatsappLink(
    "Hello, I would like to plan a Himachal Pradesh trip.",
  );
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 right-4 z-30 inline-flex items-center gap-2 rounded-full bg-[#1f8f4e] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(8,61,41,0.28)] hover:bg-[#187743]"
    >
      <IconWhatsApp className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
