import type { ConversationPassport } from "../types/conversationPassport";

/**
 * Creates a fresh passport for a new partner rotation.
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
 * Marks a chapter complete and advances
 * the passport to the following chapter.
 */
export function completeChapter(
  passport: ConversationPassport,
  chapter: number,
): ConversationPassport {
  if (
    passport.completedChapters.includes(chapter)
  ) {
    return passport;
  }

  const nextChapter = Math.min(
    chapter + 1,
    4,
  );

  return {
    ...passport,

    currentChapter: nextChapter,

    completedChapters: [
      ...passport.completedChapters,
      chapter,
    ],
  };
}
