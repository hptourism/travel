"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { EnquiryModalProvider } from "@/components/forms/EnquiryModal";

type SiteFrameProps = {
  header: ReactNode;
  footer: ReactNode;
  floating: ReactNode;
  children: ReactNode;
};

export function SiteFrame({ header, footer, floating, children }: SiteFrameProps) {
  const pathname = usePathname();
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");

  if (isAdmin) {
    return (
      <main id="main" className="flex-1">
        {children}
      </main>
    );
  }

  return (
    <EnquiryModalProvider>
      {header}
      <main id="main" className="flex-1">
        {children}
      </main>
      {footer}
      {floating}
    </EnquiryModalProvider>
  );
}
