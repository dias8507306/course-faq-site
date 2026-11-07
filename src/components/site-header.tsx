"use client";

import { Menu, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { FaqContent } from "@/content/types";
import type { UiStrings } from "@/i18n/ui";
import { cn } from "@/lib/cn";
import type { LocaleLink } from "./faq-portal";

interface SiteHeaderProps {
  content: FaqContent;
  ui: UiStrings;
  locales: LocaleLink[];
}

export function SiteHeader({ content, ui, locales }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const links = [
    { href: "#faq", label: ui.nav.faq },
    { href: "#videos", label: ui.nav.videos },
    { href: "#support", label: ui.nav.support },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:gap-4 sm:px-6">
        <a href="#top" className="mr-auto flex min-w-0 items-center gap-3 rounded-lg">
          <span className="font-serif text-xl font-semibold tracking-tight text-ink">
            {content.brand.name}
            <span className="text-accent">.</span>
          </span>
          <span className="hidden h-5 w-px bg-line-strong md:block" aria-hidden="true" />
          <span className="hidden truncate text-sm text-muted md:block">{content.brand.tagline}</span>
        </a>

        <nav aria-label={ui.nav.faq} className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-surface hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {locales.length > 1 && <LanguageSwitcher locales={locales} current={content.locale} />}

        <a
          href={content.support.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-ink/90 sm:inline-flex"
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          {ui.writeToSupport}
          <span className="sr-only"> {ui.opensInNewTab}</span>
        </a>

        <button
          type="button"
          className="-mr-2 flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? ui.nav.close : ui.nav.menu}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </div>

      <div id="mobile-menu" hidden={!menuOpen} className="border-t border-line bg-canvas px-4 pt-2 pb-4 sm:px-6 lg:hidden">
        <p className="py-2 text-sm text-muted md:hidden">{content.brand.tagline}</p>
        <nav aria-label={ui.nav.faq} className="flex flex-col">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-2 py-3 text-base font-medium text-ink hover:bg-surface"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href={content.support.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
          className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-base font-medium text-white sm:hidden"
        >
          <MessageCircle className="size-5" aria-hidden="true" />
          {ui.writeToSupport}
          <span className="sr-only"> {ui.opensInNewTab}</span>
        </a>
      </div>
    </header>
  );
}

function LanguageSwitcher({ locales, current }: { locales: LocaleLink[]; current: string }) {
  return (
    <nav aria-label="Тіл / Язык" className="flex rounded-full border border-line bg-surface p-0.5">
      {locales.map((option) => {
        const active = option.code === current;
        return (
          <Link
            key={option.code}
            href={option.href}
            hrefLang={option.code}
            lang={option.code}
            aria-current={active ? "page" : undefined}
            aria-label={option.label}
            className={cn(
              "flex min-h-9 min-w-10 items-center justify-center rounded-full px-2.5 text-xs font-semibold tracking-wide uppercase transition-colors",
              active ? "bg-ink text-white" : "text-muted hover:text-ink",
            )}
          >
            {option.code === "kk" ? "KZ" : option.code.toUpperCase()}
          </Link>
        );
      })}
    </nav>
  );
}
