import type { MetadataRoute } from "next";
import { availableLocales, getContent, localePath } from "@/content";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(availableLocales.map((code) => [code, `${siteUrl()}${localePath[code]}`]));
  return availableLocales.map((locale) => ({
    url: `${siteUrl()}${localePath[locale]}`,
    lastModified: new Date(getContent(locale).source.syncedOn),
    changeFrequency: "weekly",
    priority: locale === "kk" ? 1 : 0.9,
    alternates: { languages },
  }));
}
