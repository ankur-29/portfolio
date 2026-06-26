"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavbarItemProps } from "./Navbar.types";

export default function NavbarItem({ item, }: NavbarItemProps) {
  const pathname = usePathname();

  const isActive =
    item.href === "/"
      ? pathname === "/"
      : pathname.startsWith(item.href);

  return (
    <Link
      href={item.href}
      className={`navbar-link ${
        isActive ? "navbar-link--active" : ""
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      {item.title}
    </Link>
  );
}