import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnquiryTrigger } from "@/components/forms/EnquiryTrigger";
import { IconCheck } from "@/components/ui/Icons";
import { getPackage, packages } from "@/data/packages";
import { formatInr } from "@/lib/format";
import { buttonClass, container } from "@/lib/styles";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return packages.map((pkg) => ({ slug: pkg.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) return { title: "Package" };
  return {
    title: pkg.title,
    description: pkg.summary,
  };
}

export default async function PackageDetailPage({ params }: Props) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) notFound();

  return (
    <>
      <section className="bg-pine text-white">
        <div className={`${container} py-14 sm:py-20`}>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft">
            {pkg.tag} · {pkg.duration}
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl tracking-tight sm:text-5xl">
            {pkg.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">
            {pkg.summary}
          </p>
          <p className="mt-3 text-sm text-white/70">{pkg.destination}</p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className={`${container} grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]`}>
          <div className="order-2 space-y-10 lg:order-1">
            {pkg.days.length > 0 ? (
              <div>
                <h2 className="font-serif text-3xl text-pine">Day-wise itinerary</h2>
                <ol className="mt-6 space-y-6 border-l border-line pl-6">
                  {pkg.days.map((day) => (
                    <li key={day.day} className="relative">
                      <span className="absolute -left-[37px] grid h-7 w-7 place-items-center rounded-full bg-forest text-xs font-semibold text-white">
                        {day.day}
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">
                        Day {day.day}
                      </p>
                      <h3 className="mt-1 font-serif text-2xl text-pine">{day.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{day.description}</p>
                      <p className="mt-2 text-sm font-semibold text-ink">Overnight: {day.overnight}</p>
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
              <div className="rounded-3xl border border-line bg-mint p-6">
                <h2 className="font-serif text-2xl text-pine">Quoted to your dates</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Tell us your travel dates, group size and hotel preference. We will confirm the route, vehicle and price before you book. The Delhi–Shimla–Manali day plan is a useful look at the sightseeing usually covered.
                </p>
                <Link href="/packages/delhi-shimla-manali" className={buttonClass("primary", "mt-4")}>
                  View the Delhi itinerary
                </Link>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <article className="rounded-2xl border border-line bg-paper p-3 sm:rounded-3xl sm:p-5">
                <h2 className="font-serif text-lg text-pine sm:text-2xl">Included</h2>
                <ul className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
                  {pkg.inclusions.map((item) => (
                    <li key={item} className="flex gap-1.5 text-xs leading-relaxed text-ink sm:gap-2 sm:text-sm">
                      <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
              <article className="rounded-2xl border border-line bg-paper p-3 sm:rounded-3xl sm:p-5">
                <h2 className="font-serif text-lg text-pine sm:text-2xl">Not included</h2>
                <ul className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
                  {pkg.exclusions.map((item) => (
                    <li key={item} className="text-xs leading-relaxed text-muted sm:text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </div>

            <div className="rounded-3xl border border-gold/60 bg-[#fff8e8] p-5 text-sm leading-relaxed text-[#6d5420]">
              <h2 className="font-serif text-2xl text-pine">Travel notes</h2>
              <ul className="mt-3 space-y-2">
                {pkg.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="order-1 h-fit rounded-3xl border border-line bg-paper p-5 lg:sticky lg:top-28 lg:order-2">
            <h2 className="font-serif text-2xl text-pine">Starting prices</h2>
            {pkg.prices.length > 0 ? (
              <ul className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-3">
                {pkg.prices.map((tier) => (
                  <li key={`${tier.group}-${tier.vehicle}`} className="rounded-2xl bg-mint p-3 last:col-span-2 lg:last:col-span-1">
                    <p className="text-sm text-muted">
                      {tier.group} · {tier.vehicle}
                    </p>
                    <p className="font-semibold text-forest">{formatInr(tier.amount)}</p>
                    <p className="text-xs text-muted">{tier.route}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 font-semibold text-forest">Price on request</p>
            )}
            <p className="mt-4 text-xs leading-relaxed text-muted">{pkg.priceNote}</p>
            <div className="mt-5 grid gap-2">
              <EnquiryTrigger
                packageSlug={pkg.slug}
                source={`Package page · ${pkg.title}`}
                className={buttonClass("primary", "w-full")}
              >
                Enquire about this package
              </EnquiryTrigger>
              {pkg.pdf ? (
                <a href={pkg.pdf} target="_blank" rel="noopener noreferrer" className={buttonClass("light", "w-full")}>
                  Download itinerary PDF
                </a>
              ) : null}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
