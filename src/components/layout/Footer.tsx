import Link from "next/link";
import { Suspense } from "react";
import { CurrentYear } from "@/components/layout/CurrentYear";
import { site } from "@/lib/site";
import { container } from "@/lib/styles";

export function Footer() {
  return (
    <footer className="bg-pine-deep text-white/70">
      <div className={`${container} py-10 pb-20`}>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md">
            <p className="font-semibold text-white">
              {site.shortName || "HP Tourism"} | {site.name || "Himalayan Travels"}
            </p>
            <p className="mt-2 text-sm leading-relaxed">
              Himachal Pradesh tour packages, with Shimla and Manali holidays from
              Delhi and Chandigarh.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <Link href="/packages" className="hover:text-white">
              Tour Packages
            </Link>
            <Link href="/about" className="hover:text-white">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact Us
            </Link>
          </nav>
        </div>
        <p className="mt-8 border-t border-white/15 pt-4 text-xs">
          ©{" "}
          <Suspense fallback={<span>2026</span>}>
            <CurrentYear />
          </Suspense>{" "}
          {site.name || "Himalayan Travels (North India)"}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
