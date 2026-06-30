import Particle from "./Particle";

import type { CanvasSize, ParticleConfig } from "./types";

/* Handles particle movement and boundary collision */
export default class ParticlePhysics {
  constructor(
    private readonly config: ParticleConfig
  ) {}

  /* Updates all particles */
  update(
    particles: readonly Particle[],
    canvas: CanvasSize,
    delta: number
  ): void {
    for (const particle of particles) {
      if (!particle.isAlive()) {
        continue;
      }
      this.applyDrag(particle);
      particle.update(delta);
      this.resolveBounds( particle, canvas);
    }
  }

  /* Applies drag to reduce velocity */
  private applyDrag( particle: Particle ): void {
    particle.velocity.x *= 0.995;
    particle.velocity.y *= 0.995;
  }

  /* Keeps particles inside the canvas */
  private resolveBounds( particle: Particle, canvas: CanvasSize): void {
    const r = particle.radius;

    // Left
    if (particle.position.x < r) {
      particle.position.x = r;
      particle.velocity.x *= -1;
    }

    // Right
    if (particle.position.x > canvas.width - r) {
      particle.position.x = canvas.width - r;
      particle.velocity.x *= -1;
    }

    // Top
    if (particle.position.y < r) {
      particle.position.y = r;
      particle.velocity.y *= -1;
    }

    // Bottom
    if (particle.position.y > canvas.height - r) {
      particle.position.y = canvas.height - r;
      particle.velocity.y *= -1;
    }
  }
}