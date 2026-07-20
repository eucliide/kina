import { Hero } from "../components/Hero";
import { HowItWorks } from "../components/HowItWorks";
import { Navigation } from "../components/Navigation";

export function MarketingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <Navigation />
      <Hero />
      <HowItWorks />
    </main>
  );
}
