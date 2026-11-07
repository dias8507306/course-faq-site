# Course FAQ Site

A fast, mobile-first, bilingual (Kazakh / Russian) FAQ portal for parents whose children take an online course
preparing for the district stage of the «Алтын сақа» olympiad. Fully static, no backend, no secrets.

## Features

- Category filter chips with question counts.
- Accessible accordion (Radix): keyboard support, visible focus, ARIA attributes; several answers can be open at once.
- Shareable deep link to every question (`/#pin-forgotten`) with a "copy link" button.
- Quick facts, video guides, a support section with a WhatsApp link, and group rules.
- Two locales: Kazakh at `/`, Russian at `/ru`, with a KZ / RU switcher.
- FAQPage structured data (JSON-LD), sitemap, robots, favicon, custom 404 page, reduced-motion support.
- Content lives in plain TypeScript files with a tiny inline markup (`**bold**`, `[label](https://link)`).
- Content validation script that runs before every build: duplicate ids, empty answers, unknown categories,
  unsafe links, and structural parity between the Kazakh and Russian files.

## Tech stack

- Next.js 16 (App Router, static prerendering, Turbopack)
- React 19, TypeScript
- Tailwind CSS 4
- Radix UI accordion (shadcn/ui-style primitive), Lucide icons
- ESLint 9

## Project structure

```
src/
  app/                 layout, pages (/ and /ru), 404, icon, robots, sitemap, global styles
  components/          header, hero, FAQ portal, quick facts, videos, support, footer
  components/ui/       accordion primitive (shadcn/ui style, Radix)
  content/             FAQ content: faq.kk.ts, faq.ru.ts, types
  i18n/ui.ts           interface strings (kk, ru)
  lib/                 rich text parser, site URL, helpers
scripts/check-content.mts   content validation (runs before `next build`)
```

## How to run

Requirements: Node.js 22.18+ and npm. No environment variables are needed.

```bash
npm ci
npm run dev          # http://localhost:3000
```

Other commands:

```bash
npm run check        # TypeScript + ESLint + content validation
npm run build        # content validation + production build
npm run start        # serve the production build
```

Optional: set `NEXT_PUBLIC_SITE_URL=https://eduapp.example.com` to control canonical URLs and the sitemap.

## Editing the FAQ

- Each question is an object: `id`, `categoryId`, `question`, `answer`. The `id` is used in shared links, so keep it stable.
- An answer is a list of blocks: `{ type: "p", text }`, `{ type: "ul", items }`, `{ type: "ol", items }`.
- Only `https`, `http`, `mailto:`, `tel:` and `#anchor` links are rendered as links.
- When you add, remove or reorder a question in `faq.kk.ts`, make the same change in `faq.ru.ts`;
  `npm run check:content` fails if the two files diverge.

All data in this repository is randomly generated; brand names are anonymized.
Contacts, links and video URLs are placeholders (`EduApp`, `eduapp.example.com`, `+7 700 000 00 00`).

## Қысқаша (KZ)

«Алтын сақа» олимпиадасының аудандық кезеңіне дайындық курсы бойынша ата-аналарға арналған сұрақ-жауап сайты.
Next.js 16 + TypeScript + Tailwind CSS 4, қазақ (`/`) және орыс (`/ru`) тілдерінде, толығымен статикалық.
Мазмұн `src/content` ішіндегі файлдарда, құрастыру алдында арнайы скрипт тексереді.
Іске қосу: `npm ci && npm run dev`. Бренд пен байланыс деректері ойдан алынған.
