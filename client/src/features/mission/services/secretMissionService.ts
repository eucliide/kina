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
 * Gets or creates the Secret Mission assigned to a
 * participant for an event.
 *
 * Guarantees:
 * - One participant receives one mission per event.
 * - A mission is not intentionally reused within an event.
 * - Selection is random among currently unused missions.
 * - Unique-constraint conflicts are retried safely.
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
   * First check whether this participant already
   * has a mission for this event.
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
   * Load the active mission pool once.
   *
   * The pool itself does not change during normal
   * assignment, while the used-assignment list is
   * refreshed on every retry.
   */
  const missions =
    await getActiveMissions();

  if (missions.length === 0) {
    throw new Error(
      "No active Secret Missions are available.",
    );
  }

  /*
   * Retry a small number of times to handle two
   * participants attempting to claim the same
   * mission at nearly the same time.
   */
  for (
    let attempt = 0;
    attempt < MAX_ASSIGNMENT_ATTEMPTS;
    attempt += 1
  ) {
    /*
     * Re-check the participant assignment before
     * every insert attempt.
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
     * Refresh which missions have already been
     * assigned in this event.
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
     * Randomly select one of the currently unused
     * missions.
     */
    const selectedMission =
      unusedMissions[
        Math.floor(
          Math.random() *
            unusedMissions.length,
        )
      ];

    /*
     * Only provide columns that are required.
     *
     * The database supplies:
     * completed = false
     * revealed = false
     * created_at = now()
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
      .select("id")
      .single();

    /*
     * Successful assignment.
     */
    if (!insertError && assignment) {
      return {
        id: selectedMission.id,
        text: selectedMission.mission_text,
      };
    }

    /*
     * PostgreSQL unique-constraint violation.
     *
     * Another participant may have claimed the
     * selected mission between our availability
     * check and this insert.
     *
     * Retry after refreshing the used-mission list.
     */
    if (insertError?.code === "23505") {
      continue;
    }

    /*
     * Any other database error is a real failure
     * and should not be hidden by a retry.
     */
    if (insertError) {
      throw new Error(
        `Failed to create Secret Mission assignment: ${insertError.message}`,
      );
    }

    /*
     * Defensive fallback in case Supabase returns
     * neither an error nor an inserted row.
     */
    throw new Error(
      "Secret Mission assignment was not created.",
    );
  }

  /*
   * One final lookup protects against the case where
   * the participant received an assignment during the
   * retry sequence.
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
