import { MarketingPage } from "@/features/marketing/pages/MarketingPage";
import { useTransitionCoordinator } from "@/features/transition/hooks/useTransitionCoordinator";

function App() {
  const {
    transition,
    startTransition,
    finishTransition,
  } = useTransitionCoordinator();

  if (transition) {
    return (
      <TransitionPlayer
        transition={transition}
        context={{
          partnerName: "Kevin",
          activityName:
            "Conversation Journey",
        }}
        onFinished={
          finishTransition
        }
      />
    );
  }

  return <MarketingPage />;
}

export default App;
