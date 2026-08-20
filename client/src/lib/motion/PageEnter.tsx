import type { PropsWithChildren } from "react";
import { motion } from "framer-motion";

import { pageEnter } from "./variants";

type PageEnterProps = PropsWithChildren<{ className?: string }>;

/**
 * Wraps any page section with the standard Ki arrival animation.
 * Use once per page, around the primary content block.
 */
export function PageEnter({ children, className }: PageEnterProps) {
  return (
    <motion.div
      variants={pageEnter}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}
