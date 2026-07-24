import type { Participant } from "../types";
import type { Pair } from "../types/rotation";

/**
 * Determines whether two participants
 * have already met during this event.
 */
function hasMet(
  first: Participant,
  second: Participant,
): boolean {
  return first.metParticipantIds.includes(second.id);
}

/**
 * Sort participants by the number of
 * completed meetings.
 *
 * Those with fewer meetings are paired first
 * to keep the event balanced.
 */
function sortByPriority(
  participants: Participant[],
): Participant[] {
  return [...participants].sort(
    (a, b) =>
      a.meetingsCompleted - b.meetingsCompleted,
  );
}

/**
 * Generates pairings for one rotation.
 *
 * Rules:
 * - No duplicate meetings
 * - Fair meeting distribution
 * - Groups of 3 if participant count is odd
 *
 * NOTE:
 * This function DOES NOT update participants.
 * It only generates the proposed rotation.
 */
export function generateRotation(
  participants: Participant[],
) {
  const available = sortByPriority(participants);

  const pairs: Pair[] = [];
  let groupOfThree: Participant[] | null = null;

  // ---------- Handle odd numbers ----------
  if (available.length % 2 !== 0) {
    groupOfThree = available.splice(-3);
  }

  // ---------- Pair remaining participants ----------
  while (available.length > 1) {
    const first = available.shift()!;

    let partnerIndex = available.findIndex(
      (candidate) => !hasMet(first, candidate),
    );

    // Everyone has already met.
    // Fall back to the next available participant.
    if (partnerIndex === -1) {
      partnerIndex = 0;
    }

    const partner = available.splice(
      partnerIndex,
      1,
    )[0];

    pairs.push({
      participantAId: first.id,
      participantBId: partner.id,
    });
  }

  return {
    pairs,
    groupOfThree,
  };
}
