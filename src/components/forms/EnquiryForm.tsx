"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { TrackLink } from "@/components/analytics/TrackLink";
import { packageOptions } from "@/data/packages";
import { suppressEnquiryAutoPopup } from "@/lib/enquiry-auto-popup";
import { gtmEvents, trackGtmEvent } from "@/lib/gtm";
import { site, whatsappLink } from "@/lib/site";
import { buttonClass } from "@/lib/styles";

type Variant = "compact" | "full";
type Surface = "card" | "plain";

type EnquiryFormProps = {
  title: string;
  subtitle: string;
  variant?: Variant;
  surface?: Surface;
  defaultPackage?: string;
  source?: string;
  /** When true, interacting with this form cancels the delayed enquiry popup. */
  cancelAutoPopupOnInteract?: boolean;
};

const fieldClass =
  "w-full min-w-0 rounded-xl border border-line bg-white px-2.5 py-2.5 text-base text-ink outline-none ring-forest/30 placeholder:text-muted/70 focus:ring-2 sm:px-3.5 sm:py-3";
const labelClass =
  "mb-1 block text-[10px] font-semibold uppercase tracking-wide text-muted sm:mb-1.5 sm:text-xs";

function EnquiryFormFields({
  title,
  subtitle,
  variant = "full",
  surface = "card",
  defaultPackage,
  source,
  cancelAutoPopupOnInteract = false,
}: EnquiryFormProps) {
  const pathname = usePathname();
  const params = useSearchParams();
  const preset = defaultPackage || params.get("package") || "";
  const presetTitle =
    packageOptions.find((item) => item.slug === preset || item.title === preset)
      ?.title ?? "";
  const [packageName, setPackageName] = useState(presetTitle);
  const [seenPreset, setSeenPreset] = useState(presetTitle);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function onHeroEngage() {
    if (cancelAutoPopupOnInteract) suppressEnquiryAutoPopup();
  }

  if (presetTitle !== seenPreset) {
    setSeenPreset(presetTitle);
    setPackageName(presetTitle);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          startingFrom: data.get("startingFrom"),
          packageName: data.get("packageName"),
          travellers: data.get("travellers"),
          dates: data.get("dates"),
          details: data.get("details"),
          company: data.get("company"),
          page: `${window.location.pathname}${window.location.search}`,
          source: source || `Enquiry form · ${pathname}`,
        }),
      });
      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!response.ok || !payload?.ok) {
        setStatus("error");
        setError(payload?.error || "Something went wrong. Please try again.");
        return;
      }

      const field = (key: string) => {
        const value = data.get(key);
        return typeof value === "string" ? value.trim() : "";
      };

      const fullName = field("name");
      const [firstName = "", ...restName] = fullName.split(/\s+/);
      const lastName = restName.join(" ");

      form.reset();
      setPackageName("");
      setStatus("success");
      trackGtmEvent(gtmEvents.formSubmit, {
        location: source || `Enquiry form · ${pathname}`,
        user_data: {
          phone_number: field("phone"),
          address: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  const whatsapp = whatsappLink("Hello, I would like to enquire about a Himachal tour.");

  const shell =
    surface === "plain"
      ? "relative text-ink"
      : "relative rounded-3xl border border-white/60 bg-paper p-5 text-ink shadow-[0_20px_60px_rgba(0,20,12,0.18)] sm:p-6";

  return (
    <div
      className={shell}
      onPointerDownCapture={cancelAutoPopupOnInteract ? onHeroEngage : undefined}
      onFocusCapture={cancelAutoPopupOnInteract ? onHeroEngage : undefined}
    >
      {surface === "card" ? (
        <>
          <h2 className="font-serif text-2xl text-pine">{title}</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted">{subtitle}</p>
        </>
      ) : (
        <p className="text-sm leading-relaxed text-muted">{subtitle}</p>
      )}

      {status === "success" ? (
        <div
          id="enquiry-form-success"
          className={`${surface === "plain" ? "mt-4" : "mt-5"} rounded-2xl bg-mint p-4`}
          role="status"
          data-gtm-success="true"
        >
          <p id="enquiry-success-text" className="font-semibold text-pine">
            Successful
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Our team has the details and will get back to you.
          </p>
          <button
            type="button"
            className={buttonClass("primary", "mt-4")}
            onClick={() => {
              setPackageName(presetTitle);
              setStatus("idle");
            }}
          >
            Send another enquiry
          </button>
        </div>
      ) : (
        <form className={surface === "plain" ? "mt-4" : "mt-5"} onSubmit={onSubmit}>
          <div className="pointer-events-none absolute h-0 w-0 overflow-hidden" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input id="company" name="company" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            <label className="block min-w-0 text-sm">
              <span className={labelClass}>Your name</span>
              <input name="name" required autoComplete="name" placeholder="Your name" className={fieldClass} />
            </label>
            <label className="block min-w-0 text-sm">
              <span className={labelClass}>Phone</span>
              <input name="phone" required inputMode="tel" autoComplete="tel" placeholder="Mobile number" className={fieldClass} />
            </label>
            {variant === "full" ? (
              <label className="block min-w-0 text-sm sm:col-span-2">
                <span className={labelClass}>Email</span>
                <input name="email" type="email" autoComplete="email" placeholder="Optional" className={fieldClass} />
              </label>
            ) : null}
            <label className="block min-w-0 text-sm">
              <span className={labelClass}>Starting from</span>
              <select name="startingFrom" required defaultValue="Delhi" className={fieldClass}>
                <option>Delhi</option>
                <option>Chandigarh</option>
                <option>Other</option>
              </select>
            </label>
            <label className={`block min-w-0 text-sm ${variant === "full" ? "max-sm:col-span-2" : ""}`}>
              <span className={labelClass}>Package</span>
              <select
                name="packageName"
                required
                value={packageName}
                onChange={(event) => setPackageName(event.target.value)}
                className={fieldClass}
              >
                <option value="" disabled>
                  Select a package
                </option>
                {packageOptions.map((item) => (
                  <option key={item.slug} value={item.title}>
                    {item.title}
                  </option>
                ))}
                <option value="Custom Himachal itinerary">Custom Himachal itinerary</option>
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </label>
            {variant === "full" ? (
              <>
                <label className="block min-w-0 text-sm">
                  <span className={labelClass}>Travellers</span>
                  <input name="travellers" placeholder="2 adults, 1 child" className={fieldClass} />
                </label>
                <label className="block min-w-0 text-sm">
                  <span className={labelClass}>Preferred dates</span>
                  <input name="dates" placeholder="12–17 May" className={fieldClass} />
                </label>
              </>
            ) : null}
            <label className="col-span-2 block text-sm">
              <span className={labelClass}>Trip details</span>
              <textarea
                name="details"
                required
                minLength={5}
                maxLength={800}
                placeholder="Hotel preference, nights, and anything we should know."
                className={`${fieldClass} min-h-28 resize-y`}
              />
            </label>
          </div>

          {error ? (
            <p className="mt-3 text-sm text-red-700" role="alert">
              {error}
              {site.email ? (
                <>
                  {" "}
                  You can also email{" "}
                  <a className="font-semibold underline" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                  .
                </>
              ) : null}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={status === "sending"}
            className={buttonClass("primary", "mt-4 w-full")}
          >
            {status === "sending" ? "Sending..." : "Send enquiry"}
          </button>
          <p className="mt-3 text-xs leading-relaxed text-muted">
            Your details are used only to reply to this enquiry.
            {whatsapp ? (
              <>
                {" "}
                Prefer chat?{" "}
                <TrackLink
                  className="font-semibold text-forest underline"
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  trackEvent="whatsapp_click"
                  trackLocation="enquiry_form"
                >
                  Message us on WhatsApp
                </TrackLink>
                .
              </>
            ) : null}
          </p>
        </form>
      )}
    </div>
  );
}

function FormFallback() {
  return <div className="h-80 animate-pulse rounded-3xl bg-paper/80" />;
}

export function EnquiryForm(props: EnquiryFormProps) {
  return (
    <Suspense fallback={<FormFallback />}>
      <EnquiryFormFields {...props} />
    </Suspense>
  );
}
