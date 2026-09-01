import { Container } from "@/components/layout";
import { PageEnter } from "@/lib/motion";

import { ReflectionActions } from "../components/ReflectionActions";
import { ReflectionCard } from "../components/ReflectionCard";
import { useReflection } from "../hooks/useReflection";

export function ReflectionPage() {
  const {
      partnerName,
      continueToLobby,
  } = useReflection();

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <Container>
        <PageEnter>
          <section
            className="
              mx-auto
              flex
              min-h-screen
              max-w-2xl
              flex-col
              justify-center
              py-12
              sm:py-16
            "
          >
            <ReflectionCard
                partnerName={partnerName}
                prompt=""
            />
            <ReflectionActions
              onContinue={continueToLobby}
            />
          </section>
        </PageEnter>
      </Container>
    </main>
  );
}
