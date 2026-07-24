import { ACTIVITIES } from "../data/activities";
import type { Activity } from "../types/activity";

/**
 * Returns the first activity
 * of the event.
 */
export function getFirstActivity(): Activity {
  return ACTIVITIES[0];
}

/**
 * Returns the next activity,
 * or null if the event
 * has finished.
 */
export function getNextActivity(
  currentActivityId: string,
): Activity | null {
  const currentIndex =
    ACTIVITIES.findIndex(
      (activity) =>
        activity.id === currentActivityId,
    );

  if (currentIndex === -1) {
    return null;
  }

  return (
    ACTIVITIES[currentIndex + 1] ??
    null
  );
}
