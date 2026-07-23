/**
 * Supported activity types.
 *
 * Every future activity in Ki
 * (Conversation Cards, Secret Missions,
 * TableTopics, WNRS, etc.)
 * will extend this model.
 */
export type ActivityType =
  | "conversation"
  | "mission"
  | "wnrs"
  | "tabletopics";

/**
 * Represents one playable activity.
 */
export interface Activity {
  /** Unique activity identifier */
  id: string;

  /** Display title */
  title: string;

  /** Activity category */
  type: ActivityType;

  /** Duration of one round (seconds) */
  durationSeconds: number;

  /** Number of rounds */
  rounds: number;

  /** Reflection shown afterwards */
  reflectionEnabled: boolean;
}
