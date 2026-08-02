import { supabase } from "@/lib/supabase";

export interface Prompt {
  id: string;
  activity_id: string;
  chapter: number | null;
  stage_id: string | null;
  prompt_text: string;
  prompt_order: number;
  is_active: boolean;
}

export interface Mission {
  id: string;
  activity_id: string;
  stage_id: string | null;
  mission_text: string;
  mission_order: number;
  is_active: boolean;
}

export async function getActivityPrompts(
  activityId: string,
): Promise<Prompt[]> {
  const { data, error } = await supabase
    .from("prompts")
    .select("*")
    .eq("activity_id", activityId)
    .eq("is_active", true)
    .order("prompt_order", {
      ascending: true,
    });

  if (error) {
    throw new Error(
      `Failed to load prompts: ${error.message}`,
    );
  }

  return data ?? [];
}

export async function getActivityMissions(
  activityId: string,
): Promise<Mission[]> {
  const { data, error } = await supabase
    .from("missions")
    .select("*")
    .eq("activity_id", activityId)
    .eq("is_active", true)
    .order("mission_order", {
      ascending: true,
    });

  if (error) {
    throw new Error(
      `Failed to load missions: ${error.message}`,
    );
  }

  return data ?? [];
}
