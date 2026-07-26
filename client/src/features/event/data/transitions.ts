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
      durationMs: 500,
    },

    {
      id: "envelope",
      type: "envelope",
      durationMs: 1400,
    },

    {
      id: "passport",
      type: "passport",
      durationMs: 1500,
    },

    {
      id: "partner",
      type: "partnerReveal",
      durationMs: 1800,
    },

    {
      id: "fade-in",
      type: "fadeIn",
      durationMs: 500,
    },
  ],
};
