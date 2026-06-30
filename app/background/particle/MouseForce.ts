import Particle from "./Particle";

import type { MouseState, MouseInteraction } from "./types";

/**
 * Applies mouse interaction to particles.
 * Responsible only for:
 * - storing mouse state
 * - applying mouse forces
 * Does NOT:
 * - listen to DOM events
 * - render anything
 * - update particles
 */
export default class MouseForce {
  private mouse: MouseState = {
    position: {x: 0, y: 0},
    radius: 0,
    active: false,
  };

  constructor(
    private readonly interaction: MouseInteraction,
    private readonly strength: number
  ) {}

  /* Updates the current mouse state */
  setMouse( mouse: MouseState ): void {
    this.mouse = mouse;
  }

  /* Applies the configured interaction */
  apply( particles: readonly Particle[], delta: number): void {
    if (!this.mouse.active) {
      return;
    }

    for (const particle of particles) {
      if (!particle.isAlive()) {
        continue;
      }

      this.applyToParticle( particle, delta );
    }
  }

  /* Applies the selected interaction to one particle */
  private applyToParticle( particle: Particle, delta: number ): void {
    const dx = particle.position.x - this.mouse.position.x;
    const dy = particle.position.y - this.mouse.position.y;

    const distance = Math.sqrt( dx * dx + dy * dy );

    if ( distance === 0 || distance > this.mouse.radius) {
      return;
    }

    const influence = 1 - distance / this.mouse.radius;
    const nx = dx / distance;
    const ny = dy / distance;
    let forceX = 0;
    let forceY = 0;

    switch (this.interaction) {
      case "repel":
        forceX = nx;
        forceY = ny;
        break;

      case "attract":
        forceX = -nx;
        forceY = -ny;
        break;

      case "vortex":
        forceX = -ny;
        forceY = nx;
        break;

      case "none":
      default:
        return;
    }

    particle.applyForce({
      x: forceX * this.strength * influence * delta,
      y: forceY * this.strength * influence * delta,
    });
  }
}