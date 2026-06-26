import { NavigationItem } from "@/types/navigation";
import { SocialLink } from "@/types/social";

export interface NavbarDesktopProps {
  navigation: NavigationItem[];
  socials: SocialLink[];
}

export interface NavbarItemProps {
  item: NavigationItem;
}

export interface NavbarMobileProps {
  navigation: NavigationItem[];
}