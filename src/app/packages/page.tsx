import type { Metadata } from "next";
import { PackageCard } from "@/components/packages/PackageCard";
import { PageHeader } from "@/components/ui/SectionHeading";
import { packages } from "@/data/packages";
import { container } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Tour Packages",
  description:
    "Shimla and Manali tour packages from Delhi and Chandigarh, including the 6 day Delhi–Shimla–Manali itinerary.",
};

export default function PackagesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Himachal Pradesh only"
        title="Tour packages"
        text="A confirmed Delhi–Shimla–Manali road trip, plus a Chandigarh departure that we quote once you share dates and group size."
      />
      <section className="py-16 sm:py-20">
        <div className={`${container} grid grid-cols-2 gap-3 sm:gap-5`}>
          {packages.map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </div>
      </section>
    </>
  );
}
