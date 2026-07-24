import type { EventState } from "../types/state";

/**
 * Temporary in-memory event state.
 *
 * Later this will come from Supabase
 * so every participant stays in sync.
 */
let currentState: EventState = "lobby";

/**
 * Returns the current event state.
 */
export function getEventState(): EventState {
  return currentState;
}

/**
 * Updates the event state.
 *
 * Every future transition
 * (meeting, rotation, reflection)
 * will go through this function.
 */
export function setEventState(
  state: EventState,
): void {
  currentState = state;
}

/**
 * Resets the event.
 *
 * Useful during development
 * and when the event finishes.
 */
export function resetEventState(): void {
  currentState = "lobby";
}
