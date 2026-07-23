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
    session,
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
            partnerName={session.participant.name}
          />

          {session.phase === "conversation" ? (
            <ConversationCard
              round={session.round}
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
