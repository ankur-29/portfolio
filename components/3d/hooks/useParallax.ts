"use client";

import { useEffect, useRef } from "react";

export interface ParallaxState {
  mouse: { x: number; y: number };
  scroll: number;
  reducedMotion: boolean;
}

export function useParallax() {
  const stateRef = useRef<ParallaxState>({
    mouse: { x: 0, y: 0 },
    scroll: 0,
    reducedMotion: false,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Accessibility check for prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    stateRef.current.reducedMotion = mediaQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      stateRef.current.reducedMotion = e.matches;
      if (e.matches) {
        stateRef.current.mouse = { x: 0, y: 0 };
        stateRef.current.scroll = 0;
      }
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    // 2. Mouse Move Listener
    const handleMouseMove = (e: MouseEvent) => {
      if (stateRef.current.reducedMotion) return;
      // Normalize between -1 and 1
      stateRef.current.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      stateRef.current.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    // 3. Scroll Listener
    const handleScroll = () => {
      if (stateRef.current.reducedMotion) return;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) {
        stateRef.current.scroll = 0;
        return;
      }
      stateRef.current.scroll = window.scrollY / scrollHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return stateRef;
}
