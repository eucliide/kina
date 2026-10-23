import {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "@/lib/supabase";

import {
  getEventMeetingState,
  startRound,
} from "@/features/event/services/meetingRoundService";

import {
  updateSession,
} from "../services/meetingSession";

import type { MeetingSession } from "../types";

interface UseMeetingRoundSyncArgs {
  eventId: string | undefined;
  session: MeetingSession;
  setSession: Dispatch<
    SetStateAction<MeetingSession>
  >;
}

export function useMeetingRoundSync({
  eventId,
  session,
  setSession,
}: UseMeetingRoundSyncArgs) {
  const navigate = useNavigate();

  const [roundStartedAt, setRoundStartedAt] =
    useState<Date | null>(null);

  const [roundEndsAt, setRoundEndsAt] =
    useState<Date | null>(null);

  useEffect(() => {
    if (!eventId) {
      return;
    }
    const resolvedEventId = eventId;

    const partnerRotation =
      session.partnerRotation;

    let cancelled = false;

    async function initializeRound() {
      try {
        const meetingState =
          await getEventMeetingState(
            resolvedEventId,
          );

        if (cancelled) {
          return;
        }

        if (
          meetingState?.roundStartedAt &&
          meetingState.roundEndsAt
        ) {
          setRoundStartedAt(
            new Date(
              meetingState.roundStartedAt,
            ),
          );

          setRoundEndsAt(
            new Date(
              meetingState.roundEndsAt,
            ),
          );

          if (
            meetingState.currentRound &&
            meetingState.currentRound !==
              partnerRotation
          ) {
            setSession((previous) => {
              const restored: MeetingSession = {
                ...previous,
                partnerRotation:
                  meetingState.currentRound!,
              };

              updateSession(restored);

              return restored;
            });
          }

          return;
        }

        const started = await startRound(
          resolvedEventId,
          partnerRotation,
        );

        if (
          cancelled ||
          !started
        ) {
          return;
        }

        setRoundStartedAt(
          new Date(started.roundStartedAt),
        );

        setRoundEndsAt(
          new Date(started.roundEndsAt),
        );
      } catch (error) {
        console.error(
          "Failed to initialize meeting round:",
          error,
        );
      }
    }

    initializeRound();

    return () => {
      cancelled = true;
    };
  }, [
    eventId,
    session.partnerRotation,
    setSession,
  ]);

  useEffect(() => {
    if (!eventId) {
      return;
    }
    const resolvedEventId = eventId;

    const localRotation =
      session.partnerRotation;

    const channel = supabase
      .channel(
        `event-meeting:${resolvedEventId}`,
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "events",
          filter: `id=eq.${resolvedEventId}`,
        },
        (payload) => {
          const updatedEvent =
            payload.new as {
              current_round?:
                number | null;
              round_started_at?:
                string | null;
              round_ends_at?:
                string | null;
            };

          if (
            updatedEvent.round_started_at
          ) {
            setRoundStartedAt(
              new Date(
                updatedEvent.round_started_at,
              ),
            );
          }

          if (
            updatedEvent.round_ends_at
          ) {
            setRoundEndsAt(
              new Date(
                updatedEvent.round_ends_at,
              ),
            );
          }

          if (
            updatedEvent.current_round &&
            updatedEvent.current_round !==
              localRotation
          ) {
            navigate("/lobby");
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [
    eventId,
    navigate,
    session.partnerRotation,
  ]);

  return {
    roundStartedAt,
    roundEndsAt,
  };
}
