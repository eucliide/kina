/**
 * Ordered Conversation Journey.
 *
 * Each stage represents one
 * chapter of the conversation.
 * 
 * 3 stages × 6 minutes = 18 minutes conversation
 * 1 reflection stage × 2 minutes = 2 minutes reflection
 * Total per rotation: 20 minutes
 */
export const CONVERSATION_STAGES = [
  {
    id: "gettingComfortable",
    chapter: 1,
    title: "Getting Comfortable",
    duration: 6 * 60,
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
    id: "reflection",
    chapter: 4,
    title: "Reflection",
    duration: 2 * 60,
  },
] as const;