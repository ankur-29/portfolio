"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

interface FloatingCardsProps {
  mobileMode?: boolean;
}

export default function FloatingCards({ mobileMode = false }: FloatingCardsProps) {
  const card1Ref = useRef<THREE.Group>(null);
  const card2Ref = useRef<THREE.Group>(null);
  const card3Ref = useRef<THREE.Group>(null);

  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: "#ffffff",
      transparent: true,
      opacity: 0.15,
      transmission: 0.8,
      roughness: 0.2,
      thickness: 0.02,
      ior: 1.4,
    });
  }, []);

  // Update floating positions and gentle rotations
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Card 1: Tech Stack (Left-Back)
    if (card1Ref.current) {
      card1Ref.current.position.y = 0.8 + Math.sin(time * 0.8) * 0.06;
      card1Ref.current.rotation.y = -0.3 + Math.cos(time * 0.5) * 0.03;
      card1Ref.current.rotation.x = Math.sin(time * 0.4) * 0.02;
    }

    // Card 2: Stats Metric (Right-Back)
    if (card2Ref.current) {
      card2Ref.current.position.y = 0.9 + Math.cos(time * 1.0) * 0.06;
      card2Ref.current.rotation.y = 0.3 + Math.sin(time * 0.6) * 0.03;
      card2Ref.current.rotation.x = Math.cos(time * 0.5) * 0.02;
    }

    // Card 3: Deployment (Center-Back)
    if (card3Ref.current) {
      card3Ref.current.position.y = 1.3 + Math.sin(time * 0.6 + 1.2) * 0.08;
      card3Ref.current.rotation.x = -0.15 + Math.cos(time * 0.8) * 0.03;
    }
  });

  return (
    <group>
      {/* CARD 1: TECH STACK (Left-Back) */}
      <group ref={card1Ref} position={[-2.4, 0.8, -0.6]} rotation={[0, -0.3, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.1, 0.7, 0.015]} />
          <primitive object={glassMaterial} attach="material" />
        </mesh>
        <Html
          transform
          distanceFactor={0.5}
          position={[0, 0, 0.01]}
          className="select-none pointer-events-none"
        >
          <div className="glass-ui-card w-[180px] p-4 text-left">
            <div className="glass-ui-title text-[9px] tracking-widest text-[#a1a1aa] font-mono">Tech Stack</div>
            <div className="text-[#FAFAFA] text-xs font-bold font-sans mt-1">MERN &amp; TS</div>
            <div className="flex gap-1.5 flex-wrap mt-2">
              <span className="text-[7px] font-mono border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 px-1 py-0.25 rounded">React</span>
              <span className="text-[7px] font-mono border border-zinc-800 bg-zinc-900 text-zinc-300 px-1 py-0.25 rounded">Node</span>
              <span className="text-[7px] font-mono border border-zinc-800 bg-zinc-900 text-zinc-300 px-1 py-0.25 rounded">Mongo</span>
              <span className="text-[7px] font-mono border border-amber-500/20 bg-amber-500/10 text-primary px-1 py-0.25 rounded">TS</span>
            </div>
          </div>
        </Html>
      </group>

      {/* CARD 2: STATS METRIC (Right-Back) */}
      {!mobileMode && (
        <group ref={card2Ref} position={[2.4, 0.9, -0.5]} rotation={[0, 0.3, 0]}>
          <mesh castShadow>
            <boxGeometry args={[1.0, 0.65, 0.015]} />
            <primitive object={glassMaterial} attach="material" />
          </mesh>
          <Html
            transform
            distanceFactor={0.5}
            position={[0, 0, 0.01]}
            className="select-none pointer-events-none"
          >
            <div className="glass-ui-card w-[170px] p-4 text-left">
              <div className="glass-ui-title text-[9px] tracking-widest text-[#a1a1aa] font-mono">Performance</div>
              <div className="flex justify-between items-baseline mt-1.5 leading-none">
                <span className="text-xl font-extrabold text-primary">98%</span>
                <span className="text-[8px] text-zinc-500 font-mono">Optimized</span>
              </div>
              <div className="w-full bg-zinc-950 h-1 rounded-full overflow-hidden mt-2">
                <div className="bg-primary h-full rounded-full" style={{ width: "98%" }} />
              </div>
            </div>
          </Html>
        </group>
      )}

      {/* CARD 3: DEPLOYMENT (Center-Back) */}
      {!mobileMode && (
        <group ref={card3Ref} position={[0, 1.4, -1.8]} rotation={[-0.15, 0, 0]}>
          <mesh castShadow>
            <boxGeometry args={[1.2, 0.45, 0.015]} />
            <primitive object={glassMaterial} attach="material" />
          </mesh>
          <Html
            transform
            distanceFactor={0.5}
            position={[0, 0, 0.01]}
            className="select-none pointer-events-none"
          >
            <div className="glass-ui-card w-[190px] px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 absolute" />
                <span className="text-[9px] font-mono text-zinc-400 font-bold uppercase tracking-wider">
                  Production
                </span>
              </div>
              <span className="text-[9px] font-mono text-primary font-bold bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded">
                Ready
              </span>
            </div>
          </Html>
        </group>
      )}
    </group>
  );
}
