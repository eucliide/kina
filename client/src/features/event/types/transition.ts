/**
 * Represents a visual transition
 * shown between event states.
 */
export interface Transition {
  id: string;

  name: string;

  steps: TransitionStep[];
}

/**
 * One step inside a transition.
 */
export interface TransitionStep {
  id: string;

  type: TransitionStepType;

  /**
   * Duration in milliseconds.
   */
  durationMs: number;
}

export type TransitionStepType =
  | "fadeOut"
  | "envelopeAppear"
  | "envelopeOpen"
  | "passportStamp"
  | "messageReveal"
  | "partnerReveal"
  | "fadeIn";
