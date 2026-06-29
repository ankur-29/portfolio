/**
 * ScrollBridge utility
 * Piped scroll and mouse events directly into R3F frame loops
 * to prevent react state re-renders from killing WebGL performance.
 */
export const scrollBridge = {
  // Current scroll progress (0 = top, 1 = bottom)
  progress: 0,
  
  // Normalized mouse coordinates (-1 to 1)
  mouse: {
    x: 0,
    y: 0,
  },

  // Setup global event listeners
  init() {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) {
        scrollBridge.progress = 0;
        return;
      }
      scrollBridge.progress = window.scrollY / scrollHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      scrollBridge.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      scrollBridge.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Initial check
    handleScroll();

    // Return cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  },
};
