"use client";

import { useEffect, useState } from "react";

export function useActiveSection() {
    const [activeSection, setActiveSection] = useState("home");
    
    useEffect(() => {
        const sections = document.querySelectorAll("section[id]");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                root: null,
                rootMargin: "-40% 0px -50% 0px",
                threshold: 0,
            }
        );
        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);
    return activeSection;
}