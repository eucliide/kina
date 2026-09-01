import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Info, Eye } from "lucide-react";

import { Container } from "@/components/layout";

import { TOTAL_PARTNER_ROTATIONS } from "@/features/event/constants/event";

import {
  ConversationPassportCard,
  EnvelopeArrivalScene,
  PassportStampScene,
} from "@/features/passport/components";

import {
  getJoinedEvent,
  getJoinedParticipant,
} from "@/features/join/services/joinSession";

import { getExistingMission } from "@/features/mission/services/getMission";

import {
  ConversationCard,
  ConversationComplete,
  MeetingHeader,
  MeetingTimer,
  PartnerAwayNotice,
} from "../components";

import { MeetupDetails } from "../components/MeetupDetails";

import { MissionQuickView } from "@/features/mission/components/MissionQuickView";

import { useMeeting } from "../hooks/useMeeting";
import { usePartnerPresence } from "../hooks/usePartnerPresence";

import { listContainer, listItem } from "@/lib/motion";

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

  const [showMeetupDetails, setShowMeetupDetails] =
    useState(false);

  const [showMission, setShowMission] =
    useState(false);

  const [missionText, setMissionText] =
    useState<string | null>(null);

  const [showArrival, setShowArrival] =
    useState(true);

  const [showStamp, setShowStamp] =
    useState(false);

  const [stampedChapter, setStampedChapter] =
    useState<number | null>(null);

  const event = getJoinedEvent();
  const participant = getJoinedParticipant();

  const { isPartnerOnline } =
    usePartnerPresence(
      event?.id ?? "",
      session?.participant.id ?? "",
      participant?.id ?? "",
    );

  /*
   * Partner arrival scene.
   *
   * Runs once whenever a new partner rotation begins.
   */
  useEffect(() => {
    if (!session) {
      return;
    }

    setShowArrival(true);

    const timeout = window.setTimeout(() => {
      setShowArrival(false);
    }, 1600);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [session.partnerRotation]);

  /*
   * Passport stamp scene.
   *
   * A completed chapter produces a short
   * full-screen passport stamp before the
   * next chapter becomes visible.
   */
  useEffect(() => {
    if (
      transitionState !== "transitioning" ||
      !passport
    ) {
      return;
    }

    const completedChapter = Math.max(
      1,
      passport.currentChapter - 1,
    );

    setStampedChapter(completedChapter);
    setShowStamp(true);

    const timeout = window.setTimeout(() => {
      setShowStamp(false);
    }, 2500);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [
    transitionState,
    passport?.currentChapter,
  ]);

  /*
   * Load the participant's secret mission.
   * This loads independently and should not block the meeting experience.
   */
  useEffect(() => {
    const eventId = event?.id;
    const participantId = participant?.id;

    if (!eventId || !participantId) {
      return;
    }

    let cancelled = false;

    async function loadMission() {
      try {
        const mission = await getExistingMission(
          eventId!,
          participantId!,
        );

        if (!cancelled && mission) {
          setMissionText(mission.text);
        }
      } catch (error) {
        console.error(
          "Failed to load mission:",
          error,
        );
      }
    }

    loadMission();

    return () => {
      cancelled = true;
    };
  }, [event?.id, participant?.id]);

  /*
   * Keep the page defensive even though the meeting
   * hook should provide a valid stage.
   */
  if (!currentStage) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#07111f] text-white">
        <div className="text-center">
          <p className="text-white/60">
            Conversation stage unavailable.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <AnimatePresence mode="wait">
        {showArrival && (
          <EnvelopeArrivalScene
            key={`arrival-${session.partnerRotation}`}
            partnerName={session.participant.name}
            rotation={session.partnerRotation}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showStamp && stampedChapter !== null && (
          <PassportStampScene
            key={`stamp-${session.partnerRotation}-${stampedChapter}`}
            chapter={stampedChapter}
            chapterTitle={
              currentStage.title
            }
          />
        )}
      </AnimatePresence>

      <Container>
        <motion.section
          className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center"
          variants={listContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Partner heading */}
          <motion.div variants={listItem}>
            <MeetingHeader
              partnerName={
                session.participant.name
              }
            />
          </motion.div>

          {/* Partner presence */}
          <motion.div variants={listItem}>
            <PartnerAwayNotice
              isVisible={
                !isPartnerOnline &&
                state === "meeting"
              }
              partnerName={
                session.participant.name
              }
            />
          </motion.div>

          {/* Conversation passport */}
          <motion.div
            variants={listItem}
            className="mb-6"
          >
            <ConversationPassportCard
              rotation={passport.rotation}
              totalRotations={
                TOTAL_PARTNER_ROTATIONS
              }
              currentChapter={
                passport.currentChapter
              }
              completedChapters={
                passport.completedChapters
              }
            />
          </motion.div>

          {/* Conversation */}
          <motion.div variants={listItem}>
            {state === "meeting" ? (
              <ConversationCard
                chapter={
                  currentStage.chapter
                }
                stageTitle={
                  currentStage.title
                }
                question={
                  currentPrompt?.text ??
                  "Prompt unavailable."
                }
                transitioning={
                  transitionState ===
                  "transitioning"
                }
              />
            ) : (
              <ConversationComplete />
            )}
          </motion.div>

          {/* Timer */}
          <motion.div variants={listItem}>
            <MeetingTimer
              time={remainingTime}
              remainingSeconds={
                remainingSeconds
              }
            />
          </motion.div>
        </motion.section>

        {/* Quiet controls */}
        <div className="fixed bottom-6 right-6 flex gap-3">
          {missionText && (
            <button
              type="button"
              onClick={() =>
                setShowMission(true)
              }
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs text-white/60 backdrop-blur transition-colors hover:bg-black/60 hover:text-white/80"
              aria-label="View my mission"
            >
              <Eye className="h-3.5 w-3.5" />

              <span>My mission</span>
            </button>
          )}

          <button
            type="button"
            onClick={() =>
              setShowMeetupDetails(true)
            }
            className="rounded-lg border border-white/10 bg-black/40 p-2 text-white/60 backdrop-blur transition-colors hover:bg-black/60 hover:text-white/80"
            aria-label="Meetup details"
          >
            <Info className="h-4 w-4" />
          </button>
        </div>
      </Container>

      {/* Meetup details */}
      <MeetupDetails
        gatheringName={event?.name ?? ""}
        eventCode={event?.code ?? ""}
        isOpen={showMeetupDetails}
        onClose={() =>
          setShowMeetupDetails(false)
        }
      />

      {/* Secret mission */}
      <MissionQuickView
        missionText={missionText}
        isOpen={showMission}
        onClose={() =>
          setShowMission(false)
        }
      />
    </main>
  );
}
