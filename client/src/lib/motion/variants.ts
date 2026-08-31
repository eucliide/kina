/**
 * Ki Motion System
 *
 * Three motion intents:
 *   PROGRESS  — something advances (passport, chapter)
 *   TRANSITION — context is changing (scene, stage, page)
 *   ARRIVAL   — we have landed somewhere new (page, partner)
 *
 * All durations are intentionally short.
 * Motion supports the experience; it never leads it.
 */

import type { Variants, Transition } from "framer-motion";

// ─── Base easing ────────────────────────────────────────────────────────────

export const ease = {
  out: [0.16, 1, 0.3, 1] as const,
  in: [0.4, 0, 1, 1] as const,
  inOut: [0.4, 0, 0.2, 1] as const,
} as const;

// ─── Shared transitions ──────────────────────────────────────────────────────

export const transition = {
  /** Standard content arrival */
  arrive: {
    duration: 0.45,
    ease: ease.out,
  } satisfies Transition,

  /** Quick state swap */
  swap: {
    duration: 0.3,
    ease: ease.out,
  } satisfies Transition,

  /** Slow cinematic reveal */
  reveal: {
    duration: 0.65,
    ease: ease.out,
  } satisfies Transition,

  /** Progress fill (passport bar) */
  fill: {
    duration: 0.6,
    ease: ease.out,
  } satisfies Transition,
} as const;

// ─── Page / scene entrance ───────────────────────────────────────────────────

/** ARRIVAL — page or scene has loaded */
export const pageEnter: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transition.arrive,
  },
};

/** TRANSITION — full-screen scene fade */
export const sceneFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: ease.out },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.35, ease: ease.in },
  },
};

// ─── Content swap ────────────────────────────────────────────────────────────

/** TRANSITION — content inside a card changes */
export const contentSwap: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transition.swap,
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.2, ease: ease.in },
  },
};

/** TRANSITION — content advances forward (chapter progress) */
export const contentAdvance: Variants = {
  hidden: { opacity: 0, x: 12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transition.swap,
  },
  exit: {
    opacity: 0,
    x: -10,
    transition: { duration: 0.2, ease: ease.in },
  },
};

// ─── List stagger ────────────────────────────────────────────────────────────

/** ARRIVAL — staggered list of items */
export const listContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

export const listItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transition.arrive,
  },
};

// ─── Passport progress ───────────────────────────────────────────────────────

/** PROGRESS — chapter bar fills */
export const chapterFill: Variants = {
  inactive: { scaleX: 0, opacity: 0.15 },
  active: {
    scaleX: 1,
    opacity: 0.9,
    transition: transition.fill,
  },
  complete: {
    scaleX: 1,
    opacity: 0.55,
    transition: transition.fill,
  },
};

/** PROGRESS — rotation counter cross-fades */
export const rotationCounter: Variants = {
  hidden: { opacity: 0, y: 4 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transition.swap,
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: 0.18, ease: ease.in },
  },
};

/**
 * PROGRESS — passport stamp lands.
 */
export const passportStamp: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.45,
    rotate: -16,
  },

  visible: {
    opacity: 1,
    scale: 1,
    rotate: -6,

    transition: {
      duration: 0.5,
      ease: ease.out,
    },
  },
};

/**
 * TRANSITION — letter rises from envelope.
 */
export const letterReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.55,
      ease: ease.out,
    },
  },

  exit: {
    opacity: 0,
    y: -6,

    transition: {
      duration: 0.22,
      ease: ease.in,
    },
  },
};
