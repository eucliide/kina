/**
 * Represents one pairing between
 * two participants.
 *
 * The order does not matter:
 * A-B is the same as B-A.
 */
export interface Pair {
  /** First participant */
  participantAId: string;

  /** Second participant */
  participantBId: string;
}

/**
 * Represents one rotation within
 * an activity.
 *
 * Example:
 * Activity:
 * Conversation Cards
 *
 * Rotation #2
 *
 * Sarah ↔ Kevin
 * James ↔ Emma
 */
export interface Rotation {
  /** Rotation number */
  round: number;

  /** Generated pairings */
  pairs: Pair[];
}

/**
 * Stores every pairing that has
 * already happened during the event.
 *
 * This allows the pairing engine
 * to avoid duplicates.
 */
export interface PairHistory {
  /** Participant A */
  participantAId: string;

  /** Participant B */
  participantBId: string;

  /** Activity where they met */
  activityId: string;
}
