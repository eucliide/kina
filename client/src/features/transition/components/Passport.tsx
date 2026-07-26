import { Text } from "@/components/ui";

export interface PassportProps {
  /**
   * Partner name.
   */
  partnerName: string;

  /**
   * Current activity.
   */
  activityName: string;
}

/**
 * Passport shown after the
 * envelope opens.
 */
export function Passport({
  partnerName,
  activityName,
}: PassportProps) {
  return (
    <section
      className="
        mx-auto
        w-full
        max-w-md
        rounded-3xl
        border
        border-white/10
        bg-[#0B1728]
        p-10
        shadow-2xl
        backdrop-blur
      "
    >
      <Text
        className="
          text-xs
          uppercase
          tracking-[0.3em]
          text-emerald-300
        "
      >
        ✓ Verified
      </Text>

      <Text
        className="
          mt-10
          text-4xl
          font-light
          text-white
        "
      >
        {partnerName}
      </Text>

      <Text
        className="
          mt-4
          text-sm
          uppercase
          tracking-[0.25em]
          text-white/45
        "
      >
        {activityName}
      </Text>
    </section>
  );
}
