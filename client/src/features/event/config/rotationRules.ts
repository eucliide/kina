/**
 * Rotation rules used throughout the event.
 *
 * These rules describe the intended behaviour
 * of the pairing engine. They should remain
 * independent of the implementation.
 */

export const ROTATION_RULES = {
  /**
   * Participants should never meet
   * the same person twice during
   * one event.
   */
  preventDuplicatePairs: true,

  /**
   * If the participant count is odd,
   * create one group of three instead
   * of leaving someone out.
   */
  allowGroupOfThree: true,

  /**
   * Try to keep the number of completed
   * conversations balanced.
   */
  balanceMeetings: true,

  /**
   * Ignore offline participants
   * when generating pairings.
   */
  ignoreOfflineParticipants: true,

  /**
   * Activities reuse the same
   * pairing engine.
   */
  sharedAcrossActivities: true,
} as const;
