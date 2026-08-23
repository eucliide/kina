import { supabase } from "@/lib/supabase";
import type { SecretMission } from "../types/secretMission";

/**
 * Read-only lookup of the participant's existing Secret Mission.
 * 
 * This NEVER creates a new assignment.
 * Returns null if no assignment exists.
 */
export async function getExistingMission(
  eventId: string,
  participantId: string,
): Promise<SecretMission | null> {
  const { data, error } = await supabase
    .from("mission_assignments")
    .select(
      `
        missions (
          id,
          mission_text
        )
      `,
    )
    .eq("event_id", eventId)
    .eq("participant_id", participantId)
    .maybeSingle();

  if (error) {
    console.error("Failed to load Secret Mission:", error);
    return null;
  }

  if (!data) {
    return null;
  }

  const mission = Array.isArray(data.missions)
    ? data.missions[0]
    : data.missions;

  if (!mission) {
    return null;
  }

  return {
    id: mission.id,
    text: mission.mission_text,
  };
}
