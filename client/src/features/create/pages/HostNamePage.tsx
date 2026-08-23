import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Container } from "@/components/layout";
import { Heading, Text } from "@/components/ui";
import { PageEnter } from "@/lib/motion";

import { NameForm } from "@/features/join/components/NameForm";
import { registerParticipant } from "@/features/lobby/services/lobbyService";

import {
  getJoinedEvent,
  setJoinedParticipant,
} from "@/features/join/services/joinSession";

export function HostNamePage() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleContinue(name: string) {
    const event = getJoinedEvent();

    if (!event) {
      setError("No gathering selected.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const participant = await registerParticipant(event.id, name);

      setJoinedParticipant(participant);

      navigate("/secret-mission");
    } catch (err) {
      console.error(err);
      setError("Unable to join the gathering.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <Container>
        <PageEnter>
          <section className="flex min-h-screen flex-col justify-center">
            <Heading>What's your name?</Heading>

            <Text className="mt-3 max-w-sm">
              This is how others will know you tonight.
            </Text>

            <div className="mt-8 max-w-sm">
              <NameForm onContinue={handleContinue} />

              {error && (
                <p className="mt-3 text-sm text-red-300/80">{error}</p>
              )}

              {loading && (
                <p className="mt-3 text-sm text-white/30">Joining…</p>
              )}
            </div>
          </section>
        </PageEnter>
      </Container>
    </main>
  );
}
