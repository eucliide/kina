import { useState } from "react";

import { Button } from "@/components/ui";

type NameFormProps = {
  onContinue?: (name: string) => void;
};

export function NameForm({ onContinue }: NameFormProps) {
  const [name, setName] = useState("");

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && name.trim()) {
            onContinue?.(name.trim());
          }
        }}
        placeholder="First name"
        className="
          h-11 w-full rounded-xl
          border border-white/10
          bg-white/5
          px-4
          text-white
          outline-none
          transition-colors
          placeholder:text-white/30
          focus:border-white/30
        "
      />

      <Button
        className="w-full"
        onClick={() => onContinue?.(name.trim())}
        disabled={!name.trim()}
      >
        Continue
      </Button>
    </div>
  );
}
