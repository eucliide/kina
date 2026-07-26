import { Text } from "@/components/ui";

/**
 * Envelope displayed before
 * revealing the next partner.
 */
export function Envelope() {
  return (
    <section
      className="
        flex
        min-h-screen
        items-center
        justify-center
      "
    >
      <div
        className="
          w-80
          rounded-2xl
          border
          border-white/10
          bg-[#0B1728]
          p-10
          shadow-2xl
          text-center
        "
      >
        <Text
          className="
            text-xs
            uppercase
            tracking-[0.3em]
            text-white/40
          "
        >
          Ki
        </Text>

        <Text
          className="
            mt-8
            text-2xl
            font-light
            text-white
          "
        >
          Your next conversation
          awaits.
        </Text>

        <Text
          className="
            mt-6
            text-sm
            text-white/50
          "
        >
          Open when ready.
        </Text>
      </div>
    </section>
  );
}
