"use client";

import { useCallback, useEffect, useState } from "react";

export function useMobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const openMenu = useCallback(() => {
        setIsOpen(true);
    }, []);
    
    const closeMenu = useCallback(() => {
        setIsOpen(false);
    }, []);
    
    const toggleMenu = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);
    
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [closeMenu]);
    
    return { isOpen, openMenu, closeMenu, toggleMenu };
}