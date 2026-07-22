import type { LobbyState } from "../types";

interface LobbyDebugPanelProps {
  setState: (state: LobbyState) => void;
}

export function LobbyDebugPanel({
  setState,
}: LobbyDebugPanelProps) {
  const states: LobbyState[] = [
    "waiting",
    "available",
    "sent",
    "received",
  ];

  return (
    <div className="fixed bottom-6 right-6 rounded-xl border border-white/10 bg-black/40 p-3 backdrop-blur">
      <p className="mb-2 text-xs uppercase tracking-wider text-white/40">
        Debug
      </p>

      <div className="flex flex-col gap-2">
        {states.map((state) => (
          <button
            key={state}
            onClick={() => setState(state)}
            className="rounded-lg bg-white/5 px-3 py-2 text-left text-sm hover:bg-white/10"
          >
            {state}
          </button>
        ))}
      </div>
    </div>
  );
}
