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

interface DatabaseAssignment {
  id: string;
  event_id: string;
  participant_id: string;
  mission_id: string;
  completed: boolean;
  revealed: boolean;
  created_at: string;
}

const MAX_ASSIGNMENT_ATTEMPTS = 5;

/**
 * Gets the mission already assigned to this participant
 * for this event.
 */
async function getExistingAssignment(
  eventId: string,
  participantId: string,
): Promise<SecretMission | null> {
  const { data, error } = await supabase
    .from("mission_assignments")
    .select(
      `
        id,
        event_id,
        participant_id,
        mission_id,
        completed,
        revealed,
        created_at,
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
    throw new Error(
      `Failed to check existing Secret Mission assignment: ${error.message}`,
    );
  }

  if (!data) {
    return null;
  }

  const mission = Array.isArray(data.missions)
    ? data.missions[0]
    : data.missions;

  if (!mission) {
    throw new Error(
      "Secret Mission assignment exists, but its mission could not be loaded.",
    );
  }

  return {
    id: mission.id,
    text: mission.mission_text,
  };
}

/**
 * Gets mission IDs already assigned within an event.
 */
async function getUsedMissionIds(
  eventId: string,
): Promise<Set<string>> {
  const { data, error } = await supabase
    .from("mission_assignments")
    .select("mission_id")
    .eq("event_id", eventId);

  if (error) {
    throw new Error(
      `Failed to load used Secret Missions: ${error.message}`,
    );
  }

  return new Set(
    (data ?? []).map(
      (assignment) => assignment.mission_id,
    ),
  );
}

/**
 * Loads the active Secret Mission pool.
 */
async function getActiveMissions(): Promise<
  DatabaseMission[]
> {
  const { data, error } = await supabase
    .from("missions")
    .select(
      `
        id,
        activity_id,
        stage_id,
        mission_text,
        mission_order,
        is_active
      `,
    )
    .eq("activity_id", "secretMission")
    .eq("stage_id", "opening")
    .eq("is_active", true)
    .order("mission_order", {
      ascending: true,
    });

  if (error) {
    throw new Error(
      `Failed to load Secret Missions: ${error.message}`,
    );
  }

  return (data ?? []) as DatabaseMission[];
}

/**
 * Gets or creates the Secret Mission for a participant.
 *
 * Rules:
 * - One participant gets one mission per event.
 * - A mission should only be assigned once per event.
 * - Selection is random among unused missions.
 * - Concurrent assignment conflicts are retried.
 */
export async function getOrCreateSecretMission(
  eventId: string,
  participantId: string,
): Promise<SecretMission> {
  if (!eventId) {
    throw new Error(
      "Cannot assign a Secret Mission without an event ID.",
    );
  }

  if (!participantId) {
    throw new Error(
      "Cannot assign a Secret Mission without a participant ID.",
    );
  }

  /*
   * First return an existing assignment.
   */
  const existing =
    await getExistingAssignment(
      eventId,
      participantId,
    );

  if (existing) {
    return existing;
  }

  /*
   * Load the active mission pool.
   */
  const missions =
    await getActiveMissions();

  if (missions.length === 0) {
    throw new Error(
      "No active Secret Missions are available.",
    );
  }

  /*
   * A small bounded retry protects against two
   * participants attempting to claim the same
   * mission at nearly the same time.
   */
  for (
    let attempt = 0;
    attempt < MAX_ASSIGNMENT_ATTEMPTS;
    attempt += 1
  ) {
    /*
     * Check again before inserting.
     *
     * Another request may have created the
     * participant's assignment since the first check.
     */
    const currentAssignment =
      await getExistingAssignment(
        eventId,
        participantId,
      );

    if (currentAssignment) {
      return currentAssignment;
    }

    /*
     * Refresh the used-mission list on every attempt.
     */
    const usedMissionIds =
      await getUsedMissionIds(eventId);

    const unusedMissions =
      missions.filter(
        (mission) =>
          !usedMissionIds.has(
            mission.id,
          ),
      );

    if (unusedMissions.length === 0) {
      throw new Error(
        "All Secret Missions have already been assigned for this event.",
      );
    }

    /*
     * Randomly select one unused mission.
     */
    const selectedMission =
      unusedMissions[
        Math.floor(
          Math.random() *
            unusedMissions.length,
        )
      ];

    /*
     * Insert only the fields that are required.
     *
     * completed and revealed use their database
     * defaults:
     *   completed = false
     *   revealed = false
     *
     * created_at also uses its database default.
     */
    const {
      data: assignment,
      error: insertError,
    } = await supabase
      .from("mission_assignments")
      .insert({
        event_id: eventId,
        participant_id: participantId,
        mission_id: selectedMission.id,
      })
      .select(
        `
          id,
          event_id,
          participant_id,
          mission_id,
          completed,
          revealed,
          created_at
        `,
      )
      .single();

    if (!insertError && assignment) {
      const createdAssignment =
        assignment as DatabaseAssignment;

      return {
        id: selectedMission.id,
        text: selectedMission.mission_text,
      };
    }

    /*
     * PostgreSQL unique violation.
     *
     * Another participant may have claimed this
     * mission between our read and our insert.
     *
     * Refresh and try another unused mission.
     */
    if (insertError?.code === "23505") {
      continue;
    }

    if (insertError) {
      throw new Error(
        `Failed to create Secret Mission assignment: ${insertError.message}`,
      );
    }
  }

  /*
   * Final check in case the participant received
   * an assignment during the retry window.
   */
  const finalAssignment =
    await getExistingAssignment(
      eventId,
      participantId,
    );

  if (finalAssignment) {
    return finalAssignment;
  }

  throw new Error(
    "Unable to assign a unique Secret Mission after several attempts.",
  );
}
