import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Container } from "@/components/layout";
import { Heading, Text } from "@/components/ui";

import { registerParticipant } from "@/features/lobby/services/lobbyService";

import {
  getJoinedEvent,
  setJoinedParticipant,
} from "../services/joinSession";

import { NameForm } from "../components/NameForm";

export function NamePage() {
  const navigate = useNavigate();

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleContinue(
    name: string,
  ) {
    const event =
      getJoinedEvent();

    if (!event) {
      setError(
        "No meetup selected.",
      );
      return;
    }

    setError("");
    setLoading(true);

    try {
      const participant =
        await registerParticipant(
          event.id,
          name,
        );

      setJoinedParticipant(
        participant,
      );

      /*
       * Secret Mission happens before
       * entering the social space.
       *
       * The participant receives their
       * private intention before meeting
       * others in the lobby.
       */
      navigate(
        "/secret-mission",
      );
    } catch (error) {
      console.error(error);

      setError(
        "Unable to join the meetup.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <Container>
        <section className="flex min-h-screen flex-col justify-center">
          <Heading>
            What's your first name?
          </Heading>

          <Text className="mt-3 max-w-md text-white/60">
            This is how other participants will know you during the meetup.
          </Text>

          <div className="mt-8 max-w-md">
            <NameForm
              onContinue={
                handleContinue
              }
            />

            {error && (
              <p className="mt-3 text-sm text-red-300">
                {error}
              </p>
            )}

            {loading && (
              <p className="mt-3 text-sm text-white/40">
                Joining meetup...
              </p>
            )}
          </div>
        </section>
      </Container>
    </main>
  );
}
