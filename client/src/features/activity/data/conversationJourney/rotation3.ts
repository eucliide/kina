import type { ConversationPrompt } from "../../types/conversationPrompt";

/**
 * Conversation Journey
 * Partner Rotation 3.
 *
 * Focus:
 * Reflection and perspective.
 */
export const ROTATION_THREE: ConversationPrompt[] = [
  {
    id: "r3-gc-1",
    stageId: "gettingComfortable",
    text:
      "What's something you've become much more confident about recently?",
  },

  {
    id: "r3-ss-1",
    stageId: "sharingStories",
    text:
      "Share a moment that taught you something important about yourself.",
  },

  {
    id: "r3-dv-1",
    stageId: "discoveringValues",
    text:
      "What's one belief you've changed your mind about over the last few years?",
  },

  {
    id: "r3-lf-1",
    stageId: "lookingForward",
    text:
      "If everything worked out, what would you love your life to look like in five years?",
  },
];
