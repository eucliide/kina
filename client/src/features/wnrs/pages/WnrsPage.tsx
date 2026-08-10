import { useNavigate } from "react-router-dom";

import { Container } from "@/components/layout";

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
    <main
      className="
        min-h-screen
        bg-[#07111f]
        text-white
      "
    >
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
          <WnrsCard
            prompt={prompt}
          />

          <WnrsActions
            onContinue={
              continueToGatherAround
            }
          />
        </section>
      </Container>
    </main>
  );
}
