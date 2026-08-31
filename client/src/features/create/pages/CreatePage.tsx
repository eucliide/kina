import { Link, useNavigate } from "react-router-dom";

import { Container } from "@/components/layout";
import { Heading, Text } from "@/components/ui";
import { PageEnter } from "@/lib/motion";

import { setJoinedEvent } from "@/features/join/services/joinSession";

import { CreateForm } from "../components/CreateForm";
import { createEvent } from "../services/createEventService";

export function CreatePage() {
  const navigate = useNavigate();

  async function handleCreate(gatheringName: string) {
    try {
      const { event } = await createEvent({
        gatheringName,
      });

      setJoinedEvent({
        id: event.id,
        code: event.code,
        name: event.name,
        host_id: event.host_id,
        stage: event.stage,
        current_activity_id: event.current_activity_id,
        current_round: event.current_round,
        round_started_at: event.round_started_at,
        round_ends_at: event.round_ends_at,
        created_at: event.created_at,
      });

      navigate("/create/ready");
    } catch (error) {
      console.error("Failed to create event:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to create gathering. Please try again.",
      );
    }
  }

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
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
              Start a new Kina gathering and invite others
              using a simple code.
            </Text>

            <div className="mt-8 max-w-md">
              <CreateForm onCreate={handleCreate} />
            </div>
          </section>
        </PageEnter>
      </Container>
    </main>
  );
}