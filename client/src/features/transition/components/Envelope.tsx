import { motion } from "framer-motion";

import { SceneTransition } from "@/lib/motion";
import { Heading, Text } from "@/components/ui";

export function Envelope() {
  return (
    <SceneTransition>
      <div className="text-center">
        {/* Minimal visual mark — not an emoji */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
        >
          <motion.span 
            className="h-px w-6 bg-white/40"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Heading className="mt-8">
            Preparing your next conversation
          </Heading>

          <Text className="mt-3 text-white/60">One moment.</Text>
        </motion.div>
      </div>
    </SceneTransition>
  );
}
