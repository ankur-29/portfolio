import { LucideIcon } from "lucide-react";

export interface NavigationItem {
  id: number;
  title: string;
  href: string;
  icon?: LucideIcon;
  external?: boolean;
}