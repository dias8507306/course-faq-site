/**
 * Sanity checks for the FAQ content files. Run: npm run check:content
 * Fails the build when an id is duplicated, a question has no answer,
 * a category is missing, or a link points somewhere unsafe.
 */
import { faqKk } from "../src/content/faq.kk.ts";
import { faqRu } from "../src/content/faq.ru.ts";
import type { FaqContent } from "../src/content/types.ts";
import { parseInline } from "../src/lib/rich-text.ts";

const contents: FaqContent[] = [faqKk, faqRu];
const errors: string[] = [];

function checkLinks(where: string, text: string) {
  const raw = [...text.matchAll(/\[([^\]]+)\]\(([^)\s]+)\)/g)];
  const parsed = parseInline(text).filter((node) => node.type === "link");
  if (raw.length !== parsed.length) errors.push(`${where}: a link was rejected as unsafe`);
  for (const node of parsed) {
    if (node.type === "link" && node.href.startsWith("#") && !["#support", "#faq", "#videos"].includes(node.href)) {
      if (!contents.some((c) => c.items.some((item) => `#${item.id}` === node.href))) {
        errors.push(`${where}: anchor ${node.href} does not exist`);
      }
    }
  }
}

for (const content of contents) {
  const tag = `[${content.locale}]`;
  const categoryIds = new Set(content.categories.map((c) => c.id));
  const seen = new Set<string>();

  for (const item of content.items) {
    const where = `${tag} ${item.id}`;
    if (seen.has(item.id)) errors.push(`${where}: duplicate id`);
    seen.add(item.id);
    if (!/^[a-z0-9-]+$/.test(item.id)) errors.push(`${where}: id must be lowercase latin, digits and dashes`);
    if (!categoryIds.has(item.categoryId)) errors.push(`${where}: unknown category "${item.categoryId}"`);
    if (!item.question.trim()) errors.push(`${where}: empty question`);
    if (item.answer.length === 0) errors.push(`${where}: empty answer`);
    for (const block of item.answer) {
      const texts = block.type === "p" ? [block.text] : block.items;
      if (texts.length === 0 || texts.some((t) => !t.trim())) errors.push(`${where}: empty answer block`);
      texts.forEach((t) => checkLinks(where, t));
    }
  }

  for (const category of content.categories) {
    if (!content.items.some((item) => item.categoryId === category.id)) {
      errors.push(`${tag} category "${category.id}" has no questions`);
    }
  }
  for (const guide of content.videos.guides) {
    if (!guide.url.startsWith("https://")) errors.push(`${tag} video ${guide.id}: url must be https`);
  }
  content.quickFacts.facts.forEach((fact) => fact.lines.forEach((line) => checkLinks(`${tag} fact ${fact.id}`, line)));
  content.groupRules.items.forEach((line) => checkLinks(`${tag} group rules`, line));

  const perCategory = content.categories
    .map((c) => `${c.title}: ${content.items.filter((i) => i.categoryId === c.id).length}`)
    .join(", ");
  console.log(`${tag} ${content.items.length} questions — ${perCategory}`);
}

// Translations must mirror the Kazakh source: same questions, same order, same categories.
for (const content of contents.slice(1)) {
  const tag = `[${content.locale}]`;
  const source = (c: FaqContent) => c.items.map((item) => `${item.categoryId}/${item.id}`).join(",");
  if (source(content) !== source(faqKk)) errors.push(`${tag} questions differ from [kk] (ids, categories or order)`);
  const categories = (c: FaqContent) => c.categories.map((category) => category.id).join(",");
  if (categories(content) !== categories(faqKk)) errors.push(`${tag} categories differ from [kk]`);
  faqKk.items.forEach((item, i) => {
    const blocks = (c: FaqContent["items"][number]) => c.answer.map((b) => (b.type === "p" ? "p" : `${b.type}${b.items.length}`)).join(",");
    const other = content.items[i];
    if (other && blocks(item) !== blocks(other)) errors.push(`${tag} ${item.id}: answer structure differs from [kk]`);
  });
  const urls = (c: FaqContent) => c.videos.guides.map((g) => g.url).join(",");
  if (urls(content) !== urls(faqKk)) errors.push(`${tag} video links differ from [kk]`);
}

if (errors.length > 0) {
  console.error(`\nContent check failed:\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log("Content check passed.");
