import { useNavigate } from "react-router-dom";

import { Container } from "@/components/layout";
import { PageEnter } from "@/lib/motion";

import { WnrsCard } from "../components/WnrsCard";
import { WnrsActions } from "../components/WnrsActions";

import { useWnrs } from "../hooks/useWnrs";

export function WnrsPage() {
  const navigate = useNavigate();

  const { prompt } = useWnrs();

  function continueToGatherAround() {
    navigate("/gather-around");
  }

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
            <WnrsCard
              prompt={
                prompt ??
                "Take a moment to reflect together."
              }
            />

            <WnrsActions
              onContinue={
                continueToGatherAround
              }
            />
          </section>
        </PageEnter>
      </Container>
    </main>
  );
}
