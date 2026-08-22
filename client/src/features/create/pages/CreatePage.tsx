import { useNavigate } from "react-router-dom";

import { Container } from "@/components/layout";
import { Heading, Text } from "@/components/ui";
import { PageEnter } from "@/lib/motion";

import { CreateForm } from "../components/CreateForm";

import { createEvent } from "../services/createEventService";

import {
  setJoinedEvent,
  setJoinedParticipant,
} from "@/features/join/services/joinSession";

export function CreatePage() {
  const navigate = useNavigate();

  async function handleCreate(
    hostName: string,
  ) {
    try {
      const { event, participant } =
        await createEvent({ hostName });

      setJoinedEvent({
        id: event.id,
        code: event.code,
        name: event.name,
        created_at: event.created_at,
      });

      setJoinedParticipant({
        id: participant.id,
        name: participant.display_name,
        status: participant.presence_status,
      });

      navigate("/lobby");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <Container>
        <PageEnter>
          <section className="flex min-h-screen flex-col justify-center">
            <Heading>
              Create a meetup
            </Heading>

            <Text className="mt-3 max-w-md text-white/60">
              Start a new Ki gathering
              and invite others using a
              simple code.
            </Text>

            <div className="mt-8 max-w-md">
              <CreateForm
                onCreate={handleCreate}
              />
            </div>
          </section>
        </PageEnter>
      </Container>
    </main>
  );
}
