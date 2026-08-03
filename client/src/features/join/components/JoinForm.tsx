import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui";
import { loadEventByCode } from "@/features/event/services/eventLookupService";
import { setJoinedEvent } from "../services/joinSession";

import { QRCodeButton } from "./QRCodeButton";
import { MeetingCodeInput } from "./MeetingCodeInput";

export function JoinForm() {
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleContinue() {
    const normalizedCode = code.trim();

    if (!normalizedCode) {
      setError("Enter a meeting code.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const event =
        await loadEventByCode(
          normalizedCode,
        );

      setJoinedEvent(event);

      navigate("/join/name");
    } catch {
      setError(
        "We couldn't find that meetup.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <QRCodeButton />

      <div className="flex items-center gap-4 text-sm text-white/40">
        <span className="h-px flex-1 bg-white/10" />
        OR
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <MeetingCodeInput
        value={code}
        onChange={setCode}
      />

      {error && (
        <p className="text-sm text-red-300">
          {error}
        </p>
      )}

      <Button
        className="w-full"
        onClick={handleContinue}
        disabled={loading}
      >
        {loading
          ? "Finding meetup..."
          : "Continue"}
      </Button>
    </div>
  );
}
