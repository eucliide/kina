import { useNavigate, Link } from "react-router-dom";

import { Container } from "@/components/layout";
import { Heading, Text } from "@/components/ui";
import { PageEnter } from "@/lib/motion";

import { CreateForm } from "../components/CreateForm";

import { createEvent } from "../services/createEventService";

import {
  setJoinedEvent,
} from "@/features/join/services/joinSession";

export function CreatePage() {
  const navigate = useNavigate();

  async function handleCreate(
    gatheringName: string,
  ) {
    try {
      const { event } =
        await createEvent({ gatheringName });

      // Map database event to Event type
      setJoinedEvent({
        id: event.id,
        code: event.code,
        name: event.name,
        host_id: event.host_id,
        stage: event.stage as "waiting" | "activity" | "completed",
        current_activity_id: event.current_activity_id,
        current_round: null,
        round_started_at: null,
        round_ends_at: null,
        created_at: event.created_at,
      });

      navigate("/create/ready");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      {/* Navigation */}
      <header className="absolute inset-x-0 top-0 z-10">
        <Container>
          <nav className="flex h-20 items-center">
            <Link
              to="/"
              className="text-base font-medium tracking-tight text-white/80 transition-colors hover:text-white"
            >
              Kina
            </Link>
          </nav>
        </Container>
      </header>

      <Container>
        <PageEnter>
          <section className="flex min-h-screen flex-col justify-center">
            <Heading>
              Create a gathering
            </Heading>

            <Text className="mt-3 max-w-md text-white/60">
              Start a new Kina gathering
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
