import { useState } from "react";

import {
  createPassport,
} from "../services/passportService";

export function useConversationPassport(
  rotation: number,
) {
  const [passport, setPassport] =
    useState(() =>
      createPassport(rotation),
    );

  return {
    passport,
    setPassport,
  };
}
