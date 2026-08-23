import type { ConversationPrompt } from "../../types/conversationPrompt";

/**
 * Conversation Journey
 * Partner Rotation 1.
 *
 * Focus:
 * Getting comfortable.
 */
export const ROTATION_ONE: ConversationPrompt[] = [
  {
    id: "r1-gc-1",
    stageId: "gettingComfortable",
    text:
      "What's been the highlight of your week so far?",
  },

  {
    id: "r1-ss-1",
    stageId: "sharingStories",
    text:
      "Tell me about a moment that still makes you smile.",
  },

  {
    id: "r1-dv-1",
    stageId: "discoveringValues",
    text:
      "What's a value you've grown to appreciate more over time?",
  },

  {
    id: "r1-ref-1",
    stageId: "reflection",
    text:
      "What's something you learned about your partner or yourself in this conversation?",
  },
];
