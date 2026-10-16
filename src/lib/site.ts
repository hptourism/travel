function read(name: string) {
  return (process.env[name] ?? "").trim();
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

export function whatsappLink(message?: string) {
  if (!site.whatsapp) return null;
  const base = `https://wa.me/${site.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function phoneLink() {
  const digits = site.phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : null;
}
