import { useEffect, useState } from "react";

import { ensureAnonymousUser } from "../services/authService";

export function useAnonymousAuth() {
  const [ready, setReady] =
    useState(false);

  const [error, setError] =
    useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function initialize() {
      try {
        await ensureAnonymousUser();

        if (mounted) {
          setReady(true);
        }
      } catch (error) {
        if (mounted) {
          setError(
            error instanceof Error
              ? error
              : new Error(
                  "Failed to initialize authentication.",
                ),
          );
        }
      }
    }

    initialize();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    ready,
    error,
  };
}
