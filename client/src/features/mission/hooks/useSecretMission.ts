import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import {
  getOrCreateSecretMission,
} from "../services/secretMissionService";

import type { SecretMission } from "../types/secretMission";

import {
  getJoinedEvent,
  getJoinedParticipant,
} from "@/features/join/services/joinSession";

export function useSecretMission() {
  const [
    mission,
    setMission,
  ] = useState<
    SecretMission | undefined
  >();

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadMission() {
      const event =
        getJoinedEvent();

      const participant =
        getJoinedParticipant();

      console.log(
        "DEBUG EVENT",
        event,
      );

      console.log(
        "DEBUG PARTICIPANT",
        participant,
      );

      if (
        !event ||
        !participant
      ) {
        if (!cancelled) {
          setError(
            "Your meetup session could not be found.",
          );

          setLoading(false);
        }

        return;
      }

      console.log(
        "DEBUG eventId sent to Supabase:",
        event.id,
      );

      console.log(
        "DEBUG participantId sent to Supabase:",
        participant.id,
      );

      try {
        setLoading(true);
        setError(null);
        const {
          data: {
            user,
          },
        } = await supabase.auth.getUser();

        console.log(
          "DEBUG CURRENT AUTH USER",
          user?.id,
        );

        console.log(
          "DEBUG EVENT PARTICIPANT ID",
          participant.id,
        );

        const result =
          await getOrCreateSecretMission(
            event.id,
            participant.id,
          );

        console.log(
          "DEBUG SECRET MISSION RESULT",
          result,
        );

        if (!cancelled) {
          setMission(result);
        }
      } catch (error) {
        console.error(
          "FAILED TO PREPARE SECRET MISSION",
          error,
        );

        if (!cancelled) {
          setError(
            error instanceof Error
              ? error.message
              : "Unable to prepare your secret mission.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadMission();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    mission,
    loading,
    error,
  };
}
