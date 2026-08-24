import { motion, AnimatePresence } from "framer-motion";

interface PartnerAwayNoticeProps {
  isVisible: boolean;
  partnerName: string;
}

/**
 * Subtle notice shown when partner has disconnected temporarily.
 * 
 * This appears below the meeting header and provides reassurance
 * without interrupting the conversation flow.
 */
export function PartnerAwayNotice({ isVisible, partnerName }: PartnerAwayNoticeProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 rounded-lg border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm"
        >
          <p className="text-center text-sm text-white/60">
            {partnerName} stepped away.
            <br />
            <span className="text-white/40">You can keep going.</span>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
