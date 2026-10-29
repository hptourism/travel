import Image from "next/image";
import Link from "next/link";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PackageCard } from "@/components/packages/PackageCard";
import { IconCheck } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fleet, highlights } from "@/data/company";
import { getPackage, packages } from "@/data/packages";
import { buttonClass, container } from "@/lib/styles";

const heroImage =
  "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=2200&q=80";

export default function HomePage() {
  const featured = getPackage("delhi-shimla-manali");

  return (
    <>
      <section className="relative overflow-hidden text-white">
        <Image
          src={heroImage}
          alt="Snowy Himalayan ridges above a mountain road"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-pine/95 via-pine/80 to-forest/45" />
        <div className={`${container} relative grid items-center gap-10 py-14 lg:grid-cols-[1.08fr_0.92fr] lg:py-20`}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft">
              Himalayan Travels · North India
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-[1.05] tracking-tight sm:text-6xl">
              Explore the beauty of{" "}
              <span className="text-gold-soft">Himachal Pradesh.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              We plan Himachal holidays only, with a focus on Shimla and Manali
              tours from Delhi and Chandigarh. Family trips, groups and custom
              mountain routes, arranged with our own cars and drivers.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/packages" className={buttonClass("gold")}>
                Explore tour packages
              </Link>
              <Link href="/contact" className={buttonClass("outline")}>
                Contact us
              </Link>
            </div>
            <ol className="mt-8 flex flex-wrap items-center gap-2 text-sm text-white/85">
              {["Delhi", "Shimla", "Manali", "Delhi"].map((stop, index) => (
                <li key={`${stop}-${index}`} className="flex items-center gap-2">
                  <span className="rounded-full bg-white/10 px-3 py-1">{stop}</span>
                  {index < 3 ? <span className="text-gold-soft">→</span> : null}
                </li>
              ))}
            </ol>
          </div>
          <EnquiryForm
            variant="compact"
            source="Home page hero form"
            cancelAutoPopupOnInteract
            title="Plan your Himachal trip"
            subtitle="Send your requirement and our team will prepare the right package."
          />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className={`${container} grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4`}>
          {highlights.map((item) => (
            <article key={item.title} className="rounded-2xl border border-line bg-mint p-3 last:col-span-2 sm:rounded-3xl sm:p-6 md:last:col-span-1">
              <h2 className="font-serif text-lg leading-tight text-pine sm:text-2xl">{item.title}</h2>
              <p className="mt-1.5 text-xs leading-relaxed text-muted sm:mt-2 sm:text-sm">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-mint py-16 sm:py-20">
        <div className={container}>
          <SectionHeading
            eyebrow="Himachal Pradesh only"
            title="Tour packages"
            text="Private road trips for Shimla and Manali, with a full Delhi itinerary and a Chandigarh departure on request."
          />
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5">
            {packages.map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {featured ? (
        <section className="py-16 sm:py-20">
          <div className={container}>
            <SectionHeading
              eyebrow={featured.tag}
              title={featured.title}
              text={`${featured.duration}. Hotels on double sharing, breakfast and dinner, and a private vehicle for the full loop.`}
            />
            <ol className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
              {featured.days.map((day) => (
                <li key={day.day} className="rounded-2xl border border-line bg-paper p-3 sm:rounded-3xl sm:p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-forest sm:text-xs sm:tracking-[0.16em]">
                    Day {day.day}
                  </p>
                  <h3 className="mt-1.5 font-serif text-base leading-tight text-pine sm:mt-2 sm:text-xl">{day.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted sm:mt-2 sm:text-sm">{day.description}</p>
                  <p className="mt-2 text-xs font-semibold text-ink sm:mt-3 sm:text-sm">Overnight: {day.overnight}</p>
                </li>
              ))}
            </ol>
            <Link href={`/packages/${featured.slug}`} className={buttonClass("primary", "mt-8")}>
              Open full itinerary
            </Link>
          </div>
        </section>
      ) : null}

      <section className="border-y border-line bg-paper py-16 sm:py-20">
        <div className={container}>
          <SectionHeading
            eyebrow="Own fleet"
            title="Cars for the hills"
            text="Kia, Ertiga, Innova and Tempo Travellers, with experienced drivers for transfers and sightseeing."
          />
          <ul className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {fleet.map((item) => (
              <li key={item.name} className="rounded-2xl border border-line bg-cream p-3 sm:rounded-3xl sm:p-5">
                <IconCheck className="h-5 w-5 text-forest" />
                <h3 className="mt-2 font-serif text-lg leading-tight text-pine sm:mt-3 sm:text-2xl">{item.name}</h3>
                <p className="mt-1 text-xs text-muted sm:text-sm">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className={`${container} flex flex-col items-start justify-between gap-6 rounded-3xl bg-pine px-6 py-8 text-white sm:px-10 sm:py-10 md:flex-row md:items-center`}>
          <div>
            <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">Ready for Himachal?</h2>
            <p className="mt-2 max-w-xl text-white/75">
              Browse the Shimla–Manali plan or send your dates. We reply with availability and a confirmed quote.
            </p>
          </div>
          <Link href="/contact" className={buttonClass("gold", "w-full sm:w-auto")}>
            Contact us
          </Link>
        </div>
      </section>
    </>
  );
}
