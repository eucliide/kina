import { MarketingPage } from "@/features/marketing/pages/MarketingPage";
import { TransitionPlayer } from "@/features/transition/components/TransitionPlayer";
import { useTransitionCoordinator } from "@/features/transition/hooks/useTransitionCoordinator";
import { useAnonymousAuth } from "@/features/auth/hooks/useAnonymousAuth";

function App() {
  const { ready, error } =
    useAnonymousAuth();

  const {
    transition,
    finishTransition,
  } = useTransitionCoordinator();

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#07111f] text-white">
        <p className="text-white/60">
          Unable to start Ki.
        </p>
      </main>
    );
  }

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#07111f] text-white">
        <p className="text-white/50">
          Starting Ki...
        </p>
      </main>
    );
  }

  if (transition) {
    return (
      <TransitionPlayer
        transition={transition}
        context={{
          partnerName: "Kevin",
          activityName:
            "Conversation Journey",
        }}
        onFinished={finishTransition}
      />
    );
  }

  return <MarketingPage />;
}

export default App;
