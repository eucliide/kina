import kinaCreem from "@/img/kina-cream.svg";
import kinaGreen from "@/img/kina-green.svg";

interface KinaLogoProps {
  className?: string;
}

export function KinaLogo({ className }: KinaLogoProps) {
  return (
    <>
      <img
        src={kinaCreem}
        alt="Kina"
        className={`dark:block hidden ${className ?? ""}`}
      />
      <img
        src={kinaGreen}
        alt="Kina"
        className={`dark:hidden block ${className ?? ""}`}
      />
    </>
  );
}
