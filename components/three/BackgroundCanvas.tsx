"use client";

import { useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { scrollBridge } from "@/lib/ScrollBridge";
import WorkspaceScene from "../3d/WorkspaceScene";

function CameraController() {
  const { camera } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    const p = scrollBridge.progress;
    
    // Define target camera coordinate vectors based on scroll position
    const startPos = new THREE.Vector3(0, 1.2, 6.8);
    const aboutPos = new THREE.Vector3(-2.2, 0.8, 6.0);
    const expPos = new THREE.Vector3(2.2, -0.2, 5.5);
    const projPos = new THREE.Vector3(-1.8, -1.2, 6.2);
    const skillsPos = new THREE.Vector3(1.8, -0.6, 5.8);
    const contactPos = new THREE.Vector3(0, 1.2, 5.2);

    const targetPos = new THREE.Vector3();
    const targetLook = new THREE.Vector3(0, 0, 0);

    // Dynamic camera routing based on normalized scroll progress
    if (p <= 0.2) {
      // Section 1 -> Section 2 (Hero to About)
      const t = p / 0.2;
      targetPos.lerpVectors(startPos, aboutPos, t);
      targetLook.lerpVectors(new THREE.Vector3(0, 0, 0), new THREE.Vector3(-0.5, 0, 0), t);
    } else if (p <= 0.4) {
      // Section 2 -> Section 3 (About to Experience)
      const t = (p - 0.2) / 0.2;
      targetPos.lerpVectors(aboutPos, expPos, t);
      targetLook.lerpVectors(new THREE.Vector3(-0.5, 0, 0), new THREE.Vector3(0.5, -0.2, 0), t);
    } else if (p <= 0.6) {
      // Section 3 -> Section 4 (Experience to Projects)
      const t = (p - 0.4) / 0.2;
      targetPos.lerpVectors(expPos, projPos, t);
      targetLook.lerpVectors(new THREE.Vector3(0.5, -0.2, 0), new THREE.Vector3(-0.5, -0.5, 0), t);
    } else if (p <= 0.8) {
      // Section 4 -> Section 5 (Projects to Skills)
      const t = (p - 0.6) / 0.2;
      targetPos.lerpVectors(projPos, skillsPos, t);
      targetLook.lerpVectors(new THREE.Vector3(-0.5, -0.5, 0), new THREE.Vector3(0.5, 0, 0), t);
    } else {
      // Section 5 -> Section 6 (Skills to Contact)
      const t = (p - 0.8) / 0.2;
      targetPos.lerpVectors(skillsPos, contactPos, t);
      targetLook.lerpVectors(new THREE.Vector3(0.5, 0, 0), new THREE.Vector3(0, 0.4, 0), t);
    }

    // Add mouse cursor parallax displacements
    const mouseScale = 0.35;
    const mx = scrollBridge.mouse.x * mouseScale;
    const my = scrollBridge.mouse.y * mouseScale;
    targetPos.x += mx;
    targetPos.y += my;

    // Smooth camera movements with linear interpolation
    camera.position.lerp(targetPos, 0.05);
    currentLookAt.current.lerp(targetLook, 0.05);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

// Global useRef hook for lookAt matrix tracking
import { useRef } from "react";

export default function BackgroundCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Initialize global scroll and mouse movements bridge
    const cleanup = scrollBridge.init();
    return () => {
      cleanup?.();
    };
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 -z-10 bg-[#09090b]" />;
  }

  return (
    <div className="fixed inset-0 -z-10 bg-[#09090b] w-screen h-screen overflow-hidden">
      <Canvas
        shadows
        camera={{ position: [0, 1.2, 6.8], fov: 45 } as any}
        gl={{ antialias: true, alpha: false }}
        className="w-full h-full"
      >
        <WorkspaceScene />
        <CameraController />
      </Canvas>
    </div>
  );
}
