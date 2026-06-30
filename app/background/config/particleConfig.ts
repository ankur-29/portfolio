import type { ParticleConfig } from "../particle/types";

import {
  DEFAULT_PARTICLE_COUNT,
  MIN_PARTICLE_RADIUS,
  MAX_PARTICLE_RADIUS,
  MIN_PARTICLE_SPEED,
  MAX_PARTICLE_SPEED,
  DEFAULT_PARTICLE_OPACITY,
  DEFAULT_PARTICLE_LIFE,
  DEFAULT_CONNECTION_OPTIONS,
  DEFAULT_MOUSE_RADIUS,
  DEFAULT_MOUSE_STRENGTH,
} from "../particle/constants";

/**
 * Default particle configuration.
 *
 * This object is consumed by the ParticleRenderer and can be overridden
 * for different visual effects without modifying the engine.
 */
export const particleConfig: Readonly<ParticleConfig> = {
  count: DEFAULT_PARTICLE_COUNT,
  minRadius: MIN_PARTICLE_RADIUS,
  maxRadius: MAX_PARTICLE_RADIUS,
  minSpeed: MIN_PARTICLE_SPEED,
  maxSpeed: MAX_PARTICLE_SPEED,
  opacity: DEFAULT_PARTICLE_OPACITY,
  maxLife: DEFAULT_PARTICLE_LIFE,
  connection: {
    ...DEFAULT_CONNECTION_OPTIONS,
  },
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
    cellSize: 100,
  },
} as const;

export default particleConfig;