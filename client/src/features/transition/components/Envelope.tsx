import { Heading, Text } from "@/components/ui";

export function Envelope() {
  return (
    <section
      className="
        flex
        min-h-screen
        flex-col
        items-center
        justify-center
        bg-[#07111f]
        text-white
        animate-fade-in
      "
    >
      <div
        className="
          flex
          h-40
          w-56
          items-center
          justify-center
          rounded-xl
          border
          border-white/10
          bg-white/5
          backdrop-blur
        "
      >
        ✉️
      </div>

      <Heading className="mt-10">
        Preparing your next conversation
      </Heading>

      <Text className="mt-4 text-white/60">
        One moment...
      </Text>
    </section>
  );
}
