"use client";

import { useMemo } from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";

export default function GlassNameCard() {
  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: "#ffffff",
      transparent: true,
      opacity: 0.15,
      transmission: 0.9,     // Real refractive glass transmission
      roughness: 0.15,
      metalness: 0.05,
      thickness: 0.04,        // Refraction depth
      ior: 1.5,              // Index of refraction for glass
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
  }, []);

  const borderMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#facc15", // Metallic gold borders
      roughness: 0.2,
      metalness: 0.8,
    });
  }, []);

  return (
    <group position={[-2.1, -0.62, 0.4]} rotation={[0, 0.25, 0]}>
      {/* 1. Transparent Refractive Glass Slab Card */}
      <mesh castShadow receiveShadow position={[0, 0.16, 0]}>
        <boxGeometry args={[1.2, 0.32, 0.02]} />
        <primitive object={glassMaterial} attach="material" />
      </mesh>

      {/* 2. Gold Border Outline Frames */}
      {/* Top Border */}
      <mesh position={[0, 0.32, 0]}>
        <boxGeometry args={[1.22, 0.01, 0.024]} />
        <primitive object={borderMaterial} attach="material" />
      </mesh>
      {/* Bottom Border */}
      <mesh position={[0, 0.0, 0]}>
        <boxGeometry args={[1.22, 0.01, 0.024]} />
        <primitive object={borderMaterial} attach="material" />
      </mesh>
      {/* Left Border */}
      <mesh position={[-0.6, 0.16, 0]}>
        <boxGeometry args={[0.01, 0.33, 0.024]} />
        <primitive object={borderMaterial} attach="material" />
      </mesh>
      {/* Right Border */}
      <mesh position={[0.6, 0.16, 0]}>
        <boxGeometry args={[0.01, 0.33, 0.024]} />
        <primitive object={borderMaterial} attach="material" />
      </mesh>

      {/* 3. Text Overlay Frame */}
      <Html
        transform
        distanceFactor={0.55}
        position={[0, 0.16, 0.012]}
        className="select-none pointer-events-none"
      >
        <div className="flex flex-col items-center justify-center font-sans leading-none text-[#FAFAFA] text-[10px] w-[180px]">
          <span className="font-extrabold tracking-wide">ANKUR ANAND</span>
          <span className="text-[#A1A1AA] text-[6px] font-mono tracking-widest uppercase mt-1">
            Full Stack Developer
          </span>
        </div>
      </Html>
    </group>
  );
}
