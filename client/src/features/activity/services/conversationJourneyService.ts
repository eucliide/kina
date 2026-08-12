import { supabase } from "@/lib/supabase";

import type { ConversationPrompt } from "../types/conversationPrompt";

interface DatabaseConversationPrompt {
  id: string;
  activity_id: string;
  partner_rotation: number;
  chapter: number;
  stage_id: string;
  prompt_text: string;
  prompt_order: number;
  is_active: boolean;
}

interface DatabaseWnrsPrompt {
  id: string;
  activity_id: string;
  prompt_text: string;
  prompt_order: number;
  is_active: boolean;
}

export interface WnrsPromptResult {
  id: string;
  text: string;
}

/**
 * Returns the shared Conversation Journey
 * prompt for the current partner rotation
 * and stage.
 *
 * Conversation Journey content is loaded
 * from Supabase.
 */
export async function getConversationPrompt(
  partnerRotation: number,
  stageId: string,
): Promise<ConversationPrompt | undefined> {
  const { data, error } = await supabase
    .from("prompts")
    .select(`
      id,
      activity_id,
      partner_rotation,
      chapter,
      stage_id,
      prompt_text,
      prompt_order,
      is_active
    `)
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
    data as DatabaseConversationPrompt;

  return {
    id: prompt.id,
    stageId: prompt.stage_id as ConversationPrompt["stageId"],
    text: prompt.prompt_text,
  };
}

/**
 * Returns one random WNRS-inspired
 * shared reflection prompt.
 *
 * WNRS prompts are stored in the
 * shared prompts table and are not
 * tied to Conversation Journey stages.
 */
export async function getWnrsPrompt(): Promise<
  WnrsPromptResult | undefined
> {
  const { data, error } = await supabase
    .from("prompts")
    .select(`
      id,
      activity_id,
      prompt_text,
      prompt_order,
      is_active
    `)
    .eq("activity_id", "wnrs")
    .eq("is_active", true)
    .order("prompt_order", {
      ascending: true,
    });

  if (error) {
    throw new Error(
      `Failed to load WNRS prompt: ${error.message}`,
    );
  }

  if (!data || data.length === 0) {
    return undefined;
  }

  const prompts =
    data as DatabaseWnrsPrompt[];

  const randomIndex = Math.floor(
    Math.random() * prompts.length,
  );

  const prompt = prompts[randomIndex];

  return {
    id: prompt.id,
    text: prompt.prompt_text,
  };
}
