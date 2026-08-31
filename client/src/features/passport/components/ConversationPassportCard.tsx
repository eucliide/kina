import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

import { Label, Text } from "@/components/ui";
import {
  chapterFill,
  rotationCounter,
  transition,
} from "@/lib/motion";

interface ConversationPassportCardProps {
  rotation: number;
  totalRotations: number;
  currentChapter: number;
  completedChapters?: number[];
  compact?: boolean;
}

const CHAPTERS = [
  "Getting Comfortable",
  "Sharing Stories",
  "Discovering Values",
  "Reflection",
] as const;

export function ConversationPassportCard({
  rotation,
  totalRotations,
  currentChapter,
  completedChapters = [],
  compact = false,
}: ConversationPassportCardProps) {
  return (
    <aside
      className={[
        "relative overflow-hidden rounded-2xl border border-white/10",
        "bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))]",
        "shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur",
        compact ? "px-5 py-4" : "px-6 py-6 sm:px-7",
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]">
        <div className="absolute inset-y-0 left-1/2 w-px bg-white" />
      </div>

      <div className="relative">
        <div className="flex items-start justify-between gap-6">
          <div>
            <Label>Conversation Passport</Label>

            {!compact && (
              <Text className="mt-2 max-w-sm text-xs leading-relaxed text-white/35">
                A quiet record of where this conversation has taken you.
              </Text>
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.span
              key={rotation}
              variants={rotationCounter}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="whitespace-nowrap text-xs tracking-wide text-white/35"
            >
              Rotation {rotation} / {totalRotations}
            </motion.span>
          </AnimatePresence>
        </div>

        <div
          className={[
            "grid grid-cols-2 gap-3",
            compact ? "mt-4" : "mt-6 sm:grid-cols-4",
          ].join(" ")}
        >
          {CHAPTERS.map((chapter, index) => {
            const number = index + 1;

            const completed =
              completedChapters.includes(number) ||
              number < currentChapter;

            const active = number === currentChapter;

            return (
              <div
                key={chapter}
                className={[
                  "relative min-h-[76px] rounded-xl border px-3 py-3",
                  completed
                    ? "border-white/15 bg-white/[0.05]"
                    : active
                      ? "border-white/15 bg-white/[0.035]"
                      : "border-white/[0.06] bg-transparent",
                ].join(" ")}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-white/25">
                    {String(number).padStart(2, "0")}
                  </span>

                  <AnimatePresence>
                    {completed && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          scale: 1.4,
                          rotate: -12,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          rotate: -6,
                        }}
                        transition={{
                          duration: 0.45,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="
                          flex h-7 w-7 items-center justify-center
                          rounded-full border border-white/20
                          text-white/55
                        "
                        aria-label={`${chapter} completed`}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Text
                  className={[
                    "mt-3 text-xs leading-snug",
                    active
                      ? "text-white/80"
                      : completed
                        ? "text-white/55"
                        : "text-white/25",
                  ].join(" ")}
                >
                  {chapter}
                </Text>

                {active && (
                  <motion.div
                    layoutId="passport-active-chapter"
                    className="absolute inset-x-3 bottom-2 h-px origin-left bg-white/35"
                    variants={chapterFill}
                    initial="inactive"
                    animate="active"
                    transition={transition.fill}
                  />
                )}
              </div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentChapter}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{
              duration: 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Text className="mt-4 text-xs text-white/35">
              {CHAPTERS[currentChapter - 1] ?? "Journey complete"}
            </Text>
          </motion.div>
        </AnimatePresence>
      </div>
    </aside>
  );
}
