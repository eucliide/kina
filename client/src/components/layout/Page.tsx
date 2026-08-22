import type { PropsWithChildren } from "react";

type PageProps = PropsWithChildren;

export function Page({ children }: PageProps) {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      {children}
    </main>
  );
}
