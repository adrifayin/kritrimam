import type { Metadata } from "next";
import {
  Fraunces,
  Instrument_Sans,
  Geist_Mono,
  Noto_Sans_Malayalam,
} from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { WaitlistProvider } from "@/components/forms/WaitlistProvider";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const notoMalayalam = Noto_Sans_Malayalam({
  subsets: ["malayalam"],
  weight: ["400", "600"],
  variable: "--font-noto-malayalam",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.brand.domain),
  title: {
    default: site.meta.titleDefault,
    template: site.meta.titleTemplate,
  },
  description: site.meta.description,
  openGraph: {
    title: site.meta.ogTitle,
    description: site.meta.ogDescription,
    type: "website",
    locale: "en_IN",
    url: site.brand.domain,
    siteName: "Kritrimam",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: site.brand.domain },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Kritrimam",
      url: site.brand.domain,
      email: site.brand.email,
      description: site.meta.description,
      foundingLocation: {
        "@type": "Place",
        name: "Kerala, India",
      },
      sameAs: [
        "https://github.com/adrifayin",
        "https://linkedin.com/in/adhilrifayinks",
      ],
    },
    {
      "@type": "WebSite",
      name: "Kritrimam",
      url: site.brand.domain,
      inLanguage: "en-IN",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${instrument.variable} ${geistMono.variable} ${notoMalayalam.variable}`}
    >
      <body>
        <a
          href="#main"
          className="u-mono sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-ink-raised focus:px-4 focus:py-3 focus:text-bone focus:outline-2 focus:outline-brass"
        >
          Skip to content
        </a>
        <WaitlistProvider>{children}</WaitlistProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
