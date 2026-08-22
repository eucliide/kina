import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Container } from "@/components/layout";
import { Button, Heading, Text } from "@/components/ui";
import { PageEnter } from "@/lib/motion";

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

  const nudgedIdsRef = useRef<string[]>([]);

  const [nudgedParticipant, setNudgedParticipant] =
    useState<TableParticipant | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const participantsRef = useRef<TableParticipant[]>([]);

  useEffect(() => {
    participantsRef.current = participants;
  }, [participants]);

  async function loadParticipants() {
    const { data: eventParticipants, error } = await supabase
      .from("event_participants")
      .select("id, display_name")
      .eq(
        "event_id",
        (await import("@/features/join/services/joinSession")).getJoinedEvent()?.id,
      )
      .order("joined_at", { ascending: true });

    if (error) throw error;

    setParticipants(
      (eventParticipants ?? []).map(
        (p: { id: string; display_name: string }) => ({
          id: p.id,
          name: p.display_name,
        }),
      ),
    );
  }

  function pickNextReader(available: TableParticipant[]): TableParticipant | null {
    if (available.length === 0) return null;

    let candidates = available.filter(
      (p) => !nudgedIdsRef.current.includes(p.id),
    );

    if (candidates.length === 0) {
      nudgedIdsRef.current = [];
      candidates = available;
    }

    const picked =
      candidates[Math.floor(Math.random() * candidates.length)] ?? null;

    if (picked) {
      nudgedIdsRef.current = [...nudgedIdsRef.current, picked.id];
    }

    return picked;
  }

  async function loadTopic() {
    try {
      setLoading(true);
      setError(false);

      const nextPrompt = await getTableTopicsPrompt();
      setPrompt(nextPrompt);
      setNudgedParticipant(pickNextReader(participantsRef.current));
    } catch (err) {
      console.error("Failed to load TableTopics:", err);
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
      } catch (err) {
        console.error("Failed to initialise TableTopics:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    initialise();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (participants.length === 0 || prompt) return;
    void loadTopic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participants.length]);

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <Container>
        <PageEnter>
          <section className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center text-center">
            <Heading>Table Topics</Heading>

            <AnimatePresence mode="wait">
              {nudgedParticipant && (
                <motion.div
                  key={nudgedParticipant.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Text className="mt-3">
                    <span className="text-white/80">{nudgedParticipant.name}</span>
                    {" — read the next one."}
                  </Text>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 w-full rounded-2xl border border-white/10 bg-white/5 px-8 py-8">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Text className="text-white/40">Preparing a topic…</Text>
                  </motion.div>
                ) : error ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Text className="text-white/40">Couldn't load a topic.</Text>
                  </motion.div>
                ) : prompt ? (
                  <motion.div
                    key={prompt.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <Text className="text-xl leading-relaxed text-white">
                      {prompt.text}
                    </Text>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Text className="text-white/40">No topics available.</Text>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button
              variant="ghost"
              className="mt-6"
              onClick={loadTopic}
              disabled={loading}
            >
              Next topic
            </Button>
          </section>
        </PageEnter>
      </Container>
    </main>
  );
}
