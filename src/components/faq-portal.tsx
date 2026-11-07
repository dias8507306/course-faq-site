"use client";

import { Check, Layers, Link2, MessageCircle } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import type { FaqContent, FaqItem, Locale } from "@/content/types";
import { uiStrings, type UiStrings } from "@/i18n/ui";
import { cn } from "@/lib/cn";
import { ContentIcon } from "./icons";
import { PageHero } from "./page-hero";
import { QuickFacts } from "./quick-facts";
import { AnswerBody, RichText } from "./rich-text";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { SupportSection } from "./support-section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { VideoGuides } from "./video-guides";

const ALL = "all";

export interface LocaleLink {
  code: Locale;
  label: string;
  href: string;
}

export function FaqPortal({ content, locales }: { content: FaqContent; locales: LocaleLink[] }) {
  const ui = uiStrings[content.locale];

  const [categoryId, setCategoryId] = useState(ALL);
  const [openIds, setOpenIds] = useState<string[]>([]);
  const pendingScroll = useRef<string | null>(null);

  const revealQuestion = useCallback((id: string) => {
    setCategoryId(ALL);
    setOpenIds((current) => (current.includes(id) ? [...current] : [...current, id]));
    pendingScroll.current = id;
  }, []);

  // Scroll to a question that was opened from a shared link.
  useEffect(() => {
    const id = pendingScroll.current;
    if (!id) return;
    pendingScroll.current = null;
    const element = document.getElementById(id);
    if (!element) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    element.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    element.querySelector<HTMLButtonElement>("button[aria-controls]")?.focus({ preventScroll: true });
  }, [openIds]);

  // Shared links such as /#pin-forgotten open that question.
  useEffect(() => {
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (content.items.some((item) => item.id === id)) revealQuestion(id);
    };
    const timer = window.setTimeout(openFromHash, 0);
    window.addEventListener("hashchange", openFromHash);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", openFromHash);
    };
  }, [content.items, revealQuestion]);

  useEffect(() => {
    document.documentElement.lang = content.locale;
  }, [content.locale]);

  const categories = content.categories.filter((category) =>
    content.items.some((item) => item.categoryId === category.id),
  );
  const countIn = (id: string) => content.items.filter((item) => item.categoryId === id).length;

  const groups = categories
    .filter((category) => categoryId === ALL || category.id === categoryId)
    .map((category) => ({
      category,
      items: content.items.filter((item) => item.categoryId === category.id),
    }));
  const shownCount = groups.reduce((sum, group) => sum + group.items.length, 0);

  return (
    // lang is set here too, so /ru is announced as Russian before hydration.
    <div lang={content.locale} className="flex flex-1 flex-col">
      <a
        href="#faq"
        className="sr-only z-50 rounded-lg bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {ui.nav.faq}
      </a>
      <SiteHeader content={content} ui={ui} locales={locales} />

      <main id="main" className="flex-1">
        <PageHero content={content} />

        <div
          id="faq"
          className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10"
        >
          <aside className="space-y-4 lg:order-last">
            <div className="space-y-4 lg:sticky lg:top-24">
              <QuickFacts content={content} ui={ui} />
              <SupportCard content={content} ui={ui} />
            </div>
          </aside>

          <section aria-labelledby="hero-title" className="min-w-0">
            <div role="group" aria-label={ui.categoriesLabel} className="flex flex-wrap gap-2">
              <CategoryChip
                active={categoryId === ALL}
                onClick={() => setCategoryId(ALL)}
                label={ui.allCategories}
                count={content.items.length}
                icon={<Layers className="size-4" aria-hidden="true" strokeWidth={1.75} />}
              />
              {categories.map((category) => (
                <CategoryChip
                  key={category.id}
                  active={categoryId === category.id}
                  onClick={() => setCategoryId(category.id)}
                  label={category.title}
                  count={countIn(category.id)}
                  icon={<ContentIcon name={category.icon} className="size-4" />}
                />
              ))}
            </div>

            <p role="status" aria-live="polite" className="mt-5 text-sm text-muted">
              {ui.questionsCount(shownCount)}
            </p>

            <Accordion type="multiple" value={openIds} onValueChange={setOpenIds} className="mt-4">
              <div className="space-y-10">
                {groups.map(({ category, items }) => (
                  <section key={category.id} aria-labelledby={`cat-${category.id}`}>
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex size-9 items-center justify-center rounded-xl border border-line bg-surface text-accent-strong">
                        <ContentIcon name={category.icon} className="size-[18px]" />
                      </span>
                      <h2 id={`cat-${category.id}`} className="font-serif text-xl font-semibold tracking-tight text-ink">
                        {category.title}
                      </h2>
                      <span className="ml-auto text-sm text-muted tabular-nums">{items.length}</span>
                    </div>
                    <QuestionList items={items} ui={ui} />
                  </section>
                ))}
              </div>
            </Accordion>
          </section>
        </div>

        <div className="mx-auto mt-20 max-w-6xl space-y-16 px-4 sm:px-6">
          <VideoGuides content={content} ui={ui} />
          <SupportSection content={content} ui={ui} />
        </div>
      </main>

      <SiteFooter content={content} ui={ui} />
    </div>
  );
}

