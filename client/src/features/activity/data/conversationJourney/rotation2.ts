import type { ConversationPrompt } from "../../types/conversationPrompt";

/**
 * Conversation Journey
 * Partner Rotation 2.
 *
 * Focus:
 * Building familiarity.
 */
export const ROTATION_TWO: ConversationPrompt[] = [
  {
    id: "r2-gc-1",
    stageId: "gettingComfortable",
    text:
      "Now that the evening has settled in, what's something people often misunderstand about you?",
  },

  {
    id: "r2-ss-1",
    stageId: "sharingStories",
    text:
      "Tell me about a decision that changed the direction of your life.",
  },

  {
    id: "r2-dv-1",
    stageId: "discoveringValues",
    text:
      "What quality do you admire most in other people?",
  },

  {
    id: "r2-ref-1",
    stageId: "reflection",
    text:
      "What stood out to you most in this conversation?",
  },
];
