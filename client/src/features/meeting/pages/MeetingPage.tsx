import { Container } from "@/components/layout";

import { MeetingHeader } from "../components/MeetingHeader";
import { ConversationCard } from "../components/ConversationCard";
import { MeetingTimer } from "../components/MeetingTimer";

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
        <section className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center">

          <MeetingHeader
            partnerName={partner}
          />

          <ConversationCard
            round={round}
            question={question}
          />

          <div className="mt-10">
            <MeetingTimer
              time={remainingTime}
            />
          </div>

        </section>
      </Container>
    </main>
  );
}
