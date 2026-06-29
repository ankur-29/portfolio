"use client";

import { useMemo } from "react";
import * as THREE from "three";

export default function Keyboard() {
  const keyMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#18181b", // Chiclet key cap color
      roughness: 0.65,
      metalness: 0.1,
    });
  }, []);

  const keysGrid = useMemo(() => {
    const keys: { pos: [number, number, number]; size: [number, number, number] }[] = [];
    
    // Simple 5-row keyboard layout approximation
    const rows = 5;
    const rowZOffsets = [-0.4, -0.2, 0.0, 0.2, 0.4];
    const keysPerRow = [14, 14, 13, 12, 8];
    const keyWidths = [0.15, 0.15, 0.16, 0.18, 0.22];

    for (let r = 0; r < rows; r++) {
      const z = rowZOffsets[r];
      const count = keysPerRow[r];
      const w = keyWidths[r];
      
      // Calculate starting x offset
      const totalWidth = count * (w + 0.04);
      const startX = -totalWidth / 2 + w / 2;

      for (let k = 0; k < count; k++) {
        // Spacebar adjustment in the last row
        if (r === 4 && k === 3) {
          keys.push({
            pos: [0, 0.055, z],
            size: [0.9, 0.02, 0.14],
          });
          k += 3; // skip keys covered by spacebar
          continue;
        }

        const x = startX + k * (w + 0.04);
        keys.push({
          pos: [x, 0.055, z],
          size: [w, 0.02, 0.14],
        });
      }
    }

    return keys;
  }, []);

  return (
    <group position={[0, 0, 0.15]}>
      {/* Keyboard Bed Tray background */}
      <mesh position={[0, 0.045, 0]}>
        <boxGeometry args={[2.8, 0.005, 1.1]} />
        <meshStandardMaterial
          color="#09090b"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Chiclet Key Meshes */}
      {keysGrid.map((key, idx) => (
        <mesh
          key={idx}
          position={key.pos}
          castShadow
          receiveShadow
        >
          <boxGeometry args={key.size} />
          <primitive object={keyMaterial} attach="material" />
        </mesh>
      ))}
    </group>
  );
}
