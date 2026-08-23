import { useState } from "react";

import { Button } from "@/components/ui";

interface CreateFormProps {
  onCreate: (
    gatheringName: string,
  ) => Promise<void>;
}

export function CreateForm({
  onCreate,
}: CreateFormProps) {
  const [name, setName] =
    useState("");

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="gathering-name" className="block text-sm text-white/60">
          What's this gathering called?
        </label>
        <input
          id="gathering-name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Friday Dinner"
          className="
            h-12
            w-full
            rounded-xl
            border
            border-white/10
            bg-white/5
            px-4
            text-white
            placeholder:text-white/40
          "
        />
      </div>

      <Button
        className="w-full"
        onClick={() => onCreate(name)}
        disabled={!name.trim()}
      >
        Create gathering
      </Button>
    </div>
  );
}
