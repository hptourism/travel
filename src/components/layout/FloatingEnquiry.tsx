"use client";

import { usePathname } from "next/navigation";
import { useEnquiryModal } from "@/components/forms/EnquiryModal";
import { IconMessage } from "@/components/ui/Icons";
import { packages } from "@/data/packages";

export function FloatingEnquiry() {
  const { openEnquiry } = useEnquiryModal();
  const pathname = usePathname();
  const packageSlug = packages.find((item) => pathname === `/packages/${item.slug}`)?.slug;

  return (
    <button
      type="button"
      onClick={() =>
        openEnquiry({
          packageSlug,
          source: "Floating enquiry button",
        })
      }
      aria-haspopup="dialog"
      className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-3.5 text-sm font-semibold text-ink shadow-[0_10px_28px_rgba(8,61,41,0.28)] transition hover:-translate-y-0.5 hover:bg-gold-deep"
    >
      <IconMessage className="h-5 w-5" strokeWidth={2} />
      <span>Enquiry</span>
    </button>
  );
}
