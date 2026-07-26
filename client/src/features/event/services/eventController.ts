import type { Event } from "../types/event";
import type {
  Activity,
  ActivityStage,
} from "../types/activity";
import type { EventAction } from "../types/eventAction";

import { getNextActivity } from "./activityService";
import {
  getNextStage,
  isFinalStage,
} from "./activityProgressionService";

export interface EventControllerResult {
  /**
   * Next action the application
   * should perform.
   */
  action: EventAction;

  /**
   * Next stage within the current
   * activity, if applicable.
   */
  stage?: ActivityStage;

  /**
   * Next activity in the event,
   * if the current one has finished.
   */
  activity?: Activity;
}

/**
 * Coordinates progression through
 * the current Ki event.
 *
 * This controller contains business
 * decisions only. It does not
 * navigate, animate, or update UI.
 */
export function advanceEvent(
  event: Event,
  activity: Activity,
  session: ActivitySession,
): EventControllerResult {
  // Continue within the current partner.
  if (!isFinalStage(activity, currentStageId)) {
    return {
      action: "nextStage",
      stage: getNextStage(
        activity,
        session.currentStageId,
      ),
    };
  }

  // Finished all stages with this partner.
  // Rotate if more partner rotations remain.
  if (
    session.currentPartnerRotation <
    activity.partnerRotations
  ) {
    return {
      action: "rotatePartner",
    };
  }

  // Finished the activity.
  const nextActivity =
    getNextActivity(activity.id);

  if (nextActivity) {
    return {
      action: "nextActivity",
      activity: nextActivity,
    };
  }

  // Entire event has finished.
  return {
    action: "finishEvent",
  };
}
