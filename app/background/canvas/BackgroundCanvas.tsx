"use client";

import { useCallback, useRef } from "react";

import useCanvas from "./useCanvas";
import ParticleRenderer from "../renderers/ParticleRenderer";
import "../../../styles/backgroundCanvas.css";

/**
 * Full-screen background canvas.
 * This component owns only the canvas element.
 * All rendering logic lives inside the renderer
 * and particle engine.
 */
export default function BackgroundCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const createRenderer = useCallback(
        (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D ) => {
            return new ParticleRenderer( canvas, context );
        }, []
    );
    
    useCanvas(canvasRef, createRenderer);
    return (
        <canvas ref={canvasRef} aria-hidden="true" className="canvas" />
    );
}