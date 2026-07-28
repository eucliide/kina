import { useState } from "react";

import type { ConversationPassport } from "../types/conversationPassport";

import {
  createPassport,
  completeChapter,
} from "../services/passportService";

export function useConversationPassport(
  rotation: number,
) {
  const [passport, setPassport] =
    useState<ConversationPassport>(
      createPassport(rotation),
    );

  /**
   * Marks the current chapter
   * as completed.
   */
  function completeCurrentChapter(
    chapter: number,
  ) {
    setPassport((current) =>
      completeChapter(
        current,
        chapter,
      ),
    );
  }

  return {
    passport,

    completeCurrentChapter,
  };
}
