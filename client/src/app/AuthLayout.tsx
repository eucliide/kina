import { Outlet } from "react-router-dom";

import { useAnonymousAuth } from "@/features/auth/hooks/useAnonymousAuth";

export function AuthLayout() {
  const { ready, error } = useAnonymousAuth();

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#07111f] text-white">
        <p className="text-white/60">
          Unable to start Kina.
        </p>
      </main>
    );
  }

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#07111f] text-white">
        <p className="text-white/50">
          Starting Kina...
        </p>
      </main>
    );
  }

  return <Outlet />;
}
