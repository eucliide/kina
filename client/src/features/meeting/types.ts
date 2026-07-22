export type MeetingPhase =
  | "conversation"
  | "reflection"
  | "complete";

export interface MeetingSession {
  meetingId: string;

  participant: {
    id: string;
    name: string;
  };

  round: number;

  phase: MeetingPhase;

  startedAt: Date;
}