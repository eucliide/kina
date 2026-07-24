import type { Activity } from "../types/activity";

/**
 * Ordered list of activities
 * for a standard Ki event.
 */
export const ACTIVITIES: Activity[] = [
  {
    id: "conversation-journey-1",
    name: "Conversation Journey",
    type: "conversation",
    rotations: 3,
    durationSeconds: 15 * 60,
  },

  {
    id: "shared-reflections",
    name: "Shared Reflections",
    type: "sharedReflection",
    rotations: 1,
    durationSeconds: 15 * 60,
  },

  {
    id: "around-the-circle",
    name: "Around the Circle",
    type: "groupDiscussion",
    rotations: 1,
    durationSeconds: 15 * 60,
  },

  {
    id: "mission-reveal",
    name: "Mission Reveal",
    type: "missionReveal",
    rotations: 1,
    durationSeconds: 10 * 60,
  },
];
