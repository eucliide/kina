import { useEffect, useState } from "react";

import {
  getWnrsPrompt,
  type WnrsPromptResult,
} from "@/features/activity/services/conversationJourneyService";

export function useWnrs() {
  const [prompt, setPrompt] =
    useState<
      WnrsPromptResult | undefined
    >();

  useEffect(() => {
    let cancelled = false;

    async function loadPrompt() {
      try {
        const loaded =
          await getWnrsPrompt();

        if (!cancelled) {
          setPrompt(loaded);
        }
      } catch (error) {
        console.error(
          "Failed to load WNRS prompt:",
          error,
        );

        if (!cancelled) {
          setPrompt(undefined);
        }
      }
    }

    loadPrompt();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    prompt: prompt?.text,
  };
}
