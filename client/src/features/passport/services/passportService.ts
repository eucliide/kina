import type { ConversationPassport } from "../types/conversationPassport";

/**
 * Creates a fresh passport
 * for a new partner.
 */
export function createPassport(
  rotation: number,
): ConversationPassport {
  return {
    rotation,

    currentChapter: 1,

    completedChapters: [],
  };
}

/**
 * Marks a chapter complete.
 */
export function completeChapter(
  passport: ConversationPassport,
  chapter: number,
): ConversationPassport {
  if (
    passport.completedChapters.includes(
      chapter,
    )
  ) {
    return passport;
  }

  return {
    ...passport,

    currentChapter: chapter + 1,

    completedChapters: [
      ...passport.completedChapters,
      chapter,
    ],
  };
}
