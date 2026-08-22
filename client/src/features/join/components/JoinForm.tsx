import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Text } from "@/components/ui";
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
      const event = await loadEventByCode(normalizedCode);
      setJoinedEvent(event);
      navigate("/join/name");
    } catch {
      setError("We couldn't find that meetup.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <MeetingCodeInput value={code} onChange={setCode} />

      {error && (
        <Text className="text-sm text-red-300/80">{error}</Text>
      )}

      <Button
        className="w-full"
        onClick={handleContinue}
        disabled={loading}
      >
        {loading ? "Finding meetup…" : "Continue"}
      </Button>

      <div className="flex items-center gap-3 py-1 text-xs text-white/25">
        <span className="h-px flex-1 bg-white/10" />
        or
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <QRCodeButton />
    </div>
  );
}
