import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Info, Eye } from "lucide-react";

import { Container } from "@/components/layout";
import { TOTAL_PARTNER_ROTATIONS } from "@/features/event/constants/event";
import { ConversationPassportCard } from "@/features/passport/components";
import { listContainer, listItem } from "@/lib/motion";
import { getJoinedEvent, getJoinedParticipant } from "@/features/join/services/joinSession";
import { getExistingMission } from "@/features/mission/services/getMission";

import {
  ConversationCard,
  ConversationComplete,
  MeetingHeader,
  MeetingTimer,
} from "../components";
import { MeetupDetails } from "../components/MeetupDetails";
import { MissionQuickView } from "@/features/mission/components/MissionQuickView";

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

  const [showMeetupDetails, setShowMeetupDetails] = useState(false);
  const [showMission, setShowMission] = useState(false);
  const [missionText, setMissionText] = useState<string | null>(null);

  const event = getJoinedEvent();
  const participant = getJoinedParticipant();

  useEffect(() => {
    if (!event || !participant) return;

    async function loadMission() {
      const mission = await getExistingMission(event!.id, participant!.id);
      if (mission) {
        setMissionText(mission.text);
      }
    }

    loadMission();
  }, [event, participant]);

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

        {/* Quiet controls */}
        <div className="fixed bottom-6 right-6 flex gap-3">
          {missionText && (
            <button
              onClick={() => setShowMission(true)}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs text-white/60 backdrop-blur transition-colors hover:bg-black/60 hover:text-white/80"
              aria-label="View my mission"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>My mission</span>
            </button>
          )}

          {event && (
            <button
              onClick={() => setShowMeetupDetails(true)}
              className="rounded-lg border border-white/10 bg-black/40 p-2 text-white/60 backdrop-blur transition-colors hover:bg-black/60 hover:text-white/80"
              aria-label="Meetup details"
            >
              <Info className="h-4 w-4" />
            </button>
          )}
        </div>
      </Container>

      {event && (
        <MeetupDetails
          gatheringName={event.name}
          eventCode={event.code}
          isOpen={showMeetupDetails}
          onClose={() => setShowMeetupDetails(false)}
        />
      )}

      <MissionQuickView
        missionText={missionText}
        isOpen={showMission}
        onClose={() => setShowMission(false)}
      />
    </main>
  );
}
