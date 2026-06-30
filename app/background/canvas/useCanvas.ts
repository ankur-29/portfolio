"use client";

import { useCallback, useEffect, useRef } from "react";

import type { Renderer } from "./types";
import type { MouseState } from "../particle";

/**
 * Manages the canvas lifecycle.
 * Responsibilities:
 * - animation loop
 * - resize handling
 * - mouse forwarding
 * - renderer lifecycle
 */
export default function useCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  rendererFactory: (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) => Renderer
) {
  const rendererRef = useRef<Renderer | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const previousTimeRef = useRef(0);
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const renderer = rendererRef.current;
    if (!canvas || !renderer) {
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    renderer.resize(width, height);
  }, [canvasRef]);

  const animate = useCallback(
    (time: number) => {
      const renderer = rendererRef.current;
      if (!renderer) {
        return;
      }
      const delta = (time - previousTimeRef.current) / 1000;
      previousTimeRef.current = time;
      renderer.update(delta);
      renderer.render();
      animationFrameRef.current = requestAnimationFrame(animate);
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const renderer = rendererFactory(canvas, context);
    rendererRef.current = renderer;
    resize();
    renderer.init();
    previousTimeRef.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(animate);

    const handleMouseMove = (event: MouseEvent ) => {
        renderer.setMouse?.({
            position: { x: event.clientX, y: event.clientY,},
            radius: 120,
            active: true,
        });
    };

    const handleMouseLeave = () => {
        renderer.setMouse?.({
            position: { x: 0,y: 0,},
            radius: 120,
            active: false,
        });
    };

    window.addEventListener("resize",resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame( animationFrameRef.current);
      }

      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      renderer.destroy();
    };
  }, [animate, canvasRef, rendererFactory, resize]);
}