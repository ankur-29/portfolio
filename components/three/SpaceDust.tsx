"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SpaceDustProps {
  count?: number;
}

export default function SpaceDust({ count = 400 }: SpaceDustProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random points in a 3D box
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // X coordinate [-8, 8]
      pos[i * 3] = (Math.random() - 0.5) * 16;
      // Y coordinate [-6, 6]
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      // Z coordinate [-5, 5]
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Speed scale
      spd[i] = 0.05 + Math.random() * 0.1;
    }

    return [pos, spd];
  }, [count]);

  // Subtle drifting animation on frame update
  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();
    const positionAttribute = pointsRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;

    for (let i = 0; i < count; i++) {
      const yIdx = i * 3 + 1;
      const xIdx = i * 3;
      
      // Add dynamic sway based on sine waves and custom speeds
      positionAttribute.array[yIdx] -= speeds[i] * 0.01; // slow fall
      positionAttribute.array[xIdx] += Math.sin(time + i) * 0.002; // side sway

      // Recycle particles when they fall off screen
      if (positionAttribute.array[yIdx] < -6) {
        positionAttribute.array[yIdx] = 6;
      }
    }

    positionAttribute.needsUpdate = true;

    // Slow overall rotation
    pointsRef.current.rotation.y = time * 0.02;
    pointsRef.current.rotation.x = time * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#d4af37" // gold star dust
        transparent
        opacity={0.4}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
}
