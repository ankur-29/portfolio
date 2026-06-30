"use client";

import Link from "next/link";

import { NavbarItemProps } from "./Navbar.types";

export default function NavbarItem({ item, activeSection}: NavbarItemProps) {
  const section = item.href === "#" ? "home" : item.href.substring(1);
  const isActive = activeSection === section;

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