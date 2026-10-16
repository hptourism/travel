import Link from "next/link";
import { buttonClass, container } from "@/lib/styles";

export default function NotFound() {
  return (
    <section className="py-24">
      <div className={container}>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-forest">404</p>
        <h1 className="mt-3 font-serif text-4xl text-pine">This page is not on the route.</h1>
        <p className="mt-3 max-w-lg text-muted">
          The package or page you opened is not available. Head back to the tour packages.
        </p>
        <Link href="/packages" className={buttonClass("primary", "mt-6")}>
          View tour packages
        </Link>
      </div>
    </section>
  );
}
