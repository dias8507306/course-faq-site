import type { Metadata } from "next";
import { availableLocales, getContent, localePath, type Locale } from "@/content";
import { uiStrings } from "@/i18n/ui";
import { blocksToPlainText } from "@/lib/rich-text";
import { FaqPortal } from "./faq-portal";

const ogLocale: Record<Locale, string> = { kk: "kk_KZ", ru: "ru_RU" };

export function faqMetadata(locale: Locale): Metadata {
  const content = getContent(locale);
  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: {
      canonical: localePath[locale],
      languages: Object.fromEntries(availableLocales.map((code) => [code, localePath[code]])),
    },
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      title: content.meta.title,
      description: content.meta.description,
      siteName: content.brand.name,
      url: localePath[locale],
    },
    twitter: { card: "summary", title: content.meta.title, description: content.meta.description },
  };
}

export function FaqPage({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const locales = availableLocales.map((code) => ({
    code,
    label: uiStrings[code].languageName,
    href: localePath[code],
  }));

  // FAQPage structured data helps search engines show answers directly.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: content.locale,
    mainEntity: content.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: blocksToPlainText(item.answer) },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <FaqPortal content={content} locales={locales} />
    </>
  );
}
