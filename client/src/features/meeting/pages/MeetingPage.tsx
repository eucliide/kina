import { Container } from "@/components/layout";

import { ReflectionCard } from "../components/ReflectionCard";
import {
  ConversationCard,
  MeetingHeader,
  MeetingTimer,
} from "../components";

import { useMeeting } from "../hooks/useMeeting";

export function MeetingPage() {
  const {
    partner,
    round,
    phase,
    question,
    remainingTime,
  } = useMeeting();

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <Container>
        <section
          className="
            mx-auto
            flex
            min-h-screen
            max-w-3xl
            flex-col
            justify-center
          "
        >
          <MeetingHeader
            partnerName={partner.name}
          />

          {
            phase === "conversation" ? (
              <ConversationCard
                round={round}
                question={question.text}
              />
            ) : (
              <ReflectionCard
                remainingTime={remainingTime}
              />
            )
          }

          <MeetingTimer
            time={remainingTime}
          />
        </section>
      </Container>
    </main>
  );
}
