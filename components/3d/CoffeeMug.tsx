"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function CoffeeMug() {
  const steamParticlesRef = useRef<THREE.Group>(null);

  const mugMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#18181b", // Matte charcoal ceramic color
      roughness: 0.3,
      metalness: 0.1,
    });
  }, []);

  const coffeeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#5c4033", // Coffee dark brown
      roughness: 0.15,
      metalness: 0.1,
    });
  }, []);

  // Generate steam particle coordinate caches
  const steamCount = 8;
  const steamData = useMemo(() => {
    const data = [];
    for (let i = 0; i < steamCount; i++) {
      data.push({
        x: (Math.random() - 0.5) * 0.12,
        y: Math.random() * 0.8,
        speed: 0.005 + Math.random() * 0.008,
        scale: 0.01 + Math.random() * 0.02,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return data;
  }, []);

  // Animate steam particles rising and weaving
  useFrame((state) => {
    if (!steamParticlesRef.current) return;
    
    const time = state.clock.getElapsedTime();
    steamParticlesRef.current.children.forEach((child, idx) => {
      const data = steamData[idx];
      
      // Update vertical position
      child.position.y += data.speed;
      // Weave sideways
      child.position.x = data.x + Math.sin(time * 3 + data.phase) * 0.04;
      
      // Scale down particle size as it rises
      const lifeRatio = 1 - (child.position.y / 0.85);
      child.scale.setScalar(data.scale * Math.max(0, lifeRatio));

      // Reset when particle exceeds ceiling height
      if (child.position.y > 0.85) {
        child.position.y = 0.0;
        child.position.x = data.x;
      }
    });
  });

  return (
    <group position={[-2.3, -0.32, -0.8]}>
      {/* 1. Mug Body Cylinder (charcoal ceramic) */}
      <mesh castShadow receiveShadow position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.6, 24]} />
        <primitive object={mugMaterial} attach="material" />
      </mesh>

      {/* 2. Mug Handle (torus ring) */}
      <mesh position={[-0.24, 0.02, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <torusGeometry args={[0.16, 0.05, 12, 24]} />
        <primitive object={mugMaterial} attach="material" />
      </mesh>

      {/* 3. Coffee Liquid Circle */}
      <mesh position={[0, 0.31, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.22, 24]} />
        <primitive object={coffeeMaterial} attach="material" />
      </mesh>

      {/* 4. Animated Steam Particles Group */}
      <group ref={steamParticlesRef} position={[0, 0.35, 0]}>
        {steamData.map((data, idx) => (
          <mesh key={idx} position={[data.x, data.y, 0]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial
              color="#d4af37" // glowing gold heat particles
              transparent
              opacity={0.25}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
