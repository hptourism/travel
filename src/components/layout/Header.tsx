"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IconMountain } from "@/components/ui/Icons";
import { site } from "@/lib/site";
import { buttonClass, container } from "@/lib/styles";

const links = [
  { href: "/", label: "Home" },
  { href: "/packages", label: "Tour Packages" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-40 pr-[var(--scrollbar-compensation,0px)]">
      <div className="bg-pine text-[12px] text-white/80">
        <div
          className={`${container} flex flex-col gap-1 py-2 sm:flex-row sm:items-center sm:justify-between`}
        >
          {site.fleetStand ? <p>Taxi fleet stand: {site.fleetStand}</p> : null}
          {site.officeShort ? <p>Corporate office: {site.officeShort}</p> : null}
        </div>
      </div>
      <header className="border-b border-line bg-paper/90 backdrop-blur-md">
        <div className={`${container} flex h-16 items-center justify-between gap-3 sm:h-[4.5rem]`}>
          <Link href="/" className="flex min-w-0 items-center gap-2.5" onClick={() => setOpen(false)}>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-forest text-white">
              <IconMountain className="h-5 w-5" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate font-serif text-lg text-pine">
                {site.shortName || "HP Tourism"}
              </span>
              <span className="hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-muted sm:block">
                {site.name || "Himalayan Travels"}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-semibold text-ink lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive(pathname, link.href)
                    ? "text-forest"
                    : "hover:text-forest"
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/packages" className={buttonClass("primary", "hidden lg:inline-flex")}>
              View packages
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-pine lg:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="text-lg leading-none">{open ? "×" : "☰"}</span>
            </button>
          </div>
        </div>

        {open ? (
          <nav className={`${container} flex flex-col gap-1 pb-4 lg:hidden`}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-3 py-3 text-sm font-semibold ${
                  isActive(pathname, link.href)
                    ? "bg-mint text-forest"
                    : "text-ink hover:bg-mint"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </header>
    </div>
  );
}
