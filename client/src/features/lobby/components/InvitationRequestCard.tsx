import { motion } from "framer-motion";

import { Button, Text } from "@/components/ui";

interface InvitationRequestCardProps {
  participantName: string;
  onAccept?: () => void;
  onDecline?: () => void;
}

export function InvitationRequestCard({
  participantName,
  onAccept,
  onDecline,
}: InvitationRequestCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="mt-8 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6"
    >
      <Text className="font-medium text-white">
        {participantName} would like to talk.
      </Text>

      <div className="mt-5 flex gap-3">
        <Button className="flex-1" onClick={onAccept}>
          Accept
        </Button>

        <Button
          variant="ghost"
          className="flex-1"
          onClick={onDecline}
        >
          Decline
        </Button>
      </div>
    </motion.div>
  );
}
