import { QRCodeButton } from "./QRCodeButton";

export function JoinForm() {
  return (
    <div className="space-y-4">

      <QRCodeButton />

      <div className="flex items-center gap-4 text-sm text-white/40">
        <span className="h-px flex-1 bg-white/10" />
        OR
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <input
        placeholder="Enter meeting code"
        className="
          h-12 w-full rounded-xl
          border border-white/10
          bg-white/5
          px-4
          text-white
          outline-none
          placeholder:text-white/40
        "
      />

    </div>
  );
}
