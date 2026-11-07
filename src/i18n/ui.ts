import type { Locale } from "@/content/types";

/** Interface strings. FAQ content itself lives in src/content. */
export interface UiStrings {
  languageName: string;
  nav: { faq: string; videos: string; support: string; menu: string; close: string };
  writeToSupport: string;
  allCategories: string;
  categoriesLabel: string;
  questionsCount: (count: number) => string;
  copyLink: string;
  linkCopied: string;
  opensInNewTab: string;
  watchVideo: string;
  notFoundTitle: string;
  notFoundBody: string;
  notFoundCta: string;
  supportCta: { title: string; body: string; button: string };
  sourceNote: string;
}

const kk: UiStrings = {
  languageName: "Қазақша",
  nav: {
    faq: "Сұрақтар",
    videos: "Видеонұсқаулықтар",
    support: "Байланыс",
    menu: "Мәзірді ашу",
    close: "Мәзірді жабу",
  },
  writeToSupport: "Қолдауға жазу",
  allCategories: "Барлығы",
  categoriesLabel: "Бөлімдер",
  questionsCount: (n) => `${n} сұрақ`,
  copyLink: "Сілтемені көшіру",
  linkCopied: "Сілтеме көшірілді",
  opensInNewTab: "(жаңа бетте ашылады)",
  watchVideo: "YouTube-та көру",
  notFoundTitle: "Бет табылмады",
  notFoundBody: "Сіз іздеген бет жоқ немесе басқа мекенжайға көшірілген.",
  notFoundCta: "Сұрақ-жауапқа оралу",
  supportCta: {
    title: "Сұрағыңызға жауап таппадыңыз ба?",
    body: "Техникалық қолдау қызметіне WhatsApp арқылы жазыңыз.",
    button: "WhatsApp-қа жазу",
  },
  sourceNote: "Ақпарат жаңартылған күні:",
};

const ru: UiStrings = {
  languageName: "Русский",
  nav: {
    faq: "Вопросы",
    videos: "Видеоинструкции",
    support: "Контакты",
    menu: "Открыть меню",
    close: "Закрыть меню",
  },
  writeToSupport: "Написать в поддержку",
  allCategories: "Все",
  categoriesLabel: "Разделы",
  questionsCount: (n) => `Вопросов: ${n}`,
  copyLink: "Скопировать ссылку",
  linkCopied: "Ссылка скопирована",
  opensInNewTab: "(откроется в новой вкладке)",
  watchVideo: "Смотреть на YouTube",
  notFoundTitle: "Страница не найдена",
  notFoundBody: "Такой страницы нет или она была перемещена.",
  notFoundCta: "Вернуться к вопросам",
  supportCta: {
    title: "Не нашли ответ на свой вопрос?",
    body: "Напишите в техническую поддержку в WhatsApp.",
    button: "Написать в WhatsApp",
  },
  sourceNote: "Информация обновлена:",
};

export const uiStrings: Record<Locale, UiStrings> = { kk, ru };
