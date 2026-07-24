/**
 * Event Controller
 *
 * Responsible for orchestrating the
 * entire Ki event.
 *
 * NOTE:
 * This controller contains NO React code.
 * It only describes business actions.
 */

import {
  getEventState,
  setEventState,
} from "./eventState";

/**
 * Starts an activity.
 *
 * Future:
 * - Store selected activity
 * - Notify participants
 * * Trigger transition animation
 */
export function startActivity() {
  setEventState("transition");
}

/**
 * Called once the transition
 * animation has finished.
 */
export function beginMeeting() {
  setEventState("meeting");
}

/**
 * Ends the active meeting.
 */
export function finishMeeting() {
  setEventState("reflection");
}

/**
 * Reflection finished.
 *
 * Future:
 * - Rotate participants
 * - Return to lobby
 */
export function finishReflection() {
  setEventState("rotation");
}

/**
 * Rotation complete.
 */
export function finishRotation() {
  setEventState("lobby");
}

/**
 * Ends the entire event.
 */
export function endEvent() {
  setEventState("finished");
}

/**
 * Convenience helper.
 */
export function currentState() {
  return getEventState();
}
