function read(name: string) {
  return (process.env[name] ?? "").trim();
}

function readFlag(name: string, fallback = false) {
  const value = read(name).toLowerCase();
  if (["1", "true", "on", "yes"].includes(value)) return true;
  if (["0", "false", "off", "no"].includes(value)) return false;
  return fallback;
}

function readPositiveNumber(name: string, fallback: number) {
  const parsed = Number(read(name));
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

export const site = {
  name: read("NEXT_PUBLIC_SITE_NAME"),
  shortName: read("NEXT_PUBLIC_SITE_SHORT"),
  email: read("NEXT_PUBLIC_EMAIL"),
  phone: read("NEXT_PUBLIC_PHONE"),
  whatsapp: read("NEXT_PUBLIC_WHATSAPP_NUMBER").replace(/\D/g, ""),
  fleetStand: read("NEXT_PUBLIC_FLEET_STAND"),
  officeShort: read("NEXT_PUBLIC_OFFICE_SHORT"),
  officeAddress: read("NEXT_PUBLIC_OFFICE_ADDRESS"),
  officeMapsUrl: read("NEXT_PUBLIC_OFFICE_MAPS_URL"),
  fleetMapsUrl: read("NEXT_PUBLIC_FLEET_MAPS_URL"),
  siteUrl: read("NEXT_PUBLIC_SITE_URL"),
  /** Auto-open enquiry modal. Set NEXT_PUBLIC_ENQUIRY_AUTO_POPUP=off to disable. */
  enquiryAutoPopup: readFlag("NEXT_PUBLIC_ENQUIRY_AUTO_POPUP", true),
  /** Delay in seconds before auto popup. */
  enquiryAutoPopupSeconds: readPositiveNumber("NEXT_PUBLIC_ENQUIRY_AUTO_POPUP_SECONDS", 10),
};

export function formatContactNumber(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  return raw.trim();
}

function whatsappDigits(raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  if (digits.length === 10) digits = `91${digits}`;
  return digits;
}

export function whatsappLink(message?: string) {
  const number = whatsappDigits(site.whatsapp);
  if (!number) return null;
  const base = `https://wa.me/${number}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function phoneLink() {
  const digits = site.phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : null;
}
