/**
 * Represents the current progress
 * within one activity.
 *
 * This resets whenever a new
 * activity begins.
 */
export interface ActivitySession {
  /**
   * Current partner rotation.
   *
   * Example:
   * 1 = first partner
   * 2 = second partner
   */
  currentPartnerRotation: number;

  /**
   * Current stage.
   */
  currentStageId: string;

  /**
   * Current prompt shown
   * to participants.
   */
  currentPromptId?: string;

  /**
   * Activity start time.
   */
  startedAt: Date;
}
