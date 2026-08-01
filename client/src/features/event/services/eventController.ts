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

import type { MeetingSession } from "@/features/meeting/types";

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
 * Business decisions only.
 * No UI, navigation, or animation.
 */
export function advanceEvent(
  _event: Event,
  activity: Activity,
  session: MeetingSession,
): EventControllerResult {
  /**
   * Continue within the current
   * conversation.
   */
  if (
    !isFinalStage(
      activity,
      session.currentStageId,
    )
  ) {
    const nextStage = getNextStage(
      activity,
      session.currentStageId,
    );

    if (!nextStage) {
      throw new Error(
        "Unable to determine next stage.",
      );
    }

    return {
      action: "nextStage",
      stage: nextStage,
    };
  }

  /**
   * Current partner's conversation
   * is complete.
   *
   * Rotate if more partners remain.
   */
  if (
    session.partnerRotation <
    activity.partnerRotations
  ) {
    return {
      action: "rotatePartner",
    };
  }

  /**
   * Current activity is complete.
   *
   * Move to the next activity.
   */
  const nextActivity =
    getNextActivity(activity.id);

  if (nextActivity) {
    return {
      action: "nextActivity",
      activity: nextActivity,
    };
  }

  /**
   * No activities remain.
   */
  return {
    action: "finishEvent",
  };
}
