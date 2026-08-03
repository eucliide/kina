import { supabase } from "@/lib/supabase";

import type { ConversationPrompt } from "../types/conversationPrompt";

interface DatabasePrompt {
  id: string;
  activity_id: string;
  partner_rotation: number;
  chapter: number;
  stage_id: string;
  prompt_text: string;
  prompt_order: number;
  is_active: boolean;
}

/**
 * Returns the shared prompt for the
 * current partner rotation and stage.
 *
 * Conversation Journey content is
 * loaded from Supabase.
 */
export async function getConversationPrompt(
  partnerRotation: number,
  stageId: string,
): Promise<ConversationPrompt | undefined> {
  const { data, error } = await supabase
    .from("prompts")
    .select(
      `
        id,
        activity_id,
        partner_rotation,
        chapter,
        stage_id,
        prompt_text,
        prompt_order,
        is_active
      `,
    )
    .eq(
      "activity_id",
      "conversationJourney",
    )
    .eq(
      "partner_rotation",
      partnerRotation,
    )
    .eq("stage_id", stageId)
    .eq("is_active", true)
    .order("prompt_order", {
      ascending: true,
    })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to load Conversation Journey prompt: ${error.message}`,
    );
  }

  if (!data) {
    return undefined;
  }

  const prompt =
    data as DatabasePrompt;

  return {
    id: prompt.id,
    stageId: prompt.stage_id,
    text: prompt.prompt_text,
  };
}
