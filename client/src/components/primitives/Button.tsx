import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl
      bg-blue-600 px-6 py-3 text-sm font-medium text-white
      transition-colors duration-200
      hover:bg-blue-500
      focus:outline-none
      focus:ring-2
      focus:ring-blue-500
      disabled:cursor-not-allowed
      disabled:opacity-50
      ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
