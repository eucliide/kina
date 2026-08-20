import type { PropsWithChildren } from "react";
import { motion } from "framer-motion";

import { sceneFade } from "./variants";

type SceneTransitionProps = PropsWithChildren;

/**
 * Full-screen scene wrapper with cinematic fade.
 * Used for transition scenes (Envelope, Passport, PartnerReveal).
 */
export function SceneTransition({ children }: SceneTransitionProps) {
  return (
    <motion.section
      variants={sceneFade}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#07111f]"
    >
      {children}
    </motion.section>
  );
}
