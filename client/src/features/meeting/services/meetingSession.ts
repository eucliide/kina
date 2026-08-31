import type { MeetingSession } from "../types";

let activeSession: MeetingSession | null = null;

/**
 * Creates the local session for the participant's
 * current partner rotation.
 *
 * Timing is NOT stored here.
 * Authoritative timing belongs to the event record.
 */
export function createSession(
  participant: MeetingSession["participant"],
  partnerRotation = 1,
) {
  activeSession = {
    meetingId: crypto.randomUUID(),

    participant,

    partnerRotation,

    activityId: "conversationJourney",

    currentStageId: "gettingComfortable",

    startedAt: new Date(),
  };
}

/**
 * Returns the current local meeting session.
 */
export function getSession() {
  return activeSession;
}

/**
 * Updates local meeting session state.
 */
export function updateSession(
  session: MeetingSession,
) {
  activeSession = session;
}

/**
 * Clears the local meeting session.
 */
export function clearSession() {
  activeSession = null;
}
