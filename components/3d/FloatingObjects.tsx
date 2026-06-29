"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingObjectsProps {
  mobileMode?: boolean;
}

export default function FloatingObjects({ mobileMode = false }: FloatingObjectsProps) {
  const torusRef = useRef<THREE.Mesh>(null);
  const cubeRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const hexRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  const [hoveredTorus, setHoveredTorus] = useState(false);
  const [hoveredCube, setHoveredCube] = useState(false);
  const [hoveredSphere, setHoveredSphere] = useState(false);
  const [hoveredHex, setHoveredHex] = useState(false);
  const [hoveredWire, setHoveredWire] = useState(false);

  // 1. Materials memoization
  const goldMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#ffd700",
      roughness: 0.1,
      metalness: 0.9,
      emissive: "#d4af37",
      emissiveIntensity: 0.2,
    });
  }, []);

  const chromeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#dddddd",
      roughness: 0.02,
      metalness: 1.0, // Mirror reflectivity
    });
  }, []);

  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: "#ffffff",
      transparent: true,
      opacity: 0.2,
      transmission: 0.9,
      roughness: 0.1,
      ior: 1.5,
    });
  }, []);

  const cyanMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#00e5ff",
      roughness: 0.2,
      metalness: 0.8,
      emissive: "#00e5ff",
      emissiveIntensity: 0.4,
    });
  }, []);

  // 2. Continuous rotations and floating motion loop
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Gold Torus (Right)
    if (torusRef.current) {
      torusRef.current.rotation.x += 0.005;
      torusRef.current.rotation.y += 0.01;
      torusRef.current.position.y = 0.5 + Math.sin(time * 1.2) * 0.06;
      
      const targetScale = hoveredTorus ? 1.15 : 1.0;
      torusRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }

    // Glass Cube (Front-Left)
    if (cubeRef.current) {
      cubeRef.current.rotation.x -= 0.008;
      cubeRef.current.rotation.z += 0.006;
      cubeRef.current.position.y = 0.4 + Math.cos(time * 0.8) * 0.05;

      const targetScale = hoveredCube ? 1.2 : 1.0;
      cubeRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }

    // Chrome Sphere (Front-Right)
    if (sphereRef.current) {
      sphereRef.current.position.y = 0.6 + Math.sin(time * 1.5) * 0.05;
      
      const targetScale = hoveredSphere ? 1.2 : 1.0;
      sphereRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }

    // Hexagon Cylinder (Left-Back)
    if (hexRef.current) {
      hexRef.current.rotation.y += 0.008;
      hexRef.current.position.y = 1.0 + Math.cos(time * 0.7 + 0.5) * 0.06;

      const targetScale = hoveredHex ? 1.15 : 1.0;
      hexRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }

    // Wireframe Outer Cube (Center-Top)
    if (wireRef.current) {
      wireRef.current.rotation.x += 0.003;
      wireRef.current.rotation.y += 0.005;
      wireRef.current.position.y = 1.5 + Math.sin(time * 0.5) * 0.07;

      const targetScale = hoveredWire ? 1.2 : 1.0;
      wireRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group>
      {/* 1. Gold Torus (Right) */}
      <mesh
        ref={torusRef}
        position={[2.5, 0.5, -0.4]}
        castShadow
        onPointerOver={() => setHoveredTorus(true)}
        onPointerOut={() => setHoveredTorus(false)}
      >
        <torusGeometry args={[0.35, 0.1, 16, 32]} />
        <primitive object={goldMaterial} attach="material" />
      </mesh>

      {/* 2. Glass Cube (Front-Left) */}
      {!mobileMode && (
        <mesh
          ref={cubeRef}
          position={[-1.8, 0.4, 1.0]}
          castShadow
          onPointerOver={() => setHoveredCube(true)}
          onPointerOut={() => setHoveredCube(false)}
        >
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <primitive object={glassMaterial} attach="material" />
        </mesh>
      )}

      {/* 3. Chrome Mirror Sphere (Front-Right) */}
      {!mobileMode && (
        <mesh
          ref={sphereRef}
          position={[1.8, 0.6, 1.2]}
          castShadow
          onPointerOver={() => setHoveredSphere(true)}
          onPointerOut={() => setHoveredSphere(false)}
        >
          <sphereGeometry args={[0.26, 32, 32]} />
          <primitive object={chromeMaterial} attach="material" />
        </mesh>
      )}

      {/* 4. Gold Hexagon Cylinder (Left-Back) */}
      {!mobileMode && (
        <mesh
          ref={hexRef}
          position={[-2.6, 1.0, -0.8]}
          rotation={[0.3, 0.2, 0.5]}
          castShadow
          onPointerOver={() => setHoveredHex(true)}
          onPointerOut={() => setHoveredHex(false)}
        >
          {/* 6 radial segments creates a hexagonal prism */}
          <cylinderGeometry args={[0.25, 0.25, 0.18, 6]} />
          <primitive object={goldMaterial} attach="material" />
        </mesh>
      )}

      {/* 5. Animated Cyan Wireframe Cube (Center-Top) */}
      {!mobileMode && (
        <mesh
          ref={wireRef}
          position={[0, 1.5, -1.2]}
          onPointerOver={() => setHoveredWire(true)}
          onPointerOut={() => setHoveredWire(false)}
        >
          <boxGeometry args={[0.55, 0.55, 0.55]} />
          <meshBasicMaterial
            color="#00e5ff"
            wireframe
            transparent
            opacity={0.65}
          />
        </mesh>
      )}
    </group>
  );
}
