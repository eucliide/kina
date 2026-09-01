import { motion } from "framer-motion";

import { SceneTransition } from "@/lib/motion";
import { Heading, Label, Text } from "@/components/ui";

interface PartnerRevealProps {
  partnerName: string;
}

export function PartnerReveal({ partnerName }: PartnerRevealProps) {
  return (
    <SceneTransition>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Label>Your next partner</Label>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Heading className="mt-4 text-4xl sm:text-5xl">
            {partnerName}
          </Heading>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <Text className="mt-5 text-white/70">
            Continue your Conversation Journey.
          </Text>
        </motion.div>
      </div>
    </SceneTransition>
  );
}
