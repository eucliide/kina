import { useState } from "react";

import { Button } from "@/components/ui";

interface CreateFormProps {
  onCreate: (
    hostName: string,
  ) => Promise<void>;
}

export function CreateForm({
  onCreate,
}: CreateFormProps) {
  const [name, setName] =
    useState("");

  return (
    <div className="space-y-4">
      <input
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        placeholder="First name"
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

      <Button
        className="w-full"
        onClick={() => onCreate(name)}
      >
        Create meetup
      </Button>
    </div>
  );
}
