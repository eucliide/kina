import { Container } from "@/components/layout";

import { ReflectionActions } from "../components/ReflectionActions";
import { ReflectionCard } from "../components/ReflectionCard";
import { useReflection } from "../hooks/useReflection";

export function ReflectionPage() {
  const {
      partnerName,
      prompt,
      continueToLobby,
  } = useReflection();

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
            justify-center
          "
        >
          <ReflectionCard
              partnerName={partnerName}
              prompt={prompt}
          />
          <ReflectionActions
            onContinue={continueToLobby}
          />
        </section>
      </Container>
    </main>
  );
}
