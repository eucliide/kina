import type { MeetingSession } from "../types";

export const meetingSession: MeetingSession = {
  meetingId: crypto.randomUUID(),

  participant: {
    id: "1",
    name: "Sarah",
  },

  round: 1,

  phase: "conversation",

  startedAt: new Date(),
};
