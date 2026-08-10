import { useEffect, useState } from "react";
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
   * The timer belongs to the current stage.
   */
  const [
    remainingSeconds,
    setRemainingSeconds,
  ] = useState(
    currentStage.duration,
  );

  /*
   * Reset the timer whenever the
   * stage changes.
   */
  useEffect(() => {
    setRemainingSeconds(
      currentStage.duration,
    );

    setTransitionState("idle");
  }, [
    session.currentStageId,
    currentStage.duration,
  ]);

  /*
   * Stage timer.
   */
  useEffect(() => {
    if (state !== "meeting") {
      return;
    }

    if (
      transitionState ===
      "transitioning"
    ) {
      return;
    }

    const interval =
      window.setInterval(() => {
        setRemainingSeconds(
          (seconds) => {
            if (seconds > 1) {
              return seconds - 1;
            }

            const nextStage =
              getNextStage(
                session.currentStageId,
              );

            /*
             * Current partner's Conversation
             * Journey is complete.
             */
            if (!nextStage) {
              setTransitionState(
                "transitioning",
              );

              /*
               * Complete the final chapter.
               */
              completeCurrentChapter(
                currentStage.chapter,
              );

              /*
               * Partner 1, 2, and 3:
               * return to the lobby so the
               * participant can intentionally
               * choose their next partner.
               */
              if (
                session.partnerRotation < 4
              ) {
                window.setTimeout(() => {
                  navigate("/lobby");
                }, 1200);

                return 0;
              }

              /*
               * Partner 4:
               * Conversation Journey is
               * completely finished.
               *
               * WNRS handoff will be connected
               * here next.
               */
              window.setTimeout(() => {
                setState("transition");
              }, 1200);

              return 0;
            }

            /*
             * Complete the current chapter
             * before moving forward.
             */
            completeCurrentChapter(
              currentStage.chapter,
            );

            const updatedSession:
              MeetingSession = {
                ...session,
                currentStageId:
                  nextStage.id,
              };

            /*
             * Give the transition UI time
             * to appear before changing
             * content.
             */
            setTransitionState(
              "transitioning",
            );

            window.setTimeout(() => {
              updateSession(
                updatedSession,
              );

              setSession(
                updatedSession,
              );
            }, 900);

            return 0;
          },
        );
      }, 1000);

    return () =>
      window.clearInterval(
        interval,
      );
  }, [
    state,
    transitionState,
    session,
    currentStage,
    completeCurrentChapter,
    navigate,
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
