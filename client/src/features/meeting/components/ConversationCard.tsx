import { motion, AnimatePresence } from "framer-motion";

import { Label, Text } from "@/components/ui";
import { contentAdvance, contentSwap } from "@/lib/motion";

interface ConversationCardProps {
  chapter: number;
  stageTitle: string;
  question: string;
  transitioning: boolean;
}

export function ConversationCard({
  chapter,
  stageTitle,
  question,
  transitioning,
}: ConversationCardProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur sm:p-10">
      {/* PROGRESS — chapter label advances forward */}
      <AnimatePresence mode="wait">
        <motion.div
          key={chapter}
          variants={contentAdvance}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Label>Chapter {chapter}</Label>
          <Text className="mt-2 text-sm text-white/50">{stageTitle}</Text>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 min-h-[140px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {transitioning ? (
            /* TRANSITION — brief pause between chapters */
            <motion.div
              key="transitioning"
              variants={contentSwap}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-center"
            >
              <Text className="text-white/35">Next chapter…</Text>
            </motion.div>
          ) : (
            /* ARRIVAL — new question arrives */
            <motion.div
              key={`${chapter}-${stageTitle}`}
              variants={contentAdvance}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Text className="text-xl leading-relaxed text-white sm:text-2xl">
                {question}
              </Text>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
