import { motion } from "framer-motion";

import { Text } from "@/components/ui";

interface InvitationSentCardProps {
  participantName: string;
  onCancel?: () => void;
}

export function InvitationSentCard({
  participantName,
  onCancel,
}: InvitationSentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="mt-8 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6"
    >
      <div className="flex items-center gap-3">
        <span className="h-2 w-2 shrink-0 rounded-full bg-amber-400/80" />

        <Text className="font-medium text-white">
          Waiting for {participantName}
        </Text>
      </div>

      <button
        type="button"
        onClick={onCancel}
        className="mt-5 text-sm text-white/35 transition-colors hover:text-white/60"
      >
        Cancel
      </button>
    </motion.div>
  );
}
