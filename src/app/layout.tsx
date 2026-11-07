import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { defaultLocale } from "@/content";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

// Kazakh letters (ә, ғ, қ, ң, ө, ұ, ү, һ, і) live in the cyrillic-ext subset.
const body = Inter({
  variable: "--font-body",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  display: "swap",
});

const display = Source_Serif_4({
  variable: "--font-display",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["600", "700"],
  display: "swap",
});

// Title, description and alternates are set per page (see components/faq-page.tsx).
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f7f5f0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={defaultLocale} className={`${body.variable} ${display.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
