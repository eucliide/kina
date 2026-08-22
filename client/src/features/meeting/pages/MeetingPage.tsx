import { motion } from "framer-motion";

import { Container } from "@/components/layout";
import { TOTAL_PARTNER_ROTATIONS } from "@/features/event/constants/event";
import { ConversationPassportCard } from "@/features/passport/components";
import { listContainer, listItem } from "@/lib/motion";

import {
  ConversationCard,
  ConversationComplete,
  MeetingHeader,
  MeetingTimer,
} from "../components";

import { useMeeting } from "../hooks/useMeeting";

export function MeetingPage() {
  const {
    state,
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
        {/* ARRIVAL — stagger each element into view on mount */}
        <motion.section
          className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center"
          variants={listContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={listItem}>
            <MeetingHeader partnerName={session.participant.name} />
          </motion.div>

          <motion.div variants={listItem} className="mb-6">
            <ConversationPassportCard
              rotation={passport.rotation}
              totalRotations={TOTAL_PARTNER_ROTATIONS}
              currentChapter={passport.currentChapter}
            />
          </motion.div>

          <motion.div variants={listItem}>
            {state === "meeting" ? (
              <ConversationCard
                chapter={currentStage.chapter}
                stageTitle={currentStage.title}
                question={currentPrompt?.text ?? "Prompt unavailable."}
                transitioning={transitionState === "transitioning"}
              />
            ) : (
              <ConversationComplete />
            )}
          </motion.div>

          <motion.div variants={listItem}>
            <MeetingTimer
              time={remainingTime}
              remainingSeconds={remainingSeconds}
            />
          </motion.div>
        </motion.section>
      </Container>
    </main>
  );
}
