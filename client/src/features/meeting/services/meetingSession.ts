import type { MeetingSession } from "../types";

let activeSession: MeetingSession | null = null;

export function createSession(
  participant: MeetingSession["participant"],
) {
  activeSession = {
    meetingId: crypto.randomUUID(),

    participant,

    partnerRotation: 1,

    activityId: "conversationJourney",

    currentStageId: "gettingComfortable",

    startedAt: new Date(),
  };
}

export function getSession() {
  return activeSession;
}

export function updateSession(
  session: MeetingSession,
) {
  activeSession = session;
}

export function clearSession() {
  activeSession = null;
}
