import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { X } from "lucide-react";

interface MeetupDetailsProps {
  gatheringName: string;
  eventCode: string;
  isOpen: boolean;
  onClose: () => void;
}

export function MeetupDetails({
  gatheringName,
  eventCode,
  isOpen,
  onClose,
}: MeetupDetailsProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    }

    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
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

  const joinUrl = `${window.location.origin}/join?code=${eventCode}`;

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
            ref={panelRef}
            className="relative w-full max-w-md mx-6 rounded-2xl border border-white/10 bg-[#0a1628]/95 p-8 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-white/60"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-medium text-white">
                  {gatheringName}
                </h2>
              </div>

              <div className="mx-auto w-fit rounded-xl bg-white p-4">
                <QRCodeSVG
                  value={joinUrl}
                  size={160}
                  level="M"
                  includeMargin={false}
                />
              </div>

              <div className="space-y-2 text-center">
                <p className="text-xs text-white/40">Event code</p>
                <p className="font-mono text-lg font-semibold tracking-wider text-white/90">
                  {eventCode}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
