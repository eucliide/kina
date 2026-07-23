import type { MeetingSession } from "../types";

let activeSession: MeetingSession | null = null;

export function createSession(
  participant: MeetingSession["participant"],
) {
  activeSession = {
    meetingId: crypto.randomUUID(),

    participant,

    round: 1,

    phase: "conversation",

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
