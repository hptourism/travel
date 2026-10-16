import type { Metadata } from "next";
import { IconCar, IconCheck, IconPin } from "@/components/ui/Icons";
import { PageHeader } from "@/components/ui/SectionHeading";
import { fleet, specialities } from "@/data/company";
import { site } from "@/lib/site";
import { container } from "@/lib/styles";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Himalayan Travels (North India) plans Shimla and Manali holidays from Delhi and Chandigarh with its own taxi fleet.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About the company"
        title="Travel planning for the mountains, with a base in Delhi."
        text="Himalayan Travels (North India) specialises in Himachal Pradesh holidays, especially Shimla–Manali tours and custom itineraries."
      />
      <section className="py-16 sm:py-20">
        <div className={`${container} grid gap-8 lg:grid-cols-[1.15fr_0.85fr]`}>
          <div>
            <h2 className="font-serif text-3xl text-pine">Himalayan Travels (North India)</h2>
            <p className="mt-4 leading-relaxed text-muted">
              We run Himachal Pradesh tour packages only. Most trips are built around Shimla and Manali, starting from Delhi or Chandigarh, for families, groups and custom mountain holidays.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              The company operates its own travel fleet, including Kia, Ertiga, Innova and Tempo Travellers, with experienced drivers for sightseeing and transfers.
            </p>
            <ul className="mt-6 space-y-3">
              {specialities.map((item) => (
                <li key={item} className="flex items-start gap-3 text-ink">
                  <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-forest" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <aside className="rounded-3xl border border-line bg-mint p-6">
            <h2 className="font-serif text-2xl text-pine">Our locations</h2>
            {site.fleetStand ? (
              <p className="mt-4 text-sm leading-relaxed text-muted">
                <span className="block font-semibold text-ink">Taxi fleet stand</span>
                {site.fleetStand}
              </p>
            ) : null}
            {site.officeAddress ? (
              <p className="mt-4 text-sm leading-relaxed text-muted">
                <span className="block font-semibold text-ink">Corporate office</span>
                {site.officeAddress}
              </p>
            ) : null}
            <p className="mt-4 text-sm leading-relaxed text-muted">
              <span className="block font-semibold text-ink">Specialisation</span>
              Himachal Pradesh tour packages only
            </p>
          </aside>
        </div>
      </section>
      <section className="bg-paper py-16 sm:py-20">
        <div className={container}>
          <div className="flex items-center gap-3">
            <IconCar className="h-6 w-6 text-forest" />
            <h2 className="font-serif text-3xl text-pine">The fleet</h2>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {fleet.map((item) => (
              <article key={item.name} className="rounded-2xl border border-line bg-cream p-3 sm:rounded-3xl sm:p-5">
                <h3 className="font-serif text-lg leading-tight text-pine sm:text-2xl">{item.name}</h3>
                <p className="mt-2 text-xs text-muted sm:text-sm">{item.detail}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 flex items-start gap-2 text-sm text-muted">
            <IconPin className="mt-0.5 h-5 w-5 shrink-0 text-forest" />
            <span>
              The taxi stand is at {site.fleetStand || "Pitampura, Delhi"} and the corporate office is at {site.officeShort || "NSP, Pitampura"}.
            </span>
          </p>
        </div>
      </section>
    </>
  );
}
