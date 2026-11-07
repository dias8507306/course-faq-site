import { FaqPage, faqMetadata } from "@/components/faq-page";

export const metadata = faqMetadata("ru");

export default function RussianPage() {
  return <FaqPage locale="ru" />;
}
