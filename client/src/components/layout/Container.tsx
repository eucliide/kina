import type { PropsWithChildren } from "react";

type ContainerProps = PropsWithChildren;

export function Container({ children }: ContainerProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
      {children}
    </div>
  );
}
