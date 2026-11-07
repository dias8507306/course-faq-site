import { ArrowUpRight, PlayCircle } from "lucide-react";
import type { FaqContent } from "@/content/types";
import type { UiStrings } from "@/i18n/ui";

export function VideoGuides({ content, ui }: { content: FaqContent; ui: UiStrings }) {
  return (
    <section id="videos" aria-labelledby="videos-title">
      <h2 id="videos-title" className="font-serif text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        {content.videos.title}
      </h2>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {content.videos.guides.map((guide) => (
          <li key={guide.id} className="sm:last:odd:col-span-2">
            <a
              href={guide.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full items-center gap-4 rounded-2xl border border-line bg-surface p-4 shadow-card transition-[border-color,box-shadow,translate] duration-200 hover:-translate-y-px hover:border-line-strong hover:shadow-card-open sm:p-5"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-strong">
                <PlayCircle className="size-6" aria-hidden="true" strokeWidth={1.75} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-medium text-ink">{guide.title}</span>
                <span className="mt-0.5 block text-sm text-muted">
                  {ui.watchVideo}
                  <span className="sr-only"> {ui.opensInNewTab}</span>
                </span>
              </span>
              <ArrowUpRight
                className="size-5 shrink-0 text-muted transition-colors group-hover:text-accent"
                aria-hidden="true"
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
