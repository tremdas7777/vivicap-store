import {
  Briefcase,
  Car,
  Lightbulb,
  PenLine,
  Plane,
  ShoppingBag,
  Snowflake,
  Sun,
  Thermometer,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  thermometer: Thermometer,
  snowflake: Snowflake,
  light: Lightbulb,
  plane: Plane,
  pen: PenLine,
  bag: ShoppingBag,
  sun: Sun,
  briefcase: Briefcase,
  car: Car,
};

/** Ícone por nome (usado pelos textos em lib/content.ts). */
export function ContentIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? Thermometer;
  return <Icon className={className} aria-hidden />;
}
