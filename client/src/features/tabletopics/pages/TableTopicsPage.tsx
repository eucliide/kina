import { useEffect, useState } from "react";

import { Container } from "@/components/layout";
import { Button, Heading, Text } from "@/components/ui";

import { supabase } from "@/lib/supabase";

import {
  getTableTopicsPrompt,
  type TableTopicsPrompt,
} from "../services/tableTopicsService";

import {
  getJoinedEvent,
  getJoinedParticipant,
} from "@/features/join/services/joinSession";

interface TableParticipant {
  id: string;
  name: string;
}

export function TableTopicsPage() {
  const [prompt, setPrompt] =
    useState<TableTopicsPrompt | undefined>();

  const [participants, setParticipants] =
    useState<TableParticipant[]>([]);

  const [nudgedParticipant, setNudgedParticipant] =
    useState<TableParticipant | null>(null);

  const [nudgedIds, setNudgedIds] =
    useState<string[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(false);

  async function loadParticipants() {
    const event = getJoinedEvent();

    if (!event) {
      throw new Error("No active event.");
    }

    const { data, error } = await supabase
      .from("event_participants")
      .select(`
        id,
        display_name
      `)
      .eq("event_id", event.id)
      .order("joined_at", {
        ascending: true,
      });

    if (error) {
      throw error;
    }

    setParticipants(
      (data ?? []).map((participant) => ({
        id: participant.id,
        name: participant.display_name,
      })),
    );
  }

  async function loadPrompt() {
    try {
      setLoading(true);
      setError(false);

      const nextPrompt =
        await getTableTopicsPrompt();

      setPrompt(nextPrompt);

      await loadParticipants();
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

  function chooseNextReader() {
    if (participants.length === 0) {
      return;
    }

    const currentParticipant =
      getJoinedParticipant();

    /*
     * Prioritize participants who have
     * not been nudged yet.
     */
    let availableParticipants =
      participants.filter(
        (participant) =>
          !nudgedIds.includes(participant.id),
      );

    /*
     * Once everyone has been nudged,
     * start a fresh cycle.
     */
    if (availableParticipants.length === 0) {
      setNudgedIds([]);
      availableParticipants = participants;
    }

    /*
     * Avoid selecting the current user
     * when another participant is available.
     */
    if (
      availableParticipants.length > 1 &&
      currentParticipant
    ) {
      availableParticipants =
        availableParticipants.filter(
          (participant) =>
            participant.id !==
            currentParticipant.id,
        );
    }

    const randomIndex = Math.floor(
      Math.random() *
        availableParticipants.length,
    );

    const selected =
      availableParticipants[randomIndex];

    if (!selected) {
      return;
    }

    setNudgedParticipant(selected);

    setNudgedIds((previous) => [
      ...previous,
      selected.id,
    ]);
  }

  useEffect(() => {
    loadPrompt();
  }, []);

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

          <div className="mt-8 flex gap-3">
            <Button
              onClick={chooseNextReader}
              disabled={
                loading ||
                participants.length === 0
              }
            >
              Choose reader
            </Button>

            <Button
              onClick={loadPrompt}
              disabled={loading}
            >
              Next topic
            </Button>
          </div>
        </section>
      </Container>
    </main>
  );
}
