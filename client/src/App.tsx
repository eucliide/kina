import { MarketingPage } from "@/features/marketing/pages/MarketingPage";
import { useTransitionCoordinator } from "@/features/transition/hooks/useTransitionCoordinator";

function App() {
  const {
    transition,
    startTransition,
    finishTransition,
  } = useTransitionCoordinator();
  return <MarketingPage />;
}

export default App;
