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
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8"
      >
        <Label>Conversation Journey</Label>

        <Text className="mt-4 text-lg text-white">
          {activityName}
        </Text>

        <Text className="mt-6">
          Your next partner is about to be revealed.
        </Text>
      </motion.div>
    </SceneTransition>
  );
}
