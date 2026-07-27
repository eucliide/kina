/**
 * Represents the user's
 * progress through the
 * Conversation Journey.
 */
export interface ConversationPassport {
  /**
   * Current partner rotation.
   */
  rotation: number;

  /**
   * Current chapter.
   */
  currentChapter: number;

  /**
   * Chapters completed with
   * this partner.
   */
  completedChapters: number[];
}
