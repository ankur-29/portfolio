"use client";

import { useMemo } from "react";
import * as THREE from "three";

export default function Mouse() {
  const mouseMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#1c1c1e", // Space grey mouse body
      roughness: 0.45,
      metalness: 0.6,
    });
  }, []);

  const wheelMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#ffd700", // Metallic golden scroll wheel
      roughness: 0.25,
      metalness: 0.9,
    });
  }, []);

  return (
    <group position={[2.2, -0.6, 0.8]} rotation={[0, -0.15, 0]}>
      {/* 1. Curved Mouse main body (squashed sphere) */}
      <mesh castShadow receiveShadow scale={[0.22, 0.08, 0.4]}>
        <sphereGeometry args={[1, 32, 16]} />
        <primitive object={mouseMaterial} attach="material" />
      </mesh>

      {/* 2. Left / Right button division gap overlay line */}
      <mesh position={[0, 0.082, -0.15]}>
        <boxGeometry args={[0.01, 0.005, 0.25]} />
        <meshBasicMaterial color="#09090b" />
      </mesh>

      {/* 3. Golden metallic scroll wheel (small cylinder) */}
      <mesh position={[0, 0.09, -0.18]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.03, 12]} />
        <primitive object={wheelMaterial} attach="material" />
      </mesh>
    </group>
  );
}
