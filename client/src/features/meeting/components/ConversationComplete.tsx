import { motion } from "framer-motion";

import { Text } from "@/components/ui";

export function ConversationComplete() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur"
    >
      <Text className="text-white/80">
        Conversation complete.
      </Text>

      <Text className="mt-2 text-white/40">
        Returning to the lobby…
      </Text>
    </motion.section>
  );
}
