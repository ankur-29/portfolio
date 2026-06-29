"use client";

import { useEffect, useState } from "react";

import Lighting from "./Lighting";
import Desk from "./Desk";
import Laptop from "./Laptop";
import Mouse from "./Mouse";
import CoffeeMug from "./CoffeeMug";
import GlassNameCard from "./GlassNameCard";
import FloatingCards from "./FloatingCards";
import FloatingObjects from "./FloatingObjects";
import Particles from "./Particles";
import Effects from "./Effects";

export default function WorkspaceScene() {
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">("mobile");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      const w = window.innerWidth;
      if (w >= 1024) {
        setDeviceType("desktop");
      } else if (w >= 768) {
        setDeviceType("tablet");
      } else {
        setDeviceType("mobile");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = deviceType === "mobile";
  const isTablet = deviceType === "tablet";

  return (
    <group>
      {/* 1. Cinematic Lighting Rig */}
      <Lighting />

      {/* 2. Workspace Ground Desk */}
      <Desk />

      {/* 3. MacBook Laptop with code editor */}
      <Laptop />

      {/* 4. Secondary desktop accessories (Hidden on mobile for drawing efficiency) */}
      {!isMobile && (
        <>
          <Mouse />
          <CoffeeMug />
          <GlassNameCard />
        </>
      )}

      {/* 5. Floating Glass Info Panels */}
      <FloatingCards mobileMode={isMobile} />

      {/* 6. Floating Premium Geometries */}
      <FloatingObjects mobileMode={isMobile} />

      {/* 7. Performance Adaptive Space Particles */}
      <Particles />

      {/* 8. Post-Processing Filters (Bloom, Vignette, chromatic aberration) */}
      <Effects />
    </group>
  );
}
