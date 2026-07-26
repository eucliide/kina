import type { Activity } from "../types/activity";

/**
 * Ordered list of activities
 * for a standard Ki event.
 */
export const ACTIVITIES: Activity[] = [
  {
    id: "conversation-journey",

    name: "Conversation Journey",

    type: "conversationJourney",

    format: "pairs",

    partnerRotations: 4,

    chapters: [
      {
        id: "getting-comfortable",
        title: "Getting Comfortable",
        durationSeconds: 450,
      },

      {
        id: "sharing-stories",
        title: "Sharing Stories",
        durationSeconds: 450,
      },
    ],
  },

  {
    id: "shared-reflections",

    name: "Shared Reflections",

    type: "sharedReflections",

    format: "pairs",

    partnerRotations: 1,

    chapters: [
      {
        id: "perception",
        title: "Perception",
        durationSeconds: 180,
      },

      {
        id: "connection",
        title: "Connection",
        durationSeconds: 180,
      },

      {
        id: "reflection",
        title: "Reflection",
        durationSeconds: 180,
      },

      {
        id: "gratitude",
        title: "Gratitude",
        durationSeconds: 180,
      },
    ],
  },

  {
    id: "around-the-circle",

    name: "Around the Circle",

    type: "aroundTheCircle",

    format: "group",

    partnerRotations: 1,

    chapters: [
      {
        id: "group-discussion",
        title: "Group Discussion",
        durationSeconds: 900,
      },
    ],
  },

  {
    id: "mission-reveal",

    name: "Mission Reveal",

    type: "missionReveal",

    format: "group",

    partnerRotations: 1,

    chapters: [
      {
        id: "mission-reveal",
        title: "Mission Reveal",
        durationSeconds: 600,
      },
    ],
  },
];
