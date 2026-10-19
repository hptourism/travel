import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { Fraunces, Outfit } from "next/font/google";
import { EnquiryModalProvider } from "@/components/forms/EnquiryModal";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { FloatingContacts } from "@/components/layout/FloatingContacts";
import { site } from "@/lib/site";
import "./globals.css";

const gtmId = (process.env.NEXT_PUBLIC_GTM_ID ?? "").trim();

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const title = site.shortName || "HP Tourism";

export const metadata: Metadata = {
  metadataBase: site.siteUrl ? new URL(site.siteUrl) : undefined,
  title: {
    default: `${title} | Himachal Pradesh Tour Packages`,
    template: `%s | ${title}`,
  },
  description:
    "Himachal Pradesh tour packages from Himalayan Travels, with Shimla and Manali holidays ex Delhi and ex Chandigarh.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}>
      {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
      <body className="flex min-h-full flex-col overflow-x-hidden bg-cream font-sans text-ink">
        {gtmId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        ) : null}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <EnquiryModalProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <FloatingContacts />
        </EnquiryModalProvider>
      </body>
    </html>
  );
}
