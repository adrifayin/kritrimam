import type { Metadata } from "next";
import { Inter, Space_Grotesk, Noto_Sans_Malayalam } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const notoMalayalam = Noto_Sans_Malayalam({
  weight: ["400", "700"],
  subsets: ["malayalam"],
  variable: "--font-noto-malayalam",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kritrimam — Foundational AI Research Lab",
  description:
    "A foundational AI research lab building toward general-purpose reasoning systems, starting with NEST.ai.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${notoMalayalam.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-ink text-parchment cursor-none">
        <CustomCursor />
        <SmoothScroll>
          <Navigation />
          <main className="flex-1 w-full relative z-10">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