function CategoryChip({
  active,
  onClick,
  label,
  count,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
  icon: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-full border px-3.5 py-2 text-left text-sm font-medium transition-colors",
        active
          ? "border-ink bg-ink text-white"
          : "border-line bg-surface text-ink-soft hover:border-line-strong hover:text-ink",
      )}
    >
      <span className={active ? "text-white/80" : "text-accent-strong"}>{icon}</span>
      <span>{label}</span>
      <span
        className={cn(
          "min-w-6 rounded-full px-1.5 py-0.5 text-center text-xs tabular-nums",
          active ? "bg-white/15 text-white" : "bg-canvas text-muted",
        )}
      >
        {count}
      </span>
    </button>
  );
}

function QuestionList({ items, ui }: { items: FaqItem[]; ui: UiStrings }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item.id}>
          <AccordionItem value={item.id} id={item.id}>
            <AccordionTrigger>
              <span className="block text-[15px] leading-6 font-medium text-ink sm:text-base">
                <RichText text={item.question} newTabLabel={ui.opensInNewTab} />
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-4 pb-5 sm:px-5">
                <div className="border-t border-line pt-4">
                  <AnswerBody blocks={item.answer} newTabLabel={ui.opensInNewTab} />
                  <CopyLinkButton id={item.id} ui={ui} />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </li>
      ))}
    </ul>
  );
}

function CopyLinkButton({ id, ui }: { id: string; ui: UiStrings }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <div className="mt-4 flex justify-end">
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-muted transition-colors hover:bg-canvas hover:text-ink"
      >
        {copied ? (
          <Check className="size-3.5 text-accent" aria-hidden="true" />
        ) : (
          <Link2 className="size-3.5" aria-hidden="true" />
        )}
        <span aria-live="polite">{copied ? ui.linkCopied : ui.copyLink}</span>
      </button>
    </div>
  );
}

function SupportCard({ content, ui }: { content: FaqContent; ui: UiStrings }) {
  return (
    <div className="hidden rounded-2xl border border-accent/15 bg-accent-soft p-5 lg:block">
      <p className="font-serif text-lg font-semibold text-ink">{ui.supportCta.title}</p>
      <p className="mt-1.5 text-sm leading-6 text-ink-soft">{ui.supportCta.body}</p>
      <a
        href={content.support.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-medium text-white transition-colors hover:bg-ink/90"
      >
        <MessageCircle className="size-4" aria-hidden="true" />
        {ui.supportCta.button}
        <span className="sr-only"> {ui.opensInNewTab}</span>
      </a>
      <a href="#support" className="link mt-3 block text-sm">
        {content.support.title}
      </a>
    </div>
  );
}
