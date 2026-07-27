import { STAGE_CATEGORIES } from "../data/stageCategories";

/**
 * Returns the prompt category
 * for a Conversation Journey stage.
 */
export function getPromptCategory(
  stageId: string,
) {
  return STAGE_CATEGORIES[
    stageId as keyof typeof STAGE_CATEGORIES
  ];
}
