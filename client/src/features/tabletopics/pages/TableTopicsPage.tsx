import { useEffect, useState } from "react";

import { Container } from "@/components/layout";
import { Button, Heading, Text } from "@/components/ui";

import { supabase } from "@/lib/supabase";

import {
  getTableTopicsPrompt,
  type TableTopicsPrompt,
} from "../services/tableTopicsService";

interface TableParticipant {
  id: string;
  name: string;
}

export function TableTopicsPage() {
  const [prompt, setPrompt] =
    useState<TableTopicsPrompt | undefined>();

  const [participants, setParticipants] =
    useState<TableParticipant[]>([]);

  const [nudgedIds, setNudgedIds] =
    useState<string[]>([]);

  const [nudgedParticipant, setNudgedParticipant] =
    useState<TableParticipant | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(false);

  async function loadParticipants() {
    const {
      data: eventParticipants,
      error,
    } = await supabase
      .from("event_participants")
      .select(`
        id,
        display_name
      `)
      .eq(
        "event_id",
        (
          await import(
            "@/features/join/services/joinSession"
          )
        ).getJoinedEvent()?.id,
      )
      .order("joined_at", {
        ascending: true,
      });

    if (error) {
      throw error;
    }

    setParticipants(
      (eventParticipants ?? []).map(
        (participant: { id: string; display_name: string }) => ({
          id: participant.id,
          name: participant.display_name,
        }),
      ),
    );
  }

  function chooseNextReader(
    availableParticipants: TableParticipant[],
    alreadyNudged: string[],
  ) {
    if (availableParticipants.length === 0) {
      return null;
    }

    let candidates =
      availableParticipants.filter(
        (participant) =>
          !alreadyNudged.includes(
            participant.id,
          ),
      );

    if (candidates.length === 0) {
      candidates = availableParticipants;
      setNudgedIds([]);
    }

    const randomIndex = Math.floor(
      Math.random() * candidates.length,
    );

    return candidates[randomIndex] ?? null;
  }

  async function loadTopic() {
    try {
      setLoading(true);
      setError(false);

      const nextPrompt =
        await getTableTopicsPrompt();

      setPrompt(nextPrompt);

      /*
       * Select the next reader only after
       * the topic has successfully loaded.
       */
      const reader = chooseNextReader(
        participants,
        nudgedIds,
      );

      if (reader) {
        setNudgedParticipant(reader);

        setNudgedIds((previous) => [
          ...previous,
          reader.id,
        ]);
      }
    } catch (error) {
      console.error(
        "Failed to load TableTopics:",
        error,
      );

      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function initialise() {
      try {
        setLoading(true);

        await loadParticipants();
      } catch (error) {
        console.error(
          "Failed to initialise TableTopics:",
          error,
        );

        setError(true);
      } finally {
        setLoading(false);
      }
    }

    initialise();
  }, []);

  /*
   * Load the first topic once the participant
   * list is available.
   */
  useEffect(() => {
    if (participants.length === 0) {
      return;
    }

    if (prompt) {
      return;
    }

    async function loadFirstTopic() {
      await loadTopic();
    }

    void loadFirstTopic();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participants.length]);

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <Container>
        <section
          className="
            mx-auto
            flex
            min-h-screen
            max-w-2xl
            flex-col
            items-center
            justify-center
            text-center
          "
        >
          <Text className="uppercase tracking-[0.2em] text-white/40">
            TableTopics
          </Text>

          <Heading className="mt-4">
            One table. One conversation.
          </Heading>

          {nudgedParticipant && (
            <Text className="mt-5 text-white/70">
              <span className="text-white">
                {nudgedParticipant.name}
              </span>
              , read the next one.
            </Text>
          )}

          <div
            className="
              mt-10
              w-full
              rounded-3xl
              border
              border-white/10
              bg-white/5
              px-8
              py-8
            "
          >
            {loading ? (
              <Text className="text-white/50">
                Preparing a topic…
              </Text>
            ) : error ? (
              <Text className="text-white/50">
                We couldn't load a topic.
              </Text>
            ) : prompt ? (
              <Text className="text-lg leading-relaxed text-white">
                {prompt.text}
              </Text>
            ) : (
              <Text className="text-white/50">
                No topics are available yet.
              </Text>
            )}
          </div>

          <Button
            className="mt-8"
            onClick={loadTopic}
            disabled={loading}
          >
            Next topic
          </Button>
        </section>
      </Container>
    </main>
  );
}
