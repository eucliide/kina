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
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Label>Your next partner</Label>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          <Heading className="mt-4 text-4xl sm:text-5xl">
            {partnerName}
          </Heading>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Text className="mt-5">
            Continue your Conversation Journey.
          </Text>
        </motion.div>
      </div>
    </SceneTransition>
  );
}
