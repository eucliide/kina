import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { ConversationPrompt } from "@/features/activity/types/conversationPrompt";

import { getConversationPrompt } from "@/features/activity/services/conversationJourneyService";

import { useConversationPassport } from "@/features/passport/hooks/useConversationPassport";

import {
  getCurrentStage,
  getNextStage,
} from "../services/stageService";

import {
  getSession,
  updateSession,
} from "../services/meetingSession";

import {
  TOTAL_PARTNER_ROTATIONS,
} from "@/features/event/constants/event";

import { getJoinedEvent } from "@/features/join/services/joinSession";
import { 
  getEventMeetingState,
  startRound,
  advanceToNextRound,
} from "@/features/event/services/meetingRoundService";
import { supabase } from "@/lib/supabase";

import type { MeetingSession } from "../types";

export function useMeeting() {
  const navigate = useNavigate();

  const [state, setState] =
    useState("meeting");

  const [currentPrompt, setCurrentPrompt] =
    useState<
      ConversationPrompt | undefined
    >();

  const [
    transitionState,
    setTransitionState,
  ] = useState("idle");

  const [session, setSession] =
    useState(() => {
      const existing = getSession();

      if (!existing) {
        throw new Error(
          "No active meeting session.",
        );
      }

      return existing;
    });

  const [roundEndsAt, setRoundEndsAt] = useState<Date | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  const event = getJoinedEvent();

  const {
    passport,
    completeCurrentChapter,
  } = useConversationPassport(
    session.partnerRotation,
  );

  const currentStage =
    getCurrentStage(
      session.currentStageId,
    );

  if (!currentStage) {
    throw new Error(
      "Unknown conversation stage.",
    );
  }

  /*
   * Initialize authoritative meeting state from database.
   */
  useEffect(() => {
    if (!event) return;

    let mounted = true;

    async function initializeMeetingState() {
      const meetingState = await getEventMeetingState(event!.id);

      if (!mounted) return;

      if (meetingState?.roundEndsAt) {
        // Use existing authoritative timestamp
        setRoundEndsAt(new Date(meetingState.roundEndsAt));
      } else {
        // Start the first round
        const result = await startRound(event!.id, session.partnerRotation);
        if (result && mounted) {
          setRoundEndsAt(new Date(result.roundEndsAt));
        }
      }
    }

    initializeMeetingState();

    return () => {
      mounted = false;
    };
  }, [event, session.partnerRotation]);

  /*
   * Subscribe to meeting state changes via Realtime.
   */
  useEffect(() => {
    if (!event) return;

    const channel = supabase
      .channel(`event-meeting:${event.id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "events",
          filter: `id=eq.${event.id}`,
        },
        (payload) => {
          const updatedEvent = payload.new as {
            round_ends_at?: string;
            current_round?: number;
          };

          if (updatedEvent.round_ends_at) {
            setRoundEndsAt(new Date(updatedEvent.round_ends_at));
          }

          if (updatedEvent.current_round && updatedEvent.current_round !== session.partnerRotation) {
            // Round changed - reload page to sync
            window.location.reload();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [event, session.partnerRotation]);

  /*
   * Calculate remaining time from authoritative timestamp.
   */
  useEffect(() => {
    if (!roundEndsAt) return;

    function updateRemainingTime() {
      if (!roundEndsAt) return;
      
      const now = Date.now();
      const endsAtTime = roundEndsAt.getTime();
      const remaining = Math.max(
        0,
        Math.ceil((endsAtTime - now) / 1000)
      );
      setRemainingSeconds(remaining);
    }

    // Update immediately
    updateRemainingTime();

    // Then update every second for display
    const interval = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(interval);
  }, [roundEndsAt]);

  /*
   * Load the shared prompt whenever the
   * partner rotation or stage changes.
   */
  useEffect(() => {
    let cancelled = false;

    async function loadPrompt() {
      try {
        setCurrentPrompt(undefined);

        const prompt =
          await getConversationPrompt(
            session.partnerRotation,
            session.currentStageId,
          );

        if (!cancelled) {
          setCurrentPrompt(prompt);
        }
      } catch (error) {
        console.error(
          "Failed to load conversation prompt:",
          error,
        );

        if (!cancelled) {
          setCurrentPrompt(undefined);
        }
      }
    }

    loadPrompt();

    return () => {
      cancelled = true;
    };
  }, [
    session.partnerRotation,
    session.currentStageId,
  ]);

  /*
   * Reset transition state when stage changes.
   */
  useLayoutEffect(() => {
    setTransitionState("idle");
  }, [session.currentStageId]);

  /*
   * Handle round end and stage transitions.
   */
  useEffect(() => {
    if (state !== "meeting") {
      return;
    }

    if (transitionState === "transitioning") {
      return;
    }

    if (remainingSeconds > 1) {
      return;
    }

    // Time is up
    const nextStage = getNextStage(session.currentStageId);

    if (!nextStage) {
      // Round complete
      setTransitionState("transitioning");
      completeCurrentChapter(currentStage.chapter);

      if (session.partnerRotation < TOTAL_PARTNER_ROTATIONS) {
        // Advance to next round
        if (event) {
          advanceToNextRound(event.id, session.partnerRotation).then((success) => {
            if (success) {
              setTimeout(() => {
                navigate("/lobby");
              }, 1200);
            }
          });
        }
      } else {
        // Final round complete
        setTimeout(() => {
          navigate("/wnrs");
        }, 1200);
      }

      return;
    }

    // Move to next stage
    completeCurrentChapter(currentStage.chapter);

    const updatedSession: MeetingSession = {
      ...session,
      currentStageId: nextStage.id,
    };

    setTransitionState("transitioning");

    setTimeout(() => {
      updateSession(updatedSession);
      setSession(updatedSession);
    }, 900);
  }, [
    state,
    transitionState,
    remainingSeconds,
    session,
    currentStage,
    completeCurrentChapter,
    navigate,
    event,
  ]);

  /*
   * Temporary timing hooks.
   */
  useEffect(() => {
    if (
      remainingSeconds === 60 ||
      remainingSeconds === 10
    ) {
      console.log("Beep");
    }
  }, [remainingSeconds]);

  const minutes = Math.floor(
    remainingSeconds / 60,
  );

  const seconds =
    remainingSeconds % 60;

  return {
    state,
    setState,

    transitionState,

    passport,

    session,

    currentStage,

    currentPrompt,

    remainingSeconds,

    remainingTime: `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`,
  };
}
