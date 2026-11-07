/**
 * Content model for the FAQ site.
 *
 * Rich text fields support two small inline markups:
 *   **bold text**
 *   [link label](https://example.com)   — also mailto:, tel: and in-page #anchors
 * Anything else is rendered as plain text, so content stays safe to edit.
 */

export type Locale = "kk" | "ru";

export type RichText = string;

export type AnswerBlock =
  | { type: "p"; text: RichText }
  | { type: "ul"; items: RichText[] }
  | { type: "ol"; items: RichText[] };

/** Icon names are mapped to Lucide icons in the UI (see components/icons.tsx). */
export type IconName =
  | "trophy"
  | "book"
  | "clipboard"
  | "smartphone"
  | "calendar"
  | "map"
  | "login"
  | "clock"
  | "support";

export interface FaqCategory {
  /** Stable id, used in code and URLs. Never reuse an id for a different category. */
  id: string;
  title: string;
  icon: IconName;
}

export interface FaqItem {
  /** Stable, unique id. Used as the anchor in links like /#pin-forgotten. */
  id: string;
  categoryId: string;
  question: string;
  answer: AnswerBlock[];
}

export interface QuickFact {
  id: string;
  label: string;
  icon: IconName;
  lines: RichText[];
}

export interface VideoGuide {
  id: string;
  title: string;
  url: string;
}

export interface SupportInfo {
  title: string;
  whatsappLabel: string;
  whatsappUrl: string;
  hours: RichText[];
  checklistIntro: RichText;
  checklist: RichText[];
}

export interface FaqContent {
  locale: Locale;
  /** Shown in the header and footer. Text-only identity, no official logo. */
  brand: { name: string; tagline: string };
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string };
  categories: FaqCategory[];
  items: FaqItem[];
  quickFacts: { title: string; facts: QuickFact[] };
  videos: { title: string; guides: VideoGuide[] };
  support: SupportInfo;
  groupRules: { title: string; items: RichText[] };
  footerNote: RichText;
  source: { documentUrl: string; syncedOn: string };
}
