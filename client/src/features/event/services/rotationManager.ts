import type { Participant } from "../types";
import { generateRotation } from "./rotationEngine";

/**
 * Applies one rotation to the
 * current participant list.
 *
 * This function updates meeting
 * statistics after the engine
 * generates new pairings.
 */
export function applyRotation(
  participants: Participant[],
) {
  const rotation = generateRotation(
    participants,
  );

  const updatedParticipants = participants.map(
    (participant) => ({
      ...participant,
    }),
  );

  /**
   * Update every generated pair.
   */
  rotation.pairs.forEach((pair) => {
    const first = updatedParticipants.find(
      (p) => p.id === pair.participantAId,
    );

    const second =
      updatedParticipants.find(
        (p) =>
          p.id === pair.participantBId,
      );

    if (!first || !second) {
      return;
    }

    first.meetingsCompleted++;
    second.meetingsCompleted++;

    first.currentPartnerId =
      second.id;

    second.currentPartnerId =
      first.id;

    first.metParticipantIds.push(
      second.id,
    );

    second.metParticipantIds.push(
      first.id,
    );
  });

  /**
   * Handle a conversation group
   * of three participants.
   */
  if (rotation.groupOfThree) {
    const group =
      rotation.groupOfThree;

    group.forEach((member) => {
      const participant =
        updatedParticipants.find(
          (p) => p.id === member.id,
        );

      if (!participant) {
        return;
      }

      participant.meetingsCompleted++;

      participant.currentPartnerId =
        group
          .filter(
            (g) => g.id !== member.id,
          )
          .map((g) => g.id)
          .join(",");

      participant.metParticipantIds.push(
        ...group
          .filter(
            (g) => g.id !== member.id,
          )
          .map((g) => g.id),
      );
    });
  }

  return {
    rotation,
    participants:
      updatedParticipants,
  };
}
