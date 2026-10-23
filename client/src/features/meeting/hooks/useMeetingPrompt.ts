import {
  useEffect,
  useState,
} from "react";

import type { ConversationPrompt } from "@/features/activity/types/conversationPrompt";

import {
  getConversationPrompt,
} from "@/features/activity/services/conversationJourneyService";

type ConversationStageId =
  ConversationPrompt["stageId"];

interface UseMeetingPromptArgs {
  partnerRotation: number;
  stageId: string;
  stageTitle: string;
}

export function useMeetingPrompt({
  partnerRotation,
  stageId,
  stageTitle,
}: UseMeetingPromptArgs) {
  const [
    currentPrompt,
    setCurrentPrompt,
  ] = useState<
    ConversationPrompt | undefined
  >();

  const [promptError, setPromptError] =
    useState<string | null>(null);

  useEffect(() => {
    const typedStageId =
      stageId as ConversationStageId;

    let cancelled = false;

    async function loadPrompt() {
      try {
        setCurrentPrompt(undefined);
        setPromptError(null);

        const prompt =
          await getConversationPrompt(
            partnerRotation,
            typedStageId,
          );

        if (cancelled) {
          return;
        }

        if (prompt) {
          setCurrentPrompt(prompt);
          return;
        }

        const message =
          `Missing Conversation Journey prompt for rotation ${partnerRotation}, stage ${typedStageId}.`;

        if (import.meta.env.DEV) {
          setCurrentPrompt({
            id:
              `dev-fallback-${partnerRotation}-${typedStageId}`,
            stageId: typedStageId,
            text:
              `[DEV fallback] Let's talk about ${stageTitle.toLowerCase()}.`,
          });

          setPromptError(message);
          return;
        }

        setPromptError(message);
      } catch (error) {
        console.error(
          "Failed to load conversation prompt:",
          error,
        );

        if (cancelled) {
          return;
        }

        const message =
          error instanceof Error
            ? error.message
            : "Conversation prompt unavailable.";

        setPromptError(message);
      }
    }

    loadPrompt();

    return () => {
      cancelled = true;
    };
  }, [
    partnerRotation,
    stageTitle,
    stageId,
  ]);

  return {
    currentPrompt,
    promptError,
  };
}
