"use client";

import Link from "next/link";

import { useNavbar } from "@/hooks/useNavbar";
import { useActiveSection } from "@/hooks/useActiveSection";

import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/social";

import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";

export default function Navbar() {
  const { isScrolled } = useNavbar();
  const activeSection = useActiveSection();
  return (
    <header className={[ "navbar", isScrolled && "navbar--scrolled"].filter(Boolean).join(" ")}>
      <div className="navbar-container">
        <Link
          href="/"
          className="navbar-logo"
          aria-label="Go to homepage"
        >
          <span>{profile.shortName}</span>
        </Link>

        <NavbarDesktop
          activeSection={activeSection}
          navigation={navigation}
          socials={socialLinks}
        />

        <NavbarMobile />
      </div>
    </header>
  );
}