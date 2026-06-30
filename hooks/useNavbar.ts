"use client";

import { useEffect, useState } from "react";

const SCROLL_THRESHOLD = 30;

export function useNavbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
        };
        
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    
    return { isScrolled };
}