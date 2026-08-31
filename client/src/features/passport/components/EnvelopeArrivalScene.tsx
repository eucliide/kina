import { motion } from "framer-motion";
import { Mail } from "lucide-react";

import { Text } from "@/components/ui";
import { SceneTransition } from "@/lib/motion";

interface EnvelopeArrivalSceneProps {
  partnerName: string;
  rotation: number;
}

export function EnvelopeArrivalScene({
  partnerName,
  rotation,
}: EnvelopeArrivalSceneProps) {
  return (
    <SceneTransition>
      <div className="mx-auto w-full max-w-md px-6 text-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 18,
            rotateX: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
            rotateX: 0,
          }}
          transition={{
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            relative mx-auto flex h-44 w-full max-w-xs
            items-center justify-center overflow-hidden
            rounded-2xl border border-white/10
            bg-white/[0.035]
            shadow-[0_30px_90px_rgba(0,0,0,0.3)]
          "
        >
          <motion.div
            initial={{
              opacity: 1,
              y: 0,
            }}
            animate={{
              opacity: 0.18,
              y: 18,
            }}
            transition={{
              delay: 0.55,
              duration: 0.45,
            }}
          >
            <Mail className="h-10 w-10 text-white/50" />
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 45,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.48,
              duration: 0.55,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              absolute inset-x-5 bottom-5 top-5
              rounded-xl border border-white/10
              bg-[#0b1726] px-6 py-6
            "
          >
            <Text className="text-[10px] uppercase tracking-[0.22em] text-white/30">
              Rotation {rotation}
            </Text>

            <Text className="mt-5 text-sm text-white/45">
              Your next conversation
            </Text>

            <Text className="mt-2 text-xl text-white">
              {partnerName}
            </Text>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.9,
            duration: 0.35,
          }}
        >
          <Text className="mt-7 text-xs text-white/25">
            A new chapter begins.
          </Text>
        </motion.div>
      </div>
    </SceneTransition>
  );
}
