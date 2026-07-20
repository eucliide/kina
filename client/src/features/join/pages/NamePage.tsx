import { useNavigate } from "react-router-dom";

import { Container } from "@/components/layout";
import { Heading, Text } from "@/components/ui";

import { NameForm } from "../components/NameForm";

export function NamePage() {
  const navigate = useNavigate();

  function handleContinue() {
    navigate("/lobby");
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
            <NameForm onContinue={handleContinue} />
          </div>

        </section>

      </Container>

    </main>
  );
}
