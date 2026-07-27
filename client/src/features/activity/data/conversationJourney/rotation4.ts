import type { ConversationPrompt } from "../../types/conversationPrompt";

/**
 * Conversation Journey
 * Partner Rotation 4.
 *
 * Focus:
 * Meaningful closure.
 */
export const ROTATION_FOUR: ConversationPrompt[] = [
  {
    id: "r4-gc-1",
    stageId: "gettingComfortable",
    text:
      "Thinking about tonight, what's surprised you most so far?",
  },

  {
    id: "r4-ss-1",
    stageId: "sharingStories",
    text:
      "Tell me about a conversation you'll probably remember for a long time.",
  },

  {
    id: "r4-dv-1",
    stageId: "discoveringValues",
    text:
      "What's one lesson life keeps teaching you?",
  },

  {
    id: "r4-lf-1",
    stageId: "lookingForward",
    text:
      "What's one hope you'd genuinely like to carry with you after tonight?",
  },
];
