"use client";

import Link from "next/link";

import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/social";

import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link
          href="/"
          className="navbar-logo"
          aria-label="Go to homepage"
        >
          <span>{profile.shortName}</span>
        </Link>

        <NavbarDesktop
          navigation={navigation}
          socials={socialLinks}
        />

        <NavbarMobile />
      </div>
    </header>
  );
}