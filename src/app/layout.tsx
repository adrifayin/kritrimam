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
  keywords: [
    "AI research lab",
    "Kerala AI",
    "NEST.ai",
    "AI co-tutor",
    "Budhi",
    "enterprise AI",
    "grounded AI",
    "retrieval augmented generation",
    "AI evaluation",
    "Kritrimam",
    "India AI startup",
    "AI for education",
    "AI agents",
  ],
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  openGraph: {
    title: site.meta.ogTitle,
    description: site.meta.ogDescription,
    type: "website",
    locale: "en_IN",
    url: site.brand.domain,
    siteName: "Kritrimam",
    images: [
      {
        url: `${site.brand.domain}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Kritrimam is artificial. We are here to make it deliberate.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.meta.ogTitle,
    description: site.meta.ogDescription,
    images: [`${site.brand.domain}/opengraph-image`],
  },
  alternates: { canonical: site.brand.domain },
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Kritrimam",
      url: site.brand.domain,
      email: site.brand.email,
      logo: `${site.brand.domain}/opengraph-image`,
      description: site.meta.description,
      foundingLocation: {
        "@type": "Place",
        name: "Kerala, India",
      },
      sameAs: [
        "https://github.com/adrifayin",
        "https://linkedin.com/in/adhilrifayinks",
      ],
      knowsAbout: [
        "Artificial Intelligence",
        "Retrieval Augmented Generation",
        "AI Evaluation",
        "Grounded AI",
        "AI for Education",
        "Enterprise AI",
      ],
    },
    {
      "@type": "WebSite",
      name: "Kritrimam",
      url: site.brand.domain,
      inLanguage: "en-IN",
      description: site.meta.description,
    },
    {
      "@type": "SoftwareApplication",
      name: "NEST.ai",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      description:
        "An AI co-tutor that works from your own course material — lecture videos, PDFs, slides, notes — instead of guessing at the internet's average answer.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
        availability: "https://schema.org/PreOrder",
      },
      creator: {
        "@type": "Organization",
        name: "Kritrimam",
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "Budhi",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "AI agents and retrieval systems designed around your data and your workflow — custom integration, model adaptation, applied agents, and evaluation.",
      creator: {
        "@type": "Organization",
        name: "Kritrimam",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is NEST.ai?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "NEST.ai is an AI co-tutor that reads what you're actually studying — lectures, PDFs, slides, handwritten notes — and answers from that, not from the internet's average guess. Every answer is retrieved before it's generated, and grounded in the source you gave it.",
          },
        },
        {
          "@type": "Question",
          name: "What is Budhi?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Budhi is Kritrimam's enterprise arm. We work directly with businesses to design, build and adapt AI agents and AI-driven features around your actual data and workflow — not a bolted-on chatbot.",
          },
        },
        {
          "@type": "Question",
          name: "Where is Kritrimam based?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Kritrimam is a self-funded AI research lab based in Kerala, India.",
          },
        },
        {
          "@type": "Question",
          name: "What makes Kritrimam different from other AI companies?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Kritrimam focuses on the gap between what AI systems actually know and what they confidently say. Our work centres on retrieval, grounding, and evaluation — ensuring AI answers come from real sources and can tell the difference between knowing and guessing.",
          },
        },
      ],
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
