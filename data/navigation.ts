import {
  BriefcaseBusiness,
  FolderGit2,
  House,
  Mail,
  User,
} from "lucide-react";

import { NavigationItem } from "@/types/navigation";

export const navigation: NavigationItem[] = [
  {
    id: 1,
    title: "Home",
    href: "/",
    icon: House,
  },
  {
    id: 2,
    title: "About",
    href: "/about",
    icon: User,
  },
  {
    id: 3,
    title: "Experience",
    href: "/experience",
    icon: BriefcaseBusiness,
  },
  {
    id: 4,
    title: "Projects",
    href: "/projects",
    icon: FolderGit2,
  },
  {
    id: 5,
    title: "Contact",
    href: "/contact",
    icon: Mail,
  },
];