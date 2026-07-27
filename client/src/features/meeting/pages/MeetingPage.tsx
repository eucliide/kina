import { Container } from "@/components/layout";

import {
  ConversationCard,
  MeetingHeader,
  MeetingTimer,
} from "../components";

import { useMeeting } from "../hooks/useMeeting";

export function MeetingPage() {
  const {
    session,
    currentStage,
    currentPrompt,
    remainingTime,
    remainingSeconds,
  } = useMeeting();

  if (!session) {
    return null;
  }

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
            stageTitle={currentStage.title}
          />

         <ConversationCard
           chapter={currentStage.chapter}
           stageTitle={currentStage.title}
           question={
             currentPrompt?.text ??
             "Prompt unavailable."
           }
         />

          <MeetingTimer
            time={remainingTime}
            remainingSeconds={remainingSeconds}
          />
        </section>
      </Container>
    </main>
  );
}
