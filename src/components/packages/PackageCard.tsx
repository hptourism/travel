import Image from "next/image";
import Link from "next/link";
import type { TourPackage } from "@/data/packages";
import { formatInr } from "@/lib/format";
import { buttonClass } from "@/lib/styles";

export function PackageCard({ pkg }: { pkg: TourPackage }) {
  const from = pkg.prices[0];

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_16px_40px_rgba(8,61,41,0.06)] sm:rounded-3xl">
      <div className="relative h-28 sm:h-52">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 50vw, 50vw"
        />
        <span className="absolute left-2 top-2 rounded-full bg-paper px-2 py-0.5 text-[10px] font-semibold text-pine sm:left-4 sm:top-4 sm:px-3 sm:py-1 sm:text-xs">
          {pkg.tag}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <h3 className="font-serif text-base leading-tight text-pine sm:text-2xl">{pkg.title}</h3>
        <p className="mt-1.5 line-clamp-3 flex-1 text-xs leading-relaxed text-muted sm:mt-2 sm:line-clamp-none sm:text-sm">
          {pkg.summary}
        </p>
        <div className="mt-3 flex flex-col gap-1 border-t border-line pt-3 text-xs sm:mt-4 sm:flex-row sm:items-end sm:justify-between sm:gap-3 sm:pt-4 sm:text-sm">
          <div>
            <p className="text-muted">{pkg.duration}</p>
            <p className="text-muted">{pkg.destination}</p>
          </div>
          <p className="font-semibold text-forest sm:text-right">
            {from ? (
              <>
                <span className="block text-[10px] font-normal text-muted sm:text-xs">From, {from.group}</span>
                {formatInr(from.amount)}
              </>
            ) : (
              "Price on request"
            )}
          </p>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-1.5 sm:mt-4 sm:gap-2">
          <Link
            href={`/packages/${pkg.slug}`}
            className={buttonClass("light", "w-full !px-2 !py-2 !text-[11px] sm:!px-4 sm:!py-3 sm:!text-sm")}
          >
            <span className="sm:hidden">Itinerary</span>
            <span className="hidden sm:inline">View itinerary</span>
          </Link>
          <Link
            href={`/contact?package=${pkg.slug}`}
            className={buttonClass("primary", "w-full !px-2 !py-2 !text-[11px] sm:!px-4 sm:!py-3 sm:!text-sm")}
          >
            <span className="sm:hidden">Enquire</span>
            <span className="hidden sm:inline">Enquire now</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
