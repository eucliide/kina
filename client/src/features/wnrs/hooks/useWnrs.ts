import { useMemo } from "react";

import {
  WNRS_PROMPTS,
} from "../data/prompts";

export function useWnrs() {
  const prompt = useMemo(() => {
    const index = Math.floor(
      Math.random() *
        WNRS_PROMPTS.length,
    );

    return WNRS_PROMPTS[index];
  }, []);

  return {
    prompt,
  };
}
