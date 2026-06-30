import ParticlePool from "./ParticlePool";

import type { CanvasSize, ParticleConfig, ParticleOptions } from "./types";

/**
 * Creates and initializes particles.
 * The emitter is responsible only for spawning
 * particles. Once spawned, ParticleSystem takes
 * over their lifecycle.
 */
export default class ParticleEmitter {
  constructor(
    private readonly pool: ParticlePool,
    private readonly config: ParticleConfig
  ) {}

  /* Spawns multiple particles */
  spawnMany( count: number, canvas: CanvasSize ): void {
    for (let i = 0; i < count; i++) {
      this.spawn(canvas);
    }
  }

  /* Spawns a single particle */
  spawn( canvas: CanvasSize ): void {
    const particle = this.pool.acquire();

    if (!particle) {
      return;
    }

    particle.reset( this.createParticleOptions(canvas));
  }

  /**
   * Creates the initialization options
   * for a particle.
   */
  private createParticleOptions( canvas: CanvasSize ): ParticleOptions {
    const position = this.createPosition(canvas);
    const angle = Math.random() * Math.PI * 2;
    const speed = this.random( this.config.minSpeed, this.config.maxSpeed);

    return {
      position,
      velocity: { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed},
      radius: this.random( this.config.minRadius, this.config.maxRadius),
      opacity: this.config.opacity,
      life: this.random( this.config.maxLife * 0.6, this.config.maxLife),
      mass: 1,
      color: { r: 255,g: 255,b: 255,a: 1 },
    };
  }

  /**
   * Creates the initial position based
   * on the configured emitter shape.
   */
  private createPosition( canvas: CanvasSize ) {
    switch (this.config.emitter.shape) {
      case "circle": {
        const radius = Math.min(canvas.width, canvas.height) * 0.25;
        const angle = Math.random() * Math.PI * 2;

        return {
          x: canvas.width / 2 + Math.cos(angle) * radius,
          y: canvas.height / 2 + Math.sin(angle) * radius,
        };
      }

      case "line":
        return { x: Math.random() * canvas.width, y: canvas.height / 2};

      case "point":
        return { x: canvas.width / 2, y: canvas.height / 2};

      case "fullscreen":
      default:
        return { x: Math.random() * canvas.width, y: Math.random() * canvas.height};
    }
  }

  /* Random number in range */
  private random( min: number, max: number ): number {
    return Math.random() * (max - min) + min;
  }
}