"use client";

import { useMemo } from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import Keyboard from "./Keyboard";

export default function Laptop() {
  const laptopMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#1c1c1e", // Dark space grey aluminum casing
      roughness: 0.35,
      metalness: 0.8,   // High metallic sheen
    });
  }, []);

  const screenBezelMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#0c0c0e", // Matte black bezel border
      roughness: 0.6,
      metalness: 0.1,
    });
  }, []);

  return (
    <group position={[0, -0.62, 0.4]}>
      {/* 1. Base Casing / Bottom Deck */}
      <mesh castShadow receiveShadow position={[0, 0.02, 0]}>
        <boxGeometry args={[3.2, 0.05, 2.2]} />
        <primitive object={laptopMaterial} attach="material" />
      </mesh>

      {/* 2. Trackpad Details Box */}
      <mesh position={[0, 0.05, 0.75]}>
        <boxGeometry args={[0.9, 0.005, 0.5]} />
        <meshStandardMaterial
          color="#2c2c2e"
          roughness={0.4}
          metalness={0.7}
        />
      </mesh>

      {/* Chiclet Keyboard Layout */}
      <Keyboard />

      {/* 3. Screen Hinge Lid Assembly */}
      <group position={[0, 0.05, -1.05]} rotation={[-0.18, 0, 0]}>
        {/* Back Lid shell */}
        <mesh position={[0, 0.9, -0.015]} castShadow>
          <boxGeometry args={[3.2, 1.8, 0.03]} />
          <primitive object={laptopMaterial} attach="material" />
        </mesh>

        {/* Front Bezel frame */}
        <mesh position={[0, 0.9, 0]}>
          <planeGeometry args={[3.2, 1.8]} />
          <primitive object={screenBezelMaterial} attach="material" />
        </mesh>

        {/* Screen Display Glass Panel */}
        <mesh position={[0, 0.9, 0.005]}>
          <planeGeometry args={[3.06, 1.66]} />
          <meshStandardMaterial
            color="#050505"
            roughness={0.1}
            metalness={0.9}
            emissive="#facc15" // Warm golden glow emissions
            emissiveIntensity={0.08}
          />

          {/* Code Editor HTML Overlay */}
          <Html
            transform
            occlude
            distanceFactor={1.22}
            position={[0, 0, 0.012]}
            className="screen-editor select-none pointer-events-none"
          >
            <div className="screen-editor-header select-none">
              <div className="screen-editor-dots">
                <div className="screen-editor-dot bg-[#EF4444]" />
                <div className="screen-editor-dot bg-[#F59E0B]" />
                <div className="screen-editor-dot bg-[#10B981]" />
              </div>
              <span className="screen-editor-title">Portfolio.tsx</span>
              <div className="w-[15px]" />
            </div>
            
            <div className="screen-editor-body select-none">
              <div className="screen-editor-lines select-none">
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>8</div>
                <div>9</div>
                <div>10</div>
                <div>11</div>
              </div>
              <div className="screen-editor-code text-left font-mono">
                <span className="syntax-keyword">import</span> React <span className="syntax-keyword">from</span> <span className="syntax-string">&apos;react&apos;</span>;<br />
                <br />
                <span className="syntax-keyword">const</span> <span className="syntax-variable">Portfolio</span> = () =&gt; &#123;<br />
                &nbsp;&nbsp;<span className="syntax-keyword">return</span> (<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="syntax-keyword">main</span> className=<span className="syntax-string">&apos;developer-workspace&apos;</span>&gt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="syntax-keyword">h1</span>&gt;Hi, I&apos;m <span className="syntax-accent">Ankur Anand</span>&lt;/<span className="syntax-keyword">h1</span>&gt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="syntax-keyword">p</span>&gt;Senior Full Stack MERN Developer&lt;/<span className="syntax-keyword">p</span>&gt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="syntax-keyword">main</span>&gt;<br />
                &nbsp;&nbsp;);<br />
                &#125;;<br />
                <span className="syntax-keyword">export default</span> <span className="syntax-variable">Portfolio</span>;
              </div>
            </div>
          </Html>
        </mesh>
      </group>
    </group>
  );
}
