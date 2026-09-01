import { motion } from "framer-motion";

import { SceneTransition } from "@/lib/motion";
import { Label, Text } from "@/components/ui";

interface PassportProps {
  partnerName: string;
  activityName: string;
}

export function Passport({ activityName }: PassportProps) {
  return (
    <SceneTransition>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <Label>Conversation Journey</Label>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Text className="mt-4 text-lg text-white">
            {activityName}
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Text className="mt-6 text-white/70">
            Your next partner is about to be revealed.
          </Text>
        </motion.div>
      </motion.div>
    </SceneTransition>
  );
}
