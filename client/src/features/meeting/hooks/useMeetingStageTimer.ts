import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

import {
  getCurrentStage,
  getRemainingStageSeconds,
  getStageForElapsedSeconds,
} from "../services/stageService";

import {
  updateSession,
} from "../services/meetingSession";

import type { MeetingSession } from "../types";

interface UseMeetingStageTimerArgs {
  session: MeetingSession;
  setSession: Dispatch<
    SetStateAction<MeetingSession>
  >;
  roundStartedAt: Date | null;
  completeCurrentChapter: (
    chapter: number,
  ) => void;
}

export function useMeetingStageTimer({
  session,
  setSession,
  roundStartedAt,
  completeCurrentChapter,
}: UseMeetingStageTimerArgs) {
  const [
    transitionState,
    setTransitionState,
  ] = useState("idle");

  const [
    remainingSeconds,
    setRemainingSeconds,
  ] = useState<number | null>(null);

  const sessionRef = useRef(session);

  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  const currentStage = getCurrentStage(
    session.currentStageId,
  );

  if (!currentStage) {
    throw new Error(
      `Unknown conversation stage: ${session.currentStageId}`,
    );
  }

  useEffect(() => {
    if (!roundStartedAt) {
      return;
    }
    const authoritativeStart =
      roundStartedAt;

    function synchronizeStage() {
      const now = Date.now();
      const elapsedSeconds = Math.max(
        0,
        Math.floor(
          (now -
            authoritativeStart.getTime()) /
            1000,
        ),
      );

      const derivedStage =
        getStageForElapsedSeconds(
          elapsedSeconds,
        );

      const currentSession =
        sessionRef.current;

      if (
        derivedStage.id !==
        currentSession.currentStageId
      ) {
        const previousStage =
          getCurrentStage(
            currentSession.currentStageId,
          );

        if (previousStage) {
          completeCurrentChapter(
            previousStage.chapter,
          );
        }

        const updatedSession: MeetingSession = {
          ...currentSession,
          currentStageId:
            derivedStage.id,
        };

        updateSession(updatedSession);
        sessionRef.current = updatedSession;

        setSession(updatedSession);

        setTransitionState(
          "transitioning",
        );

        window.setTimeout(() => {
          setTransitionState("idle");
        }, 900);
      }

      const remaining =
        getRemainingStageSeconds(
          authoritativeStart,
          derivedStage.id,
          now,
        );

      setRemainingSeconds(remaining);
    }

    synchronizeStage();

    const interval = window.setInterval(
      synchronizeStage,
      1000,
    );

    return () => {
      window.clearInterval(interval);
    };
  }, [
    roundStartedAt,
    completeCurrentChapter,
    setSession,
  ]);

  return {
    currentStage,
    transitionState,
    setTransitionState,
    remainingSeconds,
  };
}
