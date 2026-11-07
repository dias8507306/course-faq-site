import type { FaqContent } from "@/content/types";
import type { UiStrings } from "@/i18n/ui";
import { ContentIcon } from "./icons";
import { RichText } from "./rich-text";

export function QuickFacts({ content, ui }: { content: FaqContent; ui: UiStrings }) {
  return (
    <section aria-labelledby="quick-facts-title" className="rounded-2xl border border-line bg-surface p-5 shadow-card">
      <h2 id="quick-facts-title" className="font-serif text-lg font-semibold text-ink">
        {content.quickFacts.title}
      </h2>
      <dl className="mt-4 divide-y divide-line">
        {content.quickFacts.facts.map((fact) => (
          <div key={fact.id} className="flex gap-3 py-3.5 first:pt-0 last:pb-0">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent-strong">
              <ContentIcon name={fact.icon} className="size-4" />
            </span>
            <div className="min-w-0">
              <dt className="text-xs font-semibold tracking-wide text-muted uppercase">{fact.label}</dt>
              {fact.lines.map((line, i) => (
                <dd key={i} className="mt-1 text-sm leading-6 text-ink-soft">
                  <RichText text={line} newTabLabel={ui.opensInNewTab} />
                </dd>
              ))}
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}
