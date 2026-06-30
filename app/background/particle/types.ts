/**
 * Represents a 2D vector.
 */
export interface Vector2 { x: number; y: number }

/**
 * RGBA color definition.
 */
export interface ParticleColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

/**
 * Runtime particle state.
 */
export interface ParticleState {
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
}

/**
 * Particle initialization options.
 */
export interface ParticleOptions {
  position?: Partial<Vector2>;
  velocity?: Partial<Vector2>;
  radius?: number;
  opacity?: number;
  life?: number;
  mass?: number;
  color?: Partial<ParticleColor>;
}

/**
 * Spawn region.
 */
export type EmitterShape =
  | "fullscreen"
  | "circle"
  | "line"
  | "point";

/**
 * Mouse interaction.
 */
export type MouseInteraction =
  | "none"
  | "repel"
  | "attract"
  | "vortex";

/**
 * Connection rendering.
 */
export interface ConnectionOptions {
  enabled: boolean;
  distance: number;
  opacity: number;
  lineWidth: number;
}

/**
 * Mouse runtime state.
 */
export interface MouseState {
  position: Vector2;
  radius: number;
  active: boolean;
}

/**
 * Canvas size.
 */
export interface CanvasSize {
  width: number;
  height: number;
}

/**
 * Delta time.
 */
export interface FrameContext {
  delta: number;
  elapsed: number;
}

/**
 * Global particle engine configuration.
 */
export interface ParticleConfig {
  count: number;
  minRadius: number;
  maxRadius: number;
  minSpeed: number;
  maxSpeed: number;
  opacity: number;
  maxLife: number;
  connection: ConnectionOptions;
  mouse: {
    enabled: boolean;
    interaction: MouseInteraction;
    radius: number;
    strength: number;
  };
  emitter: {
    shape: EmitterShape;
  };
  grid: {
    cellSize: number;
  };
}