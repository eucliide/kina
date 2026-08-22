import { motion } from "framer-motion";

import { Heading, Label } from "@/components/ui";

interface MeetingHeaderProps {
  partnerName: string;
}

export function MeetingHeader({
  partnerName,
}: MeetingHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mb-10 text-center"
    >
      <Label>Conversation with</Label>

      <Heading className="mt-3">
        {partnerName}
      </Heading>
    </motion.header>
  );
}
