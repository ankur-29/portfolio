"use client";

import Link from "next/link";
import { X } from "lucide-react";

import { NavbarMobileProps } from "./Navbar.types";

export default function NavbarMobile({
  isOpen,
  activeSection,
  navigation,
  onClose,
}: NavbarMobileProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="navbar-mobile-overlay"
        onClick={onClose}
      />

      <aside
        className="navbar-mobile-drawer"
        aria-label="Mobile Navigation"
      >
        <button
          className="navbar-mobile-drawer-close"
          onClick={onClose}
          aria-label="Close navigation"
        >
          <X size={20} />
        </button>

        <nav className="navbar-mobile-links">
          {navigation.map((item) => {
            const section = item.href === "#" ? "home" : item.href.substring(1);
            const isActive = activeSection === section;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={[
                  "navbar-mobile-link",
                  isActive &&
                    "navbar-mobile-link--active",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="navbar-mobile-actions">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-resume-button"
          >
            Resume
          </a>
        </div>
      </aside>
    </>
  );
}