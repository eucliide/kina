/**
 * Represents a participant attending an event.
 *
 * This model is shared across the Lobby,
 * Meeting, Host and Reflection features.
 */
export interface Participant {
  /** Unique participant identifier */
  id: string;

  /** Display name shown in the UI */
  name: string;

  /** Current presence within the event */
  status:
    | "available"
    | "invited"
    | "waiting"
    | "meeting"
    | "offline";

  /** Current partner (if paired) */
  currentPartnerId?: string;
}

/**
 * Represents a live Ki event.
 */
export interface Event {
  /** Unique event identifier */
  id: string;

  /** Join code (QR / manual entry) */
  code: string;

  /** Participant hosting the event */
  hostId: string;

  /** Current activity running */
  currentActivityId: string;

  /** Current event state */
  status:
    | "lobby"
    | "activity"
    | "finished";
}
