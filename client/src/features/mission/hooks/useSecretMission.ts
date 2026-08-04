import { useEffect, useState } from "react";

import { getSecretMission } from "../services/secretMissionService";

import type { SecretMission } from "../types/secretMission";

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
      try {
        setLoading(true);
        setError(null);

        const result =
          await getSecretMission();

        if (!cancelled) {
          setMission(result);
        }
      } catch (error) {
        console.error(error);

        if (!cancelled) {
          setError(
            "Unable to load your secret mission.",
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
