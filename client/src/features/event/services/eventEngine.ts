import type { MeetingResult } from "@/features/meeting/types/meetingResult";

export interface EventDecision {
  nextActivityId: string;

  nextRotation: number;

  shouldEndEvent: boolean;
}

const ACTIVITY_ORDER = [
  "conversationJourney",
  "tableTopics",
  "wnrs",
];

const ROTATIONS_PER_ACTIVITY = 4;

export function decideNextStep(
  meeting: MeetingResult,
): EventDecision {
  const activityIndex =
    ACTIVITY_ORDER.indexOf(
      meeting.activityId,
    );

  /**
   * Continue current activity.
   */
  if (
    meeting.rotation <
    ROTATIONS_PER_ACTIVITY
  ) {
    return {
      nextActivityId:
        meeting.activityId,

      nextRotation:
        meeting.rotation + 1,

      shouldEndEvent: false,
    };
  }

  /**
   * Event finished.
   */
  if (
    activityIndex ===
    ACTIVITY_ORDER.length - 1
  ) {
    return {
      nextActivityId:
        meeting.activityId,

      nextRotation:
        meeting.rotation,

      shouldEndEvent: true,
    };
  }

  /**
   * Move to next activity.
   */
  return {
    nextActivityId:
      ACTIVITY_ORDER[
        activityIndex + 1
      ],

    nextRotation: 1,

    shouldEndEvent: false,
  };
}
