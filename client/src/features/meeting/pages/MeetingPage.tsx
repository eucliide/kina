import { Container } from "@/components/layout";

import {
  ConversationCard,
  MeetingHeader,
  MeetingTimer,
} from "../components";

//prevents magic numbers from spreading through the codebase.
import {
  TOTAL_PARTNER_ROTATIONS,
} from "@/features/event/constants/event";

import {
  ConversationPassportCard,
} from "@/features/passport/components";

import { useMeeting } from "../hooks/useMeeting";

export function MeetingPage() {
  const {
    passport,
    session,
    transitionState,
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
          />

          <div className="mb-8">
            <ConversationPassportCard
              rotation={passport.rotation}
              totalRotations={TOTAL_PARTNER_ROTATIONS}
              currentChapter={
                passport.currentChapter
              }
            />
          </div>

          <ConversationCard
            chapter={currentStage.chapter}
            stageTitle={currentStage.title}
            question={
              currentPrompt?.text ??
              "Prompt unavailable."
            }
            transitioning={
              transitionState ===
              "transitioning"
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
