import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui";

import { QRCodeButton } from "./QRCodeButton";
import { MeetingCodeInput } from "./MeetingCodeInput";

export function JoinForm() {
  const navigate = useNavigate();

  function handleContinue() {
    navigate("/join/name");
  }

  return (
    <div className="space-y-4">

      <QRCodeButton />

      <div className="flex items-center gap-4 text-sm text-white/40">
        <span className="h-px flex-1 bg-white/10" />
        OR
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <MeetingCodeInput />

      <Button
        className="w-full"
        onClick={handleContinue}
      >
        Continue
      </Button>

    </div>
  );
}
