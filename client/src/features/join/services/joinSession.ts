import type { Event } from "@/lib/events/event.types";
import type { Participant } from "@/features/lobby/types";

const EVENT_STORAGE_KEY =
  "ki_joined_event";

const PARTICIPANT_STORAGE_KEY =
  "ki_joined_participant";

let activeEvent: Event | null = null;
let activeParticipant: Participant | null =
  null;

export function setJoinedEvent(
  event: Event,
): void {
  console.log(
    "DEBUG SET JOINED EVENT",
    event,
  );

  activeEvent = event;

  sessionStorage.setItem(
    EVENT_STORAGE_KEY,
    JSON.stringify(event),
  );

  console.log(
    "DEBUG STORED EVENT",
    sessionStorage.getItem(
      EVENT_STORAGE_KEY,
    ),
  );
}

export function getJoinedEvent(): Event | null {
  if (activeEvent) {
    console.log(
      "DEBUG GET EVENT FROM MEMORY",
      activeEvent,
    );

    return activeEvent;
  }

  const storedEvent =
    sessionStorage.getItem(
      EVENT_STORAGE_KEY,
    );

  console.log(
    "DEBUG STORED EVENT ON READ",
    storedEvent,
  );

  if (!storedEvent) {
    return null;
  }

  try {
    activeEvent =
      JSON.parse(storedEvent) as Event;

    console.log(
      "DEBUG RESTORED EVENT",
      activeEvent,
    );

    return activeEvent;
  } catch (error) {
    console.error(
      "FAILED TO RESTORE EVENT",
      error,
    );

    sessionStorage.removeItem(
      EVENT_STORAGE_KEY,
    );

    return null;
  }
}

export function setJoinedParticipant(
  participant: Participant,
): void {
  console.log(
    "DEBUG SET JOINED PARTICIPANT",
    participant,
  );

  activeParticipant = participant;

  sessionStorage.setItem(
    PARTICIPANT_STORAGE_KEY,
    JSON.stringify(participant),
  );

  console.log(
    "DEBUG STORED PARTICIPANT",
    sessionStorage.getItem(
      PARTICIPANT_STORAGE_KEY,
    ),
  );
}

export function getJoinedParticipant(): Participant | null {
  if (activeParticipant) {
    console.log(
      "DEBUG GET PARTICIPANT FROM MEMORY",
      activeParticipant,
    );

    return activeParticipant;
  }

  const storedParticipant =
    sessionStorage.getItem(
      PARTICIPANT_STORAGE_KEY,
    );

  console.log(
    "DEBUG STORED PARTICIPANT ON READ",
    storedParticipant,
  );

  if (!storedParticipant) {
    return null;
  }

  try {
    activeParticipant =
      JSON.parse(
        storedParticipant,
      ) as Participant;

    console.log(
      "DEBUG RESTORED PARTICIPANT",
      activeParticipant,
    );

    return activeParticipant;
  } catch (error) {
    console.error(
      "FAILED TO RESTORE PARTICIPANT",
      error,
    );

    sessionStorage.removeItem(
      PARTICIPANT_STORAGE_KEY,
    );

    return null;
  }
}

export function clearJoinSession(): void {
  console.log(
    "DEBUG CLEARING JOIN SESSION",
  );

  activeEvent = null;
  activeParticipant = null;

  sessionStorage.removeItem(
    EVENT_STORAGE_KEY,
  );

  sessionStorage.removeItem(
    PARTICIPANT_STORAGE_KEY,
  );
}
