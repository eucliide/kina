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
   * Host controls progression.
   */
  hostId: string;

  /**
   * Current stage.
   */
  stage: EventStage;

  /**
   * Current activity being played.
   */
  currentActivityId: string;

  createdAt: Date;
}

export type EventStage =
  | "waiting"
  | "activity"
  | "transition"
  | "completed";
