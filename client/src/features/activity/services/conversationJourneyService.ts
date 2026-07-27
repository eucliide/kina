import { ROTATION_ONE } from "../data/conversationJourney/rotation1";

import type { ConversationPrompt } from "../types/conversationPrompt";

/**
 * Returns a prompt for the
 * current partner rotation
 * and stage.
 */
export function getConversationPrompt(
  partnerRotation: number,
  stageId: string,
): ConversationPrompt | undefined {
  switch (partnerRotation) {
    case 1:
      return ROTATION_ONE.find(
        (prompt) => prompt.stageId === stageId,
      );

    default:
      return undefined;
  }
}
