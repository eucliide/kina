import { PROMPTS } from "../data/prompts";

/**
 * Returns a random prompt
 * from a category.
 */
export function getRandomPrompt(
  category: keyof typeof PROMPTS,
): string {
  const prompts = PROMPTS[category];

  const index = Math.floor(
    Math.random() * prompts.length,
  );

  return prompts[index];
}
