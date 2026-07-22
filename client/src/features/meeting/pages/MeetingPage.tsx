import { Container } from "@/components/layout";

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

          <ConversationCard
            round={round}
            question={question.text}
          />

          <MeetingTimer
            time={remainingTime}
          />
        </section>
      </Container>
    </main>
  );
}
