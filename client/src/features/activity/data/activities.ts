import type { Activity } from "../types";

/**
 * Activities available within Ki.
 *
 * The Host chooses one before each
 * rotation.
 */
export const ACTIVITIES: Activity[] = [
  {
    id: "conversation",

    title: "Conversation Cards",

    type: "conversation",

    durationSeconds: 450,

    rounds: 2,

    reflectionEnabled: true,
  },

  {
    id: "missions",

    title: "Secret Missions",

    type: "mission",

    durationSeconds: 450,

    rounds: 2,

    reflectionEnabled: true,
  },

  {
    id: "wnrs",

    title: "We're Not Really Strangers",

    type: "wnrs",

    durationSeconds: 450,

    rounds: 2,

    reflectionEnabled: true,
  },

  {
    id: "tabletopics",

    title: "TableTopics",

    type: "tabletopics",

    durationSeconds: 450,

    rounds: 2,

    reflectionEnabled: true,
  },
];
