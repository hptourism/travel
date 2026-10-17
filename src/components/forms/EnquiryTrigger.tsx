"use client";

import type { ReactNode } from "react";
import { useEnquiryModal } from "@/components/forms/EnquiryModal";
import { buttonClass } from "@/lib/styles";

type EnquiryTriggerProps = {
  packageSlug?: string;
  source: string;
  className?: string;
  children: ReactNode;
};

export function EnquiryTrigger({
  packageSlug,
  source,
  className,
  children,
}: EnquiryTriggerProps) {
  const { openEnquiry } = useEnquiryModal();

  return (
    <button
      type="button"
      className={className}
      onClick={() => openEnquiry({ packageSlug, source })}
    >
      {children}
    </button>
  );
}

export function EnquireNowButton({
  packageSlug,
  packageTitle,
  className = "",
}: {
  packageSlug: string;
  packageTitle: string;
  className?: string;
}) {
  return (
    <EnquiryTrigger
      packageSlug={packageSlug}
      source={`Package card · ${packageTitle}`}
      className={buttonClass(
        "primary",
        `w-full !px-2 !py-2 !text-[11px] sm:!px-4 sm:!py-3 sm:!text-sm ${className}`,
      )}
    >
      <span className="sm:hidden">Enquire</span>
      <span className="hidden sm:inline">Enquire now</span>
    </EnquiryTrigger>
  );
}
