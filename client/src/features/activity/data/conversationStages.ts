/**
 * Ordered Conversation Journey.
 *
 * Each stage represents one chapter
 * of a partner conversation.
 */
export const CONVERSATION_STAGES = [
  {
    id: "gettingComfortable",
    chapter: 1,
    title: "Getting Comfortable",
    duration: 5 * 60,
  },
  {
    id: "sharingStories",
    chapter: 2,
    title: "Sharing Stories",
    duration: 6 * 60,
  },
  {
    id: "discoveringValues",
    chapter: 3,
    title: "Discovering Values",
    duration: 6 * 60,
  },
  {
    id: "lookingForward",
    chapter: 4,
    title: "Looking Forward",
    duration: 5 * 60,
  },
] as const;
