import { useNavigate } from "react-router-dom";

import { Container } from "@/components/layout";
import {
  Heading,
  Text,
} from "@/components/ui";

import { CreateForm } from "../components/CreateForm";

import { createEvent } from "../services/createEventService";

export function CreatePage() {
  const navigate = useNavigate();

  async function handleCreate(
    hostName: string,
  ) {
    try {
      await createEvent({
        hostName,
      });

      navigate("/lobby");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <Container>
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
              onCreate={
                handleCreate
              }
            />
          </div>
        </section>
      </Container>
    </main>
  );
}
