import { CheckCircle2, Clock, Info, MessageCircle } from "lucide-react";
import type { FaqContent } from "@/content/types";
import type { UiStrings } from "@/i18n/ui";
import { RichText } from "./rich-text";

export function SupportSection({ content, ui }: { content: FaqContent; ui: UiStrings }) {
  const { support, groupRules } = content;
  return (
    <section id="support" aria-labelledby="support-title">
      <div className="overflow-hidden rounded-3xl border border-line bg-surface shadow-card">
        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="bg-ink p-6 text-white sm:p-8 lg:p-10">
            <h2 id="support-title" className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
              {ui.supportCta.title}
            </h2>
            <p className="mt-3 text-base leading-7 text-white/80">{ui.supportCta.body}</p>
            <a
              href={support.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-12 items-center gap-2.5 rounded-full bg-white px-5 py-3 font-semibold text-ink transition-colors hover:bg-accent-soft focus-visible:outline-white"
            >
              <MessageCircle className="size-5 text-accent" aria-hidden="true" />
              {ui.supportCta.button}
              <span className="sr-only"> {ui.opensInNewTab}</span>
            </a>
            <p className="mt-3 text-sm text-white/75">
              WhatsApp: <span className="font-medium text-white">{support.whatsappLabel}</span>
            </p>
            <ul className="mt-6 space-y-2 border-t border-white/15 pt-6 text-sm leading-6 text-white/80">
              {support.hours.map((line, i) => (
                <li key={i} className="flex gap-2.5">
                  <Clock className="mt-1 size-4 shrink-0 text-white/55" aria-hidden="true" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <h3 className="font-serif text-xl font-semibold text-ink">{support.title}</h3>
            <p className="mt-2 text-base leading-7 text-ink-soft">
              <RichText text={support.checklistIntro} newTabLabel={ui.opensInNewTab} />
            </p>
            <ul className="mt-4 space-y-2.5">
              {support.checklist.map((item, i) => (
                <li key={i} className="flex gap-3 text-[15px] leading-6 text-ink-soft">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" strokeWidth={1.75} />
                  <span>
                    <RichText text={item} newTabLabel={ui.opensInNewTab} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-line bg-surface/60 p-6 sm:p-8">
        <h3 className="flex items-center gap-2 font-serif text-lg font-semibold text-ink">
          <Info className="size-5 text-accent" aria-hidden="true" strokeWidth={1.75} />
          {groupRules.title}
        </h3>
        <ul className="mt-4 grid gap-x-8 gap-y-3 md:grid-cols-2">
          {groupRules.items.map((item, i) => (
            <li
              key={i}
              className="relative pl-5 text-[15px] leading-6 text-ink-soft before:absolute before:top-[0.6em] before:left-1 before:size-1.5 before:rounded-full before:bg-accent"
            >
              <RichText text={item} newTabLabel={ui.opensInNewTab} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
