"use client";

import Link from "next/link";

import NavbarItem from "./NavbarItem";
import { NavbarDesktopProps } from "./Navbar.types";

import { profile } from "@/data/profile";

export default function NavbarDesktop({activeSection, navigation, socials }: NavbarDesktopProps) {
  return (
    <div className="navbar-desktop">
      <nav className="navbar-links" aria-label="Primary Navigation">
        {navigation.map((item) => (
          <NavbarItem
            key={item.id}
            item={item}
            activeSection={activeSection}
          />
        ))}
      </nav>

      <div className="navbar-actions">
        <Link
          href={profile.resume}
          target="_blank"
          className="navbar-resume-button"
        >
          Resume
        </Link>

        <div className="navbar-socials">
          {socials.map((social) => {
            const Icon = social.icon;

            return (
              <Link
                key={social.id}
                href={social.href}
                target="_blank"
                aria-label={social.title}
                className="navbar-social-button"
              >
                <Icon />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}