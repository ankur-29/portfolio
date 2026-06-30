import Particle from "./Particle";

/**
 * Object pool for particle reuse.
 *
 * Prevents creating and destroying Particle
 * instances every frame, reducing garbage
 * collection and improving animation
 * performance.
 */
export default class ParticlePool {
  private readonly particles: Particle[];
  constructor(capacity: number) {
    this.particles = Array.from(
      { length: capacity }, (_, index) => new Particle(index)
    );
  }

  /**
   * Returns an inactive particle.
   * Returns null when the pool is exhausted.
   */
  acquire(): Particle | null {
    for (const particle of this.particles) {
      if (!particle.isAlive()) {
        return particle;
      }
    }

    return null;
  }

  /* Marks a particle as available */
  release(particle: Particle): void {
    particle.deactivate();
  }

  /* Releases every particle */
  releaseAll(): void {
    for (const particle of this.particles) {
      particle.deactivate();
    }
  }

  /**
   * Removes inactive particles from the active set.
   * Since the pool stores every particle permanently,
   * this simply ensures dead particles are marked
   * inactive.
   */
  recycle(): void {
    for (const particle of this.particles) {
      if (particle.isAlive() && particle.life <= 0) {
        particle.deactivate();
      }
    }
  }

  /* Returns all active particles */
  getActiveParticles(): Particle[] {
    return this.particles.filter((particle) => particle.isAlive());
  }

  /**
   * Returns every particle.
   * Useful for debugging or diagnostics.
   */
  getAllParticles(): readonly Particle[] {
    return this.particles;
  }

  /* Number of active particles */
  get activeCount(): number {
    let count = 0;
    for (const particle of this.particles) {
      if (particle.isAlive()) {
        count++;
      }
    }
    return count;
  }

  /*  Maximum capacity.*/
  get capacity(): number {
    return this.particles.length;
  }

  /* Clears the pool */
  clear(): void {
    this.releaseAll();
  }
}