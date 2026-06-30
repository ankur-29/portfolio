import { NavigationItem } from "@/types/navigation";
import { SocialLink } from "@/types/social";

export interface NavbarDesktopProps {
  activeSection: string,
  navigation: NavigationItem[];
  socials: SocialLink[];
}

export interface NavbarItemProps {
  item: NavigationItem;
  activeSection: string;
}

export interface NavbarMobileProps {
  isOpen: boolean;
  activeSection: string;
  navigation: NavigationItem[];
  onClose: () => void;
}
