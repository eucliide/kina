import type { Event } from "../types/event";
import type { Activity } from "../types/activity";

import { getNextActivity } from "./activityService";
import {
  getNextStage,
  isFinalStage,
} from "./activityProgressionService";

/**
 * Coordinates progression through
 * the entire Ki event.
 */
export function advanceEvent(
  event: Event,
  activity: Activity,
  currentStageId: string,
) {
  // 1. Continue within the current partner.
  if (!isFinalStage(activity, currentStageId)) {
    return {
      action: "nextStage",
      stage: getNextStage(
        activity,
        currentStageId,
      ),
    };
  }

  // 2. Finished with this partner.
  if (
    event.rotation <
    activity.partnerRotations
  ) {
    return {
      action: "rotatePartner",
    };
  }

  // 3. Finished the activity.
  const nextActivity =
    getNextActivity(activity.id);

  if (nextActivity) {
    return {
      action: "nextActivity",
      activity: nextActivity,
    };
  }

  // 4. Entire evening complete.
  return {
    action: "finishEvent",
  };
}
