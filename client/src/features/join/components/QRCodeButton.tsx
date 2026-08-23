import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Text } from "@/components/ui";
import { QRScanner } from "./QRScanner";
import { loadEventByCode } from "@/features/event/services/eventLookupService";
import { setJoinedEvent } from "../services/joinSession";

export function QRCodeButton() {
  const navigate = useNavigate();
  const [showScanner, setShowScanner] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleScan(code: string) {
    setError("");
    setLoading(true);
    setShowScanner(false);

    try {
      const event = await loadEventByCode(code);
      setJoinedEvent(event);
      navigate("/join/name");
    } catch {
      setError("We couldn't find that meetup.");
      setLoading(false);
    }
  }

  function handleClose() {
    setShowScanner(false);
  }

  return (
    <>
      <Button
        variant="ghost"
        className="w-full"
        onClick={() => setShowScanner(true)}
        disabled={loading}
      >
        {loading ? "Finding meetup…" : "Scan QR code"}
      </Button>

      {error && (
        <Text className="text-sm text-red-300/80">{error}</Text>
      )}

      {showScanner && (
        <QRScanner onScan={handleScan} onClose={handleClose} />
      )}
    </>
  );
}
