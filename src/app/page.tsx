import { FaqPage, faqMetadata } from "@/components/faq-page";

export const metadata = faqMetadata("kk");

export default function HomePage() {
  return <FaqPage locale="kk" />;
}
