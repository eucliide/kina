import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MissionQuickViewProps {
  missionText: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MissionQuickView({
  missionText,
  isOpen,
  onClose,
}: MissionQuickViewProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    }

    function handleClickOutside(event: MouseEvent) {
      if (
        cardRef.current &&
        !cardRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            ref={cardRef}
            className="relative w-full max-w-md mx-6 rounded-2xl border border-white/10 bg-[#0a1628]/95 p-8 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="space-y-6 text-center">
              <div>
                <h2 className="text-lg font-medium text-white/90">
                  My Secret Mission
                </h2>
                <p className="mt-1 text-xs text-white/40">
                  Keep this private
                </p>
              </div>

              {missionText ? (
                <p className="text-base leading-relaxed text-white/80">
                  {missionText}
                </p>
              ) : (
                <p className="text-sm text-white/50">
                  No mission assigned yet
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
