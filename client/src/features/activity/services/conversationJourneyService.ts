import { ROTATION_ONE } from "../data/conversationJourney/rotation1";
import { ROTATION_TWO } from "../data/conversationJourney/rotation2";
import { ROTATION_THREE } from "../data/conversationJourney/rotation3";
import { ROTATION_FOUR } from "../data/conversationJourney/rotation4";

import type { ConversationPrompt } from "../types/conversationPrompt";

/**
 * Returns the shared prompt for the
 * current partner rotation and stage.
 */
export function getConversationPrompt(
  partnerRotation: number,
  stageId: string,
): ConversationPrompt | undefined {
  const rotations = {
    1: ROTATION_ONE,
    2: ROTATION_TWO,
    3: ROTATION_THREE,
    4: ROTATION_FOUR,
  };

  const prompts =
    rotations[
      partnerRotation as keyof typeof rotations
    ];

  if (!prompts) {
    return undefined;
  }

  return prompts.find(
    (prompt) => prompt.stageId === stageId,
  );
}
