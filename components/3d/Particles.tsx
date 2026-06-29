"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const [count, setCount] = useState(70); // default fallback
  const [reducedMotion, setReducedMotion] = useState(false);

  // 1. Detect device size & accessibility on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Detect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    // Detect device performance scale by screen width
    const width = window.innerWidth;
    if (width >= 1024) {
      setCount(220); // Desktop
    } else if (width >= 768) {
      setCount(120); // Tablet
    } else {
      setCount(60);  // Mobile
    }

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  // 2. Generate random particle position and speed maps
  const [positions, speeds] = useMemo(() => {
    // Allocate maximum size array to prevent garbage collection allocations on count update
    const maxCount = 250;
    const pos = new Float32Array(maxCount * 3);
    const spd = new Float32Array(maxCount);

    for (let i = 0; i < maxCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;     // X [-8, 8]
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12; // Y [-6, 6]
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10; // Z [-5, 5]
      spd[i] = 0.04 + Math.random() * 0.08;        // speed scale
    }
    return [pos, spd];
  }, []);

  // 3. Drifting movement calculations
  useFrame((state) => {
    if (!pointsRef.current || reducedMotion) return;

    const time = state.clock.getElapsedTime();
    const positionAttr = pointsRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;

    for (let i = 0; i < count; i++) {
      const yIdx = i * 3 + 1;
      const xIdx = i * 3;

      // Vertical drift downwards
      positionAttr.array[yIdx] -= speeds[i] * 0.008;
      // Sideways weaving sway
      positionAttr.array[xIdx] += Math.sin(time * 0.5 + i) * 0.0015;

      // Cycle particles when they hit floor limit
      if (positionAttr.array[yIdx] < -6) {
        positionAttr.array[yIdx] = 6;
      }
    }

    positionAttr.needsUpdate = true;

    // Slow orbital rotation of the galaxy shell
    pointsRef.current.rotation.y = time * 0.015;
    pointsRef.current.rotation.x = time * 0.008;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.slice(0, count * 3), 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#facc15" // glowing gold sparkles
        transparent
        opacity={0.35}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
}
