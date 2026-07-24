/**
 * Represents one Ki event.
 *
 * Everything inside the application
 * belongs to one active event.
 */

export interface Event {
  id: string;

  name: string;

  /**
   * Current activity being played.
   */
  activityId: string;

  /**
   * Host controls progression.
   */
  hostId: string;

  /**
   * Current stage.
   */
  stage: EventStage;

  /**
   * Number of completed rotations.
   */
  rotation: number;

  createdAt: Date;
}

export type EventStage =
  | "waiting"
  | "activity"
  | "transition"
  | "completed";
