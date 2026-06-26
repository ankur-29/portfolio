"use client";

import { Menu } from "lucide-react";

export default function NavbarMobile() {
  return (
    <div className="navbar-mobile">
      <button
        type="button"
        className="navbar-mobile-button"
        aria-label="Open navigation menu"
      >
        <Menu size={22} />
      </button>
    </div>
  );
}