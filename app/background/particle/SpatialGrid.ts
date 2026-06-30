import Particle from "./Particle";

/**
 * Uniform spatial grid used for fast neighbour lookup.
 * Instead of checking every particle against every
 * other particle (O(n²)), particles are stored in
 * grid cells so only nearby cells are searched.
 */
export default class SpatialGrid {
  private readonly cells = new Map<string, Particle[]>();
  constructor(
    private readonly cellSize: number
  ) {}

  /* Clears every cell */
  clear(): void {
    this.cells.clear();
  }

  /* Rebuilds the entire grid. */
  rebuild( particles: readonly Particle[] ): void {
    this.clear();
    for (const particle of particles) {
      if (!particle.isAlive()) {
        continue;
      }

      const key = this.getCellKey( particle.position.x, particle.position.y );
      let bucket = this.cells.get(key);

      if (!bucket) {
        bucket = [];
        this.cells.set(key, bucket);
      }
      bucket.push(particle);
    }
  }

  /**
   * Returns neighbouring particles.
   *
   * Searches the current cell and the surrounding
   * eight cells.
   */
  getNearbyParticles( particle: Particle ): Particle[] {
    const neighbours: Particle[] = [];
    const cellX = Math.floor( particle.position.x / this.cellSize);
    const cellY = Math.floor( particle.position.y / this.cellSize );

    for (let y = cellY - 1; y <= cellY + 1; y++) {
      for (let x = cellX - 1; x <= cellX + 1; x++) {
        const bucket = this.cells.get(`${x}:${y}`);

        if (!bucket) {
          continue;
        }

        for (const candidate of bucket) {
          if (candidate !== particle) {
            neighbours.push(candidate);
          }
        }
      }
    }

    return neighbours;
  }

  /* Converts world coordinates into a cell key */
  private getCellKey( x: number, y: number ): string {
    const cellX = Math.floor(x / this.cellSize);
    const cellY = Math.floor(y / this.cellSize);
    return `${cellX}:${cellY}`;
  }
}