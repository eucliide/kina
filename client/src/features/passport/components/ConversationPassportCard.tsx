import { motion, AnimatePresence } from "framer-motion";

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
}

const CHAPTERS = [
  "Getting Comfortable",
  "Sharing Stories",
  "Discovering Values",
  "Looking Forward",
];

export function ConversationPassportCard({
  rotation,
  totalRotations,
  currentChapter,
}: ConversationPassportCardProps) {
  return (
    <aside className="rounded-xl border border-white/8 bg-white/[0.03] px-5 py-4">
      <div className="flex items-center justify-between">
        <Label>Conversation Journey</Label>

        {/* PROGRESS — rotation counter cross-fades when partner changes */}
        <AnimatePresence mode="wait">
          <motion.span
            key={rotation}
            variants={rotationCounter}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-xs text-white/30"
          >
            {rotation} of {totalRotations}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* PROGRESS — chapter bars fill as chapters complete */}
      <div className="mt-4 flex gap-2">
        {CHAPTERS.map((chapter, index) => {
          const number = index + 1;
          const completed = number < currentChapter;
          const active = number === currentChapter;
          const variant = completed ? "complete" : active ? "active" : "inactive";

          return (
            <motion.div
              key={chapter}
              title={chapter}
              className="h-1 flex-1 origin-left rounded-full bg-white"
              variants={chapterFill}
              initial="inactive"
              animate={variant}
              transition={transition.fill}
            />
          );
        })}
      </div>

      {/* PROGRESS — chapter name cross-fades on advance */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentChapter}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -3 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <Text className="mt-3 text-xs text-white/40">
            {CHAPTERS[currentChapter - 1] ?? ""}
          </Text>
        </motion.div>
      </AnimatePresence>
    </aside>
  );
}
