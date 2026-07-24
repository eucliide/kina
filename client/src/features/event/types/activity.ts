/**
 * Represents one activity
 * within a Ki event.
 */
export interface Activity {
  id: string;

  /**
   * Display name.
   */
  name: string;

  type: ActivityType;

  /**
   * Pairs or whole group.
   */
  format: ActivityFormat;

  /**
   * Number of different partners
   * during this activity.
   */
  partnerRotations: number;

  /**
   * Ordered conversation stages.
   */
  stages: ActivityStage[];
}

/**
 * One stage inside an activity.
 *
 * Every participant experiences
 * these stages together before
 * moving to the next partner.
 */
export interface ActivityStage {
  id: string;

  title: string;

  durationSeconds: number;
}

export type ActivityFormat =
  | "pairs"
  | "group";

export type ActivityType =
  | "conversationJourney"
  | "sharedReflections"
  | "aroundTheCircle"
  | "missionReveal";
