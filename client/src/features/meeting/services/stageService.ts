import { CONVERSATION_STAGES } from "../data/conversationStages";

/**
 * Returns the index of a stage.
 */
export function getStageIndex(
  stageId: string,
): number {
  return CONVERSATION_STAGES.findIndex(
    (stage) => stage.id === stageId,
  );
}

/**
 * Returns the next stage,
 * or null if finished.
 */
export function getNextStage(
  stageId: string,
) {
  const index = getStageIndex(stageId);

  if (
    index < 0 ||
    index >= CONVERSATION_STAGES.length - 1
  ) {
    return null;
  }

  return CONVERSATION_STAGES[index + 1];
}

/**
 * Returns the current stage.
 */
export function getCurrentStage(
  stageId: string,
) {
  return CONVERSATION_STAGES.find(
    (stage) => stage.id === stageId,
  );
}
