import { ArrowUpRight } from "lucide-react";
import { Fragment } from "react";
import type { AnswerBlock, RichText as RichTextSource } from "@/content/types";
import { parseInline } from "@/lib/rich-text";

interface RichTextProps {
  text: RichTextSource;
  newTabLabel: string;
}

export function RichText({ text, newTabLabel }: RichTextProps) {
  return (
    <>
      {parseInline(text).map((node, i) => {
        if (node.type === "bold") {
          return (
            <strong key={i} className="font-semibold text-ink">
              {node.text}
            </strong>
          );
        }
        if (node.type === "link") {
          return node.external ? (
            <a
              key={i}
              href={node.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link inline-flex items-baseline gap-0.5"
            >
              {node.text}
              <ArrowUpRight className="size-3.5 shrink-0 self-center" aria-hidden="true" />
              <span className="sr-only"> {newTabLabel}</span>
            </a>
          ) : (
            <a key={i} href={node.href} className="link">
              {node.text}
            </a>
          );
        }
        return <Fragment key={i}>{node.text}</Fragment>;
      })}
    </>
  );
}

export function AnswerBody({
  blocks,
  newTabLabel,
}: {
  blocks: AnswerBlock[];
  newTabLabel: string;
}) {
  return (
    <div className="space-y-3 text-[15px] leading-7 text-ink-soft sm:text-base sm:leading-7">
      {blocks.map((block, i) => {
        if (block.type === "p") {
          return (
            <p key={i}>
              <RichText text={block.text} newTabLabel={newTabLabel} />
            </p>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={i} className="space-y-2.5">
              {block.items.map((item, j) => (
                <li
                  key={j}
                  className="relative pl-5 before:absolute before:top-[0.72em] before:left-1 before:size-1.5 before:rounded-full before:bg-accent"
                >
                  <RichText text={item} newTabLabel={newTabLabel} />
                </li>
              ))}
            </ul>
          );
        }
        return (
          <ol key={i} className="space-y-2.5">
            {block.items.map((item, j) => (
              <li key={j} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent-strong"
                >
                  {j + 1}
                </span>
                <span>
                  <RichText text={item} newTabLabel={newTabLabel} />
                </span>
              </li>
            ))}
          </ol>
        );
      })}
    </div>
  );
}
