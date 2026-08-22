import { motion } from "framer-motion";

import { Heading, Label, Text } from "@/components/ui";

interface WnrsCardProps {
  prompt: string;
}

export function WnrsCard({
  prompt,
}: WnrsCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center"
    >
      <Label>One last thing</Label>

      <Heading className="mt-4">
        Share something real.
      </Heading>

      <Text className="mx-auto mt-3 max-w-lg">
        Take a moment with each other.
        Answer honestly, then give the
        other person space to share.
      </Text>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 px-8 py-7">
        <Text className="text-lg leading-relaxed text-white">
          {prompt}
        </Text>
      </div>
    </motion.section>
  );
}
