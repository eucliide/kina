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
    | "reflection";

  /**
   * Prompt shown to both partners.
   */
  text: string;
}
