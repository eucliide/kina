import { supabase } from "@/lib/supabase";

export interface TableTopicsPrompt {
  id: string;
  text: string;
}

/**
 * Determines the maximum number of questions that should be
 * available based on participant count.
 * 
 * Rules:
 * - 1-4 members: max 2 questions
 * - 5-10 members: max 1 question
 * - 11+ members: max 7 questions
 * 
 * @internal Exported for testing
 */
export function getMaxQuestions(participantCount: number): number {
  // Defensive: handle invalid counts
  if (!participantCount || participantCount < 1) {
    return 1; // Safe default
  }

  if (participantCount < 5) {
    return 2;
  }

  if (participantCount >= 5 && participantCount <= 10) {
    return 1;
  }

  // participantCount > 10
  return 7;
}

export async function getTableTopicsPrompt(
  participantCount: number,
): Promise<TableTopicsPrompt | undefined> {
  const maxQuestions = getMaxQuestions(participantCount);

  const { data, error } = await supabase
    .from("prompts")
    .select(`
      id,
      prompt_text
    `)
    .eq("activity_id", "tabletopics")
    .eq("is_active", true)
    .limit(maxQuestions);

  if (error) {
    throw new Error(
      `Failed to load TableTopics prompt: ${error.message}`,
    );
  }

  if (!data || data.length === 0) {
    return undefined;
  }

  const randomIndex = Math.floor(
    Math.random() * data.length,
  );

  const prompt = data[randomIndex];

  return {
    id: prompt.id,
    text: prompt.prompt_text,
  };
}
