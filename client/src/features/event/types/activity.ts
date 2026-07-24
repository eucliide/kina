/**
 * Represents one activity
 * inside a Ki event.
 */
export interface Activity {
  id: string;

  /**
   * Display name.
   */
  name: string;

  /**
   * Internal type.
   */
  type: ActivityType;

  /**
   * Number of partner rotations.
   *
   * Whole-group activities
   * simply use 1.
   */
  rotations: number;

  /**
   * Duration of one rotation,
   * in seconds.
   */
  durationSeconds: number;
}

export type ActivityType =
  | "conversation"
  | "sharedReflection"
  | "groupDiscussion"
  | "missionReveal";

