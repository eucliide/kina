/**
 * Ordered Conversation Journey stages.
 *
 * These determine the flow of every
 * partner conversation.
 */
export const CONVERSATION_STAGES = [
  {
    id: "gettingComfortable",
    title: "Getting Comfortable",
    duration: 5 * 60,
  },
  {
    id: "sharingStories",
    title: "Sharing Stories",
    duration: 6 * 60,
  },
  {
    id: "discoveringValues",
    title: "Discovering Values",
    duration: 6 * 60,
  },
  {
    id: "lookingForward",
    title: "Looking Forward",
    duration: 5 * 60,
  },
] as const;
