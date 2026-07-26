/**
 * Represents a reusable transition
 * between two moments in a Ki event.
 */
export interface Transition {
  id: string;

  /**
   * Display name.
   */
  name: string;

  /**
   * Ordered scenes.
   */
  scenes: TransitionScene[];
}

/**
 * One visual scene within
 * a transition.
 */
export interface TransitionScene {
  id: string;

  /**
   * Scene type understood
   * by the UI.
   */
  type: TransitionSceneType;

  /**
   * Minimum time this scene
   * remains visible.
   */
  durationMs: number;
}

export type TransitionSceneType =
  | "fadeOut"
  | "envelope"
  | "passport"
  | "hostMessage"
  | "partnerReveal"
  | "fadeIn";
