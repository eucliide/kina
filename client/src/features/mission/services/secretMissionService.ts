import { supabase } from "@/lib/supabase";

import type { SecretMission } from "../types/secretMission";

interface DatabaseMission {
  id: string;
  activity_id: string;
  stage_id: string | null;
  mission_text: string;
  mission_order: number;
  is_active: boolean;
}

/**
 * Loads one active Secret Mission.
 *
 * The mission is selected from the persisted
 * mission pool so the frontend does not need
 * to contain the mission content.
 */
export async function getSecretMission(): Promise<
  SecretMission | undefined
> {
  const {
    data,
    error,
  } = await supabase
    .from("missions")
    .select(`
      id,
      activity_id,
      stage_id,
      mission_text,
      mission_order,
      is_active
    `)
    .eq(
      "activity_id",
      "secretMission",
    )
    .eq("stage_id", "opening")
    .eq("is_active", true)
    .order("mission_order", {
      ascending: true,
    });

  if (error) {
    throw new Error(
      `Failed to load Secret Mission: ${error.message}`,
    );
  }

  if (!data || data.length === 0) {
    return undefined;
  }

  /*
   * Temporary deterministic selection.
   *
   * We will replace this with persisted
   * participant-specific assignment when
   * mission assignment is stored.
   */
  const missions =
    data as DatabaseMission[];

  const randomIndex =
    Math.floor(
      Math.random() * missions.length,
    );

  const mission =
    missions[randomIndex];

  return {
    id: mission.id,
    text: mission.mission_text,
  };
}
