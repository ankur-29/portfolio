/* Generic renderer implemented by all background effects */
export interface Renderer {
  init(): void;

  /* Called whenever the canvas size changes.*/
  resize(width: number, height: number): void;

  /**
   * Update internal state.
   * @param delta Seconds since previous frame.
   */
  update(delta: number): void;

  /* Draw the current frame */
  render(): void;

  /* Cleanup resources.*/
  destroy(): void;

  /** Optional mouse handler */
  setMouse?(mouse: import("../particle").MouseState): void;
}

