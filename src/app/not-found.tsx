import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { defaultLocale, getContent } from "@/content";
import { uiStrings } from "@/i18n/ui";

export default function NotFound() {
  const content = getContent(defaultLocale);
  const ui = uiStrings[content.locale];
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-24">
      <div className="max-w-md text-center">
        <p className="font-serif text-6xl font-semibold text-accent">404</p>
        <h1 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-ink">{ui.notFoundTitle}</h1>
        <p className="mt-3 text-base leading-7 text-muted">{ui.notFoundBody}</p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 font-medium text-white transition-colors hover:bg-ink/90"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {ui.notFoundCta}
        </Link>
        <p className="mt-10 text-sm text-muted">{content.brand.name}</p>
      </div>
    </main>
  );
}
