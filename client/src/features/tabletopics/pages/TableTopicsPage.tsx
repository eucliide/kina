import { useEffect, useState } from "react";

import { Container } from "@/components/layout";
import { Button, Heading, Text } from "@/components/ui";

import {
  getTableTopicsPrompt,
  type TableTopicsPrompt,
} from "../services/tableTopicsService";

export function TableTopicsPage() {
  const [prompt, setPrompt] =
    useState<TableTopicsPrompt | undefined>();

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(false);

  async function loadPrompt() {
    try {
      setLoading(true);
      setError(false);

      const nextPrompt =
        await getTableTopicsPrompt();

      setPrompt(nextPrompt);
    } catch (error) {
      console.error(
        "Failed to load TableTopics prompt:",
        error,
      );

      setError(true);
    } finally {
      setLoading(false);
    }
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
            onClick={loadPrompt}
            disabled={loading}
          >
            Next topic
          </Button>
        </section>
      </Container>
    </main>
  );
}
