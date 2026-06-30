import type { ConnectionOptions, ParticleConfig } from "./types";

/* Rendering */
export const TARGET_FPS = 60;
export const FRAME_TIME = 1000 / TARGET_FPS;

/* Canvas */
export const DEFAULT_DPR = 1;
export const MAX_DPR = 2;

/* Particle Defaults */
export const DEFAULT_PARTICLE_COUNT = 140;
export const MIN_PARTICLE_RADIUS = 1;
export const MAX_PARTICLE_RADIUS = 2;
export const MIN_PARTICLE_SPEED = 8;
export const MAX_PARTICLE_SPEED = 25;
export const DEFAULT_PARTICLE_OPACITY = 0.5;
export const DEFAULT_PARTICLE_MASS = 1;
export const DEFAULT_PARTICLE_LIFE = Number.POSITIVE_INFINITY;

/* Physics */
export const DRAG = 0.997;
export const FRICTION = 1;
export const GRAVITY = 0;

/* Mouse */
export const DEFAULT_MOUSE_RADIUS = 140;
export const DEFAULT_MOUSE_STRENGTH = 120;

/* Connections */
export const DEFAULT_CONNECTION_OPTIONS: Readonly<ConnectionOptions> = {
  enabled: true,
  distance: 100,
  opacity: 0.06,
  lineWidth: 1,
};

/* Performance */
export const MAX_NEIGHBOURS = 32;

/* Animation */
export const RESIZE_DEBOUNCE_MS = 100;

/* Default Engine Configuration */
export const DEFAULT_PARTICLE_CONFIG: Readonly<ParticleConfig> = {
  count: DEFAULT_PARTICLE_COUNT,
  minRadius: MIN_PARTICLE_RADIUS,
  maxRadius: MAX_PARTICLE_RADIUS,
  minSpeed: MIN_PARTICLE_SPEED,
  maxSpeed: MAX_PARTICLE_SPEED,
  opacity: DEFAULT_PARTICLE_OPACITY,
  maxLife: DEFAULT_PARTICLE_LIFE,
  connection: DEFAULT_CONNECTION_OPTIONS,
  mouse: {
    enabled: true,
    interaction: "repel",
    radius: DEFAULT_MOUSE_RADIUS,
    strength: DEFAULT_MOUSE_STRENGTH,
  },
  emitter: {
    shape: "fullscreen",
  },
  grid: {
    cellSize: 120
  }
} as const;