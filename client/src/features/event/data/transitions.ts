import type { Transition } from "../types/transition";

/**
 * Standard partner transition.
 */
export const PARTNER_TRANSITION: Transition = {
  id: "partner-transition",

  name: "Partner Transition",

  steps: [
    {
      id: "fade-out",
      type: "fadeOut",
      durationMs: 500,
    },

    {
      id: "envelope",
      type: "envelopeAppear",
      durationMs: 700,
    },

    {
      id: "open",
      type: "envelopeOpen",
      durationMs: 900,
    },

    {
      id: "passport",
      type: "passportStamp",
      durationMs: 800,
    },

    {
      id: "message",
      type: "messageReveal",
      durationMs: 1200,
    },

    {
      id: "partner",
      type: "partnerReveal",
      durationMs: 1500,
    },

    {
      id: "fade-in",
      type: "fadeIn",
      durationMs: 500,
    },
  ],
};
