import { motion } from "framer-motion";

import { SceneTransition } from "@/lib/motion";
import { Heading, Text } from "@/components/ui";

export function Envelope() {
  return (
    <SceneTransition>
      <div className="text-center">
        {/* Minimal visual mark — not an emoji */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
        >
          <span className="h-px w-6 bg-white/40" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <Heading className="mt-8">
            Preparing your next conversation
          </Heading>

          <Text className="mt-3">One moment.</Text>
        </motion.div>
      </div>
    </SceneTransition>
  );
}
