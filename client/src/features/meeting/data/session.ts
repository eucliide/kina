import type { MeetingSession } from "../types";

export const meetingSession: MeetingSession = {
  meetingId: crypto.randomUUID(),

  participant: {
    id: "1",
    name: "Sarah",
    status: "available",
  },

  partnerRotation: 1,

  activityId: "conversationJourney",

  currentStageId: "gettingComfortable",

  startedAt: new Date(),
};
