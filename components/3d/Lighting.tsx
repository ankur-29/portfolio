"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Lighting() {
  const screenLightRef = useRef<THREE.PointLight>(null);

  // Animate the laptop screen point-light to create a gentle warm pulsing glow
  useFrame((state) => {
    if (screenLightRef.current) {
      const time = state.clock.getElapsedTime();
      // Base intensity 1.5 + sine wave fluctuation (frequency 2.0 rad/s, amplitude 0.25)
      screenLightRef.current.intensity = 1.5 + Math.sin(time * 2.0) * 0.25;
    }
  });

  return (
    <group>
      {/* 1. Ambient Background Fill */}
      <ambientLight intensity={0.15} />

      {/* 2. Hemisphere Sky-Ground gradient Light */}
      <hemisphereLight
        args={["#0a0f1d", "#050505", 0.4]}
        position={[0, 10, 0]}
      />

      {/* 3. Key Light (Cinematic Gold-White directional source) */}
      <directionalLight
        position={[8, 12, 6]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
      >
        {/* Soft shadow map adjustments */}
        <object3D attach="light" />
      </directionalLight>

      {/* 4. Fill Light (Cool Cyan fill source) */}
      <directionalLight
        position={[-8, 6, -4]}
        intensity={0.6}
        color="#ecfeff"
      />

      {/* 5. Animated Warm Screen Hinge Glow */}
      <pointLight
        ref={screenLightRef}
        position={[0, -0.2, -0.6]}
        distance={4.0}
        color="#facc15" // Warm gold/yellow screen glow
        decay={2.0}
        castShadow
        shadow-bias={-0.0002}
      />

      {/* 6. Cyan Neon Rim Highlights Source */}
      <pointLight
        position={[4, 3, -6]}
        intensity={2.2}
        distance={8.0}
        color="#00e5ff" // Vivid rim cyan highlights
        decay={1.8}
      />
    </group>
  );
}
