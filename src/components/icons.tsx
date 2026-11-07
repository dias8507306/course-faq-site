import {
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  Clock,
  Headset,
  LogIn,
  MapPin,
  Smartphone,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/content/types";

const ICONS: Record<IconName, LucideIcon> = {
  trophy: Trophy,
  book: BookOpen,
  clipboard: ClipboardCheck,
  smartphone: Smartphone,
  calendar: CalendarDays,
  map: MapPin,
  login: LogIn,
  clock: Clock,
  support: Headset,
};

export function ContentIcon({ name, className }: { name: IconName; className?: string }) {
  const Icon = ICONS[name];
  return <Icon className={className} aria-hidden="true" strokeWidth={1.75} />;
}
