import type { Transition } from "../types/transition";

/**
 * Default transition shown
 * between partner conversations.
 */
export const PARTNER_TRANSITION: Transition = {
  id: "partner-transition",

  name: "Partner Transition",

  scenes: [
    {
      id: "fade-out",
      type: "fadeOut",
      durationMs: 400,
    },

    {
      id: "envelope",
      type: "envelope",
      durationMs: 1200,
    },

    {
      id: "passport",
      type: "passport",
      durationMs: 1200,
    },

    {
      id: "partner",
      type: "partnerReveal",
      durationMs: 1400,
    },

    {
      id: "fade-in",
      type: "fadeIn",
      durationMs: 400,
    },
  ],
};
