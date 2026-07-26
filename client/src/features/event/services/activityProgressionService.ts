import type {
  Activity,
  ActivityStage,
} from "../types/activity";

/**
 * Returns the first stage
 * of an activity.
 */
export function getFirstStage(
  activity: Activity,
): ActivityStage {
  return activity.stages[0];
}

/**
 * Returns the next stage
 * within an activity.
 */
export function getNextStage(
  activity: Activity,
  currentStageId: string,
): ActivityStage | null {
  const currentIndex =
    activity.stages.findIndex(
      (stage) =>
        stage.id === currentStageId,
    );

  if (currentIndex === -1) {
    return null;
  }

  return (
    activity.stages[currentIndex + 1] ??
    null
  );
}

/**
 * Returns true if the current
 * stage is the last one.
 */
export function isFinalStage(
  activity: Activity,
  currentStageId: string,
): boolean {
  return (
    getNextStage(
      activity,
      currentStageId,
    ) === null
  );
}
