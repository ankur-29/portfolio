import Particle from "./Particle";
import SpatialGrid from "./SpatialGrid";

import type { ConnectionOptions } from "./types";

/**
 * Draws connection lines between nearby particles.
 * Uses SpatialGrid to avoid O(n²) neighbour checks.
 */
export default class ConnectionRenderer {
  constructor(
    private readonly options: ConnectionOptions
  ) {}

  /* Renders all particle connections.*/
  render(
    context: CanvasRenderingContext2D,
    particles: readonly Particle[],
    spatialGrid: SpatialGrid
  ): void {
    if (!this.options.enabled) {
      return;
    }

    context.save();
    context.lineWidth = this.options.lineWidth;

    for (const particle of particles) {
      if (!particle.isAlive()) {
        continue;
      }
      const neighbours = spatialGrid.getNearbyParticles(particle);
      for (const neighbour of neighbours) {
        if (!neighbour.isAlive()) {
          continue;
        }

        /* Prevent drawing the same line twice */
        if (particle.id >= neighbour.id) {
          continue;
        }

        const dx = neighbour.position.x - particle.position.x;
        const dy = neighbour.position.y - particle.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > this.options.distance) {
          continue;
        }

        const alpha = (1 - distance / this.options.distance) * this.options.opacity;

        context.strokeStyle = `rgba(
          ${particle.color.r}, 
          ${particle.color.g}, 
          ${particle.color.b},
          ${alpha}
        )`;

        context.beginPath();
        context.moveTo( particle.position.x, particle.position.y);
        context.lineTo( neighbour.position.x, neighbour.position.y);
        context.stroke();
      }
    }
    context.restore();
  }
}