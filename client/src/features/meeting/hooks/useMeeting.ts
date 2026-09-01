import {
import {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import type { ConversationPrompt } from "@/features/activity/types/conversationPrompt";

import {
  getConversationPrompt,
} from "@/features/activity/services/conversationJourneyService";

import {
  useConversationPassport,
} from "@/features/passport/hooks/useConversationPassport";

import {
  getCurrentStage,
  getRemainingStageSeconds,
  getStageForElapsedSeconds,
} from "../services/stageService";

import {
  getSession,
  updateSession,
} from "../services/meetingSession";

import {
  TOTAL_PARTNER_ROTATIONS,
} from "@/features/event/constants/event";

import {
  getJoinedEvent,
} from "@/features/join/services/joinSession";

import {
  advanceToNextRound,
  getEventMeetingState,
  startRound,
} from "@/features/event/services/meetingRoundService";

import { supabase } from "@/lib/supabase";

import {
  playWarningSound,
  playCountdownSound,
} from "../services/sounds";

import type { MeetingSession } from "../types";

/**
 * Conversation Journey stage IDs.
 */
type ConversationStageId =
  ConversationPrompt["stageId"];

export function useMeeting() {
  const navigate = useNavigate();

  const [state, setState] =
    useState("meeting");

  const [
    transitionState,
    setTransitionState,
  ] = useState("idle");

  const [
    currentPrompt,
    setCurrentPrompt,
  ] = useState<
    ConversationPrompt | undefined
  >();

  /**
   * A MeetingPage is invalid without
   * an active session.
   *
   * Because we throw when none exists,
   * `session` is a MeetingSession,
   * not MeetingSession | null.
   */
  const [session, setSession] =
    useState<MeetingSession>(() => {
      const existing = getSession();

      if (!existing) {
        throw new Error(
          "No active meeting session.",
        );
      }

      return existing;
    });

  /**
   * Supabase owns the complete
   * 20-minute partner rotation.
   */
  const [
    roundStartedAt,
    setRoundStartedAt,
  ] = useState<Date | null>(null);

  const [
    roundEndsAt,
    setRoundEndsAt,
  ] = useState<Date | null>(null);

  /**
   * null means:
   * authoritative timing has not loaded yet.
   *
   * It must NOT begin at zero because zero
   * means the current stage has actually ended.
   */
  const [
    remainingSeconds,
    setRemainingSeconds,
  ] = useState<number | null>(null);

  const event = getJoinedEvent();

  /**
   * A valid MeetingSession must always contain
   * a valid Conversation Journey stage.
   */
  const resolvedStage =
    getCurrentStage(
      session.currentStageId,
    );

  if (!resolvedStage) {
    throw new Error(
      `Unknown conversation stage: ${session.currentStageId}`,
    );
  }

  /**
   * After the validation above,
   * currentStage is deliberately non-optional.
   */
  const currentStage = resolvedStage;

  const {
    passport,
    completeCurrentChapter,
  } = useConversationPassport(
    session.partnerRotation,
  );

  /**
   * ------------------------------------------------
   * INITIALIZE AUTHORITATIVE ROTATION
   * ------------------------------------------------
   */
  useEffect(() => {
    if (!event) {
      return;
    }

    /**
     * Capture primitives/objects after narrowing.
     *
     * TypeScript can safely carry these into
     * the async function.
     */
    const eventId = event.id;
    const partnerRotation =
      session.partnerRotation;

    let cancelled = false;

    async function initializeRound() {
      try {
        const meetingState =
          await getEventMeetingState(
            eventId,
          );

        if (cancelled) {
          return;
        }

        /**
         * Existing authoritative rotation.
         */
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

          /**
           * Restore authoritative rotation number
           * after reload/reconnection.
           */
          if (
            meetingState.currentRound &&
            meetingState.currentRound !==
              partnerRotation
          ) {
            const restoredSession:
              MeetingSession = {
              ...session,
              partnerRotation:
                meetingState.currentRound,
            };

            updateSession(
              restoredSession,
            );

            setSession(
              restoredSession,
            );
          }

          return;
        }

        /**
         * No rotation timestamp exists yet.
         * Start it through the secure RPC.
         */
        const started =
          await startRound(
            eventId,
            partnerRotation,
          );

        if (
          cancelled ||
          !started
        ) {
          return;
        }

        setRoundStartedAt(
          new Date(
            started.roundStartedAt,
          ),
        );

        setRoundEndsAt(
          new Date(
            started.roundEndsAt,
          ),
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
    event?.id,
    session.partnerRotation,
  ]);

  /**
   * ------------------------------------------------
   * REALTIME ROTATION SYNCHRONIZATION
   * ------------------------------------------------
   */
  useEffect(() => {
    if (!event) {
      return;
    }

    const eventId = event.id;
    const localRotation =
      session.partnerRotation;

    const channel = supabase
      .channel(
        `event-meeting:${eventId}`,
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "events",
          filter: `id=eq.${eventId}`,
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

          /**
           * A new partner rotation belongs
           * to the lobby/pairing flow.
           *
           * Do NOT reload the whole browser.
           */
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
      supabase.removeChannel(
        channel,
      );
    };
  }, [
    event?.id,
    session.partnerRotation,
    navigate,
  ]);

  /**
   * ------------------------------------------------
   * DERIVE CURRENT 6 / 6 / 6 / 2 STAGE
   * ------------------------------------------------
   *
   * Supabase owns one 20-minute rotation.
   *
   * We derive:
   *
   * 00:00–06:00 Getting Comfortable
   * 06:00–12:00 Sharing Stories
   * 12:00–18:00 Discovering Values
   * 18:00–20:00 Reflection
   */
  useEffect(() => {
    if (!roundStartedAt) {
      setRemainingSeconds(null);
      return;
    }

    /**
     * Capture non-null Date so nested callbacks
     * don't lose TypeScript narrowing.
     */
    const authoritativeStart =
      roundStartedAt;

    function synchronizeStage() {
      const now = Date.now();

      const elapsedSeconds =
        Math.max(
          0,
          Math.floor(
            (
              now -
              authoritativeStart.getTime()
            ) / 1000,
          ),
        );

      const derivedStage =
        getStageForElapsedSeconds(
          elapsedSeconds,
        );

      /**
       * Stage changed according to
       * authoritative elapsed time.
       */
      if (
        derivedStage.id !==
        session.currentStageId
      ) {
        const previousStage =
          getCurrentStage(
            session.currentStageId,
          );

        if (previousStage) {
          completeCurrentChapter(
            previousStage.chapter,
          );
        }

        const updatedSession:
          MeetingSession = {
          ...session,
          currentStageId:
            derivedStage.id,
        };

        setTransitionState(
          "transitioning",
        );

        updateSession(
          updatedSession,
        );

        setSession(
          updatedSession,
        );

        window.setTimeout(() => {
          setTransitionState(
            "idle",
          );
        }, 900);
      }

      /**
       * Visible countdown is ONLY the
       * current stage's remaining time.
       */
      const remaining =
        getRemainingStageSeconds(
          authoritativeStart,
          derivedStage.id,
          now,
        );

      setRemainingSeconds(
        remaining,
      );
    }

    synchronizeStage();

    const interval =
      window.setInterval(
        synchronizeStage,
        1000,
      );

    return () => {
      window.clearInterval(
        interval,
      );
    };
  }, [
    roundStartedAt,
    session,
    completeCurrentChapter,
  ]);

  /**
   * ------------------------------------------------
   * LOAD CURRENT STAGE PROMPT
   * ------------------------------------------------
   */
  useEffect(() => {
    const rotation =
      session.partnerRotation;

    const stageId =
      session.currentStageId as
        ConversationStageId;

    const stageTitle =
      currentStage.title;

    let cancelled = false;

    async function loadPrompt() {
      try {
        setCurrentPrompt(
          undefined,
        );

        const prompt =
          await getConversationPrompt(
            rotation,
            stageId,
          );

        if (cancelled) {
          return;
        }

        if (prompt) {
          setCurrentPrompt(
            prompt,
          );

          return;
        }

        /**
         * Temporary safe fallback.
         *
         * The UI stays functional while prompt
         * data is being verified.
         */
        setCurrentPrompt({
          id:
            `fallback-${rotation}-${stageId}`,

          stageId,

          text:
            `Let's talk about ${stageTitle.toLowerCase()}.`,
        });
      } catch (error) {
        console.error(
          "Failed to load conversation prompt:",
          error,
        );

        if (cancelled) {
          return;
        }

        setCurrentPrompt({
          id:
            `fallback-${rotation}-${stageId}`,

          stageId,

          text:
            `Let's talk about ${stageTitle.toLowerCase()}.`,
        });
      }
    }

    loadPrompt();

    return () => {
      cancelled = true;
    };
  }, [
    session.partnerRotation,
    session.currentStageId,
    currentStage.title,
  ]);

  /**
   * ------------------------------------------------
   * ROTATION COMPLETION
   * ------------------------------------------------
   *
   * Stage boundaries are derived locally from the
   * authoritative start timestamp.
   *
   * The DB round advances ONLY once the complete
   * 20-minute rotation ends.
   */
  useEffect(() => {
    if (
      !event ||
      !roundEndsAt
    ) {
      return;
    }

    const eventId = event.id;

    const authoritativeEnd =
      roundEndsAt;

    const partnerRotation =
      session.partnerRotation;

    /**
     * Only reflection may complete
     * the entire rotation.
     */
    if (
      currentStage.id !==
      "reflection"
    ) {
      return;
    }

    if (
      remainingSeconds === null ||
      remainingSeconds > 0
    ) {
      return;
    }

    if (
      Date.now() <
      authoritativeEnd.getTime()
    ) {
      return;
    }

    if (
      transitionState ===
      "transitioning"
    ) {
      return;
    }

    setTransitionState(
      "transitioning",
    );

    completeCurrentChapter(
      currentStage.chapter,
    );

    /**
     * More partner rotations remain.
     */
    if (
      partnerRotation <
      TOTAL_PARTNER_ROTATIONS
    ) {
      advanceToNextRound(
        eventId,
        partnerRotation,
      ).then((success) => {
        if (!success) {
          setTransitionState(
            "idle",
          );

          return;
        }

        navigate("/lobby");
      });

      return;
    }

    /**
     * Entire Conversation Journey complete.
     */
    navigate("/wnrs");
  }, [
    event?.id,
    roundEndsAt,
    remainingSeconds,
    currentStage,
    session.partnerRotation,
    transitionState,
    completeCurrentChapter,
    navigate,
  ]);

  /**
   * ------------------------------------------------
   * SOUND CHECKPOINTS
   * ------------------------------------------------
   */
  useEffect(() => {
    if (remainingSeconds === 60) {
      playWarningSound();
    } else if (remainingSeconds === 10) {
      playCountdownSound();
    }
  }, [
    remainingSeconds,
  ]);

  /**
   * ------------------------------------------------
   * TIMER DISPLAY
   * ------------------------------------------------
   *
   * Before authoritative timing loads,
   * display the full duration of the first/current
   * stage rather than 00:00.
   */
  const displaySeconds =
    remainingSeconds ??
    currentStage.duration;

  const minutes =
    Math.floor(
      displaySeconds / 60,
    );

  const seconds =
    displaySeconds % 60;

  return {
    state,
    setState,

    transitionState,

    passport,

    session,

    currentStage,

    currentPrompt,

    remainingSeconds:
      displaySeconds,

    remainingTime:
      `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`,

    roundStartedAt,

    roundEndsAt,
  };
}