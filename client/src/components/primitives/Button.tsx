import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex
        items-center
        justify-center
        rounded-lg
        bg-primary
        px-6
        py-3
        text-sm
        font-medium
        text-white
        transition
        duration-200
        hover:bg-primary-hover
        focus:outline-none
        focus:ring-2
        focus:ring-primary
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
