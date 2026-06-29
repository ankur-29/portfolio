"use client";

import { useEffect, useState } from "react";
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";

export default function Effects() {
  const [enabled, setEnabled] = useState(false);

  // Disable post-processing on mobile/tablet screens for performance scaling
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkPerformance = () => {
      // Only enable post-processing on desktop screens (>1024px)
      setEnabled(window.innerWidth >= 1024);
    };

    checkPerformance();
    window.addEventListener("resize", checkPerformance);

    return () => {
      window.removeEventListener("resize", checkPerformance);
    };
  }, []);

  if (!enabled) return null;

  return (
    <EffectComposer>
      {/* 1. Cinematic Neon Bloom */}
      <Bloom
        intensity={0.45}
        luminanceThreshold={0.8}
        luminanceSmoothing={0.9}
        mipmapBlur
      />

      {/* 2. Soft Chromatic Aberration (Lens Color Dispersion) */}
      <ChromaticAberration
        offset={new THREE.Vector2(0.001, 0.001) as any}
      />

      {/* 3. Dark Vignette border framing */}
      <Vignette
        eskil={false}
        offset={0.4}
        darkness={0.7}
      />
    </EffectComposer>
  );
}

import * as THREE from "three";
