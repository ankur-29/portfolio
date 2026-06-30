import Particle from "./Particle";
import ParticlePool from "./ParticlePool";
import ParticleEmitter from "./ParticleEmitter";
import ParticlePhysics from "./ParticlePhysics";
import SpatialGrid from "./SpatialGrid";
import ConnectionRenderer from "./ConnectionRenderer";
import MouseForce from "./MouseForce";

import type { CanvasSize,MouseState,ParticleConfig } from "./types";

/**
 * Coordinates the complete particle engine.
 * Responsibilities:
 * - initialize particles
 * - update simulation
 * - rebuild spatial grid
 * - render connections
 * - render particles
 *
 * Does NOT:
 * - own animation loop
 * - know about React
 * - listen to DOM events
 */
export default class ParticleSystem {
  private readonly pool: ParticlePool;
  private readonly emitter: ParticleEmitter;
  private readonly physics: ParticlePhysics;
  private readonly grid: SpatialGrid;
  private readonly connectionRenderer: ConnectionRenderer;
  private readonly mouseForce: MouseForce;
  private canvas: CanvasSize = {
    width: 0,
    height: 0,
  };
  constructor(
    private readonly config: ParticleConfig
  ) {
    this.pool = new ParticlePool(config.count);
    this.emitter = new ParticleEmitter( this.pool, config);
    this.physics = new ParticlePhysics( config );
    this.grid = new SpatialGrid( config.grid.cellSize );
    this.connectionRenderer = new ConnectionRenderer( config.connection);
    this.mouseForce = new MouseForce( config.mouse.interaction, config.mouse.strength);
  }

  /* Initializes the system */
  init( width: number, height: number ): void {
    this.canvas.width = width;
    this.canvas.height = height;
    this.pool.releaseAll();
    this.emitter.spawnMany( this.config.count, this.canvas);
  }

  /* Called whenever the canvas changes size */
  resize( width: number, height: number ): void {
    this.init(width, height);
  }

  /* Updates one simulation step */
  update( delta: number ): void {
    const particles = this.pool.getActiveParticles();
    this.physics.update( particles, this.canvas, delta);
    this.mouseForce.apply( particles, delta);
    this.grid.rebuild( particles);
    this.pool.recycle();
    const missing = this.config.count - this.pool.activeCount;
    if (missing > 0) {
      this.emitter.spawnMany(  missing, this.canvas );
    }
  }

  /* Renders the frame */
  render( context: CanvasRenderingContext2D ): void {
    const particles = this.pool.getActiveParticles();
    this.connectionRenderer.render( context, particles, this.grid );
    for (const particle of particles) {
      particle.draw(context);
    }
  }

  /* Updates mouse state */
  setMouse( mouse: MouseState ): void {
    this.mouseForce.setMouse( mouse);
  }

  /* Releases resources */
  destroy(): void {
    this.pool.clear();
  }

  /* Returns active particles */
  getParticles(): readonly Particle[] {
    return this.pool.getActiveParticles();
  }

  /* Active particle count */
  get particleCount(): number {
    return this.pool.activeCount;
  }
}