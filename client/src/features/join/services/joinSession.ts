import type { Event } from "@/lib/events/event.types";
import type { Participant } from "@/features/lobby/types";

let activeEvent: Event | null = null;
let activeParticipant: Participant | null = null;

export function setJoinedEvent(
  event: Event,
): void {
  activeEvent = event;
}

export function getJoinedEvent(): Event | null {
  return activeEvent;
}

export function setJoinedParticipant(
  participant: Participant,
): void {
  activeParticipant = participant;
}

export function getJoinedParticipant(): Participant | null {
  return activeParticipant;
}

export function clearJoinSession(): void {
  activeEvent = null;
  activeParticipant = null;
}
