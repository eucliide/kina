import type { PropsWithChildren } from "react";

type PageProps = PropsWithChildren;

export function Page({ children }: PageProps) {
  return (
    <main className="min-h-screen bg-[#020817] text-slate-50">
      {children}
    </main>
  );
}
