import type { FaqContent } from "@/content/types";

export function PageHero({ content }: { content: FaqContent }) {
  return (
    <section id="top" className="mx-auto max-w-3xl px-4 pt-12 pb-10 text-center sm:px-6 sm:pt-16 sm:pb-12">
      <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-ink-soft sm:text-sm">
        <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
        {content.hero.eyebrow}
      </p>
      <h1
        id="hero-title"
        className="mt-6 font-serif text-[2.15rem] leading-[1.12] font-bold tracking-tight text-balance text-ink sm:text-5xl sm:leading-[1.08]"
      >
        {content.hero.title}
      </h1>
    </section>
  );
}
