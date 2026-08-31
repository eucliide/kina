import { CONVERSATION_STAGES } from "@/features/activity/data/conversationStages";

/**
 * Returns the index of a conversation stage.
 */
export function getStageIndex(stageId: string): number {
  return CONVERSATION_STAGES.findIndex(
    (stage) => stage.id === stageId,
  );
}

/**
 * Returns the current conversation stage.
 */
export function getCurrentStage(stageId: string) {
  return CONVERSATION_STAGES.find(
    (stage) => stage.id === stageId,
  );
}

/**
 * Returns the next conversation stage.
 *
 * Returns null when the current stage is
 * the final stage of the rotation.
 */
export function getNextStage(stageId: string) {
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
 * Total duration of one complete partner rotation.
 *
 * 6 + 6 + 6 + 2 = 20 minutes.
 */
export function getTotalStageDuration(): number {
  return CONVERSATION_STAGES.reduce(
    (total, stage) => total + stage.duration,
    0,
  );
}

/**
 * Returns the number of seconds from the beginning
 * of the rotation until the specified stage begins.
 *
 * gettingComfortable = 0
 * sharingStories = 360
 * discoveringValues = 720
 * reflection = 1080
 */
export function getStageOffset(stageId: string): number {
  const index = getStageIndex(stageId);

  if (index < 0) {
    return 0;
  }

  return CONVERSATION_STAGES
    .slice(0, index)
    .reduce(
      (total, stage) => total + stage.duration,
      0,
    );
}

/**
 * Determines which stage should be active based on
 * elapsed seconds since the authoritative round start.
 */
export function getStageForElapsedSeconds(
  elapsedSeconds: number,
) {
  let accumulated = 0;

  for (const stage of CONVERSATION_STAGES) {
    accumulated += stage.duration;

    if (elapsedSeconds < accumulated) {
      return stage;
    }
  }

  return CONVERSATION_STAGES[
    CONVERSATION_STAGES.length - 1
  ];
}

/**
 * Returns the remaining seconds in the current stage
 * based on the authoritative rotation start time.
 */
export function getRemainingStageSeconds(
  roundStartedAt: Date,
  stageId: string,
  now = Date.now(),
): number {
  const stage = getCurrentStage(stageId);

  if (!stage) {
    return 0;
  }

  const stageEndTime =
    roundStartedAt.getTime() +
    (getStageOffset(stageId) + stage.duration) * 1000;

  return Math.max(
    0,
    Math.ceil((stageEndTime - now) / 1000),
  );
}

/**
 * Returns the absolute timestamp at which a stage ends.
 */
export function getStageEndTime(
  roundStartedAt: Date,
  stageId: string,
): Date {
  const stage = getCurrentStage(stageId);

  if (!stage) {
    return new Date(roundStartedAt.getTime());
  }

  return new Date(
    roundStartedAt.getTime() +
      (getStageOffset(stageId) + stage.duration) * 1000,
  );
}
