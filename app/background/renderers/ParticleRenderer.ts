import type { Renderer } from "../canvas/types";
import ParticleSystem from "../particle/ParticleSystem";
import particleConfig from "../config/particleConfig";
import type { MouseState } from "../particle/types";

/**
 * Renderer implementation for the particle engine.
 *
 * Responsible for:
 * - Owning the canvas context
 * - Translating renderer lifecycle into ParticleSystem calls
 * - Forwarding mouse interaction
 *
 * Does NOT:
 * - Manage animation loop
 * - Know about React
 */
export default class ParticleRenderer implements Renderer {
  private readonly system: ParticleSystem;
  private width = 0;
  private height = 0;
  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly context: CanvasRenderingContext2D
  ) {
    this.system = new ParticleSystem(particleConfig);
  }

  /* Initializes the renderer */
  init(): void {
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.system.init( this.width, this.height);
  }

  /* Handles canvas resize */
  resize(width: number,height: number): void {
    this.width = width;
    this.height = height;
    this.system.resize(width, height);
  }

  /* Updates one animation frame.*/
  update( delta: number ): void {
    this.system.update(delta);
  }

  /* Renders one animation frame */
  render(): void {
    this.context.clearRect( 0, 0, this.width, this.height );
    this.system.render( this.context );
  }

  /* Updates mouse interaction */
  setMouse(mouse: MouseState): void {
    this.system.setMouse(mouse);
  }

  /* Releases resources.*/
  destroy(): void {
    this.system.destroy();
  }

  /*  Returns the underlying particle system. Useful for debugging.*/
  get particleSystem(): ParticleSystem {
    return this.system;
  }
}