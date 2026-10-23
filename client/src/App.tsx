import { MarketingPage } from "@/features/marketing/pages/MarketingPage";
import { TransitionPlayer } from "@/features/transition/components/TransitionPlayer";
import { useTransitionCoordinator } from "@/features/transition/hooks/useTransitionCoordinator";
import { useAnonymousAuth } from "@/features/auth/hooks/useAnonymousAuth";
import { getSession } from "@/features/meeting/services/meetingSession";
import { getJoinedEvent } from "@/features/join/services/joinSession";

function formatActivityName(
  activityId:
    | string
    | null
    | undefined,
) {
  if (activityId === "conversationJourney") {
    return "Conversation Journey";
  }

  if (activityId === "wnrs") {
    return "WNRS";
  }

  return "Activity";
}

function App() {
  const { ready, error } =
    useAnonymousAuth();

  const {
    transition,
    finishTransition,
  } = useTransitionCoordinator();
  const session = getSession();
  const joinedEvent = getJoinedEvent();

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

  if (transition) {
    return (
      <TransitionPlayer
        transition={transition}
        context={{
          partnerName:
            session?.participant.name ??
            "Partner",
          activityName:
            formatActivityName(
              joinedEvent?.current_activity_id,
            ),
        }}
        onFinished={finishTransition}
      />
    );
  }

  return <MarketingPage />;
}

export default App;
