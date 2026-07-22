import { Container } from "@/components/layout";

import {
  ConversationCard,
  MeetingHeader,
  MeetingTimer,
  ReflectionCard,
} from "../components";

import { useMeeting } from "../hooks/useMeeting";

export function MeetingPage() {
  const {
    partner,
    phase,
    round,
    question,
    remainingTime,
    remainingSeconds,
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

          {phase === "conversation" ? (
            <ConversationCard
              round={round}
              question={question.text}
            />
          ) : (
            <ReflectionCard
              remainingTime={remainingTime}
            />
          )}

          <MeetingTimer
            time={remainingTime}
            remainingSeconds={remainingSeconds}
          />
        </section>
      </Container>
    </main>
  );
}
