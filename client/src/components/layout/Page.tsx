import type { PropsWithChildren } from "react";

type PageProps = PropsWithChildren;

export function Page({ children }: PageProps) {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020817",
        color: "white",
      }}
    >
      {children}
    </main>
  );
}
