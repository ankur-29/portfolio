"use client";

import { useMemo } from "react";
import * as THREE from "three";

export default function Desk() {
  // Memoize materials to optimize memory allocation
  const deskMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#0c0c0e", // Matte black desk color
      roughness: 0.75,   // Rough matte texture
      metalness: 0.15,   // Minimal reflections
    });
  }, []);

  return (
    <mesh
      position={[0, -0.65, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[18, 12]} />
      <primitive object={deskMaterial} attach="material" />
    </mesh>
  );
}
