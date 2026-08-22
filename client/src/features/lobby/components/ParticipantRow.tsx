import { motion } from "framer-motion";

import { PresenceDot, Text } from "@/components/ui";

import type { PresenceStatus } from "../types";

interface ParticipantRowProps {
  name: string;
  status: PresenceStatus;
  onClick?: () => void;
}

export function ParticipantRow({
  name,
  status,
  onClick,
}: ParticipantRowProps) {
  const available = status === "available";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={!available}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex w-full items-center gap-4 rounded-xl border border-white/8 bg-white/4 px-5 py-4 text-left transition-colors hover:bg-white/8 disabled:cursor-default disabled:opacity-50 disabled:hover:bg-white/4"
    >
      <PresenceDot status={status} />

      <div className="min-w-0 flex-1">
        <Text className="font-medium text-white">
          {name}
        </Text>
      </div>

      {available && (
        <Text className="shrink-0 text-xs text-white/30">
          Tap to invite
        </Text>
      )}
    </motion.button>
  );
}
