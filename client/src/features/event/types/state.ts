/**
 * Represents every stage
 * an event can be in.
 *
 * The UI reacts to this state.
 */
export type EventState =
  | "lobby"
  | "transition"
  | "meeting"
  | "reflection"
  | "rotation"
  | "finished";
