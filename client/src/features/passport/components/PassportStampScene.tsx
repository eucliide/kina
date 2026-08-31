import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { Text } from "@/components/ui";
import { SceneTransition } from "@/lib/motion";

interface PassportStampSceneProps {
  chapter: number;
  chapterTitle: string;
}

export function PassportStampScene({
  chapter,
  chapterTitle,
}: PassportStampSceneProps) {
  return (
    <SceneTransition>
      <div className="mx-auto w-full max-w-sm px-6 text-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.35,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <Text className="text-xs uppercase tracking-[0.22em] text-white/30">
            Conversation Passport
          </Text>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            scale: 1.45,
            rotate: -18,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: -7,
          }}
          transition={{
            delay: 0.18,
            duration: 0.52,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            mx-auto mt-8 flex h-28 w-28
            items-center justify-center rounded-full
            border-2 border-white/25
            text-white/65
          "
        >
          <div>
            <Check className="mx-auto h-6 w-6" />

            <div className="mt-2 text-[10px] uppercase tracking-[0.2em]">
              Chapter {chapter}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 6,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.38,
            duration: 0.35,
          }}
        >
          <Text className="mt-7 text-sm text-white/55">
            {chapterTitle}
          </Text>

          <Text className="mt-2 text-xs text-white/25">
            Stamped.
          </Text>
        </motion.div>
      </div>
    </SceneTransition>
  );
}
