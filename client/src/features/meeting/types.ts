import type { Participant } from "@/features/event/types";

/**
 * Represents the current phase
 * of a meeting.
 */
export type MeetingPhase =
  | "conversation"
  | "reflection"
  | "complete";

/**
 * Represents an active meeting session
 * between two participants.
 */
export interface MeetingSession {
  /** Unique meeting identifier */
  meetingId: string;

  /** Current partner */
  participant: Participant;

  /** Current round number */
  round: number;

  /** Current meeting phase */
  phase: MeetingPhase;

  /** Timestamp when meeting started */
  startedAt: Date;
}
