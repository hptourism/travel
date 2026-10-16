import type { Metadata } from "next";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { IconMail, IconPhone, IconPin, IconWhatsApp } from "@/components/ui/Icons";
import { PageHeader } from "@/components/ui/SectionHeading";
import {
  formatContactNumber,
  phoneLink,
  site,
  whatsappLink,
} from "@/lib/site";
import { buttonClass, container } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Himalayan Travels for Shimla, Manali and custom Himachal Pradesh tour packages.",
};

export default function ContactPage() {
  const whatsapp = whatsappLink("Hello, I would like to enquire about a Himachal tour.");
  const phone = phoneLink();

  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Contact us"
        text="For Himachal package enquiries, Shimla–Manali tours and custom travel plans."
      />
      <section className="py-16 sm:py-20">
        <div className={`${container} grid gap-8 lg:grid-cols-[0.9fr_1.1fr]`}>
          <div className="space-y-4">
            <article className="rounded-3xl border border-line bg-paper p-6">
              <h2 className="font-serif text-2xl text-pine">
                {site.name || "Himalayan Travels (North India)"}
              </h2>
              <ul className="mt-4 space-y-4 text-sm leading-relaxed">
                {site.email ? (
                  <li className="flex gap-3">
                    <IconMail className="mt-0.5 h-5 w-5 shrink-0 text-forest" />
                    <span>
                      <span className="block font-semibold text-ink">Email</span>
                      <a className="text-forest underline" href={`mailto:${site.email}`}>
                        {site.email}
                      </a>
                    </span>
                  </li>
                ) : null}
                {phone && site.phone ? (
                  <li className="flex gap-3">
                    <IconPhone className="mt-0.5 h-5 w-5 shrink-0 text-forest" />
                    <span>
                      <span className="block font-semibold text-ink">Phone</span>
                      <a className="text-forest underline" href={phone}>
                        {formatContactNumber(site.phone)}
                      </a>
                    </span>
                  </li>
                ) : null}
                {whatsapp && site.whatsapp ? (
                  <li className="flex gap-3">
                    <IconWhatsApp className="mt-0.5 h-5 w-5 shrink-0 text-forest" />
                    <span>
                      <span className="block font-semibold text-ink">WhatsApp</span>
                      <a className="text-forest underline" href={whatsapp} target="_blank" rel="noopener noreferrer">
                        {formatContactNumber(site.whatsapp)}
                      </a>
                    </span>
                  </li>
                ) : null}
                {site.officeAddress ? (
                  <li className="flex gap-3">
                    <IconPin className="mt-0.5 h-5 w-5 shrink-0 text-forest" />
                    <span>
                      <span className="block font-semibold text-ink">Corporate office</span>
                      {site.officeAddress}
                    </span>
                  </li>
                ) : null}
                {site.fleetStand ? (
                  <li className="flex gap-3">
                    <IconPin className="mt-0.5 h-5 w-5 shrink-0 text-forest" />
                    <span>
                      <span className="block font-semibold text-ink">Taxi fleet stand</span>
                      {site.fleetStand}
                    </span>
                  </li>
                ) : null}
              </ul>
            </article>
            <article className="rounded-3xl bg-pine p-6 text-white">
              <h2 className="font-serif text-2xl">Visit / get directions</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                The corporate office is at NSP and the taxi fleet is based at PU Block, Pitampura.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                {site.officeMapsUrl ? (
                  <a
                    className={buttonClass("gold", "w-full")}
                    href={site.officeMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open NSP office map
                  </a>
                ) : null}
                {site.fleetMapsUrl ? (
                  <a
                    className={buttonClass("light", "w-full")}
                    href={site.fleetMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open fleet stand map
                  </a>
                ) : null}
              </div>
            </article>
          </div>
          <EnquiryForm
            variant="full"
            title="Send an enquiry"
            subtitle="Share your dates and group size. We will reply with availability and a quote."
          />
        </div>
      </section>
    </>
  );
}
