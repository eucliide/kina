import { supabase } from "@/lib/supabase";

export interface TableTopicsPrompt {
  id: string;
  text: string;
}

export async function getTableTopicsPrompt(): Promise<
  TableTopicsPrompt | undefined
> {
  const { data, error } = await supabase
    .from("prompts")
    .select(`
      id,
      prompt_text
    `)
    .eq("activity_id", "tabletopics")
    .eq("is_active", true);

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
