import { faqKk } from "./faq.kk";
import { faqRu } from "./faq.ru";
import type { FaqContent, Locale } from "./types";

/** Every locale that has FAQ content, with the page it lives on. */
export const contentByLocale: Record<Locale, FaqContent> = {
  kk: faqKk,
  ru: faqRu,
};

export const localePath: Record<Locale, string> = {
  kk: "/",
  ru: "/ru",
};

export const defaultLocale: Locale = "kk";

export const availableLocales = Object.keys(contentByLocale) as Locale[];

export function getContent(locale: Locale = defaultLocale): FaqContent {
  return contentByLocale[locale];
}

export type { FaqContent, FaqItem, FaqCategory, AnswerBlock, Locale } from "./types";
