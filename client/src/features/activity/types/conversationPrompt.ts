/**
 * A single Conversation Journey prompt.
 */
export interface ConversationPrompt {
  /**
   * Unique identifier.
   */
  id: string;

  /**
   * Conversation stage.
   */
  stageId:
    | "gettingComfortable"
    | "sharingStories"
    | "discoveringValues"
    | "lookingForward";

  /**
   * Prompt shown to both partners.
   */
  text: string;
}
