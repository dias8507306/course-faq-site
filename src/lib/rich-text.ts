import type { AnswerBlock, RichText } from "@/content/types";

export type InlineNode =
  | { type: "text"; text: string }
  | { type: "bold"; text: string }
  | { type: "link"; text: string; href: string; external: boolean };

const INLINE = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Only these link targets are rendered as links; anything else stays plain text. */
export function safeHref(href: string): { href: string; external: boolean } | null {
  if (href.startsWith("#")) return /^#[\w-]+$/.test(href) ? { href, external: false } : null;
  if (/^(mailto|tel):/i.test(href)) return { href, external: false };
  try {
    const url = new URL(href);
    if (url.protocol === "https:" || url.protocol === "http:") {
      return { href: url.toString(), external: true };
    }
  } catch {
    // fall through
  }
  return null;
}

export function parseInline(source: RichText): InlineNode[] {
  const nodes: InlineNode[] = [];
  let last = 0;
  for (const match of source.matchAll(INLINE)) {
    const index = match.index ?? 0;
    if (index > last) nodes.push({ type: "text", text: source.slice(last, index) });
    if (match[1] !== undefined) {
      nodes.push({ type: "bold", text: match[1] });
    } else {
      const label = match[2];
      const target = safeHref(match[3]);
      nodes.push(target ? { type: "link", text: label, ...target } : { type: "text", text: label });
    }
    last = index + match[0].length;
  }
  if (last < source.length) nodes.push({ type: "text", text: source.slice(last) });
  return nodes;
}

/** Rich text without markup, as the reader sees it. Used for structured data. */
export function toPlainText(source: RichText): string {
  return parseInline(source)
    .map((node) => node.text)
    .join("");
}

export function blocksToPlainText(blocks: AnswerBlock[]): string {
  return blocks
    .map((block) => (block.type === "p" ? toPlainText(block.text) : block.items.map(toPlainText).join(" ")))
    .join(" ");
}
