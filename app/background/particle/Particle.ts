import type { ParticleColor, ParticleOptions, ParticleState, Vector2 } from "./types";

/**
 * Represents a single particle.
 *
 * Responsible for:
 * - Maintaining particle state
 * - Applying forces
 * - Updating motion
 * - Rendering itself
 */
export default class Particle implements ParticleState {
  id: number;
  position: Vector2;
  velocity: Vector2;
  acceleration: Vector2;
  radius: number;
  opacity: number;
  life: number;
  maxLife: number;
  mass: number;
  color: ParticleColor;
  active: boolean;
  constructor(id: number) {
    this.id = id;
    this.position = { x: 0, y: 0 };
    this.velocity = { x: 0, y: 0 };
    this.acceleration = { x: 0, y: 0 };
    this.radius = 1;
    this.opacity = 1;
    this.life = 0;
    this.maxLife = 0;
    this.mass = 1;
    this.color = { r: 255, g: 255,b: 255, a: 1 };
    this.active = false;
  }

  /* Initializes or reuses the particle */
  reset(options: ParticleOptions): void {
    this.position.x = options.position?.x ?? 0;
    this.position.y = options.position?.y ?? 0;
    this.velocity.x = options.velocity?.x ?? 0;
    this.velocity.y = options.velocity?.y ?? 0;
    this.acceleration.x = 0;
    this.acceleration.y = 0;
    this.radius = options.radius ?? 2;
    this.opacity = options.opacity ?? 1;
    this.life = options.life ?? 10;
    this.maxLife = this.life;
    this.mass = options.mass ?? 1;
    this.color = {
      r: options.color?.r ?? 255,
      g: options.color?.g ?? 255,
      b: options.color?.b ?? 255,
      a: options.color?.a ?? 1,
    };

    this.active = true;
  }

  /* Applies a force using F = ma */
  applyForce(force: Vector2): void {
    this.acceleration.x += force.x / this.mass;
    this.acceleration.y += force.y / this.mass;
  }

  /* Updates particle motion */
  update(delta: number): void {
    if (!this.active) {
      return;
    }
    this.velocity.x += this.acceleration.x * delta;
    this.velocity.y += this.acceleration.y * delta;
    this.position.x += this.velocity.x * delta;
    this.position.y += this.velocity.y * delta;
    this.acceleration.x = 0;
    this.acceleration.y = 0;
    this.life -= delta;

    if (this.life <= 0) {
      this.deactivate();
    }
  }

  /* Draws the particle */
  draw( context: CanvasRenderingContext2D): void {
    if (!this.active) {
      return;
    }

    const alpha = (this.life / this.maxLife) * this.opacity;

    context.beginPath();
    context.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha})`;
    context.arc( this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }

  /* Marks the particle as inactive.*/
  deactivate(): void {
    this.active = false;
  }

  /* Returns whether the particle is active.*/
  isAlive(): boolean {
    return this.active;
  }
}