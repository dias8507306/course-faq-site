import type { FaqContent } from "@/content/types";
import type { UiStrings } from "@/i18n/ui";
import { RichText } from "./rich-text";

function formatDate(iso: string) {
  const [year, month, day] = iso.split("-");
  return `${day}.${month}.${year}`;
}

export function SiteFooter({ content, ui }: { content: FaqContent; ui: UiStrings }) {
  const links = [
    { href: "https://eduapp.example.com/login", label: "eduapp.example.com/login" },
    { href: content.support.whatsappUrl, label: `WhatsApp: ${content.support.whatsappLabel}` },
    { href: "https://www.instagram.com/eduapp_demo/", label: "Instagram" },
  ];
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-md">
          <p className="font-serif text-lg font-semibold text-ink">
            {content.brand.name}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-1 text-sm text-muted">{content.brand.tagline}</p>
          <p className="mt-4 text-sm leading-6 text-muted">
            <RichText text={content.footerNote} newTabLabel={ui.opensInNewTab} />
          </p>
        </div>
        <div className="text-sm">
          <ul className="flex flex-col gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="link">
                  {link.label}
                  <span className="sr-only"> {ui.opensInNewTab}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-muted">
            {ui.sourceNote} <time dateTime={content.source.syncedOn}>{formatDate(content.source.syncedOn)}</time>
          </p>
        </div>
      </div>
    </footer>
  );
}
