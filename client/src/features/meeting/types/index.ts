import type { Participant } from "@/features/lobby/types";

/**
 * Represents one active
 * conversation with a partner.
 */
export interface MeetingSession {
  /**
   * Unique meeting session.
   */
  meetingId: string;

  /**
   * Current partner.
   */
  participant: Participant;

  /**
   * Which partner rotation
   * this conversation belongs to.
   */
  partnerRotation: number;

  /**
   * Current stage within
   * the conversation journey.
   */
  currentStageId: string;

  /**
   * Current activity.
   */
  activityId: string;

  /**
   * When the session began.
   */
  startedAt: Date;
}
